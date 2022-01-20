import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

interface ParamType {
  name?: number | string;
  value?: number | string;
}

export interface RequestModelState {
  postType: string;
  address: string;
  response: any;
  config: { param: any[]; header: any[] };
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
    changeResponse?: ImmerReducer<RequestModelState>;
    changePostType?: ImmerReducer<RequestModelState>;
    changeParam?: ImmerReducer<RequestModelState>;
    changeHeader?: ImmerReducer<RequestModelState>;
    changeAddress?: ImmerReducer<RequestModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserInfoModelState>;
  };
  subscriptions?: { setup?: Subscription };
}
const RequestModel: RequestType = {
  namespace: 'RequestInfo',
  state: {
    postType: 'GET',
    address: '',
    config: {
      param: [
        { name: '', value: '' },
        { name: '', value: '' },
        { name: '', value: '' },
      ],
      header: [
        { name: 'Content-Type', value: 'application/json;charset=utf8' },
        { name: '', value: '' },
        { name: '', value: '' },
      ],
    },
    response: { info: '暂无信息' },
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
    changePostType(state, action) {
      state.postType = decodeURI(action.payload);
    },
    changeParam(state, action) {
      state.config.param = action.payload;
    },
    changeHeader(state, action) {
      state.config.header = action.payload;
    },
    changeAddress(state, action) {
      state.address = decodeURI(action.payload);
    },
    changeResponse(state, action) {
      state.response = action.payload;
    },
    changeType(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default RequestModel;
