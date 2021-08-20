import React, { useState } from "react";

import { Tree } from 'antd';

import Style from './index.less';

import SyntaxHighlight from "../../../utils/json-html";

const defaultTreeData = [
  { key: 'name1', title: 'name1', children: [{ key: 'name2', title: 'name2',}] },
  { key: 'name3', title: 'name3', children: [{ key: 'name4', title: 'name4',}] },
]

const Response: React.FC = () => {
  const [treeData, setTreeData] = useState(defaultTreeData)
  return (
    <div className={Style['response']}>
      {/* <Tree
        className="draggable-tree"
        draggable
        blockNode
        treeData={treeData}
      /> */}
      <pre className={'json'} dangerouslySetInnerHTML={{__html: SyntaxHighlight(treeData)}}></pre>
    </div>
  )
};

export default Response;