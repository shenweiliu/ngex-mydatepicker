import { Component, OnInit, Renderer2, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgExMyDatePickerDirective, IAngularMyDpOptions, IMyDateModel, IMyCalendarViewChanged } from 'ngex-mydatepicker';

@Component({
    selector: 'dp-div-host',
    templateUrl: './dp-div-host.component.html',
    styleUrls: ['./dp-div-host.component.css'],
    imports: [CommonModule, FormsModule, NgExMyDatePickerDirective]
})
export class DpDivHostComponent implements OnInit {

    public myDatePickerOptions: IAngularMyDpOptions = {
        dateRange: false,
        dateFormat: 'dd.mm.yyyy',
        divHostElement: { enabled: true, placeholder: 'Click to select a date' }
    };

    model: IMyDateModel| null = null;

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {
        console.log('onInit(): DatePickerDivHostElement');
    }

    setTodayDate(): void {
        let d: Date = new Date();
        this.model = { isRange: false, singleDate: { jsDate: d }, dateRange: null };
    }

    resetTomorrowDate(): void {
        let d: Date = new Date();
        d.setDate(d.getDate() + 1);
        this.model = { isRange: false, singleDate: { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } }, dateRange: null };
    }

    onDateChanged(event: IMyDateModel): void {
        console.log('onDateChanged(): ', event);
    }
}
