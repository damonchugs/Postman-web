import React, { useState } from 'react';

import { Input, Select, Row, Col } from 'antd';

import Style from './index.less';

import { ParamType, RequestModelState } from '@/pages/PostMan/config_type';

import { connect, Loading } from 'umi';

export interface HeaderType {
  name?: number | string;
  value?: number | string;
}

export interface PageType {
  RequestInfo: RequestModelState;
  loading: Loading;
  dispatch?: any;
}

const defaultHeader: HeaderType[] = [
  { name: 'Content-Type', value: 'application/json;charset=utf8' },
  { name: '', value: '' },
  { name: '', value: '' },
];

const ConfigRequestHeader: React.FC<PageType> = ({
  RequestInfo,
  loading,
  dispatch,
}) => {
  // let [param, setParam] = useState<HeaderType[]>(RequestInfo.config.header);

  var param: HeaderType[] = RequestInfo.config.header;
  const header_form = [
    { value: 'application/json;charset=utf8', name: 'application/json' },
    {
      value: 'application/x-www-form-urlencoded; charset=utf-8',
      name: 'x-www-form-urlencoded',
    },
    { value: 'text/plain; charset=utf-8', name: 'text/plain' },
  ];

  // 监听修改
  const inputChange = (val: any, index: number) => {
    let params = JSON.parse(JSON.stringify(param));
    if (index === param.length - 1 && val.target.value !== '') {
      // 新增数据
      val.target.blur();
      params.push({ name: '', value: '' });
      changeHeader(params);
      val.target.focus();
    } else {
      // 修改数据
      const key = val.target.getAttribute('data-value');
      if (key === 'name' && val.target.value === '') {
        params[index]['value'] = '';
        params = params.filter((t: any, idx: number) => idx !== index);
        if (params.length === 2) {
          params.push({ name: '', value: '' });
        }
      } else {
        params[index][key] = val.target.value;
      }
      changeHeader(params);
    }
  };

  // 修改state
  const changeHeader = (param: any) => {
    dispatch({
      type: 'RequestInfo/changeHeader',
      payload: param,
    });
  };

  // 设置属性
  const addType = (e: any) => {
    const value = e.target.dataset.value;
    let index = -1;
    let params = JSON.parse(JSON.stringify(param));
    param.map((t, ind) => {
      index = t.name === 'Content-Type' ? ind : index;
    });
    if (index === -1) {
      params.unshift({ name: 'Content-Type', value });
      // 有无数据
      if (params.length > 3) {
        // 先剔除无数据单位
        params = params.filter((t: any) => t.name !== '');
        // 补充无数据单位到3
        for (var i = 0; i <= 3 - params.length; i++) {
          params.push({ name: '', value: '' });
        }
      }
      changeHeader(params);
    } else {
      params[index] = { name: 'Content-Type', value };
      changeHeader(params);
    }
  };

  return (
    <div className={Style['config-request-header']}>
      <div className={Style.SelectFormOPtions}>
        {header_form.map((t: any) => {
          return (
            <p
              data-name="name"
              data-value={t.value}
              key={t.name}
              onClick={(e) => addType(e)}
            >
              {t.name}
            </p>
          );
        })}
      </div>
      <Row className={Style.header}>
        <Col span={12} className={Style.bordeRight}>
          key
        </Col>
        <Col span={12}>value</Col>
      </Row>
      {param.map((t, index) => {
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
)(ConfigRequestHeader);
