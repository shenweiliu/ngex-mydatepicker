import {IMyDate} from "./my-date.interface";

export interface IMySingleDateModel {
  date?: IMyDate;
  jsDate?: Date | null;
  formatted?: string;
  epoc?: number;
}
