import type { LayerProps } from "react-map-gl";
import Map, {
  GeolocateControl,
  Layer,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase";
import { DrawControl } from "./draw-control";

import { GeoJSONPolygon } from "../../models/polygon";
import { getPolygon, removePolygon, setPolygon } from "../../services/polygon";
import styles from "./mapbox.module.scss";
const token = import.meta.env.VITE_MAPBOX_TOKEN;

const layerStyle: LayerProps = {
  id: "data",
  type: "fill",
  source: "data", // reference the data source
  layout: {},
  paint: {
    "fill-color": "#0080ff", // blue color fill
    "fill-opacity": 0.5,
  },
};

function Mapbox() {
  const [features, setFeatures] = useState<GeoJSONPolygon[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getPolygon(db);
      setFeatures(response);
      console.log("polygon", response);
    }
    fetchData();
  }, []);

  const onUpdate = useCallback(async (e: any) => {
    console.log("e", e);
    await setPolygon(db, e.features[0]);
  }, []);

  const onDelete = useCallback(
    async (e: any) => {
      console.log("e", e);

      const id = e?.features?.[0].id;

      if (!id) {
        selectedFeatures.forEach(async (id: any) => {
          await removePolygon(db, id);
        });
      } else {
        await removePolygon(db, id);
      }
    },
    [selectedFeatures]
  );

  const handleFeatureClick = useCallback(
    (event: any) => {
      const id = event.features[0]?.properties.id;

      if (id) {
        // Check if the clicked feature is already selected
        const isSelected = selectedFeatures.includes(id);

        // Update the selected features list based on selection or deselection
        setSelectedFeatures((prevSelectedFeatures: any) =>
          isSelected
            ? prevSelectedFeatures.filter((id: any) => id !== id)
            : [...prevSelectedFeatures, id]
        );

        onDelete("any");
      }
    },
    [selectedFeatures]
  );

  console.log("hoveredFeature", selectedFeatures);

  return (
    <div className={styles.mapboxWrapper}>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12,
        }}
        mapboxAccessToken={token}
        onClick={handleFeatureClick}
        interactiveLayerIds={["data"]}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
      >
        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [...features] as any,
          }}
        >
          <Layer {...layerStyle} />
          <Layer
            id="selected-features"
            type="fill"
            paint={{
              "fill-color": "#ff0000", // Red color for selected features
              "fill-opacity": 0.5,
            }}
            source="polygon-source"
            filter={["in", "id", ...selectedFeatures]}
          />
        </Source>

        <NavigationControl />
        <GeolocateControl />
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <ScaleControl />
      </Map>
    </div>
  );
}

export default Mapbox;
