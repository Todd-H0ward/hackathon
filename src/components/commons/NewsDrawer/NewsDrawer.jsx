import { useState, useEffect } from 'react';
import {
  Button,
  Drawer,
  Group,
  Card,
  Text,
  Badge,
  Stack,
  Skeleton,
  Center,
} from '@mantine/core';
import clsx from 'clsx';

import styles from './NewsDrawer.module.scss';

const incidents = [
  {
    id: 1,
    title: 'Пожар в жилом доме',
    status: 'Подтверждено',
    dangerLevel: 'Высокий',
    time: '2025-09-20 09:45',
    description: 'Возник пожар в многоквартирном доме. Пострадавших нет.',
    city: 'Москва',
  },
  {
    id: 2,
    title: 'Авария на трассе',
    status: 'В обработке',
    dangerLevel: 'Средний',
    time: '2025-09-20 08:20',
    description:
      'Дорожно-транспортное происшествие с участием двух автомобилей.',
    city: 'Санкт-Петербург',
  },
];

const NewsDrawer = () => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack>
      <Group>
        <Button
          className={clsx(styles.drawerButton)}
          onClick={() => setOpened(true)}
        >
          Актуальные происшествия
        </Button>
      </Group>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Новости происшествий и ЧС"
        padding="md"
        size="xl"
        position="right"
      >
        <Stack gap="md">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} shadow="sm" padding="lg" withBorder>
                <Group justify="space-between" mb="xs">
                  <Skeleton height={16} width="60%" />
                  <Skeleton height={16} width={80} />
                </Group>
                <Skeleton height={12} mt="sm" width="40%" />
                <Skeleton height={12} mt="sm" width="50%" />
                <Skeleton height={12} mt="sm" width="90%" />
              </Card>
            ))
          ) : incidents.length === 0 ? (
            <Center py="lg">
              <Text c="dimmed">Нет происшествий</Text>
            </Center>
          ) : (
            incidents.map((incident) => (
              <Card key={incident.id} shadow="sm" padding="lg" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{incident.title}</Text>
                  <Badge
                    color={
                      incident.status === 'Подтверждено' ? 'red' : 'yellow'
                    }
                  >
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
            ))
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default NewsDrawer;
