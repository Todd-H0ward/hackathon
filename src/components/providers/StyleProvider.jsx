import {
  Button,
  createTheme,
  Input,
  MantineProvider,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const StyleProvider = ({ children }) => {
  const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 8,
    components: {
      Input: Input.extend({
        defaultProps: {
          radius: 'md',
        },
      }),
      TextInput: TextInput.extend({
        defaultProps: {
          radius: 'md',
        },
      }),
      Button: Button.extend({
        defaultProps: {
          radius: 'md',
        },
      }),
      Textarea: Textarea.extend({
        defaultProps: {
          radius: 'md',
        },
      }),
    },
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
      <Notifications position="bottom-center" />
    </MantineProvider>
  );
};

export default StyleProvider;
