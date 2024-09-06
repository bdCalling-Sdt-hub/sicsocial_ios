export interface IFetchStatus {
  message: string;
  success: boolean;
}
export interface IFetchPagination {
  totalNotification: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ITeacherUser extends IFetchStatus {
  data: {
    __v: number;
    _id: any;
    contact: string;
    createdAt: Date;
    email: string;
    location: string;
    name: string;
    password: string;
    profile: string;
    role: string;
    status: boolean;
    totalStudent: number;
    updatedAt: Date;
  };
}
export interface IStudentUser extends IFetchStatus {
  data: {
    _id: string;
    name: string;
    password: string;
    role: string;
    dateOfBirth: string;
    profile: string;
    class: string;
    teacher: string;
    points: number;
    level: number;
    rewards: number;
    pendingPoints: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface IStudent {
  _id: string;
  name: string;
  password: string;
  dateOfBirth: Date;
  profile: string;
  class: string;
  teacher: string;
  points: number;
  level: number;
  rewards: number;
  pendingPoints: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IStudents extends IFetchStatus , IFetchPagination {
  data: Array<IStudent>;
}
export interface IClass {
  _id: string;
  className: string;
  startDate: Date;
  endDate: Date;
  teacher: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IClasses extends IFetchStatus , IFetchPagination {
  data: Array<IClass>;
}
export interface ICategory {
  _id: string;
  name: string;
  image: string;
  teacher: string;
  createdAt: Date;
  updatedAt: DataView;
  __v: number;
}

export interface ICategories extends IFetchStatus {
  data: Array<ICategory>;
}
export interface ITask {
  _id: string;
  name: string;
  points: number;
  category: {
    _id: string;
    name: string;
    image: string;
    teacher: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  type: string;
  repeat: string;
  teacher: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ITasks extends IFetchStatus, IFetchPagination {
  data: Array<ITask>;
}
export interface IReword {
  _id: string;
  name: string;
  requiredPoints: number;
  image: string;
  teacher: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRewards extends IFetchStatus {
  data: Array<IReword>;
}
export interface IPendingTask {
  _id: string;
  task: ITask;
  student: IStudent;
  teacher: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IPendingTasks extends IFetchStatus {
  data: Array<IPendingTask>;
}
export interface IAssignTask {
  _id: string;
  task: ITask;
  student: string;
  teacher: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAssignTasks extends IFetchStatus {
  data: Array<IAssignTask>;
}
export interface IAssignReword {
  _id: string;
  reward: IReword;
  student: IStudent;
  teacher: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAssignRewards extends IFetchStatus {
  data: Array<IAssignReword>;
}
export interface IPreset {
  _id: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPresets extends IFetchStatus {
  data: Array<IPreset>;
}

export interface IAssignStudentTask {
  _id: string;
  task: ITask;
  student: string;
  teacher: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  status: 'notStarted' | 'inProgress';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAssignStudentTasks extends IFetchStatus {
  data: Array<IAssignStudentTask>;
}
export interface IAssignStudentReword {
  _id: string;
  reward: IReword;
  student: string;
  teacher: {
    _id: string;
    name: string;
    email: string;
    profile: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAssignStudentRewards extends IFetchStatus {
  data: Array<IAssignStudentReword>;
}
export interface IEarnedStudentReword {
  _id: string;
  reward: IReword;
  student: string;
  teacher: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IEarnedStudentRewards extends IFetchStatus {
  data: Array<IEarnedStudentReword>;
}

export interface IStatistics extends IFetchStatus {
  data: {
    level: number;
    points: number;
    totalAssignTask: number;
    totalCompletedTask: number;
    totalUnCompletedTask: number;
  };
}

export interface INotification {
  _id: string;
  recipient:string;
  recipientModel: string;
  message: string;
  read: boolean;
  role: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface INotifications extends IFetchStatus , IFetchPagination {
  data:Array<INotification>
}

