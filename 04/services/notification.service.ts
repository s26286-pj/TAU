export class NotificationService {
    sendNotification(userId: string, message: string): void {
        console.log(`Notification sent to user ${userId}: ${message}`);
    }
}
