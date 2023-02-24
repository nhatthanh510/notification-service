export interface GeneralChannelRequest {
  includedSegments?: string[];
  filters?: Record<string, any>[];
  includeExternalUserIds?: string[];
}

export interface PushNotificationChannelRequest extends GeneralChannelRequest {
  contents: Record<string, string>;
  headings: Record<string, string>;
  includePlayerIds?: string[];
}

export interface EmailChannelRequest extends GeneralChannelRequest {
  emailSubject: string;
  emailBody: string;
  templateId?: string;
  includeEmailTokens: string[];
}

export interface SMSChannelRequest extends GeneralChannelRequest {
  name: string;
  smsFrom: string;
  contents: Record<string, string>;
  smsMediaUrls?: string[];
  includePhoneNumbers?: string[];
}

export type User = {
  oneSignalUserId: string;
  name: string;
  email: string;
  phoneNumber: string;
};
