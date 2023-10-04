import type { FeatureCollection } from "geojson";
import type { CircleLayer } from "react-map-gl";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { Fly } from "./fly";
import styles from "./mapbox.module.scss";
const token = import.meta.env.VITE_MAPBOX_TOKEN;

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [20, 40] },
    },
  ],
};

const layerStyle: CircleLayer = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

function Mapbox() {
  const [viewState, setViewState] = useState({
    longitude: 20,
    latitude: 40,
    zoom: 3,
  });

  return (
    <div className={styles.mapboxWrapper}>
      <Map
        mapboxAccessToken={token}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <Fly />
        <NavigationControl />
        <GeolocateControl />
        <FullscreenControl />
      </Map>
    </div>
  );
}

export default Mapbox;
