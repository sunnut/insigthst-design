import type { KnowledgeGraph3DNodeId } from './types';

type LayoutNode = {
  x?: number;
  y?: number;
  z?: number;
  fx?: number;
  fy?: number;
  fz?: number;
};

type Vector3 = { x: number; y: number; z: number };

type Component = {
  levels: string[][];
  parentById: Map<string, string>;
  size: number;
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const LEVEL_GAP = 58;
const MIN_SPACING = 38;
const MAX_CONE = 1.05;
const VISIBLE_NODE_BUDGET = 50;

function cross(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function normalize(value: Vector3, fallback: Vector3): Vector3 {
  const length = Math.hypot(value.x, value.y, value.z);
  return length > 0.000001
    ? { x: value.x / length, y: value.y / length, z: value.z / length }
    : fallback;
}

function fibonacciDirection(index: number, count: number): Vector3 {
  const y = count <= 1 ? 0 : 1 - (2 * (index + 0.5)) / count;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * index;
  return { x: radius * Math.cos(theta), y, z: radius * Math.sin(theta) };
}

/**
 * Deterministic component-aware radial layout. Coordinates are fixed so large graphs do not
 * spend seconds converging or let disconnected components drift infinitely far apart.
 * Returns a suggested radius for the initial camera; `0` means fit the whole graph.
 */
export function applyRadialLayout<Node extends LayoutNode, Link>(
  nodes: Node[],
  links: Link[],
  getNodeId: (node: Node) => KnowledgeGraph3DNodeId,
  getSourceId: (link: Link) => KnowledgeGraph3DNodeId,
  getTargetId: (link: Link) => KnowledgeGraph3DNodeId,
): number {
  if (!nodes.length) return 0;

  const adjacency = new Map<string, Set<string>>();
  const degree = new Map<string, number>();
  const nodeById = new Map<string, Node>();
  nodes.forEach((node) => {
    const id = String(getNodeId(node));
    adjacency.set(id, new Set());
    degree.set(id, 0);
    nodeById.set(id, node);
  });
  links.forEach((link) => {
    const source = String(getSourceId(link));
    const target = String(getTargetId(link));
    if (source === target || !adjacency.has(source) || !adjacency.has(target)) return;
    adjacency.get(source)?.add(target);
    adjacency.get(target)?.add(source);
    degree.set(source, (degree.get(source) ?? 0) + 1);
    degree.set(target, (degree.get(target) ?? 0) + 1);
  });

  const seeds = [...nodes].sort(
    (a, b) => (degree.get(String(getNodeId(b))) ?? 0) - (degree.get(String(getNodeId(a))) ?? 0),
  );
  const visited = new Set<string>();
  const components: Component[] = [];

  seeds.forEach((seed) => {
    const seedId = String(getNodeId(seed));
    if (visited.has(seedId)) return;
    visited.add(seedId);
    const levels: string[][] = [[seedId]];
    const parentById = new Map<string, string>();
    let size = 1;
    let frontier = [seedId];

    while (frontier.length) {
      const next: string[] = [];
      frontier.forEach((current) => {
        const neighbors = [...(adjacency.get(current) ?? [])]
          .filter((id) => !visited.has(id))
          .sort((a, b) => (degree.get(b) ?? 0) - (degree.get(a) ?? 0));
        neighbors.forEach((id) => {
          visited.add(id);
          parentById.set(id, current);
          next.push(id);
        });
      });
      if (next.length) {
        levels.push(next);
        size += next.length;
      }
      frontier = next;
    }
    components.push({ levels, parentById, size });
  });
  components.sort((a, b) => b.size - a.size);

  const directionById = new Map<string, Vector3>();
  const setPosition = (node: Node, position: Vector3) => {
    node.x = position.x;
    node.y = position.y;
    node.z = position.z;
    node.fx = position.x;
    node.fy = position.y;
    node.fz = position.z;
  };

  const layoutComponent = (component: Component, origin: Vector3) => {
    const shells = [0];
    const rootId = component.levels[0]?.[0];
    if (!rootId) return shells;
    const root = nodeById.get(rootId);
    if (root) setPosition(root, origin);

    for (let level = 1; level < component.levels.length; level += 1) {
      const ids = component.levels[level] ?? [];
      const shellRadius = Math.max(
        (shells[level - 1] ?? 0) + LEVEL_GAP,
        MIN_SPACING * Math.sqrt(ids.length) * 0.45,
      );
      shells.push(shellRadius);

      if (level === 1) {
        ids.forEach((id, index) => {
          const direction = fibonacciDirection(index, ids.length);
          directionById.set(id, direction);
          const node = nodeById.get(id);
          if (node) {
            setPosition(node, {
              x: origin.x + direction.x * shellRadius,
              y: origin.y + direction.y * shellRadius,
              z: origin.z + direction.z * shellRadius,
            });
          }
        });
        continue;
      }

      const childrenByParent = new Map<string, string[]>();
      ids.forEach((id) => {
        const parentId = component.parentById.get(id) ?? rootId;
        const children = childrenByParent.get(parentId) ?? [];
        children.push(id);
        childrenByParent.set(parentId, children);
      });

      let parentIndex = 0;
      childrenByParent.forEach((children, parentId) => {
        const parentDirection = normalize(
          directionById.get(parentId) ?? { x: 0, y: 1, z: 0 },
          { x: 0, y: 1, z: 0 },
        );
        const reference = Math.abs(parentDirection.y) < 0.9
          ? { x: 0, y: 1, z: 0 }
          : { x: 1, y: 0, z: 0 };
        const u = normalize(cross(parentDirection, reference), { x: 1, y: 0, z: 0 });
        const v = cross(parentDirection, u);
        const cone = Math.min(MAX_CONE, 0.3 + 0.24 * Math.sqrt(children.length));

        children.forEach((id, childIndex) => {
          const polar = children.length === 1 ? 0 : cone * Math.sqrt((childIndex + 0.5) / children.length);
          const azimuth = GOLDEN_ANGLE * childIndex + parentIndex * 1.7;
          const sinPolar = Math.sin(polar);
          const cosPolar = Math.cos(polar);
          const direction = {
            x: parentDirection.x * cosPolar + (u.x * Math.cos(azimuth) + v.x * Math.sin(azimuth)) * sinPolar,
            y: parentDirection.y * cosPolar + (u.y * Math.cos(azimuth) + v.y * Math.sin(azimuth)) * sinPolar,
            z: parentDirection.z * cosPolar + (u.z * Math.cos(azimuth) + v.z * Math.sin(azimuth)) * sinPolar,
          };
          directionById.set(id, direction);
          const node = nodeById.get(id);
          if (node) {
            setPosition(node, {
              x: origin.x + direction.x * shellRadius,
              y: origin.y + direction.y * shellRadius,
              z: origin.z + direction.z * shellRadius,
            });
          }
        });
        parentIndex += 1;
      });
    }
    return shells;
  };

  const main = components[0];
  if (!main) return 0;
  const mainShells = layoutComponent(main, { x: 0, y: 0, z: 0 });
  const mainRadius = mainShells.at(-1) ?? 0;
  const satellites = components.slice(1);
  if (satellites.length) {
    const satelliteRadius = Math.max(...satellites.map((component) => (component.levels.length - 1) * LEVEL_GAP));
    const ringRadius = mainRadius + satelliteRadius + LEVEL_GAP * 1.5;
    satellites.forEach((component, index) => {
      const direction = fibonacciDirection(index, satellites.length);
      layoutComponent(component, {
        x: direction.x * ringRadius,
        y: direction.y * ringRadius,
        z: direction.z * ringRadius,
      });
    });
  }

  if (nodes.length <= VISIBLE_NODE_BUDGET) {
    const graphRadius = Math.max(
      ...nodes.map((node) => Math.hypot(node.x ?? 0, node.y ?? 0, node.z ?? 0)),
    );
    return graphRadius + LEVEL_GAP * 0.5;
  }
  let visibleCount = main.levels[0]?.length ?? 0;
  let focusLevel = 0;
  for (let level = 1; level < main.levels.length; level += 1) {
    const levelCount = main.levels[level]?.length ?? 0;
    if (level > 1 && visibleCount + levelCount > VISIBLE_NODE_BUDGET) break;
    visibleCount += levelCount;
    focusLevel = level;
  }
  return (mainShells[focusLevel] ?? mainRadius) + LEVEL_GAP * 0.7;
}
