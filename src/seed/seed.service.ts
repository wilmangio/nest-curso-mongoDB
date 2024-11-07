import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
  ){}

  

  async executeSEED() {

    await this.pokemonModel.deleteMany({}); // Hace el deleted de toda la base de datos

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    //const insertPromiseArray = [];
    const pokemonToInsert: {name:string, no:number}[] = [];

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2];
      pokemonToInsert.push({name, no});
      // insertPromiseArray.push(
      //   this.pokemonModel.create( {name, no} ) // insertamos las promesas
      // );
      //const pokemon = await this.pokemonModel.create( {name, no} );
    });

    //await Promise.all ( insertPromiseArray );
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed execute';
  }

}
