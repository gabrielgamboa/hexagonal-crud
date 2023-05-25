import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { BookEntity } from '../entities/book.entity';
import { BookRepositoryTypeORM } from '../book.repository.typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bookstore',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([BookEntity, AuthorEntity]),
  ],
  providers: [BookRepositoryTypeORM],
  exports: [BookRepositoryTypeORM],
})
export class TypeOrmConfigModule {}
