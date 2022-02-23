import { date, i18n } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof date['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired()),
    [new Date(), '1998-01-14'],
    [undefined, null],
  ],
  [
    '!isRequired',
    date.schema(i18n.DEFAULT_INTL, date.isRequired({ active: false })),
    [new Date(), '1998-01-14', undefined],
    [null],
  ],
  [
    'isMinMax',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isMinMax({
        min: new Date(1998, 0, 14),
        max: new Date(1999, 0, 14),
      })
    ),
    [new Date(1998, 0, 14), new Date(1999, 0, 1), new Date(1999, 0, 14)],
    [new Date(1998, 0, 13), new Date(1999, 0, 15)],
  ],
  [
    'isMinMax (delta)',
    date.schema(
      i18n.DEFAULT_INTL,
      date.isRequired(),
      date.isMinMax({
        min: new Date(1998, 0, 14),
        minDelta: [[-1, 'day']],
        max: new Date(1999, 0, 14),
      })
    ),
    [new Date(1998, 0, 14), new Date(1999, 0, 1), new Date(1999, 0, 14)],
    [new Date(1998, 0, 12), new Date(1999, 0, 15)],
  ],
]

describe('Date validation', () => {
  for (const [name, schema, valid, invalid] of SCHEMAS) {
    // eslint-disable-next-line jest/valid-title
    it(name, () => {
      for (const value of valid) {
        expect(schema.isValidSync(value)).toBe(true)
      }

      for (const value of invalid) {
        expect(schema.isValidSync(value)).toBe(false)
      }
    })
  }
})