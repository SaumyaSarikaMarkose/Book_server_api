import { Book } from "../entity/books.entity";
import { BookRepository } from "../repositories/book.repository";
import { ISuccessResponse } from "../types";

class BookService {
    async getAllBooks(): Promise<ISuccessResponse> {
        try {
          const userData = await BookRepository.find();
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
    


      async createBook(bookData: Book): Promise<ISuccessResponse> {
        try {
          const data = await BookRepository.save(bookData);
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


      async deleteBook(userId: number): Promise<ISuccessResponse> {
        try {
          const { affected } = await BookRepository.delete(userId);
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
      
    

      async updateBook(id:number,bookData: Partial<Book>): Promise<ISuccessResponse> {
        try {
          // Check if the book exists before attempting to update
          const existingBook = await BookRepository.findOneBy({
            id: id,
        });
          if (!existingBook) {
            return {
              success: false,
              code: 404,
              message: "Book not found.",
              data: null,
            };
          }
      
          // Update the book record
          const result = await BookRepository.update(id, bookData);
      
          // Return success response if at least one record was affected
          if (result.affected === 0) {
            return {
              success: false,
              code: 400,
              message: "No changes were made.",
              data: null,
            };
          }
      
          // Optionally, retrieve and return the updated book data
          const updatedBook = await BookRepository.findOneBy({
            id: id,
        });
          return {
            code: 200,
            success: true,
            message: "Book updated successfully.",
            data: updatedBook,
          };
      
        } catch (error) {
          return {
            success: false,
            code: 500,
            message: "Failed to update book details.",
            data: null,
          };
        }
      }
      
}

export default new BookService();
