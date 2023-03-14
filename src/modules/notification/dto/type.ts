import {
  isObject,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

const SupportedLanguages = [
  'en',
  'fr',
  'es',
  'pt',
  'ar',
  'zh',
  'ru',
  'ja',
] as const;

export type SupportedLanguage = (typeof SupportedLanguages)[number];

export function IsLanguageRecord(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isLanguageRecord',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!isObject(value)) return false;
          if (Object.keys(value).length === 0) return false;
          const keys = Object.keys(value);

          return keys.every((key) => {
            if (typeof key != 'string') return false;
            if (!SupportedLanguages.includes(key as SupportedLanguage))
              return false;

            return /^[a-z0-9\s\-\@]*$/gi.test(value[key]);
          });
        },
      },
    });
  };
}
