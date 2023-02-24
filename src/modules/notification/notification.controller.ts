import { Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  sendEmail() {
    return this.notificationService.sendEmailToRecipients([
      {
        oneSignalUserId: '21321',
        email: 'nhatthanh510@gmail.com',
        name: 'Thanh Nguyen',
        phoneNumber: '+84985143396',
      },
    ]);
  }

  @Post('sms')
  sendSMS() {
    return this.notificationService.sendSMSToRecipients([
      {
        oneSignalUserId: '21321',
        email: 'nhatthanh510@gmail.com',
        name: 'Thanh Nguyen',
        phoneNumber: '+84985143396',
      },
    ]);
  }

  @Post('push_notification')
  sendPushNotification() {
    return this.notificationService.sendPushNotificationToRecipients([
      {
        oneSignalUserId: 'aa7f8092-b29f-4713-b041-8114be1f8a39',
        email: 'nhatthanh510@gmail.com',
        name: 'Thanh Nguyen',
        phoneNumber: '+84985143396',
      },
    ]);
  }
}
