/**
 * 変更可能なルール
 */
export interface ICustomizableRule {
  get value(): any;
  set value(newValue: any);
}
