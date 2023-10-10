import { useCallback, useEffect, useState } from 'react';
import type {
  LayerProps,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'react-map-gl';
import Map, {
  GeolocateControl,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from 'react-map-gl';

import { db } from '../../firebase';
import { MapboxFeature } from '../../models/polygon';
import {
  getPolygon,
  removePolygon,
  setPolygon,
} from '../../services/polygon.service';
import { DeleteControl } from './delete-btn';
import { DrawControl } from './draw-control';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './mapbox.module.scss';
import { ErrorBoundary } from '../../utilities/error-boundary';

const token = import.meta.env.VITE_MAPBOX_TOKEN;

const layerStyle: LayerProps = {
  id: 'data',
  type: 'fill',
  source: 'data', // reference the data source
  layout: {},
  paint: {
    'fill-color': '#0080ff', // blue color fill
    'fill-opacity': 0.5,
  },
};

function Mapbox() {
  const [features, setFeatures] = useState<MapboxFeature[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  console.log(features);

  useEffect(() => {
    const unsubscribe = getPolygon(db, setFeatures);
    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const onUpdate = useCallback(async (e: MapLayerMouseEvent) => {
    console.log(e);
    if (e?.features?.[0]) {
      await setPolygon(db, e.features[0] as MapboxFeature);
    }
  }, []);

  const onDelete = useCallback(
    async (e: MapLayerMouseEvent) => {
      const id = e?.features?.[0].id;

      console.log(id, selectedFeatures);

      if (!id) {
        selectedFeatures.forEach(async (selected) => {
          await removePolygon(db, selected as string);
        });
      } else {
        await removePolygon(db, id as string);
      }
    },
    [selectedFeatures],
  );

  const handleFeatureClick = useCallback(
    (event: MapLayerMouseEvent | MapLayerTouchEvent) => {
      const id = event?.features?.[0].properties?.id;

      if (id) {
        // Check if the clicked feature is already selected
        const isSelected = selectedFeatures.includes(id);

        // Update the selected features list based on selection or deselection
        setSelectedFeatures((prevSelectedFeatures: string[]) =>
          isSelected
            ? prevSelectedFeatures.filter((selected) => selected !== id)
            : [...prevSelectedFeatures, id],
        );
      }
    },
    [selectedFeatures],
  );

  return (
    <div className={styles.mapboxWrapper}>
      <ErrorBoundary>
        <Map
          initialViewState={{
            longitude: 91.874,
            latitude: 42.76,
            zoom: 12,
          }}
          mapboxAccessToken={token}
          onClick={handleFeatureClick}
          onTouchStart={handleFeatureClick}
          interactiveLayerIds={['data']}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
        >
          <Source
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: [...features],
            }}
          >
            <Layer {...layerStyle} />
            <Layer
              id="selected-features"
              type="fill"
              paint={{
                'fill-color': '#ff0000', // Red color for selected features
                'fill-opacity': 0.5,
              }}
              source="polygon-source"
              filter={['in', 'id', ...selectedFeatures]}
            />
          </Source>

          <NavigationControl />
          <GeolocateControl />
          <DrawControl
            position="top-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
            }}
            onCreate={onUpdate}
            onUpdate={onUpdate}
          />
          <DeleteControl onDelete={onDelete} />
          <ScaleControl />
        </Map>
      </ErrorBoundary>
    </div>
  );
}

export default Mapbox;
