import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './filter-input.html',
  styleUrl: './filter-input.css'
})
export class FilterInput {
  filterControl: FormControl = new FormControl('');
  filterChange: OutputEmitterRef<string> = output<string>();

  constructor() {
    this.filterControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.filterChange.emit(value?.toLowerCase() || '');
      });
  }
}
