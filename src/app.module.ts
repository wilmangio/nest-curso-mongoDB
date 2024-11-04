import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot("mongodb://localhost:27017/nest-pokemon"),  //conexion a la base de datos 
    //https://docs.nestjs.com/techniques/mongodb
    PokemonModule, CommonModule
  ],
})
export class AppModule {}
