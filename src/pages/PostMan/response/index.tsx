import React, { useState } from "react";

import { Tree } from 'antd';

import Style from './index.less';

import SyntaxHighlight from "../../../utils/json-html";

import { ResponseType } from '@/pages/PostMan/config_type';

const Response: React.FC<ResponseType> = (props: ResponseType) => {
  const [response, setResponse] = useState(props.response)
  return (
    <div className={Style['response']}>
      {/* <Tree
        className="draggable-tree"
        draggable
        blockNode
        treeData={treeData}
      /> */}
      <pre className={'json'} dangerouslySetInnerHTML={{__html: SyntaxHighlight(props.response)}}></pre>
    </div>
  )
};

export default Response;