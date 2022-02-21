import _isWhitelisted from 'validator/lib/isWhitelisted'

import { parseReference, TReferenceProps } from '../../..'
import { IStringProps, TStringValidatorResult } from '../_types'

type TParameters = Parameters<typeof _isWhitelisted>

export interface IIsWhitelistedProps {
  chars: TParameters[1]
}

/**
 * Checks characters if they appear in the whitelist.
 */
export const isWhitelisted = (
  props: TReferenceProps<IIsWhitelistedProps> & IStringProps
): TStringValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (!value) return true

          const { chars } = parseReference<IIsWhitelistedProps>(this, props)

          const result = _isWhitelisted(value, chars)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.s_must_be_whitelisted' },
                  {
                    chars: Array.isArray(chars)
                      ? chars.join(
                          intl.formatMessage({ id: 'lang.array_separator', defaultMessage: ', ' })
                        )
                      : chars,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
