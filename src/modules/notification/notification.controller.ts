import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SMSRequestDTO, EmailRequestDTO, PushNotificationDTO } from './dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  @UseGuards(AuthGuard('api-key'))
  sendEmail(@Body() requestData: EmailRequestDTO) {
    return this.notificationService.sendEmailToRecipients(requestData);
  }

  @Post('sms')
  @UseGuards(AuthGuard('api-key'))
  sendSMS(@Body() requestData: SMSRequestDTO) {
    return this.notificationService.sendSMSToRecipients(requestData);
  }

  @Post('push_notification')
  @UseGuards(AuthGuard('api-key'))
  sendPushNotification(@Body() requestData: PushNotificationDTO) {
    return this.notificationService.sendPushNotificationToRecipients(
      requestData,
    );
  }
}
