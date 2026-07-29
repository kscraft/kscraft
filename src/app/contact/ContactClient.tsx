'use client';

import * as React from 'react';
import { useActionState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import countryCodesData from '@/data/country-codes.json';
import { catalog, categories, home, faqs } from '@/lib/catalog';
import { Check, CheckCircle2, ChevronDown, CircleAlert, HelpCircle, Mail, MapPin, Phone, Search, Send } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, InstagramIcon } from '@/components/SocialIcons';
import ThemeMarker from '@/components/ThemeMarker';
import SpecProcess from '@/components/SpecProcess';
import { submitInquiry } from '@/app/actions';
import type { InquiryActionState } from '@/app/actions';
import { trackFormStart, trackClientEvent } from '@/lib/analytics-client';
import {
  TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT,
  validateInquiryField,
  type InquiryFieldName,
} from '@/lib/inquiry-validation';

const initialState: InquiryActionState = {
  success: false,
  message: '',
  errors: undefined,
};

const contactContainerClass = 'mx-auto w-[calc(100vw-3rem)] max-w-[1320px] sm:w-full min-[1920px]:max-w-[1760px]';
const TURNSTILE_SITE_KEY = '0x4AAAAAAEAl-DGJqphLw0Wv';
const countryCodes = [...(countryCodesData as { country: string; iso2: string; dialCode: string }[])]
  .sort((a, b) => {
    if (a.iso2 === 'IN') return -1;
    if (b.iso2 === 'IN') return 1;
    return a.country.localeCompare(b.country) || a.dialCode.localeCompare(b.dialCode);
  });

type CountryCode = (typeof countryCodes)[number];

type CountryTrieNode = {
  children: Map<string, CountryTrieNode>;
  indexes: Set<number>;
};

function createCountryTrieNode(): CountryTrieNode {
  return {
    children: new Map(),
    indexes: new Set(),
  };
}

function normalizeCountrySearch(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, ' ')
    .trim();
}

function insertCountryTrieValue(root: CountryTrieNode, value: string, index: number) {
  let node = root;

  for (const char of value) {
    let child = node.children.get(char);

    if (!child) {
      child = createCountryTrieNode();
      node.children.set(char, child);
    }

    child.indexes.add(index);
    node = child;
  }
}

function createCountrySearchTrie(countries: CountryCode[]) {
  const root = createCountryTrieNode();
  const countriesByDialLength = [...countries].sort((a, b) => {
    const aLength = a.dialCode.replace(/\D/g, '').length;
    const bLength = b.dialCode.replace(/\D/g, '').length;
    return bLength - aLength || a.country.localeCompare(b.country);
  });

  countries.forEach((country, index) => {
    const dialDigits = country.dialCode.replace(/\D/g, '');
    const searchValues = new Set([
      country.country,
      country.iso2,
      country.dialCode,
      dialDigits,
      `${country.country} ${country.dialCode}`,
      `${country.dialCode} ${country.country}`,
    ]);

    for (const word of country.country.split(/\s+/)) {
      searchValues.add(word);
    }

    for (const value of searchValues) {
      const normalizedValue = normalizeCountrySearch(value);
      if (normalizedValue) {
        insertCountryTrieValue(root, normalizedValue, index);
      }
    }
  });

  return {
    search(query: string) {
      const normalizedQuery = normalizeCountrySearch(query);
      const dialQuery = normalizedQuery.replace(/\D/g, '');

      if (!normalizedQuery) {
        return countries;
      }

      let node = root;

      for (const char of normalizedQuery) {
        const child = node.children.get(char);
        if (!child) {
          if (!dialQuery) {
            return [];
          }

          return countriesByDialLength.filter((country) => {
            const dialDigits = country.dialCode.replace(/\D/g, '');
            return dialQuery.startsWith(dialDigits) || dialDigits.startsWith(dialQuery);
          });
        }
        node = child;
      }

      const trieMatches = [...node.indexes].sort((a, b) => a - b).map((index) => countries[index]);

      if (!dialQuery) {
        return trieMatches;
      }

      const reverseMatches = countriesByDialLength.filter((country) => {
        const dialDigits = country.dialCode.replace(/\D/g, '');
        return dialQuery.startsWith(dialDigits);
      });
      const reverseMatchCodes = new Set(reverseMatches.map((country) => country.iso2));

      return [
        ...reverseMatches,
        ...trieMatches.filter((country) => !reverseMatchCodes.has(country.iso2)),
      ];
    },
  };
}

