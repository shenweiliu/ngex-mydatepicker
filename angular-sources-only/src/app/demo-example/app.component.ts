import { Component } from '@angular/core';
import { DpNgmodelComponent } from './ngmodel/dp-ngmodel.component';
import { DpReactiveFormsComponent } from './reactive-forms/dp-reactive-forms.component';
import { DpDivHostComponent } from './div-host/dp-div-host.component';
import { DpInlineComponent } from './inline/dp-inline.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [DpNgmodelComponent, DpReactiveFormsComponent, DpDivHostComponent, DpInlineComponent]
})
export class AppComponent {
    constructor() {
        console.log('constructor: AppComponent()');
    }
}
