import { Test, TestingModule } from '@nestjs/testing';
import { RecommendCoffeeController } from './recommend-coffee.controller';

describe('RecommendCoffeeController', () => {
    let controller: RecommendCoffeeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RecommendCoffeeController],
        }).compile();

        controller = module.get<RecommendCoffeeController>(RecommendCoffeeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
