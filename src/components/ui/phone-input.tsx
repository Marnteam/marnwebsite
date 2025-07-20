'use client'

import React, { useId } from 'react'
import { ChevronDownIcon, PhoneIcon } from 'lucide-react'
import * as RPNInput from 'react-phone-number-input'
import { CircleFlag } from 'react-circle-flags'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'
import { Input } from '@/components/ui/input'

const phoneInputVariants = cva('flex flex-row-reverse rounded-xl', {
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
        className={cn(phoneInputVariants({ variant, size }), className)}
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
        data-slot="phone-input"
        className={cn('z-1 -ms-px rounded-e-none shadow-none focus-visible:z-1', className)}
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
          'ring-ring relative z-0 inline-flex h-12 items-center self-stretch rounded-s-none rounded-e-xl border px-3 py-2.5 transition-[color,box-shadow] outline-none',
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
          <span className="text-base-secondary flex items-center gap-1">
            <span className="font-medium">{value}</span>
            <ChevronDownIcon size={16} aria-hidden="true" />
          </span>
        </div>
        <select
          ref={ref}
          disabled={disabled}
          value={value}
          onChange={handleSelect}
          className="absolute inset-0 text-sm opacity-0"
          aria-label="Select country"
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
