import React, { useState } from "react";

import { Input, Select, Row, Col } from 'antd';

import Style from './index.less';

import { ConfigRequestType, ParamType } from "@/pages/PostMan/config_type";

const defaultParam: any = [
  { name: 'Count', value: '1' },
  { name: 'UserId', value: '1' },
  { name: 'Type', value: '1' },
  { name: '', value: '' },
];

const ConfigRequestParam: React.FC<ConfigRequestType> = (props: ConfigRequestType) => {
  let [param, setParam] = useState(defaultParam);

  // 监听修改
  const inputChange = (val: any, index: Number) => {
    // 新增数据
    if (index === param.length - 1 && val.target.value !== '') {
      val.target.blur()
      const params = [...param, { name: '', value: '' }]
      setParam(param = params)
      val.target.focus()
    } else {
      // 修改数据
      const key = val.target.getAttribute('data-value');
      if (key === 'name' && val.target.value === '') {
        param[index]['value'] = '';
        setParam(param = param);
        param = param.filter((t: any, idx: number) => idx !== index);
      } else {
        param[index][key] = val.target.value;
      }
      setParam(param = param);
      props.changeParam(param);
    }
  };

  return (
    <div className={Style['config-request-param']}>
      <Row className={Style.header}>
        <Col span={12}>key</Col>
        <Col span={12}>value</Col>
      </Row>
      {param.map((t: any, index: number) => {
        return (<Input.Group compact key={`config-request-param_${index}`}>
                  <Input style={{ width: '50%' }} data-value="name" defaultValue={t.name} onChange={(val) => inputChange(val, index)} />
                  <Input style={{ width: '50%' }} data-value="value" defaultValue={t.value} onChange={(val) => inputChange(val, index)} />
                </Input.Group>)
      })}
      
    </div>
  )
};

export default ConfigRequestParam;