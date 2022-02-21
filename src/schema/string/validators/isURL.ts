import _isURL from 'validator/lib/isURL'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isURL>

export interface IIsURLProps {
  options?: TParameters[1]
}

/**
 * Check if the string is an URL.
 */
export const isURL = (
  props?: TReferenceProps<IIsURLProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { options } = parseReference<IIsURLProps>(this, props)

          const result = _isURL(value, options)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_an_url' },
                  {
                    ...options,
                    protocols: options?.protocols?.join(','),
                    host_whitelist: options?.host_whitelist
                      ?.map((e) => e.toString())
                      .join(
                        intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                      ),
                    host_blacklist: options?.host_blacklist
                      ?.map((e) => e.toString())
                      .join(
                        intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                      ),
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
