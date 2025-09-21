import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import Shelter from '@/components/icons/Shelter';
import Pharmacy from '@/components/icons/Pharmacy';

import styles from './PlaceMarker.module.scss';
import { Marker, Popup } from 'react-leaflet';
import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { Globe, MapPin, Users } from 'lucide-react';

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

const PlaceMarker = ({ place }) => {
  return (
    <Marker position={[place.lat, place.lng]} icon={getPlaceIcon(place.type)}>
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
  );
};

export default PlaceMarker;
