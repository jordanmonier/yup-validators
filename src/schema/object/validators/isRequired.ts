import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'

import { TReferenceProps } from '../../..'
import { IObjectProps, TObjectValidatorResult } from '../_types'

export interface IIsRequiredProps {}

/**
 * Check if the string is not empty.
 */
export const isRequired = <T extends ObjectShape = {}>(
  props?: TReferenceProps<IIsRequiredProps> & IObjectProps
): TObjectValidatorResult<T> => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.required(
        intl.formatErrorMessage({ id: message ?? 'e.field.is_required' })
      ) as yup.ObjectSchema<T>
    }

    return schema
  }
}