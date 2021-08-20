import React, { useState, useEffect, useRef } from 'react';

import { Input, Select } from 'antd';

const { Option } = Select;
const { Search } = Input;

import Style from './index.less';

interface SearchBoxType {
  postType?: string,
  address?: string,
  setAddress?: Function,
  setPostType?: Function,
  changeAddress: Function,
  changePostType: Function,
}

const SearchBox: React.FC<SearchBoxType> = (props: SearchBoxType) => {
  const post_type = ['GET', 'POST', 'PUT', 'OPTION'];
  return (
    <div className={Style.SearchBox}>
      <Input.Group compact>
        <Select defaultValue={post_type[0]} style={{ width: '100px' }} onChange={(val: string) => props.changePostType(val)}>
          {post_type.map(t => {
            return (<Option value={t} key={t}>{t}</Option>)
          })}
        </Select>
        <Search style={{ width: 'calc(100% - 100px)' }} placeholder="input search text" onSearch={(val) => props.changeAddress(val)} enterButton />
      </Input.Group>
    </div>
  )
};

export default SearchBox;