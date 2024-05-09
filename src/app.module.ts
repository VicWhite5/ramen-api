import { Module } from '@nestjs/common';
import { RamenModule } from './ramen/ramen.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    
    MongooseModule.forRoot('mongodb+srv://white:irma0403@cluster0.zk3yt4e.mongodb.net/ramen-db'),

    RamenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
