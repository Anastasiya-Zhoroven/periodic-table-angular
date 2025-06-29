import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodicTableService } from '../../services/periodic-table.service';
import { PeriodicTableStore } from '../../stores/periodic-table.store';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '../dialog/dialog';
import { FilterInput } from '../filter-input/filter-input';
import { PeriodicElement, PeriodicElementKey } from '../../interfaces/periodicElement.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-periodic-table',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FilterInput,
    TitleCasePipe,
  ],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.css',
  standalone: true,
})
export class PeriodicTable implements OnInit {
  private tableService: PeriodicTableService = inject(PeriodicTableService);
  private tableStore: PeriodicTableStore = inject(PeriodicTableStore);
  readonly dialog: MatDialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);


  readonly columns: PeriodicElementKey[] = ['position', 'name', 'weight', 'symbol'];
  readonly elements: Signal<PeriodicElement[] | null | undefined> = this.tableStore.filteredElements;
  readonly loading: Signal<boolean> = this.tableStore.loading;

  ngOnInit(): void {
    this.tableService.getElements()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: PeriodicElement[]) => {
        this.tableStore.setElements(data);
      });
  }

  editElement(element: PeriodicElement, field: PeriodicElementKey): void {
    this.dialog.open(Dialog, {
      data: {
        value: element[field],
        field,
      },
      width: '400px'
    }).afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => {
        if (value) {
          this.tableStore.updateElement(element, field, value)
        }
      });
  }

  onFilterChange(value: string): void {
    this.tableStore.setQuery(value);
  }
}
