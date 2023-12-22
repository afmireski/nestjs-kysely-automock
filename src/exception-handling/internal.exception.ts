export type InternalMessage = {
  code: number;
  httpCode: number;
  message: string;
};

export class InternalException {
  private code: number;

  constructor(_code: number) {
    this.code = _code;
  }

  public get getCode(): number {
    return this.code;
  }
}
