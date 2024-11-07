import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationShema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationShema, // objeto de validacion de variables
    }),// para cargar las variables de entorno
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot( process.env.MONGODB,{
      dbName: 'pokemondb',
    }),  //conexion a la base de datos 
    //https://docs.nestjs.com/techniques/mongodb
    PokemonModule, CommonModule, SeedModule
  ],
})
export class AppModule {
}
