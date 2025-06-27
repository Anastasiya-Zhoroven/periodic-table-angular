import { Component } from '@angular/core';
import { PeriodicTable } from './periodic-table/periodic-table';


@Component({
  selector: 'app-root',
  imports: [PeriodicTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'periodic-table-angular';
}
