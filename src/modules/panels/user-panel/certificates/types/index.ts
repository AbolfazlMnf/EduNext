export interface ICertificateResponse {
  status: string;
  data: ICertificate[];
}

export interface ICertificate {
  _id: string;
  user: string;
  course: ICourseCertificate | null;
  code: string;
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICourseCertificate {
  _id: string;
  courseVideo: string;
  title: string;
  description: string;
  categories: string[];
  courseLevel: string;
  teacher: string;
  courseImage: string | null;
  rating: number;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
