import { User } from "../entity/user.entity";

export interface ISuccessResponse {
  success: boolean;
  message: string;
  code: number;
  data: any;
}



export interface IUserService{

  getAllUsers(): Promise<ISuccessResponse>;
  getOneUser(id:number): Promise<ISuccessResponse>;
  createUser(user: User): Promise<ISuccessResponse>;
  deleteUser(id: number): Promise<ISuccessResponse>;
  
}