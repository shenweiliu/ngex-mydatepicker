import {Component, EventEmitter, Input, OnChanges, AfterViewInit, Output, ViewEncapsulation, SimpleChanges} from "@angular/core";
import { CommonModule } from '@angular/common';
import { IMyCalendarDay } from "../../interfaces/my-calendar-day.interface";
import {IMyDate} from "../../interfaces/my-date.interface";
import {IMyDateRange} from "../../interfaces/my-date-range.interface";
import {IMyOptions} from "../../interfaces/my-options.interface";
import {IMyWeek} from "../../interfaces/my-week.interface";
import {UtilService} from "../../services/mydatepicker-util.service";
import {KeyCode} from "../../enums/key-code.enum";
import {MonthId} from "../../enums/month-id.enum";
import {ActiveView} from "../../enums/active-view.enum";
import {OPTS, DATES, WEEK_DAYS, SELECTED_DATE, SELECTED_DATE_RANGE} from "../../constants/constants";

@Component({
    selector: "lib-day-view",
    templateUrl: "./day-view.component.html",
    imports: [CommonModule],
    providers: [UtilService],
    encapsulation: ViewEncapsulation.None
})
export class DayViewComponent implements OnChanges, AfterViewInit {
  @Input() opts!: IMyOptions;
  @Input() dates!: Array<IMyWeek>;
  @Input() weekDays!: Array<string>;
  @Input() selectedDate!: IMyDate;
  @Input() selectedDateRange!: IMyDateRange;
  @Input() viewChanged: boolean = false;

  @Output() dayCellClicked: EventEmitter<IMyCalendarDay> = new EventEmitter<IMyCalendarDay>();
  @Output() dayCellKeyDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewActivated: EventEmitter<ActiveView> = new EventEmitter<ActiveView>();

  prevMonthId: number = MonthId.prev;
  currMonthId: number = MonthId.curr;
  nextMonthId: number = MonthId.next;

  constructor(private utilService: UtilService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty(OPTS)) {
      this.opts = changes[OPTS].currentValue;
    }
    if (changes.hasOwnProperty(DATES)) {
      this.dates = changes[DATES].currentValue;
    }
    if (changes.hasOwnProperty(WEEK_DAYS)) {
      this.weekDays = changes[WEEK_DAYS].currentValue;
    }
    if (changes.hasOwnProperty(SELECTED_DATE)) {
      this.selectedDate = changes[SELECTED_DATE].currentValue;
    }
    if (changes.hasOwnProperty(SELECTED_DATE_RANGE)) {
      this.selectedDateRange = changes[SELECTED_DATE_RANGE].currentValue;
    }
  }

  ngAfterViewInit(): void {
    this.viewActivated.emit(ActiveView.Date);
  }

  onDayCellClicked(event: any, cell: IMyCalendarDay): void {
    event.stopPropagation();

    if (cell.disabledDate.disabled) {
      return;
    }

    this.dayCellClicked.emit(cell);
  }

  onDayCellKeyDown(event: any, cell: IMyCalendarDay) {
    const keyCode: number | null = this.utilService.getKeyCodeFromEvent(event);
    if (keyCode !== KeyCode.tab) {
      event.preventDefault();

      if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
        this.onDayCellClicked(event, cell);
      }
      else if (this.opts.moveFocusByArrowKeys) {
        this.dayCellKeyDown.emit(event)
      }
    }
  }

  onDayCellMouseEnter(cell: any): void {
    if (this.utilService.isInitializedDate(this.selectedDateRange.begin) && !this.utilService.isInitializedDate(this.selectedDateRange.end)) {
      for (const w of this.dates) {
        for (const day of w.week) {
          day.range = this.utilService.isDateSameOrEarlier(this.selectedDateRange.begin, day.dateObj) && this.utilService.isDateSameOrEarlier(day.dateObj, cell.dateObj);
        }
      }
    }
  }

  onDayCellMouseLeave(): void {
    for (const w of this.dates) {
      for (const day of w.week) {
        day.range = false;
      }
    }
  }

  isDateInRange(date: IMyDate): boolean {
    return this.utilService.isDateInRange(date, this.selectedDateRange);
  }

  isDateSame(date: IMyDate): boolean {
    return this.utilService.isDateSame(this.selectedDate, date);
  }

  isDateRangeBeginOrEndSame(date: IMyDate): boolean {
    return this.utilService.isDateRangeBeginOrEndSame(this.selectedDateRange, date);
  }
}
