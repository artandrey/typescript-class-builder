import { toBuilderMethod } from '../../../lib';
import { WithOptionalProperty } from './with-optional-property.interface';

export class UsingBuilder {
  private _optionalProperty1?: string;
  private _optionalProperty2?: string;
  private _optionalProperty3?: string;
  private _optionalProperty4?: string;
  private _optionalProperty5?: string;
  private _optionalProperty6?: string;
  private _optionalProperty7?: string;
  private _optionalProperty8?: string;
  private _optionalProperty9?: string;
  private _optionalProperty10?: string;
  private _optionalProperty11?: string;
  private _optionalProperty12?: string;
  private _optionalProperty13?: string;
  private _optionalProperty14?: string;
  private _optionalProperty15?: string;
  private _optionalProperty16?: string;
  private _optionalProperty17?: string;
  private _optionalProperty18?: string;
  private _optionalProperty19?: string;
  private _optionalProperty20?: string;

  public static builder = toBuilderMethod(UsingBuilder).withOptionals<WithOptionalProperty>();
}
