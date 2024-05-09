import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRamanDto } from './dto/create-raman.dto';
import { UpdateRamanDto } from './dto/update-raman.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Raman } from './entities/raman.entity';
import { Model } from 'mongoose';

interface Ramen {
  id: string;
  name: string;
  price: number;
  spice_level: number;
  ingredients: string[]
}

@Injectable()
export class RamenService {

  constructor(
    @InjectModel(Raman.name)
    private readonly ramenModel: Model<Raman>
  ){}

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Ramen already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Cant create Ramen - Check server logs`,
    );
  }

  async create(createRamanDto: CreateRamanDto) {
    const newRamen: Ramen = {
      id: "1",
      name: createRamanDto.name,
      price: createRamanDto.price,
      spice_level: createRamanDto.spice_level,
      ingredients: createRamanDto.ingredients.length > 0 ? createRamanDto.ingredients : []
    }
    try {
      const savedRamen = await this.ramenModel.create(newRamen);

      return {
        statusCode: 201,
        msg: "The ramen have been saved it !"
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all ramen`;
  }

  findOne(id: string) {
    return `This action returns a #${id} raman`;
  }

  update(id: string, updateRamanDto: UpdateRamanDto) {
    return `This action updates a #${id} raman`;
  }

  remove(id: string) {
    return `This action removes a #${id} raman`;
  }
}
