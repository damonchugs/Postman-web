import React, { useState } from "react";

import { Input, Select, Row, Col } from 'antd';

import Style from './index.less';

import { ParamType, RequestModelState } from "@/pages/PostMan/config_type";

import { connect, Loading } from 'umi';

interface PageType {
  RequestInfo: RequestModelState;
  loading: Loading,
  dispatch?: any
};

const ConfigRequestParam: React.FC<PageType> = ({ RequestInfo, loading, dispatch }) => {
  // let [param, setParam] = useState([{ name: '', value: '' },{ name: '', value: '' },{ name: '', value: '' }]);
  // setParam(param = );
  
  let param = [...RequestInfo.config.param]

  // 监听修改
  const inputChange = (val: any, index: Number) => {
    // 新增数据
    if (index === param.length - 1 && val.target.value !== '') {
      val.target.blur();
      const params = [...param, { name: '', value: '' }];
      changeState(params);
      val.target.focus();
    } else {
      // 修改数据
      const key = val.target.getAttribute('data-value');
      if (key === 'name' && val.target.value === '') {
        param[index]['value'] = '';
        param = param.filter((t: any, idx: number) => idx !== index);
      } else {
        param[index][key] = val.target.value;
      }
      changeState(param);
    }
  };

  // 修改state
  const changeState = (param: any) => {
    dispatch({
      type: 'RequestInfo/changeType',
      payload: {
        ...RequestInfo,
        config: { param, header: RequestInfo.config.header },
      }
    })
  };
  return (
    <div className={Style['config-request-param']}>
      <Row className={Style.header}>
        <Col span={12}>key</Col>
        <Col span={12}>value</Col>
      </Row>
      {param.map((t: ParamType, index: number) => {
        return (<Input.Group compact key={`config-request-param_${index}`}>
                  <Input style={{ width: '50%' }} data-value="name" value={t.name} onChange={(val) => inputChange(val, index)} />
                  <Input style={{ width: '50%' }} data-value="value" value={t.value} onChange={(val) => inputChange(val, index)} />
                </Input.Group>)
      })}
      
    </div>
  )
};

// export default ConfigRequestParam;
export default connect(
  ({ RequestInfo, loading, dispatch }: { RequestInfo: RequestModelState; loading: Loading; dispatch: any }) => ({
    RequestInfo,
    loading: loading.models.index,
    dispatch,
  }),
)(ConfigRequestParam);