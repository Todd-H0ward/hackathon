import { AlertTriangle, Cloud, Droplets, Flame, Radiation } from 'lucide-react';
import styles from '@/components/pages/Home/NewsMap/NewsMap.module.scss';
import L from 'leaflet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const getIncidentIcon = (kind, level) => {
  let iconColor;
  let IconComponent;

  switch (level) {
    case 'HIGH':
      iconColor = '#ff6b6b';
      break;
    case 'MEDIUM':
      iconColor = '#fcc419';
      break;
    case 'LOW':
      iconColor = '#51cf66';
      break;
    default:
      iconColor = '#868e96';
  }

  switch (kind) {
    case 'CHEMICAL':
      IconComponent = Cloud;
      break;
    case 'RADIATION_BURST':
      IconComponent = Radiation;
      break;
    case 'FIRE':
      IconComponent = Flame;
      break;
    case 'FLOOD':
      IconComponent = Droplets;
      break;
    default:
      IconComponent = AlertTriangle;
  }

  const iconSvg = ReactDOMServer.renderToString(
    <div className={styles.circle} style={{ backgroundColor: iconColor }}>
      <IconComponent color="#fff" size={20} style={{ position: 'relative', zIndex: 10 }} />
    </div>
  );

  return L.divIcon({
    className: '',
    html: iconSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};