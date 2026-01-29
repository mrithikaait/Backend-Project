import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from '../services/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() body: any) {
    console.log('MAIL API HIT:', body);

    const { to, name, email } = body;

    return this.mailService.sendWelcome(to, name, email);
  }
}
