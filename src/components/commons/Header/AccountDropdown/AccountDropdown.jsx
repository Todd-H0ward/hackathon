import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';

import styles from './AccountDropdown.module.scss';

const AccountDropdown = ({ account, onLogout }) => {
  const [opened, setOpened] = useState(false);

  if (!account) {
    return null;
  }

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      shadow="lg"
      width={220}
      transitionProps={{ transition: 'pop-top-right', duration: 150 }}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={styles.btn} px="sm" py={6}>
          <Group gap="sm">
            <Avatar color="blue" radius="xl">
              {account.name[0].toUpperCase()}
            </Avatar>
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {account.name}
              </Text>
              <Text size="xs" c="dimmed">
                {account.email}
              </Text>
            </div>
            <ChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={onLogout}
          leftSection={<LogOut size={16} />}
          color="red"
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountDropdown;
