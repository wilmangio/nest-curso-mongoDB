import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{
    //para que importe metodos de mongoose
    // id:string mongo lo da

    @Prop({
        unique:true,
        index: true,
    })
    name:string;

    @Prop({
        unique:true,
        index: true,
    })
    no:number;
}


export const PokemonSchema = SchemaFactory.createForClass( Pokemon );