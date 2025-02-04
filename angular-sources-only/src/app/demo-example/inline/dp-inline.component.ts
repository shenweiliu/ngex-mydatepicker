import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgExMyDatePickerDirective, IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged, IMyRangeDateSelection } from 'ngex-mydatepicker';

@Component({
    selector: 'dp-inline',
    templateUrl: './dp-inline.component.html',
    styleUrls: ['./dp-inline.component.css'],
    imports: [CommonModule, FormsModule, NgExMyDatePickerDirective]
})
export class DpInlineComponent implements OnInit {

    public myDatePickerOptions: IAngularMyDpOptions = {
        dateRange: false,
        inline: true,
        dateFormat: 'dd.mm.yyyy'
    };

    public selectedTextNormal: string = '';

    public validDate: boolean = false;
    public inputText: string | undefined = "";

    public model: IMyDateModel | null = null;   // not initial date set

    constructor() {
    }

    ngOnInit(): void {
        console.log('onInit(): DatePickerInline');
    }

    onDateRange(currentTarget: any): void {
        this.model = null;
        let copy = this.getCopyOfOptions();
        //SW 1/26/2025 changed.
        //copy.dateRange = checked;
        //this.myDatePickerOptions = copy;
        if (currentTarget) {
            copy.dateRange = currentTarget.checked;
            this.myDatePickerOptions = copy;
        }
    }        

    onSubmit(): void {
        console.log('onSubmit(): model: ', this.model);
    }

    onDisableUntilYesterday(): void {
        let copy = this.getCopyOfOptions();
        let d: Date = new Date();
        d.setDate(d.getDate() - 1);
        copy.disableUntil = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        this.myDatePickerOptions = copy;
    }

    onInitToPastMonth(): void {
        let d: Date = new Date();
        d.setMonth(d.getMonth() - 1);
        this.model = {
            isRange: false,
            singleDate: {
                date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
            },
            dateRange: null
        };
    }

    onTodayPlus3(): void {
        let today: Date = new Date();
        let date: Date = new Date();
        date.setDate(date.getDate() + 3);

        this.model = {
            isRange: true, singleDate: null, dateRange: {
                beginDate: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() },
                endDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
            }
        };
    }

    onYesterdayPlus3(): void {
        let today: Date = new Date();
        today.setDate(today.getDate() - 1);

        let date: Date = new Date();
        date.setDate(date.getDate() + 2);

        this.model = {
            isRange: true, singleDate: null, dateRange: {
                beginDate: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() },
                endDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
            }
        };
    }

    // callbacks
    onDateChanged(event: IMyDateModel): void {
        console.log('onDateChanged(): ', event);
        if (!event.isRange) {
            if (event.singleDate) {
                let { date, jsDate, formatted, epoc } = event.singleDate;
                if (formatted !== '') {
                    this.selectedTextNormal = 'Formatted: ' + formatted + ' - epoc timestamp: ' + epoc;
                    this.validDate = true;
                    this.inputText = formatted;
                }
                else {
                    this.selectedTextNormal = '';
                }
            }
        }
        else {
            if (event.dateRange) {
                let { formatted } = event.dateRange;
                if (formatted !== '') {
                    this.selectedTextNormal = 'Formatted: ' + formatted;
                    this.validDate = true;
                    this.inputText = formatted;
                }
                else {
                    this.selectedTextNormal = '';
                }
            }
        }
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged): void {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    onDateRangeSelection(event: IMyRangeDateSelection): void {
        console.log('onDateRangeSelection(): event: ', event);
    }

    getCopyOfOptions(): IAngularMyDpOptions {
        return JSON.parse(JSON.stringify(this.myDatePickerOptions));
    }
}
