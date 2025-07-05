import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  Control,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'

import PhoneInput from '@/components/ui/phone-input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    control: Control<FieldValues>
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  control,
  required: requiredFromProps,
  width,
}) => {
  return (
    <Width width={width}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: requiredFromProps }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <PhoneInput
            ref={ref}
            placeholder={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            id={name}
          />
        )}
      />
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
