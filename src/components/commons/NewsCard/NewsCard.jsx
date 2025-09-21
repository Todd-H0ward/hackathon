import { Card, Text, Badge, Title, Group, Stack } from '@mantine/core';

const NewsCard = ({ news }) => {
  const formattedDate = new Date(news.ts).toLocaleString();

  const getStatusText = (status) => {
    if (status === 'PUBLISHED') return 'опубликовано';
    if (status === 'HIDDEN') return 'скрыто';
    return status;
  };

  const getIncidentKindText = (kind) => {
    const map = {
      FIRE: 'Пожар',
      FLOOD: 'Наводнение',
      EARTHQUAKE: 'Землетрясение',
      TERROR: 'Теракт',
      ACCIDENT: 'Авария',
      UNKNOWN: 'Неизвестное событие',
    };
    return map[kind] || kind;
  };

  const getIncidentLevelText = (level) => {
    const map = {
      CRITICAL: 'Критический',
      HIGH: 'Высокий',
      MEDIUM: 'Средний',
      LOW: 'Низкий',
      INFO: 'Информационный',
    };
    return map[level] || level;
  };

  const getSourceText = (source) => {
    const map = {
      WATER_LEVEL: 'датчик уровня воды',
      LIGHT: 'датчик освещённости',
      RADIATION: 'датчик радиации',
      CAMERA: 'камера',
      SENSOR: 'сенсор',
    };
    return map[source] || source;
  };

  const parseBody = (body) => {
    if (!body) return {};

    const levelMatch = body.match(/Уровень:\s*(\w+)/);
    const sourceMatch = body.match(/Источник:\s*датчик\s*(\w+)/);

    return {
      level: levelMatch ? levelMatch[1] : null,
      source: sourceMatch ? sourceMatch[1] : null,
    };
  };

  const parsed = parseBody(news.body);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>
        {news.title
          ?.replace('FIRE', 'Повышение уровня света')
          .replace('FLOOD', 'Повышение уровня воды')
          .replace('RADIATION_BURST', 'Вспышка радиации')}
      </Title>

      <Text size="sm" c="dimmed">
        {formattedDate}
      </Text>

      <Stack gap="xs" mt="sm">
        {parsed.level && (
          <Text>
            Уровень: <b>{getIncidentLevelText(parsed.level)}</b>
          </Text>
        )}
        {parsed.source && (
          <Text>
            Источник: <b>{getSourceText(parsed.source)}</b>
          </Text>
        )}
        {!parsed.level && !parsed.source && <Text>{news.body}</Text>}
      </Stack>

      <Group position="apart" mt="md">
        <Badge color="blue">{news.regionCode}</Badge>
        <Badge color="orange">{news.source}</Badge>
      </Group>

      {news.incidentExternalId && (
        <Text size="xs" c="dimmed" mt="sm">
          Incident ID: {news.incidentExternalId}
        </Text>
      )}

      {news.level && (
        <Text size="xs" c="dimmed" mt="sm">
          Уровень: {getIncidentLevelText(news.level)}
        </Text>
      )}

      {news.status && (
        <Text size="xs" c="dimmed" mt="sm">
          Статус: {getStatusText(news.status)}
        </Text>
      )}
    </Card>
  );
};

export default NewsCard;
