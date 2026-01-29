import * as nodemailer from 'nodemailer';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';

const hbs =
  require('nodemailer-express-handlebars').default ||
  require('nodemailer-express-handlebars');

export const createTransporter = (configService: ConfigService) => {
  const user = configService.get<string>('MAIL_USER');
  const pass = configService.get<string>('MAIL_PASS');

  console.log('MAIL USER:', user);
  console.log('MAIL PASS:', pass);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  // Setup handlebars template engine
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.hbs',
        defaultLayout: false,
      },
      viewPath: join(process.cwd(), 'src/mail/templates'),
      extName: '.hbs',
    }),
  );

  return transporter;
};
