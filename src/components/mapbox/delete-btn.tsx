import styles from './mapbox.module.scss';
export function DeleteControl({ onDelete }: any) {
  return (
    <button
      onClick={onDelete}
      className={`${styles.deleteBtn} mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash `}
      title="Delete"
    ></button>
  );
}
