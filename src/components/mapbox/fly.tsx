import { useMap } from "react-map-gl";
import styles from "./mapbox.module.scss";
export function Fly() {
  const { current: map } = useMap();

  const onClick = () => {
    map?.flyTo({ center: [-122.4, 37.8] });
  };

  return (
    <div>
      <button className={styles.btn} onClick={onClick}>
        Go
      </button>
    </div>
  );
}
