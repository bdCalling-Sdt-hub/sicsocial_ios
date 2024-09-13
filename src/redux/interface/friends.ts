import { IFetchStatus } from "./main";

export interface IFriend {
  _id: string;
  avatar: string;
  fullName: string;
}
export interface IFriends extends IFetchStatus {
  data: Array<IFriend>;
}
