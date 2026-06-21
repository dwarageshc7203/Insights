import {nodeTypes} from "./index.js";

const SHAPE_PALETTE = [
  'rgba(255, 49, 49, 0.6)',
  'rgba(255, 131, 0, 0.6)',
  'rgba(255, 255, 0, 0.6)',
  'rgba(57, 255, 20, 0.6)',
  'rgba(0, 150, 255, 0.6)',
];

export function componentTypeToNodeType(componentType) {
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

export function resolveShapeColor(color, id) {
  if (!color || color === '#ffffff' || color === '#fff') {
    const index = Math.abs(parseInt(id, 10) || 0) % SHAPE_PALETTE.length;
    return SHAPE_PALETTE[index];
  }
  return color;
}

export function getShapeVariant(id) {
  const variants = ['square', 'oval', 'rhombus'];
  return variants[Math.abs(parseInt(id, 10) || 0) % variants.length];
}

export function mapComponentToNode(component) {
  const nodeType = componentTypeToNodeType(component.type);

  const defaultWidth = nodeType === 'text' ? 200 : nodeType === 'image' ? 260 : 140;
  const defaultHeight = nodeType === 'text' ? 80 : nodeType === 'image' ? 200 : 140;

  const w = component.width > 0 ? component.width : defaultWidth;
  const h = component.height > 0 ? component.height : defaultHeight;

  console.log(
      "MAPPING",
      component.componentId,
      "backend:",
      component.type,
      "reactflow:",
      nodeType
  );
  return {
    id: String(component.componentId),
    position: { x: component.positionX, y: component.positionY },
    type: nodeType,
    style: nodeType === 'text' ? {} : {
      width: w,
      height: h,
    },
    data: {
      label: component.textContent || component.componentName,
      textContent: component.textContent,
      componentName: component.componentName,
      componentType: component.componentType,
      imgUrl: component.imgUrl,
      color: component.color,
      width: component.width,
      height: component.height,
      shapeType: component.shapeType,
    },
  };
}
