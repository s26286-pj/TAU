import { OrderService } from './services/order.service';
import { PaymentService } from './services/payment.service';
import { InventoryService } from './services/inventory.service';
import { NotificationService } from './services/notification.service';

const paymentService = new PaymentService();
const inventoryService = new InventoryService();
const notificationService = new NotificationService();

const orderService = new OrderService(paymentService, inventoryService, notificationService);

try {
    const order = orderService.placeOrder({
        productId: "product1",
        quantity: 2,
        userId: "user123",
        paymentInfo: { cardNumber: "4111111111111111", expiry: "12/25", cvv: "123" }
    });

    console.log(order);
} catch (error: any) {
    console.error(error.message);
}
