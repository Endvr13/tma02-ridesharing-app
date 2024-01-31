import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import TopNavigationBar from '../components/TopNavigationBar';

export const TestScreen = () => {
  return (
    <Layout>
      <TopNavigationBar title="Test" />
      <Layout>
        <Text category="h1">Test Screen</Text>
        {/* Your other UI components */}
      </Layout>
    </Layout>
  );
};

export default TestScreen;