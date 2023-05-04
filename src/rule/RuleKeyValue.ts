/**
 * ルールのキーと価
 */
export interface IRuleKeyValue<T> {
  get key(): string
  get value(): T
}
