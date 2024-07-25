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
  import bookService from "../service/book.service";
  
  
  @JsonController("/books")
  export class BooksController {
  
    @Get()
    @Authorized() 
    async getAllBooks(@Req() request: Request, @Res() response: Response) {
      const book = await bookService.getAllBooks();
     
      if (book.success) {
        return response
          .json(responseHandler.success(book.data, book.message, book.code))
          .status(200);
      } else {
        return response
          .json(responseHandler.error(book.code, book.message))
          .status(500);
      }
    }


    @Post()
    @Authorized() 
    async postBook(
      @Body() book: any,
      @Req() request: Request,
      @Res() response: Response
    ) {
      const users = await bookService.createBook(book);
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


    @Put("/:id")
    @Authorized() 
    async editUser(@Param("id") id: number, @Body() book: any, @Res() response: Response) {
        const books = await bookService.updateBook(id,book);
        if (books.success) {
          return response
            .json(responseHandler.success(books.data, books.message, books.code))
            .status(200);
        } else {
          return response
            .json(responseHandler.error(books.code, books.message))
            .status(500);
        }
    }




    @Delete("/:id")
    @Authorized() 
    async removeBook(
      @Param("id") id: number,
      @Req() request: Request,
      @Res() response: Response
    ) {
      const book = await bookService.deleteBook(id);
      console.log(book)
      if (book.success) {
          return response
            .json(responseHandler.success(book.data, book.message, book.code))
            .status(200);
        } else {
          return response
            .json(responseHandler.error(book.code, book.message))
            .status(500);
        }
    }
}