import { Injectable } from '@nestjs/common';
import {
  EmailNotificationHandler,
  PushNotificationHandler,
  SMSNotificationHandler,
} from './channel';
import { EmailRequestDTO } from './dto/email_request.dto';
import { PushNotificationDTO } from './dto/push_notification.dto';
import { SMSRequestDTO } from './dto/sms_request.dto';

@Injectable()
export class NotificationService {
  private _oneSignalAppId = process.env.ONE_SIGNAL_APP_ID;
  private _oneSignalApiKey = process.env.ONE_SIGNAL_REST_API_KEY;
  private _pushNotificationHandler: PushNotificationHandler;
  private _emailNotificationHandler: EmailNotificationHandler;
  private _smsNotificationHandler: SMSNotificationHandler;

  constructor() {
    this._pushNotificationHandler = new PushNotificationHandler(
      this._oneSignalAppId,
      this._oneSignalApiKey,
    );

    this._emailNotificationHandler = new EmailNotificationHandler(
      this._oneSignalAppId,
      this._oneSignalApiKey,
    );

    this._smsNotificationHandler = new SMSNotificationHandler(
      this._oneSignalAppId,
      this._oneSignalApiKey,
    );
  }

  async sendEmailToRecipients(request: EmailRequestDTO) {
    await this._emailNotificationHandler.sendNotification({
      emailSubject: request.emailSubject,
      emailBody: request.emailContent,
      includeEmailTokens: request.emails,
    });
  }

  async sendSMSToRecipients(request: SMSRequestDTO) {
    await this._smsNotificationHandler.sendNotification({
      smsFrom: process.env.TWILIO_PHONE_NUMBER,
      name: request.name,
      contents: request.contents,
      includePhoneNumbers: request.phone_numbers,
    });
  }

  async sendPushNotificationToRecipients(request: PushNotificationDTO) {
    await this._pushNotificationHandler.sendNotification({
      contents: request.contents,
      headings: request.headings,
      includePlayerIds: request.player_ids,
      includeExternalUserIds: request.one_signal_user_ids,
      includedSegments: request.segments,
    });
  }
}
