import { useState, useEffect } from 'react';
import { Button, Drawer, Group, Text, Stack, Center } from '@mantine/core';
import clsx from 'clsx';
import SkeletonCard from '@/components/commons/SkeletonCard/SkeletonCard.jsx';

import styles from './NewsDrawer.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import NewsCard from '@/components/commons/NewsCard/index.js';

const NewsDrawer = observer(() => {
  const { fetchIncidents, isLoading, incidents } = useStore().incidents;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

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
        <Stack gap="md">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : incidents.length === 0 ? (
            <Center py="lg">
              <Text c="dimmed">Нет происшествий</Text>
            </Center>
          ) : (
            incidents.map((incident) => (
              <NewsCard key={incident.id} incident={incident} />
            ))
          )}
        </Stack>
      </Drawer>
    </Stack>
  );
});

export default NewsDrawer;
