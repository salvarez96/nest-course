import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CONFIG.PORT);
  console.log(`App is running on port ${CONFIG.PORT}`);
}
void bootstrap();
