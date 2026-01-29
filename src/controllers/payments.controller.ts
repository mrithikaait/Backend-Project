import { Controller, Post, Query } from '@nestjs/common';
import { CardPaymentService } from '../services/card-payment.service';
import { UpiPaymentService } from '../services/upi-payment.service';

@Controller('payments')
export class PaymentsController {
  private cardService = new CardPaymentService();
  private upiService = new UpiPaymentService();

  @Post()
  pay(@Query('type') type: string, @Query('amount') amount: number) {
    if (type === 'card') {
      return this.cardService.pay(amount);
    } else {
      return this.upiService.pay(amount);
    }
  }
}
