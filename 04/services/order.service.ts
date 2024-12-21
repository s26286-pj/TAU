import { PaymentInfo, PaymentService } from './payment.service';
import { InventoryService } from './inventory.service';
import { NotificationService } from './notification.service';

export class OrderService {
    constructor(
        private paymentService: PaymentService,
        private inventoryService: InventoryService,
        private notificationService: NotificationService
    ) {}

    placeOrder(order: { productId: string, quantity: number, userId: string, paymentInfo: PaymentInfo }) {
        if (!this.inventoryService.isProductAvailable(order.productId, order.quantity)) {
            throw new Error("Product not available in the requested quantity.");
        }

        try {
            this.paymentService.processPayment(order.paymentInfo);
        } catch (error: any) {
            console.log("Payment failed. Please try again.")
            return { status: "Order failed", orderId: this.generateOrderId() };
        }
        
        this.inventoryService.reserveProduct(order.productId, order.quantity);
        this.notificationService.sendNotification(order.userId, "Order placed successfully!");

        return { status: "Order confirmed", orderId: this.generateOrderId() };
    }

    private generateOrderId(): string {
        return Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
