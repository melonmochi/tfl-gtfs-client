import { FC, StrictMode } from 'react';
import { Layout } from 'antd';
import { Body, Sider } from '@/layouts';
import './app.less';

const App: FC = () => (
  <StrictMode>
    <Layout className="layout">
      <Body />
      <Sider />
    </Layout>
  </StrictMode>
);

export default App;
