import { Repository } from "typeorm";
import { myDataSource } from "../app-data-source";
import { Book } from "../entity/books.entity";

export const BookRepository:Repository<Book> = myDataSource.getRepository(Book)