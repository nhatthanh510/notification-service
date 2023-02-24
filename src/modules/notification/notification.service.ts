import { Injectable } from '@nestjs/common';
import {
  EmailNotificationHandler,
  PushNotificationHandler,
  SMSNotificationHandler,
  User,
} from './channel';

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

  async sendEmailToRecipients(users: User[]) {
    await this._emailNotificationHandler.sendNotification({
      emailSubject: 'Test Email',
      emailBody: 'Hello world!',
      includeEmailTokens: users.map((user) => user.email),
    });
  }

  async sendSMSToRecipients(users: User[]) {
    await this._smsNotificationHandler.sendNotification({
      smsFrom: process.env.TWILIO_PHONE_NUMBER,
      name: 'Test Notification Service ne',
      contents: { en: 'English content ne' },
      includePhoneNumbers: users.map((user) => user.phoneNumber),
    });
  }

  async sendPushNotificationToRecipients(users: User[]) {
    await this._pushNotificationHandler.sendNotification({
      contents: { en: 'English content ne' },
      headings: { en: 'English heading ne' },
      includedSegments: ['Subscribed Users'],
    });
  }
}
