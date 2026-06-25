export interface IMyCoursesResponse {
  status: string;
  data: IEnrolledCourse[];
  meta: IMeta;
}
export interface IMeta {
  total: number;
  pages: number;
  page: number;
  limit: number;
}
export interface IEnrolledCourse {
  course: ICourse;
  teacher: ITeacher;
  progress: IProgress;
  examStatus: IExamStatus;
  certificate: ICertificate;
}

export interface ICourse {
  _id: string;
  courseVideo: string;
  title: string;
  description: string;
  categories: ICategory[];
  courseLevel: ICourseLevel;
  courseImage: string;
  rating: number;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICourseLevel {
  _id: string;
  name: string;
}

export interface ITeacher {
  _id: string;
  name: string;
  profileImage: string;
}

export interface IProgress {
  watchedSeconds: number;
  totalSeconds: number;
  percent: number;
  isCompleted: boolean;
}

export interface IExamStatus {
  taken: boolean;
}

export interface ICertificate {
  issued: boolean;
}
