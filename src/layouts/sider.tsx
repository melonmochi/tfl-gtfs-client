import { FC } from 'react';
import { Layout } from 'antd';
import { LinesList } from '@/components';
import './sider.less';

const Sider: FC = () => (
  <Layout.Sider className="layout-sider" width={300}>
    <LinesList />
  </Layout.Sider>
);

export default Sider;
