export class ResponseSupplier<T> {

  resultList: T[];
  totalElements: number;
  size: number;
  page: number;
  additionalProperties: Map<string, any>;
  one : T;
  resultMessage : string;
  inError : boolean;
  enableCount : boolean;
  javaExcecptionClass : string;

}
