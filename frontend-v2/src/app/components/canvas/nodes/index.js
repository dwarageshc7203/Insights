import TextNode from './TextNode';
import ImageNode from './ImageNode';
import ShapeNode from './ShapeNode';

export const nodeTypes = {
  text: TextNode,
  image: ImageNode,
  shape: ShapeNode,
};

console.log("NODE TYPES", nodeTypes);

export { mapComponentToNode, componentTypeToNodeType } from './nodeUtils';
