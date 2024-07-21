import { Test, TestingModule } from '@nestjs/testing';
import { RuProductController } from './ru-product.controller';
import { RuProductService } from './ru-product.service';

describe('RuProductController', () => {
  let controller: RuProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuProductController],
      providers: [RuProductService],
    }).compile();

    controller = module.get<RuProductController>(RuProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