function CountryCodePicker({
  hasError,
  onChange,
}: {
  hasError: boolean;
  onChange: (dialCode: string) => void;
}) {
  const india = countryCodes.find((country) => country.iso2 === 'IN') || countryCodes[0];
  const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>(india);
  const [isOpen, setIsOpen] = React.useState(false);
  const [menuPlacement, setMenuPlacement] = React.useState<'top' | 'bottom'>('bottom');
  const [query, setQuery] = React.useState('');
  const listboxId = React.useId();
  const countrySearchTrie = React.useMemo(() => createCountrySearchTrie(countryCodes), []);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const filteredCountries = React.useMemo(() => {
    return countrySearchTrie.search(query);
  }, [countrySearchTrie, query]);

  const togglePicker = () => {
    const triggerBox = triggerRef.current?.getBoundingClientRect();

    if (triggerBox && window.innerWidth >= 640) {
      const expectedMenuHeight = Math.min(360, window.innerHeight * 0.7);
      const spaceBelow = window.innerHeight - triggerBox.bottom;
      const spaceAbove = triggerBox.top;
      setMenuPlacement(spaceBelow < expectedMenuHeight && spaceAbove > spaceBelow ? 'top' : 'bottom');
    } else {
      setMenuPlacement('bottom');
    }

    setIsOpen((open) => !open);
  };

  return (
    <div
      className="relative"
      onBlur={(event) => {
        const nextFocus = event.relatedTarget;
        if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
          setIsOpen(false);
        }
      }}
    >
      <input type="hidden" name="countryCode" value={selectedCountry.dialCode} />
      <input type="hidden" name="countryName" value={selectedCountry.country} />
      <button
        ref={triggerRef}
        type="button"
        aria-label="Country code"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-describedby={hasError ? 'contact-phone-error' : undefined}
        data-invalid={hasError ? 'true' : undefined}
        onClick={togglePicker}
        className="flex h-14 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-left text-white outline-none transition-all hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 data-[invalid=true]:border-red-400"
      >
        <span className="min-w-0">
          <span className="block text-sm font-bold leading-none">{selectedCountry.dialCode}</span>
          <span className="mt-1 block truncate text-xs font-medium text-slate-400">{selectedCountry.country}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close country code picker"
            className="fixed inset-0 z-[110] bg-slate-950/40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className={[
            'fixed inset-x-4 bottom-4 z-[120] max-h-[70dvh] rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-slate-950/60',
            'sm:absolute sm:inset-x-auto sm:left-0 sm:z-30 sm:w-[min(24rem,calc(100vw-3rem))]',
            menuPlacement === 'top'
              ? 'sm:bottom-full sm:top-auto sm:mb-2'
              : 'sm:bottom-auto sm:top-full sm:mt-2',
          ].join(' ')}>
          <div className="flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-3">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <div id={listboxId} role="listbox" className="mt-2 max-h-[calc(70dvh-4rem)] overflow-y-auto pr-1 sm:max-h-60">
            {filteredCountries.map((country) => (
              <button
                key={`${country.iso2}-${country.dialCode}`}
                type="button"
                role="option"
                aria-selected={country.iso2 === selectedCountry.iso2}
                onClick={() => {
                  setSelectedCountry(country);
                  onChange(country.dialCode);
                  setQuery('');
                  setIsOpen(false);
                }}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:outline-none"
              >
                <span className="min-w-0 truncate">{country.country}</span>
                <span className="flex shrink-0 items-center gap-2 text-slate-400">
                  {country.dialCode}
                  {country.iso2 === selectedCountry.iso2 && <Check className="h-4 w-4 text-blue-400" />}
                </span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p className="px-3 py-6 text-center text-xs font-bold uppercase tracking-widest text-slate-500">No countries found</p>
            )}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

const liveValidationFields: InquiryFieldName[] = [
  'name',
  'email',
  'phone',
  'countryCode',
  'city',
  'scope',
  'requirements',
];

type ClientFieldErrors = Partial<Record<InquiryFieldName, string>>;
type TouchedFields = Partial<Record<InquiryFieldName, boolean>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div className="min-h-5 px-2" aria-live="polite">
      {message && (
        <p id={id} className="flex items-start gap-1.5 text-xs font-semibold leading-5 text-red-300" role="alert">
          <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const searchParams = useSearchParams();
  const initialScope = searchParams.get('scope') || '';
  const [hasStarted, setHasStarted] = React.useState(false);
  const [formStartedAt] = React.useState(() => Date.now().toString());
  const [requirementsLength, setRequirementsLength] = React.useState(0);
  const [touchedFields, setTouchedFields] = React.useState<TouchedFields>({});
  const [clientErrors, setClientErrors] = React.useState<ClientFieldErrors>({});
  const turnstileContainerRef = React.useRef<HTMLDivElement>(null);

  const validateAndStoreField = React.useCallback((field: InquiryFieldName, value: string) => {
    const error = validateInquiryField(field, value);
    setClientErrors((current) => ({ ...current, [field]: error }));
    return error;
  }, []);

  const handleFieldBlur = (field: InquiryFieldName, value: string) => {
    setTouchedFields((current) => ({ ...current, [field]: true }));
    validateAndStoreField(field, value);
  };

  const handleFieldChange = (field: InquiryFieldName, value: string) => {
    if (touchedFields[field] || state.errors?.[field]) {
      if (!touchedFields[field]) {
        setTouchedFields((current) => ({ ...current, [field]: true }));
      }
      validateAndStoreField(field, value);
    }
  };

  const getFieldError = (field: InquiryFieldName) => {
    if (touchedFields[field]) {
      return clientErrors[field];
    }

    return state.errors?.[field]?.[0];
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: ClientFieldErrors = {};
    const nextTouched: TouchedFields = {};

    for (const field of liveValidationFields) {
      const error = validateInquiryField(field, String(formData.get(field) ?? ''));
      nextTouched[field] = true;
      if (error) {
        nextErrors[field] = error;
      }
    }

    setTouchedFields(nextTouched);
    setClientErrors(nextErrors);

    const firstInvalidField = liveValidationFields.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      event.preventDefault();
      window.requestAnimationFrame(() => {
        const selector = firstInvalidField === 'countryCode'
          ? '[aria-label="Country code"]'
          : `[name="${firstInvalidField}"]`;
        form.querySelector<HTMLElement>(selector)?.focus();
      });
    }
  };

  // Track successful submission
  React.useEffect(() => {
    if (state.success) {
      trackClientEvent('generate_lead', {
        form_id: 'contact_form',
        has_prefilled_scope: Boolean(searchParams.get('scope')),
      });
    }
  }, [state.success, searchParams]);

  React.useEffect(() => {
    if (!state.success && state.message) {
      const turnstileWindow = window as Window & {
        turnstile?: { reset: (container?: HTMLElement) => void };
      };
      turnstileWindow.turnstile?.reset(turnstileContainerRef.current ?? undefined);
    }
  }, [state.message, state.success]);

  const handleFocus = () => {
    if (!hasStarted) {
      trackFormStart('contact_form');
      setHasStarted(true);
    }
  };

  const [referrer] = React.useState(() => (
    typeof document !== 'undefined' ? document.referrer || 'none' : 'none'
  ));
  const [pagePath] = React.useState(() => (
    typeof window !== 'undefined' ? window.location.pathname : '/'
  ));

  return (
    <div data-clarity-mask="True" className="relative max-w-full overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_50px_100px_-12px_rgba(0,0,0,0.4)] sm:p-8 lg:p-10">
      <div className="relative z-10">
        <h2 className="mb-5 text-3xl font-black uppercase leading-none text-white sm:text-4xl lg:text-5xl">{home.contact.formTitle}</h2>
        <p className="mb-8 max-w-2xl text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
          {home.contact.formDescription}
        </p>
        
        {state?.success ? (
          <div className="rounded-3xl border border-blue-400/30 bg-blue-500/10 p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(37,99,235,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-white">{home.contact.successTitle}</h3>
            <p className="text-slate-300 leading-relaxed font-medium">
              {state.message}
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6" noValidate onFocus={handleFocus} onSubmit={handleSubmit}>
            {state?.message && !state?.success && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-bold leading-6 text-red-100" role="alert">
                {state.message}
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.nameLabel}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  onBlur={(event) => handleFieldBlur('name', event.currentTarget.value)}
                  onChange={(event) => handleFieldChange('name', event.currentTarget.value)}
                  aria-invalid={Boolean(getFieldError('name'))}
                  aria-describedby={getFieldError('name') ? 'contact-name-error' : undefined}
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-white outline-none transition-all placeholder:text-slate-500 hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
                  placeholder={home.contact.placeholderName}
                />
                <FieldError id="contact-name-error" message={getFieldError('name')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.emailLabel}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  onBlur={(event) => handleFieldBlur('email', event.currentTarget.value)}
                  onChange={(event) => handleFieldChange('email', event.currentTarget.value)}
                  aria-invalid={Boolean(getFieldError('email'))}
                  aria-describedby={getFieldError('email') ? 'contact-email-error' : undefined}
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-white outline-none transition-all placeholder:text-slate-500 hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
                  placeholder={home.contact.placeholderEmail}
                />
                <FieldError id="contact-email-error" message={getFieldError('email')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-phone" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.phoneLabel}</label>
                <div className="grid gap-3 sm:grid-cols-[minmax(8rem,0.8fr)_1fr]">
                  <CountryCodePicker
                    hasError={Boolean(getFieldError('countryCode'))}
                    onChange={(dialCode) => {
                      setTouchedFields((current) => ({ ...current, countryCode: true }));
                      validateAndStoreField('countryCode', dialCode);
                    }}
                  />
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    maxLength={20}
                    autoComplete="tel-national"
                    onBlur={(event) => handleFieldBlur('phone', event.currentTarget.value)}
                    onChange={(event) => handleFieldChange('phone', event.currentTarget.value)}
                    aria-invalid={Boolean(getFieldError('phone'))}
                    aria-describedby={getFieldError('phone') ? 'contact-phone-error' : undefined}
                    className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-white outline-none transition-all placeholder:text-slate-500 hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
                    placeholder="98765 43210"
                  />
                </div>
                <FieldError
                  id="contact-phone-error"
                  message={getFieldError('countryCode') || getFieldError('phone')}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-city" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.cityLabel}</label>
                <input
                  id="contact-city"
                  name="city"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="address-level2"
                  onBlur={(event) => handleFieldBlur('city', event.currentTarget.value)}
                  onChange={(event) => handleFieldChange('city', event.currentTarget.value)}
                  aria-invalid={Boolean(getFieldError('city'))}
                  aria-describedby={getFieldError('city') ? 'contact-city-error' : undefined}
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-white outline-none transition-all placeholder:text-slate-500 hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
                  placeholder={home.contact.placeholderCity}
                />
                <FieldError id="contact-city-error" message={getFieldError('city')} />
              </div>
            </div>

            {/* Hidden fields for tracking */}
            <input type="hidden" name="utmSource" value={searchParams.get('utm_source') || 'direct'} />
            <input type="hidden" name="referrer" value={referrer} />
            <input type="hidden" name="pagePath" value={pagePath} />
            <input type="hidden" name="formStartedAt" value={formStartedAt} />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
            />
            <div className="space-y-2">
              <label htmlFor="contact-scope" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.scopeLabel}</label>
              <select
                id="contact-scope"
                name="scope"
                defaultValue={initialScope}
                onBlur={(event) => handleFieldBlur('scope', event.currentTarget.value)}
                onChange={(event) => handleFieldChange('scope', event.currentTarget.value)}
                aria-invalid={Boolean(getFieldError('scope'))}
                aria-describedby={getFieldError('scope') ? 'contact-scope-error' : undefined}
                className="h-14 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-5 font-medium text-white outline-none transition-all hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.title} className="bg-slate-950 font-bold">{category.title}</option>
                ))}
                <option value={home.contact.ui.customEngineering} className="bg-slate-950 font-bold">{home.contact.ui.customEngineering}</option>
              </select>
              <FieldError id="contact-scope-error" message={getFieldError('scope')} />
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="contact-requirements" className="ml-1 text-xs font-semibold text-blue-300">{home.contact.requirementsLabel}</label>
                  <span className="text-xs font-medium text-slate-300">
                    {requirementsLength}/{TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT}
                  </span>
                </div>
                <div className="grid gap-5 xl:grid-cols-[1fr_230px]">
                  <div className="space-y-2">
                    <textarea
                      id="contact-requirements"
                      name="requirements"
                      required
                      maxLength={TECHNICAL_REQUIREMENTS_CHARACTER_LIMIT}
                      onBlur={(event) => handleFieldBlur('requirements', event.currentTarget.value)}
                      onChange={(event) => {
                        setRequirementsLength(event.currentTarget.value.length);
                        handleFieldChange('requirements', event.currentTarget.value);
                      }}
                      aria-invalid={Boolean(getFieldError('requirements'))}
                      aria-describedby={getFieldError('requirements') ? 'contact-requirements-error' : undefined}
                      className="min-h-44 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 font-medium text-white outline-none transition-all placeholder:text-slate-500 hover:bg-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/20"
                      placeholder={home.contact.placeholderRequirements}
                    ></textarea>
                    <FieldError id="contact-requirements-error" message={getFieldError('requirements')} />
                  </div>
                  <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h3 className="mb-4 text-xs font-semibold text-blue-300">Spec checklist</h3>
                    <ul className="space-y-3">
                      {[
                        'Approx. Dimensions',
                        'Acoustic Target (dB)',
                        'Opening Style',
                        'Automation Needs',
                        'Project Timeline'
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-xs font-medium text-slate-300">
                          <div className="h-1 w-1 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs font-medium leading-relaxed text-slate-300">
                        Providing these details helps us deliver an accurate technical assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
              />
              <div
                ref={turnstileContainerRef}
                className="cf-turnstile"
                data-sitekey={TURNSTILE_SITE_KEY}
                data-action="turnstile-spin-v2"
                data-appearance="always"
                data-theme="dark"
                data-size="flexible"
                data-retry="auto"
                data-refresh-expired="auto"
              />
              {state?.errors?.human && (
                <p className="text-xs font-bold text-red-400 px-2">{state.errors.human[0]}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-500 hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {isPending ? 'SUBMITTING...' : home.contact.submitButton} {!isPending && <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
            </button>
          </form>
        )}
      </div>
      
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
    </div>
  );
}

export default function ContactClient() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Header */}
      <header className="hero-dark">
        <ThemeMarker theme="dark" className="absolute top-0" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/modern-architecture.jpg" 
            alt="Contact" 
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950/60 to-slate-950"></div>
        </div>

        <div className={`relative z-10 px-6 text-center lg:text-left ${contactContainerClass}`}>
          <h1 className="heading-hero text-white">
            {home.contact.heroTitle.split(' ')[0]} {home.contact.heroTitle.split(' ')[1]} <span className="text-blue-500">{home.contact.heroTitle.split(' ')[2]}</span>
          </h1>
          <p className="max-w-2xl text-xl lg:text-2xl text-slate-400 leading-relaxed mx-auto lg:mx-0 font-medium mt-10">
            {home.contact.heroDescription}
          </p>
        </div>
      </header>

      {/* How It Works */}
      <section className="section-tint">
        <div className={contactContainerClass}>
          <div className="mb-14 max-w-3xl">
            <p className="text-eyebrow">How Specification Works</p>
            <h2 className="heading-section mb-0">From drawings to installed system in 5 steps</h2>
          </div>
          <SpecProcess />
        </div>
      </section>

      {/* Key FAQs Preview */}
      <section className="section-standard border-b border-slate-100">
        <div className={contactContainerClass}>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-eyebrow">Common Questions</p>
              <h2 className="heading-section mb-0">Before you reach out</h2>
            </div>
            <Link href="/faq" className="apple-button-secondary inline-flex items-center justify-center px-8 py-4 text-xs font-black uppercase tracking-[0.2em]">
              View All FAQs
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {faqs.categories.slice(0, 3).map((cat) => (
              <div key={cat.id} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-900">{cat.title}</h3>
                </div>
                <div className="space-y-4">
                  {cat.faqs.slice(0, 2).map((faq, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-bold text-slate-800">{faq.question}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500 line-clamp-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-standard">
        <div className={contactContainerClass}>
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Contact Info */}
            <div className="min-w-0 space-y-20 lg:col-span-5">
              <div>
                <span className="text-eyebrow">{home.contact.hubsLabel}</span>
                <div className="grid gap-10 mt-10">
                  {catalog.company.locations.map((loc, index) => (
                    <div key={index} className="group flex min-w-0 gap-4 sm:gap-8">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{catalog.company.ui.operationsLabel.replace('{city}', loc.city)}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">
                          {loc.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-eyebrow">{home.contact.digitalLabel}</span>
                <div className="grid gap-8 mt-10">
                  <a href={`mailto:${catalog.company.email}`} className="group flex min-w-0 items-center gap-4 sm:gap-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="min-w-0 break-all text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{catalog.company.email}</span>
                  </a>

                  <div className="group flex min-w-0 items-center gap-4 sm:gap-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      {catalog.company.phoneDisplay.split(', ').map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex min-h-12 min-w-0 items-center break-all text-xl font-black tracking-tight text-slate-900 transition-colors hover:text-blue-600">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a href={catalog.company.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="Kiran Slido Craft on YouTube" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                      <YoutubeIcon className="w-7 h-7" />
                    </a>
                    <a href={catalog.company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Kiran Slido Craft on LinkedIn" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-100 transition-all">
                      <LinkedinIcon className="w-7 h-7" />
                    </a>
                    <a href={catalog.company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Kiran Slido Craft on Instagram" className="flex shrink-0 h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-100 transition-all">
                      <InstagramIcon className="w-7 h-7" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="min-w-0 lg:col-span-7">
              <Suspense fallback={<div className="bg-slate-950 rounded-[3.5rem] p-10 lg:p-20 h-[600px] animate-pulse" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
