import { AlertTriangle, FlameIcon, Radiation, Droplet } from 'lucide-react';
import styles from '@/components/pages/Home/NewsMap/NewsMap.module.scss';
import L from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const getSensorIcon = (kind) => {
  let iconColor = '#22b8cf';
  let IconComponent;

  switch (kind) {
    case 'RADIATION':
      IconComponent = Radiation;
      break;
    case 'WATER_LEVEL':
      IconComponent = Droplet;
      break;
    case 'LIGHT':
      IconComponent = FlameIcon;
      break;
    default:
      IconComponent = AlertTriangle;
  }

  const iconSvg = ReactDOMServer.renderToString(
    <div className={styles.circle} style={{ backgroundColor: iconColor }}>
      <IconComponent
        color="#fff"
        size={20}
        style={{ position: 'relative', zIndex: 10 }}
      />
    </div>,
  );

  return L.divIcon({
    className: '',
    html: iconSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 20],
  });
};
