import { Module } from '@nestjs/common';
import { RamenModule } from './ramen/ramen.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://white:irma0403@cluster0.zk3yt4e.mongodb.net/ramen-db'),

    MongooseModule.forRoot(
      'mongodb://10.18.208.157:27017,10.18.208.158:27017,10.18.208.212:27017/ramen-db?replicaSet=myReplicaSet',
    ),

    RamenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
