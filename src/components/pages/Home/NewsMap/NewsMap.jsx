import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Text, Title, Badge, Loader, Stack, Group } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import ReactDOMServer from 'react-dom/server';
import Shelter from '@/components/icons/Shelter';
import Pharmacy from '@/components/icons/Pharmacy';
import { MapPin, Users, Globe } from 'lucide-react';

import styles from './NewsMap.module.scss';

const getCustomIcon = (type) => {
  let iconSvg;

  if (type === 'SHELTER') {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Shelter color="#1c7ed6" size={28} />
      </div>,
    );
  } else if (type === 'PHARMACY') {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Pharmacy color="#37b24d" size={28} />
      </div>,
    );
  } else {
    iconSvg = ReactDOMServer.renderToString(
      <div className={styles.iconBg}>
        <Shelter color="#1c7ed6" size={28} />
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
                <Stack gap="md" style={{ minWidth: 220 }}>
                  <Group justify="space-between">
                    <Title order={5} m={0}>
                      {place.name}
                    </Title>
                    <Badge
                      color={place.type === 'SHELTER' ? 'blue.7' : 'green.7'}
                      variant="light"
                    >
                      {place.type === 'SHELTER' ? 'Убежище' : 'Аптека'}
                    </Badge>
                  </Group>

                  <Group gap={6}>
                    <MapPin size={16} />
                    <Text size="sm" m={0}>
                      {place.address}
                    </Text>
                  </Group>

                  {place.capacity != null && (
                    <Group gap={6}>
                      <Users size={16} />
                      <Text size="sm" m={0}>
                        {place.capacity} человек
                      </Text>
                    </Group>
                  )}

                  <Group gap={6}>
                    <Globe size={16} />
                    <Text size="sm" m={0}>
                      {place.regionCode}
                    </Text>
                  </Group>
                </Stack>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
});

export default NewsMap;
