import { Card, Group, Text, Badge, Button, Stack } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const getLevelColor = (level) => {
  const map = {
    CRITICAL: 'red.9',
    HIGH: 'red.7',
    MEDIUM: 'orange.7',
    LOW: 'green.7',
    INFO: 'blue.7',
  };
  return map[level] || 'gray';
};

const getLevelText = (level) => {
  const map = {
    CRITICAL: 'Критический',
    HIGH: 'Высокий',
    MEDIUM: 'Средний',
    LOW: 'Низкий',
    INFO: 'Информационный',
  };
  return map[level] || level;
};

const getStatusText = (status) => {
  const map = {
    NEW: 'Новый',
    RESOLVED: 'Решён',
    IN_PROGRESS: 'В обработке',
    CLOSED: 'Закрыт',
  };
  return map[status] || status;
};

const getKindText = (kind) => {
  const map = {
    FIRE: 'Пожар',
    FLOOD: 'Наводнение',
    RADIATION_BURST: 'Вспышка радиации',
    EARTHQUAKE: 'Землетрясение',
    UFO: 'НЛО',
  };
  return map[kind] || kind;
};

const IncidentCard = observer(({ incident, setOpened }) => {
  const { setLocation, setZoom } = useStore().newsMap;

  const formatDate = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <Card key={incident.id} shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={700}>{getKindText(incident.kind)}</Text>
          <Badge
            color={incident.status === 'NEW' ? 'green.7' : 'gray.6'}
            variant="light"
          >
            {getStatusText(incident.status)}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed">
          {formatDate(incident.ts)} | {incident.originRegion}
        </Text>

        <Text size="sm" c={getLevelColor(incident.level)}>
          Уровень серьёзности: <b>{getLevelText(incident.level)}</b>
        </Text>

        <Text size="sm">
          Причина: <b>{incident.reason || 'Не указана'}</b>
        </Text>

        <Button
          size="sm"
          variant="light"
          mt="sm"
          onClick={() => {
            setOpened(false);
            setLocation(incident.lat, incident.lng);
            setZoom(25);
          }}
        >
          Координаты: {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}
        </Button>
      </Stack>
    </Card>
  );
});

export default IncidentCard;
