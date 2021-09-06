import React, { useState, useEffect, useRef } from 'react';

import { Input, Select, AutoComplete, Popconfirm } from 'antd';

import Style from './index.less';

import Request from '@/utils/http/http-axios';

interface SearchBoxType {
  postType?: string;
  address?: string;
  setAddress?: Function;
  setPostType?: Function;
  changeAddress: Function;
  changePostType: Function;
}

import { Loading, connect } from 'umi';

export interface RequestModelState {
  postType: string;
  address: string;
  config: { param: any; header: any };
  response: any;
}

export interface PageType {
  RequestInfo: RequestModelState;
  loading: Loading;
  dispatch: any;
}

export interface SaveType {
  value: string;
}

const SearchBox: React.FC<PageType> = ({ RequestInfo, loading, dispatch }) => {
  const local = localStorage.getItem('GANPOSTMANWEBSEARCH');

  const post_type = ['GET', 'POST', 'PUT', 'OPTION'];
  const [postType, SetPostType] = useState(RequestInfo.postType);
  let [AutoOptions, SetAutoOptions] = useState<SaveType[]>(
    local ? JSON.parse(local) : [],
  );

  // 保存搜索数据
  const saveSearchData = (search: string) => {
    if (!JSON.stringify(AutoOptions).includes(search)) {
      const save: SaveType = { value: search };
      AutoOptions.unshift(save);
      AutoOptions = AutoOptions.slice(0, 10);
      localStorage.setItem('GANPOSTMANWEBSEARCH', JSON.stringify(AutoOptions));
    }
  };

  // 修改数据
  const changeState = (val: string) => {
    let param: any = [];
    let state: RequestModelState = {
      ...RequestInfo,
      address: val,
    };
    // 地址栏链接含有数据
    if (val.includes('?')) {
      const param_object = JSON.parse(
        '{"' +
          val.split('?')[1].replace(/=/g, '":"').replace(/&/g, '","') +
          '"}',
      );
      for (const key in param_object) {
        param.push({ name: key, value: param_object[key] });
      }
      param.push({ name: '', value: '' });
      dispatch({ type: 'RequestInfo/changeParam', payload: param });
    }

    dispatch({ type: 'RequestInfo/changeAddress', payload: val });
    if (val.includes('http')) {
      requestUrl(state.address, state.postType, state.config.param);
    }
  };

  // 调用请求
  const requestUrl = (address: string, postType: string, param: any) => {
    let data: any = {};
    param.map((t: { name: string; value: string }) => {
      if (t.name !== '') {
        data[t.name] = t.value;
      }
    });
    Request(address, data, postType)
      .then((Response: any) => {
        dispatch({
          type: 'RequestInfo/changeResponse',
          payload: Response,
        });
        saveSearchData(address);
      })
      .catch((error: any) => {
        console.error(error);
        dispatch({
          type: 'RequestInfo/changeResponse',
          payload: { error: error },
        });
      });
  };

  const changeTypeFoo = (state: RequestModelState) => {
    dispatch({
      type: 'RequestInfo/changeType',
      payload: { ...state },
    });
  };

  // 修改请求方式
  const changePostType = (val: string) => {
    dispatch({
      type: 'RequestInfo/changePostType',
      payload: val,
    });
  };

  // 删除历史记录
  const confirmHistoryDelete = () => {
    SetAutoOptions((AutoOptions = []));
    localStorage.setItem('GANPOSTMANWEBSEARCH', JSON.stringify([]));
  };

  // 关闭弹窗

  return (
    <div className={Style.SearchBox}>
      <Input.Group compact>
        <Select
          defaultValue={postType}
          style={{ width: '100px' }}
          onChange={(val: string) => changePostType(val)}
        >
          {post_type.map((t) => {
            return (
              <Select.Option value={t} key={t}>
                {t}
              </Select.Option>
            );
          })}
        </Select>
        {/* <Search defaultValue={RequestInfo.address} style={{ width: '100%' }} placeholder="" onSearch={(val) => changeState(val)} enterButton /> */}
        <AutoComplete
          style={{ width: 'calc(100% - 100px)' }}
          options={AutoOptions}
          placeholder="search"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input.Search
            defaultValue={RequestInfo.address}
            style={{ width: '100%' }}
            placeholder=""
            onSearch={(val) => changeState(val)}
            enterButton
          />
          {/* <Input.Search size="large" placeholder="input here" enterButton /> */}
        </AutoComplete>
      </Input.Group>
      <div className={Style.PopconfirmDiv}>
        <Popconfirm
          title="是否删除历史记录?"
          onConfirm={confirmHistoryDelete}
          okText="删除"
          cancelText="取消"
        >
          <a href="#">清除历史记录</a>
        </Popconfirm>
      </div>
    </div>
  );
};

// export default SearchBox;
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
)(SearchBox);
