import {IFetchStatus} from './main';

export interface IBook {
  _id: string;
  createdBy: string;
  name: string;
  publisher: string;
  category: string;
  bookImage: string;
  pdf: string;
  bookUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface ISingleBook extends IFetchStatus {
  data: IBook;
}

export interface IBooks extends IFetchStatus {
  data: IBook[];
}
