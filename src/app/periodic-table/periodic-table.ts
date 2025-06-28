import { Component, computed, effect, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule}  from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PeriodicTableService } from '../services/periodic-table.service';
import { PeriodicTableStore } from '../stores/periodic-table.store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-periodic-table',
  imports: [
    NgIf, 
    MatTableModule, 
    MatProgressSpinnerModule, 
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.css',
  standalone: true,
})
export class PeriodicTable implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  private tableService = inject(PeriodicTableService);
  private tableStore = inject(PeriodicTableStore);
  
  private dialog = inject(MatDialog);

  private filterInput = signal('');       
  private filterQuery = signal('');       
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  @ViewChild('editDialog') editDialogRef!: TemplateRef<any>;
  dialogRef: any;
  currentElement: any = null;
  editedValue: any = '';
  editedField: string = '';

  elements = computed(() => {
    const query = this.filterQuery().toLowerCase();
    const data = this.tableStore.elements();
  
    if (!data || !query) return data;
  
    return data.filter(el =>
      Object.values(el)
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  })

  loading = computed(() => this.tableStore.elements() === null);


  ngOnInit(): void {
    this.tableService.getElements().subscribe(data => {
      this.tableStore.setElements(data);
    });
  }

  editElement(element: any, field: string): void {
    this.currentElement = element;
    this.editedField = field;
    this.editedValue = element[field];
    this.dialogRef = this.dialog.open(this.editDialogRef, {
      data: { field }
    });
  }

  saveEdit(): void {
    if (this.currentElement && this.editedField) {
      const updated = (this.tableStore.elements() ?? []).map(el =>
        el === this.currentElement
          ? { ...el, [this.editedField]: this.editedValue }
          : el
      );
      this.tableStore.setElements(updated);
    }
  
    this.dialogRef.close();
  }

  onFilterInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.filterInput.set(value);
  
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  
    this.debounceTimeout = setTimeout(() => {
      this.filterQuery.set(this.filterInput());
    }, 2000);
  }

}
