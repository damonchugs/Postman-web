import React, { useState } from "react";

import { Tree } from 'antd';

import './index.less';

import SyntaxHighlight from "../../../utils/json-html";

import { ResponseType } from '@/pages/PostMan/config_type';

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
  dispatch?: any
}

const Response: React.FC<PageType> = ({ RequestInfo, loading }) => {
  const [response, setResponse] = useState(RequestInfo.response)
  return (
    <div className={'response'}>
      {/* <Tree
        className="draggable-tree"
        draggable
        blockNode
        treeData={treeData}
      /> */}
      <pre className="json" dangerouslySetInnerHTML={{__html: SyntaxHighlight(RequestInfo.response)}}></pre>
    </div>
  )
};

// export default Response;
export default connect(
  ({ RequestInfo, loading, dispatch }: { RequestInfo: RequestModelState; loading: Loading; dispatch: any }) => ({
    RequestInfo,
    loading: loading.models.index,
    dispatch,
  }),
)(Response);