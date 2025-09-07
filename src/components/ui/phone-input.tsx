'use client'

import React, { useId } from 'react'
import { PhoneIcon } from 'lucide-react'
import * as RPNInput from 'react-phone-number-input'
import { CircleFlag } from 'react-circle-flags'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'
import { Input } from '@/components/ui/input'

const phoneInputVariants = cva('flex rounded-xl', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface PhoneInputProps
  extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'size'>,
    VariantProps<typeof phoneInputVariants> {
  value?: RPNInput.Value
  onChange?: (value: RPNInput.Value | undefined) => void
  defaultCountry?: RPNInput.Country
  placeholder?: string
  international?: boolean
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      variant,
      size,
      value,
      onChange,
      defaultCountry = 'SA',
      placeholder = 'Enter phone number',
      international = true,
      ...props
    },
    ref,
  ) => {
    const id = useId()

    return (
      <RPNInput.default
        dir="ltr"
        className={cn(phoneInputVariants({ variant, size }), 'phone-input relative', className)}
        international={international}
        defaultCountry={defaultCountry}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={PhoneInputField}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange || (() => {})}
        {...props}
      />
    )
  },
)

PhoneInput.displayName = 'PhoneInput'

const PhoneInputField = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        id="tel tel-national"
        data-slot="phone-input"
        className={cn(
          'z-1 rounded-s-none border-s-0 shadow-none focus-visible:z-1 focus-visible:border-e',
          className,
        )}
        autoComplete={`tel tel-national`}
        {...props}
      />
    )
  },
)

PhoneInputField.displayName = 'PhoneInputField'

interface CountrySelectProps {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: { label: string; value: RPNInput.Country | undefined }[]
}

const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ disabled, value, onChange, options }, ref) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value as RPNInput.Country)
    }

    return (
      <div
        className={cn(
          'phone-input-country-select',
          'ring-ring relative z-0 inline-flex h-12 items-center self-stretch rounded-s-xl rounded-e-none border px-3 py-2.5 transition-[color,box-shadow] outline-none',
          'border-input bg-background text-base-secondary',
          'focus-visible:border-ring focus-visible:ring-ring focus-visible:z-1 focus-visible:ring-1',
          'hover:bg-background-neutral',
          'has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
          'has-disabled:pointer-events-none has-disabled:opacity-50',
        )}
      >
        <div
          className="inline-flex items-center gap-2 focus-visible:outline-none"
          aria-hidden="true"
        >
          <FlagComponent country={value} countryName={value} aria-hidden="true" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
            ></path>
          </svg>
        </div>
        <select
          ref={ref}
          id="tel-country-code"
          disabled={disabled}
          value={value}
          onChange={handleSelect}
          className="absolute inset-0 text-sm opacity-0"
          aria-label="Select country"
          autoComplete={`tel tel-country-code`}
        >
          <option key="default" value="">
            Select a country
          </option>
          {options
            .filter((x) => x.value)
            .map((option, i) => (
              <option key={option.value ?? `empty-${i}`} value={option.value}>
                {option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
              </option>
            ))}
        </select>
      </div>
    )
  },
)

CountrySelect.displayName = 'CountrySelect'

const FlagComponent = React.forwardRef<HTMLSpanElement, RPNInput.FlagProps>(
  ({ country, countryName, ...props }, ref) => {
    return (
      <span ref={ref} className="w-5 overflow-hidden rounded-sm" {...props}>
        {country ? (
          <CircleFlag countryCode={country.toLowerCase()} height="20" title={countryName} />
        ) : (
          <PhoneIcon size={16} aria-hidden="true" />
        )}
      </span>
    )
  },
)

FlagComponent.displayName = 'FlagComponent'

export { PhoneInput, phoneInputVariants }
export default PhoneInput
