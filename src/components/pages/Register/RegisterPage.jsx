import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router';
import { useStore } from '@/hooks/useStore.js';

import { STATIC_LINKS } from '@/constants/staticLinks.js';
import PageWrapper from '../../layouts/PageWrapper/PageWrapper.jsx';
import { notifications } from '@mantine/notifications';
import styles from './RegisterPage.module.scss';

const RegisterPage = observer(() => {
  const { register } = useStore().auth;
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const handleSubmit = async (data) => {
    const response = await register(data);

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
            <Title order={2}>Регистрация в систему</Title>
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
              <TextInput
                label="Имя"
                placeholder="Введите имя"
                {...form.getInputProps('name')}
              />
              <PasswordInput
                label="Пароль"
                placeholder="Введите пароль"
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth mt="md">
                Зарегистрироваться
              </Button>
            </Stack>
          </form>

          <Group justify="center">
            <Text size="sm" c="dimmed" mt={4}>
              Уже есть аккаунт?{" "}
              <Anchor component={Link} to={STATIC_LINKS.LOGIN}>
                Войдите
              </Anchor>
            </Text>
          </Group>
        </Stack>
      </Paper>
    </PageWrapper>
  );
});

export default RegisterPage;
