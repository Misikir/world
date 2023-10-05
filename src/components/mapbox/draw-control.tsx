import MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { ControlPosition } from 'react-map-gl';
import { useControl } from 'react-map-gl';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: { features: object[] }) => void;
  onUpdate?: (evt: { features: object[]; action: string }) => void;
  onDelete?: (evt: { features: object[] }) => void;
};

export function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate as any);
      map.on('draw.update', props.onUpdate as any);
      map.on('draw.delete', props.onDelete as any);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    {
      position: props.position,
    },
  );

  return null;
}
