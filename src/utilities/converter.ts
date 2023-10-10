import { MapboxFeature, Polygon } from '../models/polygon';

// Function to convert GeoJSONPolygon to Firestore-compatible data
export function convertToFirestoreData(geoJSONPolygon: MapboxFeature): Polygon {
  return {
    id: geoJSONPolygon.id,
    coordinates: JSON.stringify(geoJSONPolygon.geometry?.coordinates), // C
  };
}

// Function to revert Firestore data back to GeoJSONPolygon
export function convertFromFirestoreData(data: Polygon): MapboxFeature {
  return {
    id: data.id,
    type: 'Feature',
    properties: { id: data.id },
    geometry: {
      coordinates: JSON.parse(data.coordinates), // Parse the JSON string back to an array
      type: 'Polygon',
    },
  };
}
