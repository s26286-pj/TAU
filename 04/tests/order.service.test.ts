import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { InventoryService } from '../services/inventory.service';
import { NotificationService } from '../services/notification.service';

describe('OrderService', () => {
  let orderService: OrderService;
  let paymentService: jest.Mocked<PaymentService>;
  let inventoryService: jest.Mocked<InventoryService>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    paymentService = {
      processPayment: jest.fn(),
    } as unknown as jest.Mocked<PaymentService>;

    inventoryService = {
      isProductAvailable: jest.fn(),
      reserveProduct: jest.fn(),
    } as unknown as jest.Mocked<InventoryService>;

    notificationService = {
      sendNotification: jest.fn(),
    } as unknown as jest.Mocked<NotificationService>;

    orderService = new OrderService(paymentService, inventoryService, notificationService);
  });

  it('should successfully place an order when product is available, payment is successful, and notification is sent', () => {
    inventoryService.isProductAvailable.mockReturnValue(true);
    paymentService.processPayment.mockReturnValue(true);

    const order = {
      productId: '12345',
      quantity: 2,
      userId: 'user1',
      paymentInfo: { cardNumber: '1111-2222-3333-4444', expiry: '12/25', cvv: '123' },
    };

    const result = orderService.placeOrder(order);

    expect(inventoryService.isProductAvailable).toHaveBeenCalledWith(order.productId, order.quantity);
    expect(paymentService.processPayment).toHaveBeenCalledWith(order.paymentInfo);
    expect(inventoryService.reserveProduct).toHaveBeenCalledWith(order.productId, order.quantity);
    expect(notificationService.sendNotification).toHaveBeenCalledWith(order.userId, 'Order placed successfully!');

    expect(result).toHaveProperty('status', 'Order confirmed');
  });

  it('should throw an error if the product is not available', () => {

    const order = {
      productId: '12345',
      quantity: 2,
      userId: 'user1',
      paymentInfo: { cardNumber: '1111-2222-3333-4444', expiry: '12/25', cvv: '123' },
    };

    expect(() => orderService.placeOrder(order)).toThrow(
      'Product not available in the requested quantity.'
    );

    expect(inventoryService.isProductAvailable).toHaveBeenCalledWith(order.productId, order.quantity);

    expect(paymentService.processPayment).not.toHaveBeenCalled();
    expect(inventoryService.reserveProduct).not.toHaveBeenCalled();
    expect(notificationService.sendNotification).not.toHaveBeenCalled();
  });

  it('should handle the exception thrown by the payment service and continue processing the order', () => {
    inventoryService.isProductAvailable.mockReturnValue(true);

    paymentService.processPayment.mockImplementation(() => {
      throw new Error('Payment service error');
    });

    const order = {
      productId: '12345',
      quantity: 2,
      userId: 'user1',
      paymentInfo: { cardNumber: '1111-2222-3333-4444', expiry: '12/25', cvv: '123' },
    };

    const result = orderService.placeOrder(order);

    expect(inventoryService.isProductAvailable).toHaveBeenCalledWith(order.productId, order.quantity);
    expect(paymentService.processPayment).toHaveBeenCalledWith(order.paymentInfo);

    expect(inventoryService.reserveProduct).not.toHaveBeenCalled();
    expect(notificationService.sendNotification).not.toHaveBeenCalled();

    expect(result).toHaveProperty('status', 'Order failed');
  });
});