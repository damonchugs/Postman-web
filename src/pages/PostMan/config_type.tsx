export interface ConfigRequestType {
  changeParam?: Function,
  config?: object
};

export interface ParamType {
  name: string;
  value: string | number;
};

export interface ResponseType {
  response?: Object
}[];

export interface RequestModelState {
  postType: string;
  address: string;
  response: any;
  config: { param: any[], header: ParamType[] };
}