export abstract class PaymentService {
  abstract pay(amount: number): string;
}
