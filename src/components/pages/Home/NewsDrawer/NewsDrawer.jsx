import { useState, useEffect } from 'react';
import {
  Button,
  Drawer,
  Group,
  Text,
  Stack,
  Center,
  Tabs,
} from '@mantine/core';
import clsx from 'clsx';
import SkeletonCard from '@/components/commons/SkeletonCard/SkeletonCard.jsx';

import styles from './NewsDrawer.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import IncidentCard from '@/components/commons/IncidentCard/index.js';
import NewsCard from '@/components/commons/NewsCard/NewsCard.jsx';
import RegionDropdown from '@/components/commons/RegionDropdown/RegionDropdown.jsx';

const NewsDrawer = observer(() => {
  const incidentsStore = useStore().incidents;
  const newsStore = useStore().news;
  const [opened, setOpened] = useState(false);
  const [tabValue, setTabValue] = useState('incidents');

  useEffect(() => {
    incidentsStore.fetchIncidents();
    newsStore.fetchNews();
  }, []);

  return (
    <Stack className={styles.root}>
      {!    opened && <Group>
        <Button
          className={clsx(styles.drawerButton)}
          onClick={() => setOpened(true)}
        >
          Актуальные происшествия
        </Button>
      </Group>
      }

      <Drawer
        className={styles.drawer}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Новости происшествий и ЧС"
        padding="md"
        size="xl"
        position="right"
      >
        <Tabs variant="pills" value={tabValue} onChange={setTabValue}>
          <Tabs.List className={styles.list}>
            <Tabs.Tab className={styles.items} value="incidents">
              Инциденты
            </Tabs.Tab>
            <Tabs.Tab className={styles.items} value="regionNews">
              Новости региона
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="incidents">
            <Stack gap="md">
              {incidentsStore.isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : incidentsStore.incidents.length === 0 ? (
                <Center py="lg">
                  <Text c="dimmed">Нет происшествий</Text>
                </Center>
              ) : (
                incidentsStore.incidents.map((incident) => (
                  <IncidentCard key={incident.id} incident={incident} />
                ))
              )}
              <Button onClick={incidentsStore.loadNextPage} variant="outline">
                Загрузить ещё
              </Button>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="regionNews">
            <Stack gap="md">
              <RegionDropdown />
              {newsStore.isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : newsStore.news.length === 0 ? (
                <Center py="lg">
                  <Text c="dimmed">Нет новостей</Text>
                </Center>
              ) : (
                newsStore.news.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))
              )}
              <Button onClick={newsStore.loadNextPage} variant="outline">
                Загрузить ещё
              </Button>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Drawer>
    </Stack>
  );
});

export default NewsDrawer;
