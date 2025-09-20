import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import styles from './NewsMap.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const NewsMap = observer(() => {
  const { markers, pharmacy } = useStore().newsMap;

  const getCustomIcon = (color) => {
    const circleDivIcon = L.divIcon({
      className: styles.pulse,
      html: `<div class="${styles.circle}" style="background-color: ${color};"></div>`, // Добавляем круг с заданным цветом
      iconSize: [60, 60],
      iconAnchor: [30, 30],
    });
    return circleDivIcon;
  };

  const getPharmacyIcon = (color) => {
    const pharmacyDivIcon = L.divIcon({
      className: styles.pulse,
      html: `
      <div class="${styles.pharmacyIcon}">
        <div class="${styles.droplet}" style="background-color: ${color};"></div>
        <div class="${styles.plusSign}">+</div>
      </div>
    `,
      iconSize: [50, 50],
      iconAnchor: [25, 25], // Центр иконки
    });
    return pharmacyDivIcon;
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
      {pharmacy.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          position={pharmacy.coords}
          icon={getPharmacyIcon(pharmacy.color)}
        >
          <Popup>Здесь находится безопасное укрытие</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default NewsMap;
