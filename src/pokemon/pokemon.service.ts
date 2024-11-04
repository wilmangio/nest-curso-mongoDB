import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {


  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try{
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    }catch( error ){
        this.handleExeption( error );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    console.log(term)
    let pokemon: Pokemon;
    if( !isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term});
    }

    //MONDOGO ID
    if( !pokemon && isValidObjectId( term )){
      pokemon = await this.pokemonModel.findById( term );
    }

    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon)
      throw new NotFoundException(`Pokemon no encontrado por ${term}`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    const pokemon = await this.findOne( term );
    if( updatePokemonDto.name )  updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      const updatePokemon = await pokemon.updateOne( updatePokemonDto , { new: true});// si va en true retoprna el nuevo objeto, si no devuelve el antiguo
      return { ... pokemon.toJSON(), ...updatePokemonDto};
    }catch( error ){
      this.handleExeption( error );
    }


  }

  async remove(id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id : id });
    if(deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);
    return;
  }

  private handleExeption(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exist in bd ${ JSON.stringify( error.keyValue)}`);
    }
    console.error( error );
    throw new InternalServerErrorException(`No se pudo crear el pokemon`);
  }
}
