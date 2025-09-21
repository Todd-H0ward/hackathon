import { Marker, Popup } from 'react-leaflet';
import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import { MapPin } from 'lucide-react';
import { getSensorIcon } from '@/helpers/getSensorIcon.jsx';

const SensorMarker = ({ sensor }) => {
  return (
    <Marker
      position={[sensor.lat, sensor.lng]}
      icon={getSensorIcon(sensor.type)}
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
              Координаты: {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
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
