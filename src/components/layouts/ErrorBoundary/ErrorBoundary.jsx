import React, { Component } from 'react';
import { Alert, Button, ScrollArea, Stack, Text, Title } from '@mantine/core';
import RootLayout from '../RootLayout/RootLayout';

import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <RootLayout className={styles.root}>
          <Alert w={500} title="Произошла ошибка">
            <ScrollArea h={300}>
              <Title order={4}>{this.state.error?.message}</Title>
              <Text>{this.state.error?.stack}</Text>
              <Text>{this.state.errorInfo?.componentStack}</Text>
            </ScrollArea>
            <Button onClick={() => window.location.reload()} mt="md">
              Обновить страницу
            </Button>
          </Alert>
        </RootLayout>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
