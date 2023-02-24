import {
  EmailChannelRequest,
  GeneralChannelRequest,
  PushNotificationChannelRequest,
  SMSChannelRequest,
} from './type';
import { snakeCase } from 'lodash';

import axios from 'axios';

class ChannelRequestHandler<Request extends GeneralChannelRequest> {
  protected _appId: string;
  protected _apiKey: string;
  constructor(appId: string, apiKey: string) {
    this._appId = appId;
    this._apiKey = apiKey;
  }
  async sendNotification(
    params: Request,
  ): ReturnType<typeof axios.post> | null {
    const requestBody = Object.entries(params).reduce(
      (result, [key, value]) => {
        key && (result[snakeCase(key)] = value);
        return result;
      },
      { app_id: this._appId },
    );
    try {
      const response = await axios.post(
        process.env.ONE_SIGNAL_DOMAIN ||
          'https://onesignal.com/api/v1/notifications',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${this._apiKey}`,
          },
        },
      );
      console.log('response: ', response.data);
      return response;
    } catch (e) {
      console.log('error ne: ', e.response.data);
    }
    return null;
  }
}

export class PushNotificationHandler extends ChannelRequestHandler<PushNotificationChannelRequest> {}
export class EmailNotificationHandler extends ChannelRequestHandler<EmailChannelRequest> {}
export class SMSNotificationHandler extends ChannelRequestHandler<SMSChannelRequest> {}
