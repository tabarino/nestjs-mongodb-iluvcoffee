import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { Coffee } from '../entities/coffee.entity';
import { Event } from '../../events/entities/event.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectConnection() private readonly conn: Connection,
        @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
        @InjectModel(Event.name) private readonly eventModel: Model<Event>
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async findOne(id: string) {
        const coffee = await this.coffeeModel.findOne({ _id: id }).exec();

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
            // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        }

        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = new this.coffeeModel(createCoffeeDto);
        return coffee.save();
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = await this.coffeeModel.findOneAndUpdate(
            { _id: id },
            { $set: updateCoffeeDto },
            { new: true } // This option says to Mongo returns the updated record
        ).exec();

        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return existingCoffee;
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return coffee.remove();
    }

    /**
     * Transactions do not work on Standalone MongoDB
     * Only works on MongoDB with Replica Sets
     */
    async recommendCoffee(id: string) {
        const coffee = await this.findOne(id);
        const session = await this.conn.startSession();
        session.startTransaction();

        try {
            const recommendEvent = new this.eventModel({
                name: 'recommend_coffee',
                type: 'coffee',
                payload: { coffeeId: coffee.id }
            });

            coffee.recommendations++;

            await recommendEvent.save({ session });
            await coffee.save({ session });

            await session.commitTransaction();
        } catch (err) {
            console.log(err);
            await session.abortTransaction();
        } finally {
            await session.endSession();
        }
    }
}
