import React, { useState, useEffect, useRef } from 'react';

import { Input, Select } from 'antd';

const { Option } = Select;
const { Search } = Input;

import Style from './index.less';

import Request from '@/utils/http/http-axios';

interface SearchBoxType {
  postType?: string,
  address?: string,
  setAddress?: Function,
  setPostType?: Function,
  changeAddress: Function,
  changePostType: Function,
}

import { Loading, connect } from 'umi';

export interface RequestModelState {
  postType: string;
  address: string;
  config: { param: Object, header: Object },
  response: any
}

export interface PageType {
  RequestInfo: RequestModelState;
  loading: Loading,
  dispatch: any
}

const SearchBox: React.FC<PageType> = ({ RequestInfo, loading, dispatch }) => {
  const post_type = ['GET', 'POST', 'PUT', 'OPTION'];
  const [postType, SetPostType] = useState(RequestInfo.postType)

  // 修改数据
  const changeState = (val: string) => {
    let param: any = []
    const state: RequestModelState = {
      ...RequestInfo,
      address: val
    }
    // 地址栏链接含有数据
    if (val.includes('?')) {
      const param_object = JSON.parse('{"' + val.split('?')[1].replace(/=/g, '":"').replace(/&/g, '","') + '"}');
      for(const key in param_object) {
        param.push({ name: key, value: param_object[key] })
      }
      param.push({ name: '', value: '' })
      state.address = val // .split('?')[0]
      state.config.param = param
    }
    
    if (val.includes('http')) {
      requestUrl(state.address, state.postType, state.config.param)
    } else {
      changeTypeFoo(state);
    }
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
      changeTypeFoo({
        ...RequestInfo,
        response: Response
      })
    }).catch((error: any) => {
      console.error(error);
      changeTypeFoo({
        ...RequestInfo,
        response: { error: error }
      })
    });
  };

  const changeTypeFoo = (state: RequestModelState) => {
    dispatch({
      type: 'RequestInfo/changeType',
      payload: { ...state }
    })
  }

  return (
    <div className={Style.SearchBox}>
      <Input.Group compact>
        <Select defaultValue={postType} style={{ width: '100px' }} onChange={(val: string) => changeState(val)}>
          {post_type.map(t => {
            return (<Option value={t} key={t}>{t}</Option>)
          })}
        </Select>
        <Search defaultValue={RequestInfo.address} style={{ width: 'calc(100% - 100px)' }} placeholder="input search text" onSearch={(val) => changeState(val)} enterButton />
      </Input.Group>
    </div>
  )
};

// export default SearchBox;
export default connect(
  ({ RequestInfo, loading, dispatch }: { RequestInfo: RequestModelState; loading: Loading; dispatch: any }) => ({
    RequestInfo,
    loading: loading.models.index,
    dispatch,
  }),
)(SearchBox);