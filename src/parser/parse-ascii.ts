const parseVectors = (stringArray: string[]) =>
  stringArray.map((vector) =>
    vector
      .trim()
      .split(/\s+/)
      .map((vectorElement) => Number(vectorElement)),
  );

export const parseASCII = (fileContent: Buffer) => {
  const decoder = new TextDecoder('utf-8');
  const utf8Content = decoder.decode(fileContent);
  const facetRegex = /facet\s+normal(\s+\S+){3}\s*outer\s+loop\s*(.+\n){3}\s*endloop\s*endfacet/gi;
  const matchedFacets = utf8Content.match(facetRegex);
  const vectorRegex = /(\+*\-*\d+\.?\d*E*\+*\-*\d*\s{0,2}){3}/gi;

  const facets = [];
  if (matchedFacets !== null) {
    for (const facet of matchedFacets) {
      const vectors = facet.match(vectorRegex);

      if (vectors !== null) {
        const [normal, ...vertices] = parseVectors(vectors);
        facets.push({
          normal,
          vertices,
        });
      }
    }
  }

  return facets;
};
