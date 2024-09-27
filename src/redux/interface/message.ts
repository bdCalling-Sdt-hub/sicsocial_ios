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
  


  export interface ICreateMessage {
    chatId: string;
    image?: File | string;
    text?: string;
    audio?: File | string;
    path?: string;
  }
  