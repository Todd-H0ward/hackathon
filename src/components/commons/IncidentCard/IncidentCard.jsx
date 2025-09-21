import { Card, Group, Text, Badge, Button } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const getLevelColor = (level) => {
  if (level === 'HIGH') {
    return 'red.7';
  }

  if (level === 'MEDIUM') {
    return 'orange.7';
  }

  if (level === 'LOW') {
    return 'green.7';
  }
};

const getLevelText = (level) => {
  if (level === 'HIGH') return 'Высокий';
  if (level === 'MEDIUM') return 'Средний';
  if (level === 'LOW') return 'Низкий';
  return level;
};

const IncidentCard = observer(({ incident, setOpened }) => {
  const { setLocation } = useStore().newsMap;

  const statusColor = incident.status === 'NEW' ? 'green.7' : 'gray.6';
  const levelColor = getLevelColor(incident.level);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card key={incident.id} shadow="sm" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{incident.kind}</Text>
        <Badge color={statusColor}>{incident.status}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {formatDate(incident.ts)} | {incident.originRegion}
      </Text>

      <Text size="sm" mt="sm" c={levelColor}>
        Уровень серьезности: {getLevelText(incident.level)}
      </Text>

      <Text size="sm">Причина: {incident.reason || 'Не указана'}</Text>

      <Button
        size="sm"
        variant="light"
        mt="md"
        onClick={() => {
          setLocation(incident.lat, incident.lng);
          setOpened(false);
        }}
      >
        Координаты: {incident.lat}, {incident.lng}
      </Button>
    </Card>
  );
});

export default IncidentCard;
