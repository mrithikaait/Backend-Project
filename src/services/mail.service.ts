import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { join } from 'path';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('mail.host');
    const port = this.configService.get<number>('mail.port');
    const user = this.configService.get<string>('mail.user');
    const pass = this.configService.get<string>('mail.pass');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass },
    });
  }

  // 🔥 ESM FIX HAPPENS HERE
  async onModuleInit() {
    const hbsModule = await import('nodemailer-express-handlebars');
    const hbs = hbsModule.default;

    this.transporter.use(
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
  }

  async sendWelcome(to: string, name: string, email: string) {
    try {
      const fromMail = this.configService.get<string>('mail.user');

      await this.transporter.sendMail({
        from: `"My App" <${fromMail}>`,
        to,
        subject: 'Welcome Mail',

        template: 'welcome',
        context: {
          name,
          email,
        },
      } as any); // 👈 TS FIX

      return { message: 'Mail sent successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Mail sending failed');
    }
  }
}
