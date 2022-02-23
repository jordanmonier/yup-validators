import { boolean, i18n } from '../../index'

const SCHEMAS: [
  name: string,
  schema: ReturnType<typeof boolean['schema']>,
  valid: unknown[],
  invalid: unknown[]
][] = [
  [
    'isRequired',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired()),
    [1, 0, true, false],
    [undefined, null],
  ],
  [
    '!isRequired',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired({ active: false })),
    [1, 0, true, false, undefined],
    [null],
  ],
  [
    'isTrue',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired(), boolean.isTrue()),
    [1, true],
    [0, false, undefined, null],
  ],
  [
    'isFalse',
    boolean.schema(i18n.DEFAULT_INTL, boolean.isRequired(), boolean.isFalse()),
    [0, false],
    [1, true, undefined, null],
  ],
  [
    'doesEqual',
    boolean.schema(
      i18n.DEFAULT_INTL,
      boolean.isRequired(),
      boolean.doesEqual({
        values: false,
      })
    ),
    [0, false],
    [1, true, undefined, null],
  ],
  [
    'doesNotEqual',
    boolean.schema(
      i18n.DEFAULT_INTL,
      boolean.isRequired(),
      boolean.doesNotEqual({
        values: false,
      })
    ),
    [1, true],
    [0, false, undefined, null],
  ],
]

describe('Boolean validation', () => {
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