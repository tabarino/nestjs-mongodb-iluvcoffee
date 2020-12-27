import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesController } from './controllers/coffees.controller';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { CoffeesService } from './services/coffees.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Coffee.name, schema: CoffeeSchema }
        ])
    ],
    controllers: [
        CoffeesController
    ],
    providers: [
        CoffeesService
    ],
})
export class CoffeesModule { }
