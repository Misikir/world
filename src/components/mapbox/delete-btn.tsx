import { MapLayerMouseEvent } from 'react-map-gl';
import styles from './mapbox.module.scss';
import { MouseEventHandler } from 'react';
export function DeleteControl({
  onDelete,
}: {
  onDelete: (evt: MapLayerMouseEvent) => void;
}) {
  return (
    <button
      onClick={onDelete as unknown as MouseEventHandler<HTMLButtonElement>}
      className={`${styles.deleteBtn} mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash `}
      title="Delete"
    ></button>
  );
}
