# stl2json

CLI tool for transpiling `.STL` (ASCII and BINARY) file into JSON format.

## Support
### ASCII .stl file
```
solid name
  facet normal ni nj nk
      outer loop
          vertex v1x v1y v1z
          vertex v2x v2y v2z
          vertex v3x v3y v3z
      endloop
  endfacet
  ...
  facet normal nin njn nkn
      outer loop
          vertex v1xn v1yn v1zn
          vertex v2xn v2yn v2zn
          vertex v3xn v3yn v3zn
      endloop
  endfacet
endsolid name
```

### Binary .stl file
```
UINT8[80] – Header
UINT32 – Number of triangles


foreach triangle
REAL32[3] – Normal vector
REAL32[3] – Vertex 1
REAL32[3] – Vertex 2
REAL32[3] – Vertex 3
UINT16 – Attribute byte count
end
```

### Output file
```json
{
  "result": [
    {
      "normal": [
        ni,
        nj,
        nk
      ],
      "vertices": [
        [
          v1x,
          v1y,
          v1z
        ],
        [
          v2x,
          v2y,
          v2z
        ],
        [
          v3x,
          v3y,
          v3z
        ]
      ]
    },
    ...,
    {
      "normal": [
        nin,
        njn,
        nkn
      ],
      "vertices": [
        [
          v1xn,
          v1yn,
          v1zn
        ],
        [
          v2xn,
          v2yn,
          v2zn
        ],
        [
          v3xn,
          v3yn,
          v3zn
        ]
      ]
    }
  ]
}
 
```

## Setup:

### For development
```
Specify input file in watch script (and/or output file).

Run 'yarn && yarn watch'
```

## Usage

`%> stl2json  -f STL_FILE_PATH -o OUTPUT_PATH`