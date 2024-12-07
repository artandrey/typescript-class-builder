import { BuilderAccessors, toBuilderMethod } from '../../../lib';
import { WithOptionalProperty } from './with-optional-property.interface';

export class UsingBuilderSetters {
  @BuilderAccessors((target) => target._optionalProperty1, (target, value) => (target.optionalProperty1 = value))
  private _optionalProperty1?: string;
  @BuilderAccessors((target) => target._optionalProperty2, (target, value) => (target.optionalProperty2 = value))
  private _optionalProperty2?: string;
  @BuilderAccessors((target) => target._optionalProperty3, (target, value) => (target.optionalProperty3 = value))
  private _optionalProperty3?: string;
  @BuilderAccessors((target) => target._optionalProperty4, (target, value) => (target.optionalProperty4 = value))
  private _optionalProperty4?: string;
  @BuilderAccessors((target) => target._optionalProperty5, (target, value) => (target.optionalProperty5 = value))
  private _optionalProperty5?: string;
  @BuilderAccessors((target) => target._optionalProperty6, (target, value) => (target.optionalProperty6 = value))
  private _optionalProperty6?: string;
  @BuilderAccessors((target) => target._optionalProperty7, (target, value) => (target.optionalProperty7 = value))
  private _optionalProperty7?: string;
  @BuilderAccessors((target) => target._optionalProperty8, (target, value) => (target.optionalProperty8 = value))
  private _optionalProperty8?: string;
  @BuilderAccessors((target) => target._optionalProperty9, (target, value) => (target.optionalProperty9 = value))
  private _optionalProperty9?: string;
  @BuilderAccessors((target) => target._optionalProperty10, (target, value) => (target.optionalProperty10 = value))
  private _optionalProperty10?: string;
  @BuilderAccessors((target) => target._optionalProperty11, (target, value) => (target.optionalProperty11 = value))
  private _optionalProperty11?: string;
  @BuilderAccessors((target) => target._optionalProperty12, (target, value) => (target.optionalProperty12 = value))
  private _optionalProperty12?: string;
  @BuilderAccessors((target) => target._optionalProperty13, (target, value) => (target.optionalProperty13 = value))
  private _optionalProperty13?: string;
  @BuilderAccessors((target) => target._optionalProperty14, (target, value) => (target.optionalProperty14 = value))
  private _optionalProperty14?: string;
  @BuilderAccessors((target) => target._optionalProperty15, (target, value) => (target.optionalProperty15 = value))
  private _optionalProperty15?: string;
  @BuilderAccessors((target) => target._optionalProperty16, (target, value) => (target.optionalProperty16 = value))
  private _optionalProperty16?: string;
  @BuilderAccessors((target) => target._optionalProperty17, (target, value) => (target.optionalProperty17 = value))
  private _optionalProperty17?: string;
  @BuilderAccessors((target) => target._optionalProperty18, (target, value) => (target.optionalProperty18 = value))
  private _optionalProperty18?: string;
  @BuilderAccessors((target) => target._optionalProperty19, (target, value) => (target.optionalProperty19 = value))
  private _optionalProperty19?: string;
  @BuilderAccessors((target) => target._optionalProperty20, (target, value) => (target.optionalProperty20 = value))
  private _optionalProperty20?: string;

  public set optionalProperty1(value: string | undefined) {
    this._optionalProperty1 = value;
  }
  public set optionalProperty2(value: string | undefined) {
    this._optionalProperty2 = value;
  }
  public set optionalProperty3(value: string | undefined) {
    this._optionalProperty3 = value;
  }
  public set optionalProperty4(value: string | undefined) {
    this._optionalProperty4 = value;
  }
  public set optionalProperty5(value: string | undefined) {
    this._optionalProperty5 = value;
  }
  public set optionalProperty6(value: string | undefined) {
    this._optionalProperty6 = value;
  }
  public set optionalProperty7(value: string | undefined) {
    this._optionalProperty7 = value;
  }
  public set optionalProperty8(value: string | undefined) {
    this._optionalProperty8 = value;
  }
  public set optionalProperty9(value: string | undefined) {
    this._optionalProperty9 = value;
  }
  public set optionalProperty10(value: string | undefined) {
    this._optionalProperty10 = value;
  }
  public set optionalProperty11(value: string | undefined) {
    this._optionalProperty11 = value;
  }
  public set optionalProperty12(value: string | undefined) {
    this._optionalProperty12 = value;
  }
  public set optionalProperty13(value: string | undefined) {
    this._optionalProperty13 = value;
  }
  public set optionalProperty14(value: string | undefined) {
    this._optionalProperty14 = value;
  }
  public set optionalProperty15(value: string | undefined) {
    this._optionalProperty15 = value;
  }
  public set optionalProperty16(value: string | undefined) {
    this._optionalProperty16 = value;
  }
  public set optionalProperty17(value: string | undefined) {
    this._optionalProperty17 = value;
  }
  public set optionalProperty18(value: string | undefined) {
    this._optionalProperty18 = value;
  }
  public set optionalProperty19(value: string | undefined) {
    this._optionalProperty19 = value;
  }
  public set optionalProperty20(value: string | undefined) {
    this._optionalProperty20 = value;
  }

  public static builder = toBuilderMethod(UsingBuilderSetters).withOptionals<WithOptionalProperty>();
}
