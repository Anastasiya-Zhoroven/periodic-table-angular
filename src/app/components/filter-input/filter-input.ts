import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PeriodicTableStore } from '../../stores/periodic-table.store';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './filter-input.html',
  styleUrl: './filter-input.css'
})
export class FilterInput {
  private tableStore: PeriodicTableStore = inject(PeriodicTableStore);
  filterControl: FormControl = new FormControl('');

  constructor() {
    this.filterControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(value => {
        this.tableStore.setQuery(value);
      });
  }
}
