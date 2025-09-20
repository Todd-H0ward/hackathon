import { Button, Group, Text } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

const Counter = observer(() => {
  const counterStore = useStore().counter;

  return (
    <Group>
      <Button onClick={() => counterStore.decrement()}>-</Button>
      <Text>{counterStore.value}</Text>
      <Button onClick={() => counterStore.increment()}>+</Button>
    </Group>
  );
});

export default Counter;
