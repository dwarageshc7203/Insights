import { ComponentData } from '../types/component';
import { EdgeData } from '../types/edge';
import { MarkerType } from '@xyflow/react';

const SHAPE_PALETTE = [
  'rgba(255, 49, 49, 0.6)',
  'rgba(255, 131, 0, 0.6)',
  'rgba(255, 255, 0, 0.6)',
  'rgba(57, 255, 20, 0.6)',
  'rgba(0, 150, 255, 0.6)',
];

export function componentTypeToNodeType(componentType: string | undefined) {
  switch (componentType) {
    case 'TEXT':
      return 'text';
    case 'IMAGE':
      return 'image';
    case 'NODE':
      return 'shape';
    default:
      return 'text';
  }
}

export function resolveShapeColor(color: string | undefined, id: string | number) {
  if (!color || color === '#ffffff' || color === '#fff') {
    const index = Math.abs(Number(id) || 0) % SHAPE_PALETTE.length;
    return SHAPE_PALETTE[index];
  }
  return color;
}

export function getShapeVariant(id: string | number) {
  const variants = ['square', 'oval', 'rhombus'];
  return variants[Math.abs(Number(id) || 0) % variants.length];
}

export function mapComponentToNode(component: ComponentData) {
  const nodeType = componentTypeToNodeType(component.type);

  const defaultWidth = nodeType === 'text' ? 200 : nodeType === 'image' ? 260 : 140;
  const defaultHeight = nodeType === 'text' ? 80 : nodeType === 'image' ? 200 : 140;

  const w = (component.width && Number(component.width) > 0) ? Number(component.width) : defaultWidth;
  const h = (component.height && Number(component.height) > 0) ? Number(component.height) : defaultHeight;

  return {
    id: String(component.componentId),
    position: { x: component.positionX, y: component.positionY },
    type: nodeType,
    style: nodeType === 'text' ? {} : {
      width: w,
      height: h,
    },
    data: {
      label: component.textContent || 'New Component',
      textContent: component.textContent,
      type: component.type,
      imgUrl: component.imgUrl,
      color: component.color,
      width: component.width,
      height: component.height,
      shapeType: component.shapeType,
    },
  };
}

export function mapEdgeToFlowEdge(edge: EdgeData) {
  return {
    id: String(edge.edgeId),
    source: String(edge.sourceId),
    target: String(edge.targetId),
    sourceHandle: edge.sourceHandle || null,
    targetHandle: edge.targetHandle || null,
    type: 'editable',
    selectable: true,
    focusable: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: edge.edgeName || '',
    labelStyle: { fontSize: 12, fill: '#333' },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
    labelShow: true,
  };
}
