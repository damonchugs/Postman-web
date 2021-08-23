import React, { useState, useEffect } from 'react';

import Style from './index.less';

import SearchBox from './search/index';
import ConfigRequest from './config/index';
import Response from './response/index';

import Request from '@/utils/http/http-axios';

import { ParamType } from '@/pages/PostMan/config_type';

const defaultResponse: any = [
  { key: 'name1', title: 'name1', children: [{ key: 'name2', title: 'name2',}] },
  { key: 'name3', title: 'name3', children: [{ key: 'name4', title: 'name4',}] },
];

const Home: React.FC = (props) => {
  let [address, setAddress] = useState('');
  let [postType, setPostType] = useState('GET');
  let [param, setParam] = useState({});
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
    console.log(postType, '--');
  };

  // 修改请求参数
  const changeParam = (val: ParamType) => {
    setParam(param = val);
    console.log(param, '---')
  };

  // 调用请求
  const requestUrl = (address: string, postType: string, param: ParamType) => {
    console.log(address, postType, param);
    let data = {};
    param.map((t: any) => {
      data[t.name] = t.value
    })
    Request(address, data, postType).then((Response: any) => {
      console.log(Response, '---');
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
      <ConfigRequest changeParam={changeParam} />
      {/* 显示请求数据 */}
      <Response response={response} />
    </div>
  )
};
 
export default Home;

// export default connect(({ RequestInfo, loading }: { RequestInfo: RequestModelState; loading: Loading }) => ({
//   RequestInfo,
//   loading: loading.models.index,
// }))(Home);