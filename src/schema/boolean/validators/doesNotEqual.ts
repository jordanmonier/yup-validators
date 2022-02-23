import { parseReference, TReferenceProps } from '../../..'
import { IBooleanProps, TBooleanValidatorResult } from '../_types'

export interface IDoesNotEqualProps {
  /**
   * The list of blacklisted values. Can be either an array of boolean or just a boolean.
   */
  values: boolean | boolean[]
}

/**
 * Check if the boolean does not equal to a list of values.
 */
export const doesNotEqual = (
  props: TReferenceProps<IDoesNotEqualProps> & IBooleanProps
): TBooleanValidatorResult => {
  const { active = true, message } = props ?? {}

  return (schema, intl) => {
    if (active) {
      schema = schema.test({
        test(value) {
          if (typeof value !== 'boolean') return true

          const { values } = parseReference<IDoesNotEqualProps>(this, props)

          const whitelist = new Set<boolean>()
          if (typeof values === 'boolean') {
            whitelist.add(values)
          } else {
            for (const v of values) {
              whitelist.add(v)
            }
          }

          const result = !whitelist.has(value)

          return result
            ? true
            : this.createError({
                message: intl.formatErrorMessage(
                  { id: message ?? 'e.field.b_not_equal' },
                  {
                    values: Array.isArray(values)
                      ? values.join(
                          intl.formatErrorMessage({
                            id: 'lang.array_separator',
                            defaultMessage: ', ',
                          })
                        )
                      : values,
                  }
                ),
              })
        },
      })
    }

    return schema
  }
}
