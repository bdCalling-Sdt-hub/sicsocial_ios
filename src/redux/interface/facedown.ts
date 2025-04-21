import {IFetchStatus} from './main';

export interface IFacedown {
  _id: string;
  createdBy: string;
  name: string;
  image: string;
  bookImage: string;
  bookUrl: string;
  description: string;
  schedule: string;
  createdAt: Date;
  chatId: string;
  updatedAt: Date;
  __v: 0;
}

export interface IFacedowns extends IFetchStatus {
  data: IFacedown[];
}
export interface IFacedownSingle extends IFetchStatus {
  data: IFacedown;
}
