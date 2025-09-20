import { observer } from 'mobx-react-lite';
import { Card, Text, Group, Stack } from '@mantine/core';
import { useStore } from '@/hooks/useStore.js'; // твой хук
import styles from './Statistics.module.scss';

const Statistics = observer(() => {
  const { incidents } = useStore().incidents;

  const total = incidents.length;
  const high = incidents.filter((i) => i.level === 'CRITICAL').length;
  const medium = incidents.filter((i) => i.level === 'MEDIUM').length;
  const low = incidents.filter((i) => i.level === 'LOW').length;

  return (
    <Card className={styles.root} shadow="sm" padding="sm" withBorder>
      <Stack gap="xs">
        <Text fw={600}>Статистика по происшествиям</Text>
        <Group justify="space-between">
          <Group gap="xs">
            <Text size="sm">Всего:</Text>
            <Text size="sm" fw={600}>
              {total}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" c="red.7">
              Высокий:
            </Text>
            <Text size="sm" fw={600}>
              {high}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" c="orange.7">
              Средний:
            </Text>
            <Text size="sm" fw={600}>
              {medium}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" c="green.7">
              Низкий:
            </Text>
            <Text size="sm" fw={600}>
              {low}
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
});

export default Statistics;
