import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Text, Title, Badge, Loader, Stack, Group } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import ReactDOMServer from 'react-dom/server';
import Shelter from '@/components/icons/Shelter';
import Pharmacy from '@/components/icons/Pharmacy';
import { MapPin, Users, Globe, AlertTriangle, Radiation, Flame, Droplets, Cloud } from 'lucide-react';

import styles from './NewsMap.module.scss';

const getPlaceIcon = (type) => {
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

const getIncidentIcon = (kind, level) => {
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

const getIncidentKindText = (kind) => {
  switch (kind) {
    case 'CHEMICAL':
      return 'Химическая угроза';
    case 'RADIATION_BURST':
      return 'Радиационная угроза';
    case 'FIRE':
      return 'Пожар';
    case 'FLOOD':
      return 'Наводнение';
    default:
      return kind;
  }
};

const getIncidentLevelText = (level) => {
  switch (level) {
    case 'HIGH':
      return 'Высокий';
    case 'MEDIUM':
      return 'Средний';
    case 'LOW':
      return 'Низкий';
    default:
      return level;
  }
};

const NewsMap = observer(() => {
  const { newsMap, incidents} = useStore();

  useEffect(() => {
    newsMap.fetchPlaces();
    incidents.fetchIncidents();
  }, []);

  const isLoading = newsMap.isLoading || incidents.isLoading;

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

          {newsMap.places.map((place) => (
            <Marker
              key={`place-${place.id}`}
              position={[place.lat, place.lng]}
              icon={getPlaceIcon(place.type)}
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

          {incidents.incidents.map((incident) => (
            <Marker
              key={`incident-${incident.id}`}
              position={[incident.lat, incident.lng]}
              icon={getIncidentIcon(incident.kind, incident.level)}
            >
              <Popup>
                <Stack gap="md" style={{ minWidth: 220 }}>
                  <Group justify="space-between" wrap="nowrap">
                    <Title order={5} m={0} style={{ flex: 1 }}>
                      {getIncidentKindText(incident.kind)}
                    </Title>
                    <Badge
                      color={
                        incident.level === 'HIGH' ? 'red.7' :
                          incident.level === 'MEDIUM' ? 'yellow.7' : 'green.7'
                      }
                      variant="light"
                    >
                      {getIncidentLevelText(incident.level)}
                    </Badge>
                  </Group>

                  <Group gap={6}>
                    <MapPin size={16} />
                    <Text size="sm" m={0}>
                      Координаты: {incident.lat.toFixed(6)}, {incident.lng.toFixed(6)}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <AlertTriangle size={16} />
                    <Text size="sm" m={0}>
                      Причина: {incident.reason}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <Text size="sm" m={0}>
                      Время: {new Date(incident.ts).toLocaleString()}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <Text size="sm" m={0}>
                      Статус: {incident.status === 'NEW' ? 'Новый' : incident.status}
                    </Text>
                  </Group>

                  <Group gap={6}>
                    <Text size="sm" m={0}>
                      Регион: {incident.regionCode}
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