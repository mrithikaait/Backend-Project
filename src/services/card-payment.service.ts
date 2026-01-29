import { PaymentService } from './payment.service';

export class CardPaymentService extends PaymentService {
  pay(amount: number): string {
    return `Paid ₹${amount} using CARD`;
  }
}
