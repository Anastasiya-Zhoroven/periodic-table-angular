import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PeriodicTableStore } from '../../stores/periodic-table.store';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css'
})
export class Dialog {
  editedValue: string = '';

  private tableStore = inject(PeriodicTableStore);
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.editedValue = this.data.element[this.data.field];
  }

  saveEdit(): void {
    this.tableStore.updateElement(this.data.element, this.data.field, this.editedValue)
    this.dialogRef.close();
  }
}
