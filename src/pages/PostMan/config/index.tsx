import React, { useState } from "react";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import Style from './index.less';

import Param from './param/index';
import Headers from './header/index';

const ConfigRequest: React.FC = () => {
  return (
    <div className={Style['config-request']}>
      <Tabs type="card">
        <TabPane tab="Param" key="1">
          <Param />
        </TabPane>
        <TabPane tab="Header" key="2">
          <Headers />
        </TabPane>
      </Tabs>
    </div>
  )
};

export default ConfigRequest;