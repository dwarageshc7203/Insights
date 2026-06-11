const SHAPE_PALETTE = [
  '#e2f048',
  '#8ac97a',
  '#eeb2c6',
  '#fca340',
  '#40bbfc',
  '#f0f048',
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
  const variants = ['circle', 'pill', 'rounded'];
  return variants[Math.abs(parseInt(id, 10) || 0) % variants.length];
}

export function mapComponentToNode(component) {
  return {
    id: String(component.componentId),
    position: { x: component.positionX, y: component.positionY },
    type: componentTypeToNodeType(component.componentType),
    style: {
      width: component.width > 0 ? component.width : undefined,
      height: component.height > 0 ? component.height : undefined,
    },
    data: {
      label: component.textContent || component.componentName,
      textContent: component.textContent,
      componentName: component.componentName,
      componentType: component.componentType,
      imgUrl: component.imgUrl,
      color: component.color,
      width: component.width,
      height: component.height
    },
  };
}
