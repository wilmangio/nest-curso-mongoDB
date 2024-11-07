import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    //Definicion de los modelos que se van añadir de la base de datos
    MongooseModule.forFeature([{
      name: Pokemon.name,
      schema: PokemonSchema,
    }])
  ],
  exports:[
    MongooseModule
  ]
})
export class PokemonModule {}
