import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useActions } from './hooks/useActions';
import { Storage } from './utils/storage';
import { useTypedSelector } from './hooks/useTypedSelector';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { checkAuth } = useActions();
  const { error } = useTypedSelector(state => state.auth);

  useEffect(() => {
    if (Storage.getToken()) {
      checkAuth();
    }
  }, []);

  return (
    <Layout>
      {error && <ErrorMessage message={error} />}
      <NavBar />
      <Content>
        <Layout
          className="site-layout-background"
          style={{
            padding: '24px 0',
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;
