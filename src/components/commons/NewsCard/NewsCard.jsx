import { Card, Group, Text, Badge } from '@mantine/core';

const getLevelColor = (level) => {
  if (level === 'CRITICAL') {
    return 'red';
  }

  if (level === 'HIGH') {
    return 'orange';
  }

  if (level === 'LOW') {
    return 'green';
  }

  return 'yellow';
};

const NewsCard = ({ incident }) => {
  const statusColor = incident.status === 'NEW' ? 'blue' : 'gray'; // Пример для статуса
  const levelColor = getLevelColor(incident.color);

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
        Уровень серьезности: {incident.level}
      </Text>

      <Text size="sm">Причина: {incident.reason || 'Не указана'}</Text>

      <Text size="sm" c="dimmed">
        Координаты: {incident.lat}, {incident.lng}
      </Text>
    </Card>
  );
};

export default NewsCard;
