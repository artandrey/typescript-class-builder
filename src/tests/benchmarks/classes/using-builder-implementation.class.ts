import { BuilderContract } from './builder';

export class UsingBuilderImplementationClass {
  private constructor(
    private _optionalProperty1?: string,
    private _optionalProperty2?: string,
    private _optionalProperty3?: string,
    private _optionalProperty4?: string,
    private _optionalProperty5?: string,
    private _optionalProperty6?: string,
    private _optionalProperty7?: string,
    private _optionalProperty8?: string,
    private _optionalProperty9?: string,
    private _optionalProperty10?: string,
    private _optionalProperty11?: string,
    private _optionalProperty12?: string,
    private _optionalProperty13?: string,
    private _optionalProperty14?: string,
    private _optionalProperty15?: string,
    private _optionalProperty16?: string,
    private _optionalProperty17?: string,
    private _optionalProperty18?: string,
    private _optionalProperty19?: string,
    private _optionalProperty20?: string,
  ) {}

  private static Builder = class Builder implements BuilderContract {
    _optionalProperty1?: string;
    _optionalProperty2?: string;
    _optionalProperty3?: string;
    _optionalProperty4?: string;
    _optionalProperty5?: string;
    _optionalProperty6?: string;
    _optionalProperty7?: string;
    _optionalProperty8?: string;
    _optionalProperty9?: string;
    _optionalProperty10?: string;
    _optionalProperty11?: string;
    _optionalProperty12?: string;
    _optionalProperty13?: string;
    _optionalProperty14?: string;
    _optionalProperty15?: string;
    _optionalProperty16?: string;
    _optionalProperty17?: string;
    _optionalProperty18?: string;
    _optionalProperty19?: string;
    _optionalProperty20?: string;

    public optionalProperty1(value: string) {
      this._optionalProperty1 = value;
      return this;
    }
    public optionalProperty2(value: string) {
      this._optionalProperty2 = value;
      return this;
    }
    public optionalProperty3(value: string) {
      this._optionalProperty3 = value;
      return this;
    }
    public optionalProperty4(value: string) {
      this._optionalProperty4 = value;
      return this;
    }
    public optionalProperty5(value: string) {
      this._optionalProperty5 = value;
      return this;
    }
    public optionalProperty6(value: string) {
      this._optionalProperty6 = value;
      return this;
    }
    public optionalProperty7(value: string) {
      this._optionalProperty7 = value;
      return this;
    }
    public optionalProperty8(value: string) {
      this._optionalProperty8 = value;
      return this;
    }
    public optionalProperty9(value: string) {
      this._optionalProperty9 = value;
      return this;
    }
    public optionalProperty10(value: string) {
      this._optionalProperty10 = value;
      return this;
    }
    public optionalProperty11(value: string) {
      this._optionalProperty11 = value;
      return this;
    }
    public optionalProperty12(value: string) {
      this._optionalProperty12 = value;
      return this;
    }
    public optionalProperty13(value: string) {
      this._optionalProperty13 = value;
      return this;
    }
    public optionalProperty14(value: string) {
      this._optionalProperty14 = value;
      return this;
    }
    public optionalProperty15(value: string) {
      this._optionalProperty15 = value;
      return this;
    }
    public optionalProperty16(value: string) {
      this._optionalProperty16 = value;
      return this;
    }
    public optionalProperty17(value: string) {
      this._optionalProperty17 = value;
      return this;
    }
    public optionalProperty18(value: string) {
      this._optionalProperty18 = value;
      return this;
    }
    public optionalProperty19(value: string) {
      this._optionalProperty19 = value;
      return this;
    }
    public optionalProperty20(value: string) {
      this._optionalProperty20 = value;
      return this;
    }

    public build(): UsingBuilderImplementationClass {
      return new UsingBuilderImplementationClass(
        this._optionalProperty1,
        this._optionalProperty2,
        this._optionalProperty3,
        this._optionalProperty4,
        this._optionalProperty5,
        this._optionalProperty6,
        this._optionalProperty7,
        this._optionalProperty8,
        this._optionalProperty9,
        this._optionalProperty10,
        this._optionalProperty11,
        this._optionalProperty12,
        this._optionalProperty13,
        this._optionalProperty14,
        this._optionalProperty15,
        this._optionalProperty16,
        this._optionalProperty17,
        this._optionalProperty18,
        this._optionalProperty19,
        this._optionalProperty20,
      );
    }
  };
  public static builder() {
    return new UsingBuilderImplementationClass.Builder();
  }
}
