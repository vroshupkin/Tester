import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ENV } from './env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	
	const config = new DocumentBuilder()
		.setTitle('Tester')
		.setDescription('Tester API description')
		.setVersion('0.1')
		.addTag('tester')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(ENV.PORT);
}
bootstrap();
