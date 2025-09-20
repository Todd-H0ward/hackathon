import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, Text, Title, Badge, Group } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import styles from './NewsMap.module.scss';

const NewsMap = observer(() => {
  const { places, fetchPlaces } = useStore().newsMap;

  useEffect(() => {
    fetchPlaces();
  }, []);

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
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={getCustomIcon(place.type === 'SHELTER' ? 'blue' : 'green')}
        >
          <Popup>
            <Card shadow="sm" padding="md">
              <Title order={3}>{place.name}</Title>
              <Text size="sm" c="dimmed">
                <strong>Адрес:</strong> {place.address}
              </Text>
              <Text size="sm">
                <strong>Тип:</strong> <Badge color="blue">{place.type}</Badge>
              </Text>
              <Text size="sm">
                <strong>Вместимость:</strong> {place.capacity} человек
              </Text>
              <Text size="sm">
                <strong>Регион:</strong> {place.regionCode}
              </Text>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default NewsMap;
