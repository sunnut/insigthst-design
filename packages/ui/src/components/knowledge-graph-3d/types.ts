import type { CSSProperties, ReactNode, Ref } from 'react';
import type { Object3D } from 'three';

export type KnowledgeGraph3DNodeId = string | number;

export interface KnowledgeGraph3DNode {
  id: KnowledgeGraph3DNodeId;
  name?: string;
  type?: string;
  meta_type?: string;
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  [key: string]: unknown;
}

export interface KnowledgeGraph3DLink<
  Node extends KnowledgeGraph3DNode = KnowledgeGraph3DNode,
> {
  id?: KnowledgeGraph3DNodeId;
  source: KnowledgeGraph3DNodeId | Node;
  target: KnowledgeGraph3DNodeId | Node;
  type?: string;
  [key: string]: unknown;
}

/**
 * `links` 是推荐字段；`relations` 和 `relationships` 用于直接接入常见的后端返回结构。
 */
export interface KnowledgeGraph3DData<
  Node extends KnowledgeGraph3DNode = KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node> = KnowledgeGraph3DLink<Node>,
> {
  nodes: readonly Node[];
  links?: readonly Link[];
  relations?: readonly Link[];
  relationships?: readonly Link[];
}

export type KnowledgeGraph3DNodeShape = 'sphere' | 'diamond';
export type KnowledgeGraph3DControlType = 'orbit' | 'trackball' | 'fly';
export type KnowledgeGraph3DLayout = 'radial' | 'force';

export interface KnowledgeGraph3DCameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface KnowledgeGraph3DFocusOptions {
  duration?: number;
  distance?: number;
}

export interface KnowledgeGraph3DSelectOptions extends KnowledgeGraph3DFocusOptions {
  focus?: boolean;
}

export interface KnowledgeGraph3DHandle {
  fitToView: (duration?: number, padding?: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  focusNode: (
    nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId,
    options?: KnowledgeGraph3DFocusOptions,
  ) => boolean;
  selectNode: (
    nodeOrId: KnowledgeGraph3DNode | KnowledgeGraph3DNodeId | null,
    options?: KnowledgeGraph3DSelectOptions,
  ) => boolean;
  clearSelection: () => void;
  pause: () => void;
  resume: () => void;
}

export type KnowledgeGraph3DValueAccessor<Item, Value> = Value | ((item: Item) => Value);

export interface KnowledgeGraph3DProps<
  Node extends KnowledgeGraph3DNode = KnowledgeGraph3DNode,
  Link extends KnowledgeGraph3DLink<Node> = KnowledgeGraph3DLink<Node>,
> {
  /** React 19 ref-as-prop，不需要 forwardRef。 */
  ref?: Ref<KnowledgeGraph3DHandle>;
  data: KnowledgeGraph3DData<Node, Link>;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;

  backgroundColor?: string;
  controlType?: KnowledgeGraph3DControlType;
  /** radial 为确定性分层布局（默认，适合大图）；force 保留自由力仿真。 */
  layout?: KnowledgeGraph3DLayout;
  initialCameraPosition?: KnowledgeGraph3DCameraPosition;
  autoFit?: boolean;
  autoFitDuration?: number;
  fitPadding?: number;
  showControls?: boolean;
  showLinkArrows?: boolean;
  showLabels?: boolean;
  /** 大图只为连接数最高的节点创建文字精灵，避免纹理和 draw call 过多。 */
  maxVisibleLabels?: number;
  showTooltip?: boolean;
  emptyContent?: ReactNode;

  selectable?: boolean;
  selectedNodeId?: KnowledgeGraph3DNodeId | null;
  defaultSelectedNodeId?: KnowledgeGraph3DNodeId | null;
  focusOnNodeClick?: boolean;
  dimUnrelatedOnSelect?: boolean;
  enableNodeDrag?: boolean;
  enableNavigationControls?: boolean;

  nodeId?: (node: Node) => KnowledgeGraph3DNodeId;
  nodeLabel?: (node: Node) => string;
  nodeSubLabel?: (node: Node) => string;
  nodeColor?: KnowledgeGraph3DValueAccessor<Node, string>;
  nodeRadius?: KnowledgeGraph3DValueAccessor<Node, number>;
  nodeShape?: KnowledgeGraph3DValueAccessor<Node, KnowledgeGraph3DNodeShape>;
  nodeVisibility?: (node: Node) => boolean;
  /** 返回 Three.js 对象以完全接管节点主体；外层选中状态与文字标签仍由组件处理。 */
  nodeThreeObject?: (node: Node) => Object3D | null;

  linkLabel?: (link: Link) => string;
  linkColor?: KnowledgeGraph3DValueAccessor<Link, string>;
  linkWidth?: KnowledgeGraph3DValueAccessor<Link, number>;
  linkVisibility?: (link: Link) => boolean;
  linkDistance?: KnowledgeGraph3DValueAccessor<Link, number>;

  renderTooltip?: (node: Node) => ReactNode;
  renderLinkTooltip?: (link: Link) => ReactNode;
  onNodeClick?: (node: Node, event: MouseEvent) => void;
  onNodeHover?: (node: Node | null, previousNode: Node | null) => void;
  onLinkClick?: (link: Link, event: MouseEvent) => void;
  onLinkHover?: (link: Link | null, previousLink: Link | null) => void;
  onBackgroundClick?: (event: MouseEvent) => void;
  onSelectionChange?: (node: Node | null) => void;
  onReady?: (handle: KnowledgeGraph3DHandle) => void;
}
