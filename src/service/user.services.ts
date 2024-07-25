// UserService.ts

import { User } from "../entity/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { ISuccessResponse, IUserService } from "../types";
var jwt = require('jsonwebtoken');

 class UserService implements IUserService {

  async getAllUsers(): Promise<ISuccessResponse> {
    try {
      const userData = await UserRepository.find();
      return {
        code: 200,
        success: true,
        message: "User Data Fetched successfully.",
        data: userData,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "Failed To Fetch User Details.",
        data: null,
      };
    }
  }

  async getOneUser(userId: number): Promise<ISuccessResponse> {
    try {
      const userData = await UserRepository.findOneBy({
        id: +userId,
      });
      if (!userData) {
        return {
          code: 404, // Use 404 status code for "Not Found" error
          success: false,
          message: "User not found.",
          data: null,
        };
      }

      return {
        code: 200,
        success: true,
        message: "User Data Fetched successfully.",
        data: userData,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "Failed To Fetch User Details.",
        data: null,
      };
    }
  }

  async createUser(userData: User): Promise<ISuccessResponse> {
    try {
      const data = await UserRepository.save(userData);
      return {
        code: 201,
        success: true,
        message: "User Data Saved successfully.",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "Failed To Save User Details.",
        data: null,
      };
    }
  }

  async deleteUser(userId: number): Promise<ISuccessResponse> {
    try {
      const { affected } = await UserRepository.delete(userId);
      if (!affected) {
        return {
          code: 404,
          success: false,
          message: "User Not exist.",
          data: null,
        };
      }
      return {
        code: 204,
        success: true,
        message: "User Data Deleted successfully.",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "Failed To Delete User Details.",
        data: null,
      };
    }
  }
  


  async login(userdata): Promise<ISuccessResponse> {
    try {
      const userData = await UserRepository.findOneBy({
        email: userdata.email,
        password:userdata.password
      });
    if(!userData){
      return {
        code: 404,
        success: false,
        message: "User Not exist.",
        data: null,
      };
    }

    
    console.log(userData);
    
    const token = jwt.sign({ userMail:userData.email,user:userData.firstName }, 'MY_SECRET', { expiresIn: '20m' });
  
      return {
        code: 204,
        success: true,
        message: "Token generated successfully.",
        data: {token},
      };
    } catch (error) {
      return {
        success: false,
        code: 500,
        message: "error in creation of token",
        data: null,
      };
    }
  }
}

export default new UserService();
