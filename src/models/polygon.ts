import { Feature, GeoJsonProperties, Polygon as MultiPolygon } from 'geojson';
import { MapMouseEvent, MapboxGeoJSONFeature } from 'react-map-gl';

export type MapLayerMouseEvent = MapMouseEvent & {
  features: MapboxGeoJSONFeature[];
};

export type MapboxFeature = Feature<MultiPolygon, GeoJsonProperties>;

export type Polygon = {
  id?: string | number;
  coordinates: string;
};
