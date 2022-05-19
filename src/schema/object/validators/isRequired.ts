import { ObjectShape } from 'yup/lib/object'

import { TReferenceProps } from '../../..'
import { IObjectProps, TObjectValidatorResult } from '../_types'

export interface IIsRequiredProps {}

/**
 * Check if the `object` is defined.
 */
export const isRequired = <T extends ObjectShape = {}>(
  props?: TReferenceProps<IIsRequiredProps> & IObjectProps
): TObjectValidatorResult<T> => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    return active
      ? schema.required(intl.formatErrorMessage({ id: message ?? 'e.y_v.is_required' }))
      : schema.nullable()
  }
}
