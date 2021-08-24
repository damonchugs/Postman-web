import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

interface ParamType {
  name: string,
  value: number | string,
};

export interface RequestModelState {
  postType: string;
  address: string;
  response: any;
  config: { param: any[], header: ParamType[] };
}
export interface RequestType {
  namespace: 'RequestInfo';
  state: RequestModelState;
  effects?: {
    query: Effect;
  };
  reducers?: {
    save?: Reducer<RequestModelState>;
    setState?: Reducer<RequestModelState>;
    changeType?: Reducer<RequestModelState>;
    changeResponse?: Reducer<RequestModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserInfoModelState>;
  };
  subscriptions?: { setup: Subscription };
}
const RequestModel: RequestType = {
  namespace: 'RequestInfo',
  state: {
    postType: 'GET',
    address: '',
    config: {
      param: [{ name: '', value: '' },{ name: '', value: '' },{ name: '', value: '' }],
      header: [{ name: '', value: '' },{ name: '', value: '' },{ name: '', value: '' }]
    },
    response: { info: '暂无信息' }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeType(state, action) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
};
export default RequestModel;