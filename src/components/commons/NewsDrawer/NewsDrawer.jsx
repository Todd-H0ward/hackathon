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
];

const NewsDrawer = () => {
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const sortedIncidents = useMemo(() => {
    if (!sortBy) return incidents;

    const data = [...incidents];
    if (sortBy === 'time') {
      data.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      );
    } else if (sortBy === 'danger') {
      const rank = { Высокий: 3, Средний: 2, Низкий: 1 };
      data.sort((a, b) => rank[b.dangerLevel] - rank[a.dangerLevel]);
    }
    return data;
  }, [sortBy]);

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
        <Select
          m="15px 0 30px 0"
          w={180}
          label="Сортировать по"
          placeholder="Сортировка по"
          data={[
            { value: 'time', label: 'Времени' },
            { value: 'danger', label: 'Опасности' },
          ]}
          value={sortBy}
          onChange={setSortBy}
          clearable
        />

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
