import { Marker, Popup } from 'react-leaflet';
import { getIncidentIcon } from '@/helpers/getIncidentIcon.jsx';
import { getIncidentKindText } from '@/helpers/getIncidentKindText.js';
import { getIncidentLevelText } from '@/helpers/getIncidentLevelText.js';
import { AlertTriangle, MapPin, Clock, Shield } from 'lucide-react';
import { Badge, Group, Stack, Text, Title, Divider } from '@mantine/core';
import styles from './IncidentMarker.module.scss';


const IncidentMarker = ({ incident }) => {
  return (
    <Marker
      position={[incident.lat + 0.1, incident.lng]}
      icon={getIncidentIcon(incident.kind, incident.level)}
      className={styles.root}
      zIndexOffset={100}
    >
      <Popup>
        <Stack gap="sm" style={{ minWidth: 280 }}>
          <Group justify="space-between" wrap="nowrap">
            <Title order={5} m={0}>
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
              variant="filled"
              radius="sm"
            >
              {getIncidentLevelText(incident.level)}
            </Badge>
          </Group>

          <Divider />

          <Group gap={6} align="center">
            <MapPin size={16} />
            <Text size="sm" m={0}>
              {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}
            </Text>
          </Group>

          <Group gap={6} align="center">
            <AlertTriangle size={16} />
            <Text size="sm" m={0}>
              {incident.reason || 'Не указана'}
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Clock size={16} />
            <Text size="sm" m={0}>
              {new Date(incident.ts).toLocaleString()}
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Shield size={16} />
            <Text size="sm" m={0}>
              {incident.status === 'NEW' ? 'Новый' : incident.status}
            </Text>
          </Group>

          <Text size="sm" c="dimmed" m={0}>
            {incident.regionCode}
          </Text>
        </Stack>
      </Popup>
    </Marker>
  );
};

export default IncidentMarker;
