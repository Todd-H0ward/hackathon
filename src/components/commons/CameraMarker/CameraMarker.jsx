import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import { Stack, Group, Title, Badge, Text } from '@mantine/core';
import { Video, Globe, MapPin } from 'lucide-react';

import styles from './CameraMarker.module.scss';

const getCameraIcon = () => {
  const iconSvg = ReactDOMServer.renderToString(
    <div className={styles.iconBg}>
      <Video color="#f03e3e" size={26} />
    </div>,
  );

  return L.divIcon({
    className: '',
    html: iconSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 22],
  });
};

const CameraMarker = ({ camera }) => {
  return (
    <Marker position={[camera.lat, camera.lng]} icon={getCameraIcon()}>
      <Popup>
        <Stack gap="md" style={{ minWidth: 220 }}>
          <Group justify="space-between">
            <Title order={5} m={0}>
              Камера: {camera.name}
            </Title>
            <Badge color="blue.7" variant="light">
              Камера
            </Badge>
          </Group>

          <Group gap={6}>
            <MapPin size={16} />
            <Text size="sm" m={0}>
              ID: {camera.externalId}
            </Text>
          </Group>

          <Group gap={6}>
            <Globe size={16} />
            <Text size="sm" m={0}>
              {camera.regionCode}
            </Text>
          </Group>

          {camera.publicUrl && (
            <Text
              size="sm"
              m={0}
              c="blue"
              component="a"
              href={camera.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Смотреть поток
            </Text>
          )}
        </Stack>
      </Popup>
    </Marker>
  );
};

export default CameraMarker;
