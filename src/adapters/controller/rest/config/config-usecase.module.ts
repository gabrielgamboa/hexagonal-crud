import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmConfigModule } from 'src/adapters/repository/typeorm/config/typeorm-config.module';
import { BookRepositoryTypeORM } from 'src/adapters/repository/typeorm/book.repository.typeorm';
import { CreateBookUseCase } from 'src/usecases/create-book.usecase';
import { FindAllBooksUseCase } from 'src/usecases/find-all-books.usecase';

@Module({
  imports: [TypeOrmConfigModule],
})
export class ConfigServiceModule {
  static FIND_ALL_LIVRO_USECASE = 'FindAllLivroUseCase';
  static CREATE_LIVRO_USECASE = 'CreateLivroUseCase';

  static register(): DynamicModule {
    return {
      module: ConfigServiceModule,
      providers: [
        {
          inject: [BookRepositoryTypeORM],
          provide: ConfigServiceModule.CREATE_LIVRO_USECASE,
          useFactory: (bookRepository: BookRepositoryTypeORM) =>
            new CreateBookUseCase(bookRepository),
        },
        {
          inject: [BookRepositoryTypeORM],
          provide: ConfigServiceModule.FIND_ALL_LIVRO_USECASE,
          useFactory: (bookRepository: BookRepositoryTypeORM) =>
            new FindAllBooksUseCase(bookRepository),
        },
      ],
      exports: [
        ConfigServiceModule.FIND_ALL_LIVRO_USECASE,
        ConfigServiceModule.CREATE_LIVRO_USECASE,
      ],
    };
  }
}
