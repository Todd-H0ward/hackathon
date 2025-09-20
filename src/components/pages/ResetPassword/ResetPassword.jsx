import { observer } from 'mobx-react-lite';
import PageWrapper from '@/components/layouts/PageWrapper/index.js';

import {
  Anchor,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Link } from 'react-router';
import { STATIC_LINKS } from '@/constants/staticLinks.js';
import { useStore } from '@/hooks/useStore.js';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import styles from './ResetPassword.module.scss';

const ResetPassword = observer(() => {
  const { resetPassword } = useStore().auth;

  const form = useForm({
    initialValues: {
      email: '',
    },
  });

  const handleSubmit = async (data) => {
    const response = await resetPassword(data);

    if ('data' in response) {
      notifications.show({
        title: 'Успешно!',
        message: 'Мы отправили Вам новый пароль.',
        color: 'green',
      });
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
            <Title order={2}>Забыли пароль?</Title>
            <Text size="sm" c="dimmed" mt={4}>
              Ничего страшного, мы отправим Вам на почту новый
            </Text>
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Введите email"
                {...form.getInputProps('email')}
                mb="md"
              />

              <Button type="submit" fullWidth>
                Отправить
              </Button>
              <Anchor
                component={Link}
                to={STATIC_LINKS.LOGIN}
                size="sm"
                ta="center"
              >
                Вернуться назад
              </Anchor>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </PageWrapper>
  );
});

export default ResetPassword;
