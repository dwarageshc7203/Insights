export function extractGraphData(nodes, edges) {
  // Build nodes payload
  const nodePayload = nodes.map((n) => {
    const { id, type, data } = n;
    return {
      id,
      type,
      textContent: data?.textContent || '',
      shapeType: data?.shapeType || null,
      // include any other relevant data you may need
    };
  });

  const edgePayload = edges.map((e) => {
    const { id, source, target, label } = e;
    return {
      id,
      source,
      target,
      label: label || ''
    };
  });

  return { nodes: nodePayload, edges: edgePayload };
}
