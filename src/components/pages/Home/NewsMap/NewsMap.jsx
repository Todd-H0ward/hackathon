import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import styles from './NewsMap.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const NewsMap = observer(() => {
  const { markers } = useStore().newsMap;

  const getCustomIcon = (color) => {
    const circleDivIcon = L.divIcon({
      className: styles.pulse,
      html: `<div class="${styles.circle}" style="background-color: ${color};"></div>`, // Добавляем круг с заданным цветом
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    });
    return circleDivIcon;
  };

  return (
    <MapContainer
      center={[56.858745, 35.917421]}
      zoom={10}
      className={styles.root}
    >
      <TileLayer
        zIndex={10}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.coords}
          icon={getCustomIcon(marker.color)}
        >
          <Popup>
            Это метка номер {marker.id}, цвет: {marker.color}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default NewsMap;
