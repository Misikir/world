export interface GeoJSONPolygon {
  id: string;
  type: "Feature";
  properties: any;
  geometry: {
    coordinates: string; // A multi-dimensional array of coordinates
    type: "Polygon";
  };
}
