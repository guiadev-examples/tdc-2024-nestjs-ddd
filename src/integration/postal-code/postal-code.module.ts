import { Module } from '@nestjs/common';
import { PostalCodeProvider } from './postal-code.interface';
import { BuscadorCepService } from './provider/buscadorcep.service';

@Module({
  providers: [
    {
      provide: PostalCodeProvider,
      useClass: BuscadorCepService,
    },
  ],
  exports: [PostalCodeProvider],
})
export class PostalCodeModule {}
