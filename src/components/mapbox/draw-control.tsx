import MapboxDraw from '@mapbox/mapbox-gl-draw';
import type { ControlPosition, MapLayerMouseEvent } from 'react-map-gl';
import { useControl } from 'react-map-gl';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate: (evt: MapLayerMouseEvent) => void;
  onUpdate: (evt: MapLayerMouseEvent) => void;
};

export function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
    },
    ({ map }) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
    },
    {
      position: props.position,
    },
  );

  return null;
}
