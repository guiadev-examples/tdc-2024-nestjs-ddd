import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class ApiDocSetup {
  public static apply(app: INestApplication) {
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
      .setTitle(configService.get('application.name'))
      .setDescription(configService.get('application.description'))
      .setVersion('1.0')
      .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'ApiKey')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidoc', app, document);
  }
}
