/* src/services/aiPayloadBuilder.js */
/**
 * Convert React Flow node and edge data into the format expected by the backend AI analysis API.
 * Returns an object matching the AnalyzeRequest DTO:
 *   { canvasId, components: [...], edges: [...] }
 */
export function buildAnalyzePayload(canvasId, nodes, edges) {
  // Map nodes to ComponentResponse shape
  const components = nodes.map((node) => {
    const { id, type, data, position, width, height } = node;
    return {
      componentId: Number(id), // assuming numeric ids
      componentName: data?.label || `Component ${id}`,
      type: type || '',
      shapeType: data?.shapeType || null,
      textContent: data?.textContent || '',
      imgUrl: data?.imgUrl || '',
      color: data?.color || '#000000',
      positionX: position?.x ?? 0,
      positionY: position?.y ?? 0,
      width: width ?? 0,
      height: height ?? 0,
    };
  });

  // Map edges to EdgeResponse shape
  const edgeArray = edges.map((edge) => {
    const { id, source, target, label } = edge;
    return {
      edgeId: Number(id),
      edgeName: label || `Edge ${id}`,
      color: edge?.color || '#000000',
      sourceId: Number(source),
      targetId: Number(target),
    };
  });

  return {
    canvasId: Number(canvasId),
    components,
    edges: edgeArray,
  };
}
