import { Test, TestingModule } from '@nestjs/testing';
import { RuProductService } from './ru-product.service';

describe('RuProductService', () => {
  let service: RuProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuProductService],
    }).compile();

    service = module.get<RuProductService>(RuProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
