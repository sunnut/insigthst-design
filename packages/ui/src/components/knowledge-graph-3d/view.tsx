import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { LinkObject, NodeObject } from 'three-forcegraph';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import type {
  KnowledgeGraph3DData,
  KnowledgeGraph3DFocusOptions,
  KnowledgeGraph3DHandle,
  KnowledgeGraph3DLink,
  KnowledgeGraph3DNode,
  KnowledgeGraph3DNodeId,
  KnowledgeGraph3DNodeShape,
  KnowledgeGraph3DProps,
  KnowledgeGraph3DSelectOptions,
  KnowledgeGraph3DValueAccessor,
} from './types';
import { applyRadialLayout } from './radial-layout';
import styles from './view.module.css';

const INTERNAL_NODE_ID = '__insightstKnowledgeGraph3dId';
const DEFAULT_CAMERA = { x: 460, y: 320, z: 680 };
const DEFAULT_NODE_COLOR = '#5264e0';
const DEFAULT_LINK_COLOR = '#64748b';
const ACTIVE_LINK_COLOR = '#38bdf8';
const DIMMED_LINK_COLOR = '#334155';
const ZOOM_FACTOR = 1.18;

const sphereGeometry = new THREE.SphereGeometry(1, 16, 12);
const diamondGeometry = new THREE.OctahedronGeometry(1.2, 0);

type InternalNode<Node extends KnowledgeGraph3DNode> = NodeObject & {
  [INTERNAL_NODE_ID]: KnowledgeGraph3DNodeId;
  __source: Node;
  __degree: number;
  __showLabel: boolean;
  __group?: THREE.Group;
};

type InternalLink<
  Node extends KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node>,
> = LinkObject<InternalNode<Node>> & {
  __source: Link;
};

type GraphInstance<
  Node extends KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node>,
> = ForceGraph3DInstance<InternalNode<Node>, InternalLink<Node, Link>>;

type InternalGraphData<
  Node extends KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node>,
> = {
  nodes: InternalNode<Node>[];
  links: InternalLink<Node, Link>[];
  focusRadius: number;
};

type TooltipState = {
  content: ReactNode;
  x: number;
  y: number;
};

function asKey(id: KnowledgeGraph3DNodeId | null | undefined): string | null {
  return id == null ? null : String(id);
}

function valueOf<Item, Value>(
  accessor: KnowledgeGraph3DValueAccessor<Item, Value> | undefined,
  item: Item,
  fallback: Value,
): Value {
  if (typeof accessor === 'function') {
    return (accessor as (value: Item) => Value)(item);
  }
  return accessor ?? fallback;
}

function defaultNodeLabel(node: KnowledgeGraph3DNode): string {
  return String(node.name ?? node.id);
}

function defaultNodeId(node: KnowledgeGraph3DNode): KnowledgeGraph3DNodeId {
  return node.id;
}

function defaultNodeSubLabel(node: KnowledgeGraph3DNode): string {
  return String(node.meta_type ?? node.type ?? '');
}

function defaultLinkLabel(link: KnowledgeGraph3DLink): string {
  return String(link.type ?? link.id ?? '');
}

function defaultNodeColor(node: KnowledgeGraph3DNode): string {
  const category = String(node.meta_type ?? node.type ?? '').toLowerCase();
  if (category === 'data') return '#43cb89';
  if (category === 'constraint' || category === 'property') return '#cba029';
  if (['algorithm', 'model', 'metric', 'task'].includes(category)) return '#2563eb';
  return DEFAULT_NODE_COLOR;
}

function defaultNodeShape(node: KnowledgeGraph3DNode): KnowledgeGraph3DNodeShape {
  const category = String(node.meta_type ?? node.type ?? '').toLowerCase();
  return category === 'constraint' || category === 'property' ? 'diamond' : 'sphere';
}

function defaultNodeRadius(node: KnowledgeGraph3DNode, degree: number): number {
  const category = String(node.meta_type ?? node.type ?? '').toLowerCase();
  const base = category === 'constraint' || category === 'property' ? 5 : 7;
  const declaredDegree = Number(node.num_relations);
  const weight = Number.isFinite(declaredDegree) ? declaredDegree : degree;
  return base + Math.min(4, Math.sqrt(Math.max(0, weight)) * 0.65);
}

