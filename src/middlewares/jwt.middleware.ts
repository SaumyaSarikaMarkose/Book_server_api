import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Action } from "routing-controllers";
const jwt = require('jsonwebtoken');



export const authChecker = async (action: Action, roles: string[]) => {
    try{
    const token = action.request.headers['authorization'];
  console.log(token);
  
    if (!token) {
        return false;
      }
    let verified = await jwt.verify(token, 'MY_SECRET')
    if(verified) return true;
    }
    catch(err){
        return false
    }
      
  }
