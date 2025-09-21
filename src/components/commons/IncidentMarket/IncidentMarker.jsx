import { Marker, Popup } from 'react-leaflet';
import { getIncidentIcon } from '@/helpers/getIncidentIcon.jsx';
import { getIncidentKindText } from '@/helpers/getIncidentKindText.js';
import { getIncidentLevelText } from '@/helpers/getIncidentLevelText.js';
import { AlertTriangle, MapPin } from 'lucide-react';
import { Badge, Group, Stack, Text, Title } from '@mantine/core';

const IncidentMarker = ({ incident }) => {
  return (
    <Marker
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
                incident.level === 'HIGH'
                  ? 'red.7'
                  : incident.level === 'MEDIUM'
                    ? 'yellow.7'
                    : 'green.7'
              }
              variant="light"
            >
              {getIncidentLevelText(incident.level)}
            </Badge>
          </Group>

          <Group gap={6}>
            <MapPin size={16} />
            <Text size="sm" m={0}>
              Координаты: {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}
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
  );
};

export default IncidentMarker;