function endpointId<Node extends KnowledgeGraph3DNode>(
  endpoint: KnowledgeGraph3DNodeId | Node,
  getNodeId: (node: Node) => KnowledgeGraph3DNodeId,
): KnowledgeGraph3DNodeId {
  return typeof endpoint === 'object' ? getNodeId(endpoint) : endpoint;
}

function truncateLabel(value: string, maxLength = 18): string {
  const characters = Array.from(value);
  return characters.length > maxLength ? `${characters.slice(0, maxLength).join('')}…` : value;
}

function buildInternalData<
  Node extends KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node>,
>(
  data: KnowledgeGraph3DData<Node, Link>,
  getNodeId: (node: Node) => KnowledgeGraph3DNodeId,
  maxVisibleLabels: number,
  showLabels: boolean,
  layout: 'radial' | 'force',
): InternalGraphData<Node, Link> {
  const relationships = data.links ?? data.relations ?? data.relationships ?? [];
  const degree = new Map<string, number>();
  const nodeIds = new Set(data.nodes.map((node) => String(getNodeId(node))));

  relationships.forEach((link) => {
    const source = String(endpointId(link.source, getNodeId));
    const target = String(endpointId(link.target, getNodeId));
    if (!nodeIds.has(source) || !nodeIds.has(target)) return;
    degree.set(source, (degree.get(source) ?? 0) + 1);
    degree.set(target, (degree.get(target) ?? 0) + 1);
  });

  const labelIds = new Set(
    showLabels
      ? [...data.nodes]
          .sort((a, b) => (degree.get(String(getNodeId(b))) ?? 0) - (degree.get(String(getNodeId(a))) ?? 0))
          .slice(0, Math.max(0, maxVisibleLabels))
          .map((node) => String(getNodeId(node)))
      : [],
  );

  const nodes = data.nodes.map((node) => {
    const id = getNodeId(node);
    return {
      ...node,
      [INTERNAL_NODE_ID]: id,
      __source: node,
      __degree: degree.get(String(id)) ?? 0,
      __showLabel: labelIds.has(String(id)),
    } as InternalNode<Node>;
  });

  const links = relationships.flatMap((link) => {
    const source = endpointId(link.source, getNodeId);
    const target = endpointId(link.target, getNodeId);
    if (!nodeIds.has(String(source)) || !nodeIds.has(String(target))) return [];
    return [{ ...link, source, target, __source: link } as InternalLink<Node, Link>];
  });

  const focusRadius = layout === 'radial'
    ? applyRadialLayout(
        nodes,
        links,
        (node) => node[INTERNAL_NODE_ID],
        (link) => endpointKey(link.source),
        (link) => endpointKey(link.target),
      )
    : 0;

  return { nodes, links, focusRadius };
}

function endpointKey<Node extends KnowledgeGraph3DNode>(
  endpoint: KnowledgeGraph3DNodeId | InternalNode<Node> | undefined,
): string {
  if (endpoint && typeof endpoint === 'object') return String(endpoint[INTERNAL_NODE_ID]);
  return String(endpoint ?? '');
}

function ZoomInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M10.5 7.5v6M7.5 10.5h6" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M7.5 10.5h6" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function KnowledgeGraph3D<
  Node extends KnowledgeGraph3DNode = KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node> = KnowledgeGraph3DLink<Node>,
