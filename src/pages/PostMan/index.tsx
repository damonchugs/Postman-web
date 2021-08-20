import React, { useState, useEffect } from 'react';

import Style from './index.less';

import SearchBox from './search/index';
import ConfigRequest from './config/index';
import Response from './response/index';

const Home: React.FC = () => {
  let [address, setAddress] = useState('');
  let [postType, setPostType] = useState('GET');
  // const { param, setParam } = useState('');
  // const { header, setHeader } = useState({});
  // const { cookies, setCookies } = useState('');
  // const { response, setResponse } = useState({});

  const changeAddress = (val: string) => {
    setAddress(address = val);
    console.log(address, '--');
  };
  const changePostType = (val: string) => {
    setPostType(postType = val);
    console.log(postType, '--');
  };
  return (
    <div className={Style.AppHome}>
      <h1>GAN-POSTMAN-WEB</h1>
      {/* 地址栏和请求类型 */}
      <SearchBox changeAddress={(val: string) => changeAddress(val)} changePostType={(val: string) => changePostType(val)} />
      {/* param和header参数设置，后续加上cookies */}
      <ConfigRequest />
      {/* 显示请求数据 */}
      <Response />
    </div>
  )
};
 
export default Home;