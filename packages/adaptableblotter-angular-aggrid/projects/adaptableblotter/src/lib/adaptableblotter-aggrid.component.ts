import { Component, OnInit, Input } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-enterprise';

@Component({
  selector: 'adaptable-blotter-aggrid',
  template: `<div id="adaptableBlotter-angular-aggrid">
    <div id="adaptableBlotter">
      <adaptable-blotter
        [adaptableBlotterOptions]="adaptableBlotterOptions"
        vendorGridName="agGrid">
      </adaptable-blotter>
    </div>
    <div id="grid">
      <ag-grid-angular
        [gridOptions]="gridOptions"
        [className]="agGridClass"
        [ngStyle]="agDivStyle">
      </ag-grid-angular>
    </div>
  </div>`,
})
export class AdaptableblotterAgGridComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() gridOptions: GridOptions;
  @Input() agTheme?: 'balham' | 'balham-dark' | 'material' | 'fresh' | 'dark' | 'blue' | 'bootstrap' = 'balham';
  @Input() agDivStyle?: any = { width: '100%', height: '90%', position: 'absolute', margin: '0px' };

  agGridClass: string;

  constructor() { }

  ngOnInit() {
    this.agGridClass = `ag-theme-${this.agTheme}`;
  }

}