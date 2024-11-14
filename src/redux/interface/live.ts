import {IFetchStatus} from './main';
import {IUserSingle} from './user';

export interface ILive {
  _id: string;
  chat: string;
  host: string;
  activeUsers: Array<IActiveLiveUser>;
  __v: 0;
}

export interface IActiveLiveUser {
  user: IUserSingle;
  role: 'host' | 'audience';
  uid: number;
  joinTime: string;
  token: string;
  _id: string;
}

export interface ISingleLive extends IFetchStatus {
  data: ILive;
}
