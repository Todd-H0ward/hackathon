import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, Text, Title, Badge, Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import ReactDOMServer from 'react-dom/server';
import Shelter from '@/components/icons/Shelter';
import Pharmacy from '@/components/icons/Pharmacy';

import styles from './NewsMap.module.scss';

const getCustomIcon = (type) => {
  let iconSvg;

  if (type === 'SHELTER') {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Shelter color="#1c7ed6" size={30} />
      </div>,
    );
  } else if (type === 'PHARMACY') {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Pharmacy color="#37b24d" size={30} />
      </div>,
    );
  } else {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Shelter color="#1c7ed6" size={30} />
      </div>,
    );
  }

  return L.divIcon({
    className: '',
    html: iconSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const NewsMap = observer(() => {
  const { places, fetchPlaces, isLoading } = useStore().newsMap;

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader size="lg" />
        </div>
      ) : (
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
              icon={getCustomIcon(place.type)}
            >
              <Popup>
                <Card shadow="sm" padding="md">
                  <Title order={3}>{place.name}</Title>
                  <Text size="sm" c="dimmed">
                    <strong>Адрес:</strong> {place.address}
                  </Text>
                  <Text size="sm">
                    <strong>Тип:</strong>{' '}
                    <Badge
                      color={place.type === 'SHELTER' ? 'blue.7' : 'green.7'}
                    >
                      {place.type}
                    </Badge>
                  </Text>
                  {place.capacity && (
                    <Text size="sm">
                      <strong>Вместимость:</strong> {place.capacity} человек
                    </Text>
                  )}
                  <Text size="sm">
                    <strong>Регион:</strong> {place.regionCode}
                  </Text>
                </Card>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
});

export default NewsMap;
