import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import React from 'react'

import { Error } from '../Error'

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <>
      {/* <Width width={width}> */}
      {/* <Label htmlFor={name}>{label}</Label> */}
      <Input
        dir="ltr"
        placeholder={label}
        defaultValue={defaultValue}
        id={name}
        type="text"
        autoComplete={`email`}
        className="rtl:placeholder:text-right"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
      />

      {requiredFromProps && errors[name] && <Error />}
      {/* </Width> */}
    </>
  )
}
