export interface PaymentInfo {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export class PaymentService {
    processPayment(paymentInfo: PaymentInfo): boolean {
        console.log("Processing payment with info:", paymentInfo);
        const result = Math.random() > 0.2; // 80% success rate for simulation
        if (result) {
            throw new Error("Payment failed.");
        }
        return true
    }
}
