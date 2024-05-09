import { Module } from '@nestjs/common';
import { RamenService } from './ramen.service';
import { RamenController } from './ramen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Raman, RamenSchema } from './entities/raman.entity';

@Module({
  controllers: [RamenController],
  providers: [RamenService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Raman.name,
        schema: RamenSchema
      }
    ])
  ]
})
export class RamenModule {}
