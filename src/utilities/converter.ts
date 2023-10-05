import { GeoJSONPolygon } from '../models/polygon';
// Function to convert GeoJSONPolygon to Firestore-compatible data
export function convertToFirestoreData(geoJSONPolygon: GeoJSONPolygon) {
  return {
    id: geoJSONPolygon.id,
    type: geoJSONPolygon.type,
    properties: { id: geoJSONPolygon.id },
    geometry: {
      coordinates: JSON.stringify(geoJSONPolygon.geometry.coordinates), // Convert coordinates to JSON string
      type: geoJSONPolygon.geometry.type,
    },
  };
}

// Function to revert Firestore data back to GeoJSONPolygon
export function convertFromFirestoreData(data: any): GeoJSONPolygon {
  return {
    id: data.id,
    type: data.type,
    properties: { id: data.id },
    geometry: {
      coordinates: JSON.parse(data.geometry.coordinates), // Parse the JSON string back to an array
      type: data.geometry.type,
    },
  };
}
