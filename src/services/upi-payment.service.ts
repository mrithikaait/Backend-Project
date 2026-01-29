import { PaymentService } from './payment.service';

export class UpiPaymentService extends PaymentService {
  pay(amount: number): string {
    return `Paid ₹${amount} using UPI`;
  }
}
