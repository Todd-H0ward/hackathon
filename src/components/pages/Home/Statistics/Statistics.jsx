import { Card, Text, Group, Stack } from '@mantine/core';
import styles from './Statistics.module.scss';

const total = 120;
const high = 30;
const medium = 50;
const low = 40;

const Statistics = () => {
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
            <Text size="sm" c="red">
              Высокий:
            </Text>
            <Text size="sm" fw={600}>
              {high}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" c="yellow">
              Средний:
            </Text>
            <Text size="sm" fw={600}>
              {medium}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" c="green">
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
};

export default Statistics;
