import { Card, Text, Badge, Title, Group } from '@mantine/core';

const NewsCard = ({ news }) => {
  const formattedDate = new Date(news.ts).toLocaleString();

  const getStatusText = (status) => {
    if (status === 'PUBLISHED') return 'опубликовано';
    if (status === 'HIDDEN') return 'скрыто';
    return status;
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>{news.title}</Title>
      <Text size="sm" color="dimmed">
        {formattedDate}
      </Text>
      <Text mt="sm">{news.body}</Text>
      <Group position="apart" mt="md">
        <Badge color="blue">{news.regionCode}</Badge>
        <Badge color="orange">{news.source}</Badge>
      </Group>
      {news.incidentExternalId && (
        <Text size="xs" c="dimmed" mt="sm">
          Incident ID: {news.incidentExternalId}
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
