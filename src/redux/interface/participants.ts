import {IFetchStatus} from './main';

export interface IParticipant {
  _id?: string;
  fullName?: string;
  avatar?: string;
}

export interface IParticipants {
  participants: Array<IParticipant>;
}
export interface IParticipantsData extends IFetchStatus {
  data: Array<IParticipant>;
}
