import { z } from 'zod';
import countryCodesData from '@/data/country-codes.json';
import { categories, home } from '@/lib/catalog';

const HUMAN_NAME_MESSAGE = 'Please enter your real full name';
const EMAIL_MESSAGE = 'Please enter a valid email address';
const PHONE_MESSAGE = 'Please enter a valid phone number';
const CITY_MESSAGE = 'Please enter a real project city';
const REQUIREMENTS_MESSAGE = 'Please describe your project requirements in a sentence';
const COUNTRY_CODE_MESSAGE = 'Please select a valid country code';

export const TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT = 3000;
export const countryCodeRecords = countryCodesData as { country: string; dialCode: string }[];

const allowedCountryCodes = new Set(countryCodeRecords.map((country) => country.dialCode));
const allowedScopes = new Set([
  ...categories.map((category) => category.title),
  home.contact.ui.customEngineering,
]);

function looksGeneratedName(value: string) {
  const compact = value.replace(/[\s.'-]/g, '');

  if (compact.length < 16) {
    return false;
  }

  const hasSeparator = /[\s.'-]/.test(value);
  const asciiLetters = compact.match(/[A-Za-z]/g) ?? [];
  const vowels = compact.match(/[aeiou]/gi)?.length ?? 0;
  const vowelRatio = asciiLetters.length > 0 ? vowels / asciiLetters.length : 1;
  let caseTransitions = 0;

  for (let index = 1; index < compact.length; index += 1) {
    const previous = compact[index - 1];
    const current = compact[index];

    if (previous && current && /[A-Za-z]/.test(previous) && /[A-Za-z]/.test(current)) {
      const previousIsUpper = previous !== previous.toLowerCase();
      const currentIsUpper = current !== current.toLowerCase();

      if (previousIsUpper !== currentIsUpper) {
        caseTransitions += 1;
      }
    }
  }

  return !hasSeparator && (vowelRatio < 0.25 || caseTransitions >= 5);
}

function looksGeneratedPlace(value: string) {
  const compact = value.replace(/[\s.'-]/g, '');
  const asciiLetters = compact.match(/[A-Za-z]/g) ?? [];

  if (asciiLetters.length < 5) {
    return false;
  }

  const vowels = compact.match(/[aeiou]/gi)?.length ?? 0;
  const vowelRatio = vowels / asciiLetters.length;

  return !/[\s.'-]/.test(value) && vowelRatio < 0.25;
}

function isLikelyValidPhoneNumber(value: string) {
  if (!/^[+\d\s().-]+$/.test(value)) {
    return false;
  }

  const digits = value.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 14 && !/^(\d)\1+$/.test(digits);
}

function isLikelyValidEmail(value: string) {
  const [localPart, domain = ''] = value.split('@');
  const disposableDomains = new Set([
    '10minutemail.com',
    'guerrillamail.com',
    'mailinator.com',
    'tempmail.com',
    'temp-mail.org',
    'yopmail.com',
  ]);

  if (!localPart || !domain || disposableDomains.has(domain)) {
    return false;
  }

  const localSegments = localPart.split(/[._-]+/).filter(Boolean);
  const singleCharacterSegments = localSegments.filter((segment) => segment.length === 1).length;

  return singleCharacterSegments < 4;
}

function hasMeaningfulRequirements(value: string) {
  if (/https?:\/\/|www\./i.test(value)) {
    return false;
  }

  const words = value.match(/[\p{L}\p{N}]+/gu) ?? [];
  const letters = value.match(/\p{L}/gu) ?? [];

  return words.length >= 4 && letters.length >= 12 && /\s/.test(value);
}

export const inquiryFieldSchemas = {
  name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be 80 characters or less')
    .regex(/^[\p{L}\p{M} .'-]+$/u, HUMAN_NAME_MESSAGE)
    .refine((value) => !looksGeneratedName(value), HUMAN_NAME_MESSAGE),
  email: z.string()
    .trim()
    .toLowerCase()
    .max(254, EMAIL_MESSAGE)
    .email(EMAIL_MESSAGE)
    .refine(isLikelyValidEmail, EMAIL_MESSAGE),
  phone: z.string()
    .trim()
    .min(6, PHONE_MESSAGE)
    .max(20, PHONE_MESSAGE)
    .refine(isLikelyValidPhoneNumber, PHONE_MESSAGE),
  countryCode: z.string()
    .trim()
    .refine((value) => allowedCountryCodes.has(value), COUNTRY_CODE_MESSAGE),
  city: z.string()
    .trim()
    .min(2, 'Please enter your project city')
    .max(80, CITY_MESSAGE)
    .regex(/^[\p{L}\p{M} .'-]+$/u, CITY_MESSAGE)
    .refine((value) => !looksGeneratedPlace(value), CITY_MESSAGE),
  scope: z.string()
    .trim()
    .refine((value) => allowedScopes.has(value), 'Please select a valid project scope'),
  requirements: z.string()
    .trim()
    .min(20, REQUIREMENTS_MESSAGE)
    .max(
      TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT,
      `Technical requirements must be ${TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT} characters or less`,
    )
    .refine(hasMeaningfulRequirements, REQUIREMENTS_MESSAGE),
};

export type InquiryFieldName = keyof typeof inquiryFieldSchemas;

export function validateInquiryField(field: InquiryFieldName, value: string) {
  const result = inquiryFieldSchemas[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export const inquirySchema = z.object({
  ...inquiryFieldSchemas,
  countryName: z.string()
    .trim()
    .max(80, COUNTRY_CODE_MESSAGE)
    .optional(),
  utmSource: z.string().optional(),
  referrer: z.string().optional(),
  pagePath: z.string().optional(),
}).superRefine((value, ctx) => {
  if (!value.countryName) {
    return;
  }

  const hasMatchingCountry = countryCodeRecords.some((country) => (
    country.country === value.countryName && country.dialCode === value.countryCode
  ));

  if (!hasMatchingCountry) {
    ctx.addIssue({
      code: 'custom',
      path: ['countryCode'],
      message: COUNTRY_CODE_MESSAGE,
    });
  }
});

export type InquiryInput = z.infer<typeof inquirySchema>;
