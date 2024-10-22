export interface ICoder {
  createdAt: Date;
  name: string;
  avatar: string;
  id: string;
}

export interface ICreateCoder{
  name: string;
  avatar: string;
}