>({
  ref,
  data,
  className,
  style,
  ariaLabel = '知识图谱 3D 视图',
  backgroundColor = 'rgba(0,0,0,0)',
  controlType = 'orbit',
  layout = 'radial',
  initialCameraPosition = DEFAULT_CAMERA,
  autoFit = true,
  autoFitDuration = 600,
  fitPadding = 64,
  showControls = true,
  showLinkArrows = true,
  showLabels = true,
  maxVisibleLabels = 120,
  showTooltip = true,
  emptyContent = '暂无图谱数据',
  selectable = true,
  selectedNodeId,
  defaultSelectedNodeId = null,
  focusOnNodeClick = true,
  dimUnrelatedOnSelect = true,
  enableNodeDrag = true,
  enableNavigationControls = true,
  nodeId = defaultNodeId as (node: Node) => KnowledgeGraph3DNodeId,
  nodeLabel = defaultNodeLabel as (node: Node) => string,
  nodeSubLabel = defaultNodeSubLabel as (node: Node) => string,
  nodeColor,
  nodeRadius,
  nodeShape,
  nodeVisibility,
  nodeThreeObject,
  linkLabel = defaultLinkLabel as (link: Link) => string,
  linkColor,
  linkWidth,
  linkVisibility,
  linkDistance,
  renderTooltip,
  renderLinkTooltip,
  onNodeClick,
  onNodeHover,
  onLinkClick,
  onLinkHover,
  onBackgroundClick,
  onSelectionChange,
  onReady,
}: KnowledgeGraph3DProps<Node, Link>) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<GraphInstance<Node, Link> | null>(null);
  const graphDataRef = useRef<InternalGraphData<Node, Link>>({ nodes: [], links: [], focusRadius: 0 });
  const updateHighlightRef = useRef<() => void>(() => undefined);
  const fitInitialViewRef = useRef<() => void>(() => undefined);
  const fitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipFrameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveredNodeIdRef = useRef<string | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<KnowledgeGraph3DNodeId | null>(
    defaultSelectedNodeId,
  );
  const effectiveSelectedIdRef = useRef<string | null>(
    asKey(selectedNodeId === undefined ? defaultSelectedNodeId : selectedNodeId),
  );
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const configRef = useRef({
    backgroundColor,
    initialCameraPosition,
    layout,
    autoFit,
    autoFitDuration,
    fitPadding,
    showLinkArrows,
    showLabels,
    maxVisibleLabels,
    showTooltip,
    selectable,
    selectedNodeId,
    focusOnNodeClick,
    dimUnrelatedOnSelect,
    enableNodeDrag,
    enableNavigationControls,
    nodeId,
    nodeLabel,
    nodeSubLabel,
    nodeColor,
    nodeRadius,
    nodeShape,
    nodeVisibility,
    nodeThreeObject,
    linkLabel,
    linkColor,
    linkWidth,
    linkVisibility,
    linkDistance,
    renderTooltip,
    renderLinkTooltip,
    onNodeClick,
    onNodeHover,
    onLinkClick,
    onLinkHover,
    onBackgroundClick,
    onSelectionChange,
    onReady,
  });
  configRef.current = {
    backgroundColor,
    initialCameraPosition,
    layout,
    autoFit,
    autoFitDuration,
    fitPadding,
    showLinkArrows,
    showLabels,
    maxVisibleLabels,
    showTooltip,
    selectable,
    selectedNodeId,
    focusOnNodeClick,
    dimUnrelatedOnSelect,
    enableNodeDrag,
    enableNavigationControls,
    nodeId,
    nodeLabel,
    nodeSubLabel,
    nodeColor,
    nodeRadius,
    nodeShape,
    nodeVisibility,
    nodeThreeObject,
    linkLabel,
    linkColor,
    linkWidth,
    linkVisibility,
    linkDistance,
    renderTooltip,
    renderLinkTooltip,
    onNodeClick,
    onNodeHover,
    onLinkClick,
    onLinkHover,
    onBackgroundClick,
    onSelectionChange,
    onReady,
  };

  const focusActionRef = useRef<
    (
      nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId,
      options?: KnowledgeGraph3DFocusOptions,
    ) => boolean
  >(
    (_nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId, _options?: KnowledgeGraph3DFocusOptions) => false,
  );
  const selectActionRef = useRef<
    (
      nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId | null,
      options?: KnowledgeGraph3DSelectOptions,
    ) => boolean
  >(
    (
      _nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId | null,
      _options?: KnowledgeGraph3DSelectOptions,
    ) => false,
  );
  const clearSelectionRef = useRef<() => void>(() => undefined);

  const handle = useMemo<KnowledgeGraph3DHandle>(
    () => ({
      fitToView: (duration, padding) => {
        graphRef.current?.zoomToFit(
          duration ?? configRef.current.autoFitDuration,
          padding ?? configRef.current.fitPadding,
        );
      },
      zoomIn: () => {
        const graph = graphRef.current;
        if (!graph) return;
        const camera = graph.camera() as THREE.PerspectiveCamera;
        const controls = graph.controls() as { target?: THREE.Vector3 };
        const target = controls.target?.clone() ?? new THREE.Vector3();
        const position = camera.position.clone();
        const offset = position.sub(target).multiplyScalar(1 / ZOOM_FACTOR);
        graph.cameraPosition(target.clone().add(offset), target, 180);
      },
      zoomOut: () => {
        const graph = graphRef.current;
        if (!graph) return;
        const camera = graph.camera() as THREE.PerspectiveCamera;
        const controls = graph.controls() as { target?: THREE.Vector3 };
        const target = controls.target?.clone() ?? new THREE.Vector3();
        const position = camera.position.clone();
        const offset = position.sub(target).multiplyScalar(ZOOM_FACTOR);
        graph.cameraPosition(target.clone().add(offset), target, 180);
      },
      focusNode: (nodeOrId, options) => focusActionRef.current(nodeOrId, options),
      selectNode: (nodeOrId, options) => selectActionRef.current(nodeOrId, options),
      clearSelection: () => clearSelectionRef.current(),
      pause: () => {
        graphRef.current?.pauseAnimation();
      },
      resume: () => {
        graphRef.current?.resumeAnimation();
      },
    }),
    [],
  );
  useImperativeHandle(ref, () => handle, [handle]);

  const findInternalNode = (nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId) => {
    const id =
      typeof nodeOrId === 'object'
        ? configRef.current.nodeId(nodeOrId as Node)
        : nodeOrId;
    return (
      graphDataRef.current.nodes.find((node) => String(node[INTERNAL_NODE_ID]) === String(id)) ?? null
    );
  };

  focusActionRef.current = (nodeOrId, options) => {
    const graph = graphRef.current;
    const node = findInternalNode(nodeOrId);
    if (!graph || !node || !Number.isFinite(node.x) || !Number.isFinite(node.y) || !Number.isFinite(node.z)) {
      return false;
    }

    const lookAt = new THREE.Vector3(node.x, node.y, node.z);
    const camera = graph.camera() as THREE.PerspectiveCamera;
    const direction = camera.position.clone().sub(lookAt);
    if (direction.lengthSq() < 0.0001) direction.set(0, 0, 1);
    direction.normalize().multiplyScalar(options?.distance ?? 180);
    graph.cameraPosition(lookAt.clone().add(direction), lookAt, options?.duration ?? 700);
    return true;
  };

  const commitSelection = (node: InternalNode<Node> | null) => {
    const config = configRef.current;
    if (config.selectedNodeId === undefined) {
      const nextId = node?.[INTERNAL_NODE_ID] ?? null;
      effectiveSelectedIdRef.current = asKey(nextId);
      setInternalSelectedId(nextId);
    } else {
      effectiveSelectedIdRef.current = asKey(config.selectedNodeId);
    }
    config.onSelectionChange?.(node?.__source ?? null);
    updateHighlightRef.current();
  };

  clearSelectionRef.current = () => commitSelection(null);
  selectActionRef.current = (nodeOrId, options) => {
    if (nodeOrId == null) {
      commitSelection(null);
      return true;
    }
    const node = findInternalNode(nodeOrId);
    if (!node) return false;
    commitSelection(node);
    if (options?.focus) focusActionRef.current(node.__source, options);
    return true;
  };

  const createNodeObject = (node: InternalNode<Node>) => {
    const config = configRef.current;
    const raw = node.__source;
    const color = valueOf(config.nodeColor, raw, defaultNodeColor(raw));
    const radius = Math.max(1, valueOf(config.nodeRadius, raw, defaultNodeRadius(raw, node.__degree)));
    const shape = valueOf(config.nodeShape, raw, defaultNodeShape(raw));
    const group = new THREE.Group();
    group.userData.baseColor = color;
    group.userData.radius = radius;

    const customObject = config.nodeThreeObject?.(raw);
    if (customObject) {
      group.add(customObject);
    } else {
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.25,
        metalness: 0.08,
        roughness: 0.48,
        transparent: true,
      });
      const body = new THREE.Mesh(shape === 'diamond' ? diamondGeometry : sphereGeometry, material);
      body.scale.setScalar(radius);
      body.userData.isKnowledgeGraphBody = true;
      group.add(body);
    }

    if (node.__showLabel) {
      const text = truncateLabel(config.nodeLabel(raw));
      const label = new SpriteText(text, Math.max(5.5, Math.min(8, radius * 0.9)), '#e2e8f0');
      label.fontFace = 'Inter, Noto Sans SC, PingFang SC, sans-serif';
      label.fontWeight = '500';
      label.position.set(0, -(radius + 7), 0);
      label.material.depthWrite = false;
      label.userData.isKnowledgeGraphLabel = true;
      group.add(label);
    }

    node.__group = group;
    return group;
  };

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    container.replaceChildren();
    const graph = new ForceGraph3D(container, { controlType }) as unknown as GraphInstance<Node, Link>;
    graphRef.current = graph;
    let shouldAutoFit = true;

    const fitInitialView = () => {
      const config = configRef.current;
      const radius = graphDataRef.current.focusRadius;
      if (!radius) {
        graph.zoomToFit(config.autoFitDuration, config.fitPadding);
        return;
      }
      const camera = graph.camera() as THREE.PerspectiveCamera;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const aspect = camera.aspect > 0 ? camera.aspect : 1;
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
      const distance = (radius / Math.tan(Math.min(verticalFov, horizontalFov) / 2)) * 1.2;
      const direction = new THREE.Vector3(
        config.initialCameraPosition.x,
        config.initialCameraPosition.y,
        config.initialCameraPosition.z,
      ).normalize();
      graph.cameraPosition(direction.multiplyScalar(distance), { x: 0, y: 0, z: 0 }, config.autoFitDuration);
    };
    fitInitialViewRef.current = fitInitialView;

    const updateHighlight = () => {
      const config = configRef.current;
      const activeId = hoveredNodeIdRef.current ?? effectiveSelectedIdRef.current;
      const neighbors = new Set<string>();
      if (activeId) {
        graphDataRef.current.links.forEach((link) => {
          const source = endpointKey(link.source);
          const target = endpointKey(link.target);
          if (source === activeId) neighbors.add(target);
          if (target === activeId) neighbors.add(source);
        });
      }

      graphDataRef.current.nodes.forEach((node) => {
        const group = node.__group;
        if (!group) return;
        const id = String(node[INTERNAL_NODE_ID]);
        const current = id === activeId;
        const neighbor = neighbors.has(id);
        const dimmed = Boolean(activeId && config.dimUnrelatedOnSelect && !current && !neighbor);
        group.scale.setScalar(current ? 1.14 : neighbor ? 1.05 : 1);
        group.traverse((object) => {
          const candidate = object as THREE.Mesh & { material?: THREE.Material };
          const material = candidate.material;
          if (!material) return;
          material.transparent = true;
          material.opacity = dimmed ? 0.18 : 1;
          if (material instanceof THREE.MeshStandardMaterial) {
            material.emissiveIntensity = current ? 0.9 : neighbor ? 0.52 : 0.25;
          }
        });
      });

      // 重新设置颜色 accessor 只会原地更新连线/箭头材质。不能在 hover 中调用
      // refresh() 或重设 linkWidth：前者会 flush 全部 Three.js 对象，后者会清空
      // linkDataMapper；两者都会让当前 raycast 命中对象消失并形成 hover 抖动循环。
      graph
        .linkColor(graph.linkColor())
        .linkDirectionalArrowColor(graph.linkDirectionalArrowColor());
    };
    updateHighlightRef.current = updateHighlight;

    graph
      .nodeId(INTERNAL_NODE_ID)
      .linkSource('source')
      .linkTarget('target')
      .backgroundColor(configRef.current.backgroundColor)
      .showNavInfo(false)
      .enableNodeDrag(configRef.current.enableNodeDrag)
      .enableNavigationControls(configRef.current.enableNavigationControls)
      .nodeLabel(() => '')
      .linkLabel(() => '')
      .nodeThreeObject(createNodeObject)
      .nodeThreeObjectExtend(false)
      .nodeVisibility((node) => configRef.current.nodeVisibility?.(node.__source) ?? true)
      .linkVisibility((link) => configRef.current.linkVisibility?.(link.__source) ?? true)
      .linkOpacity(0.72)
      .linkColor((link) => {
        const activeId = hoveredNodeIdRef.current ?? effectiveSelectedIdRef.current;
        if (activeId) {
          const active = endpointKey(link.source) === activeId || endpointKey(link.target) === activeId;
          return active ? ACTIVE_LINK_COLOR : DIMMED_LINK_COLOR;
        }
        return valueOf(configRef.current.linkColor, link.__source, DEFAULT_LINK_COLOR);
      })
      .linkWidth((link) => Math.max(0, valueOf(configRef.current.linkWidth, link.__source, 0.7)))
      .linkDirectionalArrowLength((link) => {
        if (!configRef.current.showLinkArrows) return 0;
        return hoveredNodeIdRef.current &&
          (endpointKey(link.source) === hoveredNodeIdRef.current ||
            endpointKey(link.target) === hoveredNodeIdRef.current)
          ? 6
          : 4;
      })
      .linkDirectionalArrowColor((link) => {
        const activeId = hoveredNodeIdRef.current ?? effectiveSelectedIdRef.current;
        const active = activeId &&
          (endpointKey(link.source) === activeId || endpointKey(link.target) === activeId);
        return active
          ? ACTIVE_LINK_COLOR
          : valueOf(configRef.current.linkColor, link.__source, DEFAULT_LINK_COLOR);
      })
      .linkDirectionalArrowRelPos(0.76)
      .linkDirectionalArrowResolution(5)
      .d3VelocityDecay(0.34)
      .warmupTicks(40)
      .cooldownTicks(160)
      .cooldownTime(5000)
      .cameraPosition(configRef.current.initialCameraPosition)
      .onNodeClick((node, event) => {
        const config = configRef.current;
        if (config.selectable) commitSelection(node);
        if (config.focusOnNodeClick) focusActionRef.current(node.__source);
        config.onNodeClick?.(node.__source, event);
      })
      .onNodeHover((node, previousNode) => {
        hoveredNodeIdRef.current = node ? String(node[INTERNAL_NODE_ID]) : null;
        updateHighlight();
        const config = configRef.current;
        config.onNodeHover?.(node?.__source ?? null, previousNode?.__source ?? null);
        if (!config.showTooltip || !node) {
          setTooltip(null);
          return;
        }
        const raw = node.__source;
        const content = config.renderTooltip?.(raw) ?? (
          <>
            <div className={styles.tooltipTitle}>{config.nodeLabel(raw)}</div>
            {config.nodeSubLabel(raw) && (
              <div className={styles.tooltipMeta}>{config.nodeSubLabel(raw)}</div>
            )}
          </>
        );
        setTooltip({ content, ...pointerRef.current });
      })
      .onLinkClick((link, event) => {
        configRef.current.onLinkClick?.(link.__source, event);
      })
      .onLinkHover((link, previousLink) => {
        const config = configRef.current;
        config.onLinkHover?.(link?.__source ?? null, previousLink?.__source ?? null);
        if (!config.showTooltip || !link || hoveredNodeIdRef.current) {
          if (!hoveredNodeIdRef.current) setTooltip(null);
          return;
        }
        const raw = link.__source;
        const content = config.renderLinkTooltip?.(raw) ?? (
          <>
            <div className={styles.tooltipTitle}>{config.linkLabel(raw) || '关系'}</div>
            <div className={styles.tooltipMeta}>
              {endpointKey(link.source)} → {endpointKey(link.target)}
            </div>
          </>
        );
        setTooltip({ content, ...pointerRef.current });
      })
      .onBackgroundClick((event) => {
        setTooltip(null);
        hoveredNodeIdRef.current = null;
        if (configRef.current.selectable) commitSelection(null);
        configRef.current.onBackgroundClick?.(event);
      })
      .onEngineStop(() => {
        if (shouldAutoFit && configRef.current.autoFit && graphDataRef.current.nodes.length) {
          fitInitialView();
          shouldAutoFit = false;
        }
      });

    const syncSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width > 0 && height > 0) graph.width(width).height(height);
    };
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);
    syncSize();

    graph.graphData(graphDataRef.current);
    configRef.current.onReady?.(handle);

    return () => {
      resizeObserver.disconnect();
      if (fitTimerRef.current) clearTimeout(fitTimerRef.current);
      if (tooltipFrameRef.current != null) cancelAnimationFrame(tooltipFrameRef.current);
      updateHighlightRef.current = () => undefined;
      fitInitialViewRef.current = () => undefined;
      graph.pauseAnimation();
      graph._destructor();
      container.replaceChildren();
      graphRef.current = null;
    };
  }, [controlType, handle]);

  useEffect(() => {
    const config = configRef.current;
    const internalData = buildInternalData(data, config.nodeId, maxVisibleLabels, showLabels, layout);
    graphDataRef.current = internalData;

    const selected = effectiveSelectedIdRef.current;
    if (selected && !internalData.nodes.some((node) => String(node[INTERNAL_NODE_ID]) === selected)) {
      effectiveSelectedIdRef.current = null;
      if (selectedNodeId === undefined) setInternalSelectedId(null);
    }

    const graph = graphRef.current;
    if (!graph) return;
    graph
      .cooldownTicks(layout === 'radial' ? 2 : internalData.nodes.length > 250 ? 110 : 160)
      .graphData(internalData);

    const chargeForce = graph.d3Force('charge');
    chargeForce?.strength?.(internalData.nodes.length > 250 ? -75 : -110);
    const linkForce = graph.d3Force('link');
    linkForce?.distance?.((link: InternalLink<Node, Link>) =>
      Math.max(1, valueOf(config.linkDistance, link.__source, internalData.nodes.length > 250 ? 52 : 72)),
    );

    updateHighlightRef.current();
    if (fitTimerRef.current) clearTimeout(fitTimerRef.current);
    if (config.autoFit && internalData.nodes.length) {
      fitTimerRef.current = setTimeout(() => {
        fitInitialViewRef.current();
      }, layout === 'radial' ? 180 : internalData.nodes.length > 250 ? 900 : 450);
    }
  }, [data, layout, maxVisibleLabels, nodeId, showLabels]);

  useEffect(() => {
    effectiveSelectedIdRef.current = asKey(
      selectedNodeId === undefined ? internalSelectedId : selectedNodeId,
    );
    updateHighlightRef.current();
  }, [internalSelectedId, selectedNodeId]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    graph
      .backgroundColor(backgroundColor)
      .enableNodeDrag(enableNodeDrag)
      .enableNavigationControls(enableNavigationControls)
      .nodeThreeObject(createNodeObject)
      .nodeVisibility((node) => nodeVisibility?.(node.__source) ?? true)
      .linkVisibility((link) => linkVisibility?.(link.__source) ?? true)
      .linkDirectionalArrowLength(showLinkArrows ? 4 : 0)
      .refresh();
    updateHighlightRef.current();
  }, [
    backgroundColor,
    enableNavigationControls,
    enableNodeDrag,
    linkVisibility,
    nodeColor,
    nodeLabel,
    nodeRadius,
    nodeShape,
    nodeSubLabel,
    nodeThreeObject,
    nodeVisibility,
    showLinkArrows,
  ]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: Math.max(4, Math.min(event.clientX - rect.left, rect.width - 260)),
      y: Math.max(4, Math.min(event.clientY - rect.top, rect.height - 90)),
    };
    if (!tooltip || tooltipFrameRef.current != null) return;
    tooltipFrameRef.current = requestAnimationFrame(() => {
      tooltipFrameRef.current = null;
      setTooltip((current) => (current ? { ...current, ...pointerRef.current } : null));
    });
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      handle.zoomIn();
    } else if (event.key === '-') {
      event.preventDefault();
      handle.zoomOut();
    } else if (event.key === '0') {
      event.preventDefault();
      handle.fitToView();
    } else if (event.key === 'Escape') {
      handle.clearSelection();
    }
  };

  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      style={style}
      role="application"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setTooltip(null);
        hoveredNodeIdRef.current = null;
        updateHighlightRef.current();
      }}
      onKeyDown={handleKeyDown}
    >
      <div ref={canvasRef} className={styles.canvas} />

      {showControls && data.nodes.length > 0 && (
        <div className={styles.controls} aria-label="视图控制">
          <button className={styles.controlButton} type="button" title="放大" aria-label="放大" onClick={handle.zoomIn}>
            <ZoomInIcon />
          </button>
          <button className={styles.controlButton} type="button" title="缩小" aria-label="缩小" onClick={handle.zoomOut}>
            <ZoomOutIcon />
          </button>
          <button
            className={styles.controlButton}
            type="button"
            title="适应画布"
            aria-label="适应画布"
            onClick={() => handle.fitToView()}
          >
            <FitIcon />
          </button>
        </div>
      )}

      {data.nodes.length === 0 && <div className={styles.empty}>{emptyContent}</div>}
      {showTooltip && tooltip && (
        <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }} role="tooltip">
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
