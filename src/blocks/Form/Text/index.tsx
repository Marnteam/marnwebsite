import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { Error } from '../Error'

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    autocomplete?: string
  }
> = ({
  name,
  defaultValue,
  autocomplete,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  return (
    <>
      {/* <Width width={width}> */}
      {/* <Label htmlFor={name}>{label}</Label> */}
      <Input
        placeholder={label}
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { required: requiredFromProps })}
        autoComplete={autocomplete}
      />
      {requiredFromProps && errors[name] && <Error />}
      {/* </Width> */}
    </>
  )
}
