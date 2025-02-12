import {IMySingleDateModel} from "./my-single-date-model.interface";
import {IMyDateRangeModel} from "./my-date-range-model.interface";

export interface IMyDateModel {
  isRange: boolean;
  singleDate?: IMySingleDateModel | null; //SW: added null type
  dateRange?: IMyDateRangeModel | null;   //SW: added null type
}
