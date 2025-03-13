import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CONFIG.PORT);
}
bootstrap()
  .then(() => console.log('Project is running'))
  .catch((error) =>
    console.error("There's a problem with the project: ", error),
  );
