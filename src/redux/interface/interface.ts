export interface IFetchStatus {
  message: string;
  success: boolean;
}

export interface IUser extends IFetchStatus {
  data: {
    __v: 0;
    _id: string;
    avatar: string;
    createdAt: Date;
    email: string;
    fullName: string;
    interests: [];
    isPrivateProfile: boolean;
    phoneNumber: string;
    role: string;
    status: string;
    updatedAt: Date;
  };
}

export interface IParticipants {
  participants: Array<{
    _id: string;
    fullName: string;
    avatar: string;
  }>;
}

export interface ILastMessage {
  lastMessage: {
    _id: string;
    sender: {
      _id: string;
      fullName: string;
    };
    path: string;
    image: string;
    text: string;
    audio: string;
    createdAt: Date;
  };
}

export interface INewFeed extends IParticipants ,ILastMessage {
  _id: string;
  type: string;
  facedown: any;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;

}
export interface INewFeeds extends IFetchStatus {
  data: Array<INewFeed>;
}

export interface Chat extends IParticipants, ILastMessage {
  _id: string;
  type: 'private';
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IChats extends IFetchStatus {
  data: Array<Chat>;
}

export interface ICreateChat {
  participants?: Array<string>;
  type: 'public' | 'friend' | 'group' | 'facedown';
  facedown?: string;
}
export interface ICreateMessage {
  chatId: string;
  image?: File | string;
  text?: string;
  audio?: File | string;
  path?: string;
}
