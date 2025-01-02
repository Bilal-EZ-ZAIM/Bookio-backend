import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookService } from './book.service'; 
import { Book } from './schema/book.schema';

describe('BooksService', () => {
  let service: BookService;
  let bookModel: any;

  beforeEach(async () => {
    const mockBookModel = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { title: 'Book 1', author: 'Author 1' },
          { title: 'Book 2', author: 'Author 2' },
        ]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookModel = module.get(getModelToken(Book.name));
  });

  it('should return all books for findAll()', async () => {
    const books = await service.findAll();
    expect(bookModel.find).toHaveBeenCalled();
    expect(books).toEqual([
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ]);
  });

  it('should return all books for findAllWithSelect()', async () => {
    const books = await service.findAllWithSelect();
    expect(bookModel.find).toHaveBeenCalled();
    expect(books).toEqual([
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ]);
  });
});
