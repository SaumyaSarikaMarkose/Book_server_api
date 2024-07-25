import {
    JsonController,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    Authorized,
  } from "routing-controllers";
  import { Request, Response } from "express";
  import responseHandler from "../utils/responsehandler";
  import userService from "../service/user.services";
  
  
  @JsonController("/auth")
  export class AuthController {
  
  


    @Post()
    async Login(
      @Body() authDetail: any,
      @Req() request: Request,
      @Res() response: Response
    ) {
      const users = await userService.login(authDetail);
      if (users.success) {
        return response
          .json(responseHandler.success(users.data, users.message, users.code))
          .status(200);
      } else {
        return response
          .json(responseHandler.error(users.code, users.message))
          .status(500);
      }
    }
}
