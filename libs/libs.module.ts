import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';

@Module({
  imports: [],  //modül üzerindeki herşeye appmodülden erişim sağlarız.
  providers: [ResourceService],
})
export class LibsModule{

}
