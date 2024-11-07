import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [ AxiosAdapter ],
    exports: [ AxiosAdapter ] // lo exponermos para que los demas modulos lo vean 
})
export class CommonModule {}
