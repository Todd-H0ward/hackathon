import { Badge, Card, Group, Text } from '@mantine/core';

const NewsCard = ({ incident }) => {
  return (
    <Card key={incident.id} shadow="sm" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{incident.title}</Text>
        <Badge color={incident.status === 'Подтверждено' ? 'red' : 'yellow'}>
          {incident.status}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {incident.time} | {incident.city}
      </Text>

      <Text
        size="sm"
        mt="sm"
        c={
          incident.dangerLevel === 'Высокий'
            ? 'red'
            : incident.dangerLevel === 'Средний'
              ? 'yellow'
              : 'green'
        }
      >
        Уровень опасности: {incident.dangerLevel}
      </Text>

      <Text size="sm">{incident.description}</Text>
    </Card>
  );
};

export default NewsCard;
