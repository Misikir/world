interface Geometry {
  coordinates: string; // A multi-dimensional array of coordinates which will be stored in firebase as a string
  type: 'Polygon';
}
export interface GeoJSONPolygon {
  id: string;
  type: 'Feature';
  properties: any;
  geometry: Geometry;
}
