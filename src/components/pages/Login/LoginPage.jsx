import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router';
import { STATIC_LINKS } from '@/constants/staticLinks.js';
import { useStore } from '@/hooks/useStore.js';
import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import { notifications } from '@mantine/notifications';

import styles from './LoginPage.module.scss';

const LoginPage = observer(() => {
  const { login } = useStore().auth;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data) => {
    const response = await login(data);

    if ('data' in response) {
      notifications.show({
        title: 'Успешно!',
        message: 'Вы успешно вошли в систему.',
        color: 'green',
      });
      navigate(STATIC_LINKS.HOME);
    } else {
      notifications.show({
        title: 'Ошибка',
        message: response.message,
        color: 'red',
      });
    }
  };

  return (
    <PageWrapper className={styles.root}>
      <Paper
        maw={450}
        w="100%"
        mx="auto"
        p="xl"
        shadow="md"
        radius="lg"
        withBorder
      >
        <Stack gap="lg">
          <div>
            <Title order={2}>Вход в систему</Title>
            <Text size="sm" c="dimmed" mt={4}>
              Введите свои данные, чтобы продолжить
            </Text>
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Введите email"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Пароль"
                placeholder="Введите пароль"
                {...form.getInputProps('password')}
              />

              <Anchor
                component={Link}
                to={STATIC_LINKS.FORGOT_PASSWORD}
                size="sm"
              >
                Забыли пароль?
              </Anchor>

              <Button type="submit" fullWidth>
                Войти
              </Button>
            </Stack>
          </form>

          <Group justify="center" gap={5}>
            <Text size="sm" c="dimmed">
              Нет аккаунта?{' '}
            </Text>
            <Anchor component={Link} to={STATIC_LINKS.REGISTER} size="sm">
              Зарегистрируйтесь
            </Anchor>
          </Group>
        </Stack>
      </Paper>

      <Button
        mt={20}
        variant="outline"
        onClick={() => navigate(STATIC_LINKS.HOME)}
      >
        На главную
      </Button>
    </PageWrapper>
  );
});

export default LoginPage;
