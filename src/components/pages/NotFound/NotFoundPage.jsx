import {
  Title,
  Text,
  Button,
  Group,
  Center,
  Stack,
  Container,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      size="lg"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Center style={{ width: '100%' }}>
        <Stack align="center" spacing="md">
          <Title
            order={1}
            size={180}
            weight={900}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            style={{ lineHeight: 1 }}
          >
            404
          </Title>

          <Text size="xl" weight={600} ta="center">
            Упс! Страница не найдена
          </Text>

          <Text size="md" c="dimmed" ta="center" maw={500}>
            Похоже, вы зашли не туда. Страница, которую вы ищете, не существует
            или была удалена.
          </Text>

          <Group mt="md">
            <Button
              variant="filled"
              radius="md"
              size="md"
              onClick={() => navigate('/')}
            >
              На главную
            </Button>
            <Button
              variant="outline"
              radius="md"
              size="md"
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};

export default NotFoundPage;
