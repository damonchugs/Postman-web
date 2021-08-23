import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
export interface RequestModelState {
  postType: string;
  address: string;
  config: { param: Object, header: Object },
  response: any
}
export interface RequestType {
  namespace: 'Request';
  state: RequestModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<RequestModelState>;
    setState: Reducer<RequestModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserInfoModelState>;
  };
  subscriptions: { setup: Subscription };
}
const RequestModel: RequestType = {
  namespace: 'Request',
  state: {
    postType: 'GET',
    address: '',
    config: { param: {}, header: {} },
    response: {}
  },
  effects: {
    *query({ payload }, { call, put }) {
    },
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
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};
export default RequestModel;