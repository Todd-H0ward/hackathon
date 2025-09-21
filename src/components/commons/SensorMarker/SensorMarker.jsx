import { Marker, Popup } from 'react-leaflet';
import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { MapPin } from 'lucide-react';
import { getSensorIcon } from '@/helpers/getSensorIcon.jsx';
import styles from './SensorMarker.module.scss';

const SensorMarker = ({ sensor }) => {
  if (!sensor.lat || !sensor.lng) return null;

  return (
    <Marker
      position={[sensor.lat, sensor.lng]}
      icon={getSensorIcon(sensor.type)}
      className={styles.root}
      zIndexOffset={1000}
    >
      <Popup>
        <Stack gap="md" style={{ minWidth: 220 }}>
          <Group justify="space-between" wrap="nowrap">
            <Title order={5} m={0} style={{ flex: 1 }}>
              {sensor.name}
            </Title>
            <Badge color="blue.7" variant="light">
              Радиация
            </Badge>
          </Group>

          <Group gap={6}>
            <MapPin size={16} />
            <Text size="sm" m={0}>
              {sensor.lat && sensor.lng
                ? `Координаты: ${sensor.lat.toFixed(4)}, ${sensor.lng.toFixed(4)}`
                : 'Координаты недоступны'}
            </Text>
          </Group>

          <Group gap={6}>
            <Text size="sm" m={0}>
              Регион: {sensor.regionCode}
            </Text>
          </Group>

          <Group gap={6}>
            <Text size="sm" m={0}>
              Обновлено: {new Date(sensor.updatedAt).toLocaleString()}
            </Text>
          </Group>
        </Stack>
      </Popup>
    </Marker>
  );
};

export default SensorMarker;
