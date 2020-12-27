import { Controller, Param, Put } from '@nestjs/common';
import { CoffeesService } from '../services/coffees.service';

@Controller('recommend-coffee')
export class RecommendCoffeeController {
    constructor(
        private readonly coffeesService: CoffeesService
    ) { }
    
    // localhost:3000/recommend-coffee/123
    @Put(':id')
    recommendCoffee(@Param('id') id: string) {
        return this.coffeesService.recommendCoffee(id);
    }
}
