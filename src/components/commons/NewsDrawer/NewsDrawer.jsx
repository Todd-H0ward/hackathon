import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Drawer,
  Group,
  Text,
  Stack,
  Center,
  Select,
} from '@mantine/core';
import clsx from 'clsx';
import NewsCard from '@/components/commons/NewsCard/NewsCard';
import SkeletonCard from '@/components/commons/SkeletonCard/SkeletonCard';

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
  {
    id: 3,
    title: 'Наводнение в городе',
    status: 'Подтверждено',
    dangerLevel: 'Низкий',
    time: '2025-09-19 15:00',
    description: 'Подтопление улиц после сильного дождя.',
    city: 'Казань',
  },
  {
    id: 4,
    title: 'Газовая утечка',
    status: 'Подтверждено',
    dangerLevel: 'Высокий',
    time: '2025-09-18 21:30',
    description: 'Обнаружена утечка газа в жилом доме.',
    city: 'Екатеринбург',
  },
  {
    id: 5,
    title: 'Пожар в торговом центре',
    status: 'В обработке',
    dangerLevel: 'Средний',
    time: '2025-09-20 11:10',
    description: 'Загорелась проводка в торговом центре.',
    city: 'Новосибирск',
  },
  {
    id: 6,
    title: 'ДТП с автобусом',
    status: 'Подтверждено',
    dangerLevel: 'Низкий',
    time: '2025-09-17 07:15',
    description: 'Авария с участием автобуса и легкового автомобиля.',
    city: 'Владивосток',
  },
];

const NewsDrawer = () => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const sortedIncidents = useMemo(() => {
    const data = [...incidents];

    if (sortBy === 'time') {
      data.sort((a, b) =>
        sortOrder === 'desc'
          ? new Date(b.time).getTime() - new Date(a.time).getTime()
          : new Date(a.time).getTime() - new Date(b.time).getTime(),
      );
    } else if (sortBy === 'danger') {
      const rank = { Высокий: 3, Средний: 2, Низкий: 1 };
      data.sort((a, b) =>
        sortOrder === 'desc'
          ? rank[b.dangerLevel] - rank[a.dangerLevel]
          : rank[a.dangerLevel] - rank[b.dangerLevel],
      );
    }

    return data;
  }, [sortBy, sortOrder]);

  return (
    <Stack className={styles.root}>
      <Group>
        <Button
          className={clsx(styles.drawerButton)}
          onClick={() => setOpened(true)}
        >
          Актуальные происшествия
        </Button>
      </Group>

      <Drawer
        className={styles.drawer}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Новости происшествий и ЧС"
        padding="md"
        size="xl"
        position="right"
      >
        <Group m="15px 0 30px 0" align="flex-end">
          <Select
            w={180}
            label="Сортировать по"
            placeholder="Поле сортировки"
            data={[
              { value: 'time', label: 'Времени' },
              { value: 'danger', label: 'Опасности' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            clearable
          />

          <Select
            w={160}
            label="Порядок"
            placeholder="Выберите"
            data={[
              { value: 'asc', label: 'Возрастание' },
              { value: 'desc', label: 'Убывание' },
            ]}
            value={sortOrder}
            onChange={setSortOrder}
          />
        </Group>

        <Stack gap="md">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : sortedIncidents.length === 0 ? (
            <Center py="lg">
              <Text c="dimmed">Нет происшествий</Text>
            </Center>
          ) : (
            sortedIncidents.map((incident) => (
              <NewsCard key={incident.id} incident={incident} />
            ))
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default NewsDrawer;
