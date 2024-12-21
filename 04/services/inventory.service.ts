export class InventoryService {
    private inventory: { [productId: string]: number } = {
        "product1": 100,
        "product2": 50,
        "product3": 200
    };

    isProductAvailable(productId: string, quantity: number): boolean {
        return !!this.inventory[productId] && this.inventory[productId] >= quantity;
    }

    reserveProduct(productId: string, quantity: number): void {
        if (this.isProductAvailable(productId, quantity)) {
            this.inventory[productId] -= quantity;
            console.log(`Reserved ${quantity} of ${productId}. Remaining stock: ${this.inventory[productId]}`);
        } else {
            throw new Error("Insufficient inventory.");
        }
    }
}
