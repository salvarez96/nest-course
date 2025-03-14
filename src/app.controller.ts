import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

type DoubleParamEndpoint = {
  id: string;
  name: string;
};
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new-endpoint')
  getNewEndpoint(): string {
    return 'This is the new endpoint';
  }

  @Get('new-endpoint/:id')
  getNewEndpointWithId(@Param('id') id: string): string {
    return 'This is the new endpoint with id: ' + id;
  }

  @Get('new-endpoint/:id/route/:name')
  getNewEndpointWithIdAndName(
    @Param() { id, name }: DoubleParamEndpoint,
  ): string {
    return 'This is the new endpoint with id: ' + id + ' and name: ' + name;
  }
}
