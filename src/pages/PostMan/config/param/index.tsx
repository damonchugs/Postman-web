import React, { useState } from "react";

import { Input, Select, Row, Col } from 'antd';

import Style from './index.less';

const defaultParam = [
  { name: 'id', value: '' },
  { name: 'name', value: '' },
  { name: 'age', value: '' },
  { name: '', value: '' },
]

const ConfigRequestParam: React.FC = () => {
  let [param, setParam] = useState(defaultParam);

  const inputChange = (val: any, index: Number) => {
    console.log(val.target.value, index, '--')
    if (index === param.length - 1 && val.target.value !== '') {
      val.target.blur()
      const params = [...param, { name: '', value: '' }]
      setParam(param = params)
      val.target.focus()
    }
    
  };

  return (
    <div className={Style['config-request-param']}>
      <Row className={Style.header}>
        <Col span={12}>key</Col>
        <Col span={12}>value</Col>
      </Row>
      {param.map((t, index) => {
        return (<Input.Group compact key={`config-request-param_${index}`}>
                  <Input style={{ width: '50%' }} defaultValue={t.name} onChange={(val) => inputChange(val, index)} />
                  <Input style={{ width: '50%' }} defaultValue={t.value} onChange={(val) => inputChange(val, index)} />
                </Input.Group>)
      })}
      
    </div>
  )
};

export default ConfigRequestParam;