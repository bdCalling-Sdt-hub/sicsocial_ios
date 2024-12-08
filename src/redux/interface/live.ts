import {IFetchStatus} from './main';
import {IUserSingle} from './user';

export interface ILive {
  _id: string;
  chat: string;
  book: {
    _id: string;
    name: string;
    publisher: string;
    bookImage: string;
    bookUrl: string;
  };
  createBy: string;
  name: string;
  activeUsers: Array<IActiveLiveUser>;
  __v: 0;
}

export interface IActiveLiveUser {
  user: IUserSingle;
  role: 'host' | 'audience';
  uid: number;
  joinTime: string;
  token: string;
  isMute: boolean;
  _id: string;
}

export interface ISingleLive extends IFetchStatus {
  data: ILive;
}
