import parse, { domToReact } from 'html-react-parser';
import { Anchor, List, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { STATIC_LINKS } from '@/constants/staticLinks.js';

export const renderHtml = (html) => {
  const options = {
    replace: (node) => {
      if (node.type === 'tag') {
        const { name, children, attribs } = node;

        if (name === 'ol') {
          return (
            <List type="ordered" spacing="xs" my="sm">
              {domToReact(children, options)}
            </List>
          );
        }
        if (name === 'ul') {
          return (
            <List listStyleType="disc" spacing="xs" my="sm">
              {domToReact(children, options)}
            </List>
          );
        }
        if (name === 'li') {
          return (
            <List.Item key={domToReact(children, options)}>
              {domToReact(children, options)}
            </List.Item>
          );
        }
        if (name === 'p') {
          return <Text mt="sm">{domToReact(children, options)}</Text>;
        }
        if (name === 'a' && attribs?.href) {
          return (
            <Text size="sm" c="dimmed" mt={4}>
              Уже есть аккаунт?{' '}
              <Anchor component={Link} to={attribs.href}>
                {domToReact(children, options)}
              </Anchor>
            </Text>
          );
        }
      }
      return null;
    },
  };

  return parse(html, options);
};
