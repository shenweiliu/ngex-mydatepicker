import {IMyDate} from "./my-date.interface";

//SW 1/26/2025 add null definition to type properties.
export interface IMyDateRangeModel {
  beginDate?: IMyDate | null;
  beginJsDate?: Date | null;
  beginEpoc?: number | null;
  endDate?: IMyDate | null;
  endJsDate?: Date | null;
  endEpoc?: number;
  formatted?: string;
}
