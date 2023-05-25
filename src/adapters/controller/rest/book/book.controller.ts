import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Book } from 'src/domain/book/book';
import { CreateBookUseCase } from 'src/usecases/create-book.usecase';
import { FindAllBooksUseCase } from 'src/usecases/find-all-books.usecase';
import { ConfigServiceModule } from '../config/config-usecase.module';

@Controller('book')
export class BookController {
  constructor(
    @Inject(ConfigServiceModule.CREATE_LIVRO_USECASE)
    private readonly CreateBookUseCase: CreateBookUseCase,
    @Inject(ConfigServiceModule.FIND_ALL_LIVRO_USECASE)
    private readonly FindAllBooksUseCase: FindAllBooksUseCase,
  ) {}

  @Get()
  public findAll(): Promise<Book[]> {
    return this.FindAllBooksUseCase.findAll();
  }

  @Post()
  public createbook(@Body() book: Book): Promise<Book> {
    return this.CreateBookUseCase.create(book);
  }
}
