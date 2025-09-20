import { Card, Group, Skeleton } from '@mantine/core';

const SkeletonCard = ({ i }) => {
  return (
    <Card key={i} shadow="sm" padding="lg" withBorder>
      <Group justify="space-between" mb="xs">
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} width={80} />
      </Group>
      <Skeleton height={12} mt="sm" width="40%" />
      <Skeleton height={12} mt="sm" width="50%" />
      <Skeleton height={12} mt="sm" width="90%" />
    </Card>
  );
};

export default SkeletonCard;
