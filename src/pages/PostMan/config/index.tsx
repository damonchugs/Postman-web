import React, { useState } from "react";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import Style from './index.less';

import Param from './param/index';
import Headers from './header/index';

import { ConfigRequestType } from "@/pages/PostMan/config_type";

const ConfigRequest: React.FC<ConfigRequestType> = (props: ConfigRequestType) => {
  return (
    <div className={Style['config-request']}>
      <Tabs type="card">
        <TabPane tab="Param" key="1">
          <Param changeParam={props.changeParam} />
        </TabPane>
        <TabPane tab="Header" key="2">
          <Headers />
        </TabPane>
      </Tabs>
    </div>
  )
};

export default ConfigRequest;