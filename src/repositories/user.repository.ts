import { Repository } from "typeorm";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

export const UserRepository:Repository<User> = myDataSource.getRepository(User)