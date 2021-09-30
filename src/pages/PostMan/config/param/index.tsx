import React, { useState } from 'react';

import { Input, Select, Row, Col } from 'antd';

import Style from './index.less';

import { ParamType, RequestModelState } from '@/pages/PostMan/config_type';

import { connect, Loading } from 'umi';

interface PageType {
  RequestInfo: RequestModelState;
  loading: Loading;
  dispatch?: any;
}

const ConfigRequestParam: React.FC<PageType> = ({
  RequestInfo,
  loading,
  dispatch,
}) => {
  // let [param, setParam] = useState([...RequestInfo.config.param]);
  // setParam(param = [...RequestInfo.config.param]);

  let param = [...RequestInfo.config.param];

  // 监听修改
  const inputChange = (val: any, index: any) => {
    let address: any = RequestInfo.address;
    let param_s: any = JSON.parse(JSON.stringify(param));
    // 新增数据
    if (index === param_s.length - 1 && val.target.value !== '') {
      val.target.blur();
      param_s = [...param_s, { name: '', value: '' }];
      // 修改地址
      address = address.split('?')[0] + addressChecked(param_s);
      changeAddress(address);
      changeState(param_s);
      val.target.focus();
    } else {
      // 修改数据
      const key = val.target.getAttribute('data-value');
      if (key === 'name' && val.target.value === '') {
        param_s[index]['value'] = '';
        param_s = param_s.filter((t: any, idx: number) => idx !== index);
      } else {
        param_s[index][key] = val.target.value;
      }
      changeState(param_s);
      address = address.split('?')[0] + addressChecked(param_s);
      changeAddress(address);
    }
    // 如果链接上面有参数则修改参数
  };

  // 修改state
  const changeState = (param: any, header: any = RequestInfo.config.header) => {
    dispatch({
      type: 'RequestInfo/changeType',
      payload: {
        ...RequestInfo,
        config: { param, header },
      },
    });
  };

  // 修改state
  const changeAddress = (address: string) => {
    dispatch({
      type: 'RequestInfo/changeAddress',
      payload: address,
    });
  };

  // 修改address
  const addressChecked = (param: any) => {
    let str = '';
    param
      .filter((t: any) => t.name !== '')
      .map((t: any) => {
        str += `${t.name}=${t.value}&`;
      });
    return '?' + str.slice(0, -1);
  };

  // // 修改Address
  // const changeAddress = (header: any) => {
  //   dispatch({
  //     type: 'RequestInfo/changeAddress',
  //     payload: {
  //       ...RequestInfo,
  //       config: { header },
  //     },
  //   });
  // };

  return (
    <div className={Style['config-request-param']}>
      <Row className={Style.header}>
        <Col span={12} className={Style.bordeRight}>
          key
        </Col>
        <Col span={12}>value</Col>
      </Row>
      {param.map((t: ParamType, index: number) => {
        return (
          <Input.Group compact key={`config-request-param_${index}`}>
            <Input
              style={{ width: '50%' }}
              data-value="name"
              value={t.name}
              onChange={(val) => inputChange(val, index)}
            />
            <Input
              style={{ width: '50%' }}
              data-value="value"
              value={t.value}
              onChange={(val) => inputChange(val, index)}
            />
          </Input.Group>
        );
      })}
    </div>
  );
};

// export default ConfigRequestParam;
export default connect(
  ({
    RequestInfo,
    loading,
    dispatch,
  }: {
    RequestInfo: RequestModelState;
    loading: Loading;
    dispatch: any;
  }) => ({
    RequestInfo,
    loading: loading.models.index,
    dispatch,
  }),
)(ConfigRequestParam);
