import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRamanDto } from './dto/create-raman.dto';
import { UpdateRamanDto } from './dto/update-raman.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Raman } from './entities/raman.entity';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

export interface Ramen {
  id: string;
  name: string;
  description: string;
  price: number;
  spice_level: number;
}

@Injectable()
export class RamenService {
  constructor(
    @InjectModel(Raman.name)
    private readonly ramenModel: Model<Raman>,
  ) {}

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Ramen already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    if (error.status === 400) {
      throw new BadRequestException(
        error.response.message || 'Unexpected error, check server logs',
      );
    }

    if (error.status === 404) {
      throw new NotFoundException(
        error.response.message || 'Unexpected error, check server logs',
      );
    }
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }

  async create(createRamanDto: CreateRamanDto) {
    const newRamen: Ramen = {
      id: uuid(),
      name: createRamanDto.name,
      description: createRamanDto.description,
      price: createRamanDto.price,
      spice_level: createRamanDto.spice_level,
    };
    try {
      const savedRamen = await this.ramenModel.create(newRamen);

      return {
        statusCode: 201,
        msg: 'The ramen have been saved it !',
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async findAll() {
    let ramens: Ramen[] = [];
    try {
      const dbRamens = await this.ramenModel.find({ isDeleted: false });

      dbRamens.forEach((dbRamen) => {
        const ramen: Ramen = {
          id: dbRamen.id,
          name: dbRamen.name,
          description: dbRamen.description,
          price: dbRamen.price,
          spice_level: dbRamen.spice_level,
        };
        ramens.push(ramen)
      });

      return {
        statusCode: 200,
        data: { ramens },
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    let ramen: Ramen;
    try {
      const dbRamen = await this.ramenModel.findOne({
        id: id,
        isDeleted: false,
      });
      if (!dbRamen) {
        throw new NotFoundException(
          `The ramen with the id: ${id}, does not exist.`,
        );
      }
      ramen = {
        id: id,
        name: dbRamen.name,
        description: dbRamen.description,
        price: dbRamen.price,
        spice_level: dbRamen.spice_level,
      };
      return {
        statusCode: 200,
        data: { ramen },
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateRamanDto: UpdateRamanDto) {
    try {
      const dbRamen = await this.ramenModel.findOne({
        id: id,
        isDeleted: false,
      });

      if (!dbRamen)
        throw new NotFoundException(
          `The ramen with the id: ${id}, does not exist.`,
        );

      await dbRamen.updateOne(updateRamanDto);

      return {
        statusCode: 200,
        msg: 'The ramen have been update it !',
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const dbRamen = await this.ramenModel.findOne({
        id: id,
        isDeleted: false,
      });

      if (!dbRamen)
        throw new NotFoundException(
          `The ramen with the id: ${id}, does not exist.`,
        );

      dbRamen.isDeleted = true;

      await dbRamen.updateOne(dbRamen);

      return {
        statusCode: 200,
        msg: 'The ramen have been delete it !',
      };
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }
}
