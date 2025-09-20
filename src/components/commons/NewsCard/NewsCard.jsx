import { Card, Group, Text, Badge } from '@mantine/core';
import { observer } from 'mobx-react-lite';

const getLevelColor = (level) => {
  switch (level) {
    case 'CRITICAL':
    case 'HIGH':
      return 'red.7';
    case 'MEDIUM':
      return 'orange.7';
    case 'LOW':
      return 'green.7';
    default:
      return 'gray';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'NEW':
      return 'blue';
    case 'IN_PROGRESS':
      return 'yellow';
    case 'RESOLVED':
      return 'green';
    default:
      return 'gray';
  }
};

const NewsCard = observer(({ incident }) => {
  const levelColor = getLevelColor(incident.level);
  const statusColor = getStatusColor(incident.status);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card key={incident.id} shadow="sm" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={700}>{incident.kind}</Text>
        <Badge color={statusColor}>{incident.status}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {formatDate(incident.ts)} | {incident.originRegion}
      </Text>

      <Text size="sm" mt="sm" c={levelColor}>
        Уровень серьезности: {incident.level}
      </Text>

      <Text size="sm">Причина: {incident.reason || 'Не указана'}</Text>

      <Text size="sm" c="dimmed">
        Координаты: {incident.lat}, {incident.lng}
      </Text>
    </Card>
  );
});

export default NewsCard;
