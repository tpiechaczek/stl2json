/**
 * UINT8[80] – Header
 * UINT32 – Number of triangles
 * foreach triangle
 *   REAL32[3] – Normal vector
 *   REAL32[3] – Vertex 1
 *   REAL32[3] – Vertex 2
 *   REAL32[3] – Vertex 3
 *   UINT16 – Attribute byte count
 * end
 **/
type FacetType = {
  normal: number[];
  vertices: number[][];
};

export const parseBinary = (fileContent: Buffer) => {
  // SKIP the header
  const BYTE_OFFSET = 80;
  const facets: FacetType[] = [];

  const chunksCount = fileContent.readUInt32LE(BYTE_OFFSET);

  for (let i = 0; i < 1000; i++) {
    const facet: FacetType = {
      normal: [],
      vertices: [],
    };

    // 2 - initial, 12 - normal, 3 * 12 - vertices
    const offset = i * 50 + 4;

    facet.normal = [
      fileContent.readFloatLE(BYTE_OFFSET + offset),
      fileContent.readFloatLE(BYTE_OFFSET + offset + 4),
      fileContent.readFloatLE(BYTE_OFFSET + offset + 8),
    ];

    // 3 vertices per face
    for (let j = 1; j < 4; j++) {
      const shift = j * 12;
      facet.vertices.push([
        fileContent.readFloatLE(BYTE_OFFSET + offset + shift),
        fileContent.readFloatLE(BYTE_OFFSET + offset + shift + 4),
        fileContent.readFloatLE(BYTE_OFFSET + offset + shift + 8),
      ]);
    }

    facets.push(facet);
  }
  return facets;
};
