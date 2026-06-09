import TextNode from './TextNode';
import ImageNode from './ImageNode';
import ShapeNode from './ShapeNode';

export const nodeTypes = {
  text: TextNode,
  image: ImageNode,
  shape: ShapeNode,
};

export { mapComponentToNode, componentTypeToNodeType } from './nodeUtils';
