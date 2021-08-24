import React, { useState, useEffect } from 'react';

import Style from './index.less';

import SearchBox from './search/index';
import ConfigRequest from './config/index';
import Response from './response/index';

import Request from '@/utils/http/http-axios';

import { ParamType } from '@/pages/PostMan/config_type';

const defaultResponse: any = [
  { key: 'name1', title: 'title1', children: [{ key: 'name2', title: 'title2',}] },
  { key: 'name3', title: 'title3', children: [{ key: 'name4', title: 'title4',}] },
];

import { Loading, connect } from 'umi';

export interface RequestModelState {
  postType: string;
  address: string;
  config: { param: Object, header: Object },
  response: any
}

export interface HomePageType {
  RequestInfo: RequestModelState;
  loading: Loading,
  dispatch: any
}

const Home: React.FC<HomePageType> = ({ RequestInfo, loading, dispatch }) => {
  let [address, setAddress] = useState(RequestInfo.address);
  let [postType, setPostType] = useState(RequestInfo.postType);
  let [param, setParam] = useState(RequestInfo.config.param);
  // const { header, setHeader } = useState({});
  // const { cookies, setCookies } = useState('');
  let [response, setResponse] = useState(defaultResponse);

  // 点击修改请求地址 - 并请求接口
  const changeAddress = (val: string) => {
    setAddress(address = val);
    if (val.includes('http')) {
      requestUrl(address, postType, param)
    }
  };

  // 修改请求方式
  const changePostType = (val: string) => {
    setPostType(postType = val);
    dispatch({
      type: 'RequestInfo/changeType',
      payload: {
        ...RequestInfo,
        postType: val
      }
    })
  };

  // 修改请求参数
  const changeParam = (val: ParamType) => {
    setParam(param = val);
  };

  // 调用请求
  const requestUrl = (address: string, postType: string, param: any) => {
    let data: any = {};
    param.map((t: { name: string, value: string }) => {
      if (t.name !== '') {
        data[t.name] = t.value
      }
    })
    Request(address, data, postType).then((Response: any) => {
      setResponse(response = Response);
    }).catch((error: any) => {
      console.error(error);
      setResponse(response = { error: error });
    });
  };

  return (
    <div className={Style.AppHome}>
      <h1>GAN-POSTMAN-WEB</h1>
      {/* 地址栏和请求类型 */}
      <SearchBox changeAddress={(val: string) => changeAddress(val)} changePostType={(val: string) => changePostType(val)} />
      {/* param和header参数设置，后续加上cookies */}
      <ConfigRequest />
      {/* 显示请求数据 */}
      <Response response={response} />
    </div>
  )
};

export default connect(
  ({ RequestInfo, loading, dispatch }: { RequestInfo: RequestModelState; loading: Loading; dispatch: any }) => ({
    RequestInfo,
    loading: loading.models.index,
    dispatch,
  }),
)(Home);