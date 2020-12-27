import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesController } from './controllers/coffees.controller';
import { RecommendCoffeeController } from './controllers/recommend-coffee.controller';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { Event, EventSchema } from '../events/entities/event.entity';
import { CoffeesService } from './services/coffees.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Coffee.name, schema: CoffeeSchema },
            { name: Event.name, schema: EventSchema }
        ])
    ],
    controllers: [
        CoffeesController,
        RecommendCoffeeController
    ],
    providers: [
        CoffeesService
    ],
})
export class CoffeesModule { }
