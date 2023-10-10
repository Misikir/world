import { MapboxFeature } from '../models/polygon';
import { convertFromFirestoreData, convertToFirestoreData } from './converter';
import { describe, it, expect } from 'vitest';

describe('Conversion Functions', () => {
  it('should convert GeoJSONPolygon to Firestore data', () => {
    const geoJSONPolygon: MapboxFeature = {
      id: '123',
      type: 'Feature',
      properties: { id: '123' },
      geometry: {
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [0, 0],
          ],
        ],
        type: 'Polygon',
      },
    };

    const expectedFirestoreData = {
      id: '123',
      coordinates: '[[[0,0],[1,1],[2,2],[0,0]]]',
    };

    const firestoreData = convertToFirestoreData(geoJSONPolygon);

    expect(firestoreData).toEqual(expectedFirestoreData);
  });

  it('should revert Firestore data to GeoJSONPolygon', () => {
    const firestoreData = {
      id: '123',
      coordinates: '[[[0,0],[1,1],[2,2],[0,0]]]',
    };

    const expectedGeoJSONPolygon = {
      id: '123',
      type: 'Feature',
      properties: { id: '123' },
      geometry: {
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [0, 0],
          ],
        ],
        type: 'Polygon',
      },
    };

    const geoJSONPolygon = convertFromFirestoreData(firestoreData);

    expect(geoJSONPolygon).toEqual(expectedGeoJSONPolygon);
  });

  it('should not convert GeoJSONPolygon to Firestore data', () => {
    const geoJSONPolygon: MapboxFeature = {
      id: '123',
      type: 'Feature',
      properties: { id: '123' },
      geometry: {
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [0, 0],
          ],
        ],
        type: 'Polygon',
      },
    };

    const expectedFirestoreData = {
      id: '123',
      coordinates: '[[[1,1],[2,2],[3,3],[1,1]]]',
    };

    const firestoreData = convertToFirestoreData(geoJSONPolygon);

    expect(firestoreData).not.toEqual(expectedFirestoreData);
  });

  it('should not revert Firestore data to GeoJSONPolygon', () => {
    const firestoreData = {
      id: '123',
      coordinates: '[[[0,0],[1,1],[2,2],[0,0]]]',
    };

    const expectedGeoJSONPolygon = {
      id: '123',
      type: 'Feature',
      properties: { id: '123' },
      geometry: {
        coordinates: [
          [
            [0, 0],
            [1, 1],
            [2, 2],
            [0, 0],
            [1, 1],
          ],
        ], // Incorrect coordinates
        type: 'Polygon',
      },
    };

    const geoJSONPolygon = convertFromFirestoreData(firestoreData);

    expect(geoJSONPolygon).not.equals(expectedGeoJSONPolygon);
  });
});
