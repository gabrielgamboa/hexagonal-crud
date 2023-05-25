import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorEntity } from './author.entity';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @ManyToOne((type) => AuthorEntity, (autor) => autor.books, {
    cascade: ['insert'],
    eager: true,
  })
  author: AuthorEntity;
}
