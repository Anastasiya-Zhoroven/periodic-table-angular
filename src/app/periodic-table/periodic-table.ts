import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PeriodicTableService } from '../services/periodic-table.service';
import { PeriodicTableStore } from '../stores/periodic-table.store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-periodic-table',
  imports: [NgIf, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.css',
  standalone: true,
})
export class PeriodicTable implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private tableService = inject(PeriodicTableService);
  private tableStore = inject(PeriodicTableStore);

  elements = computed(() => this.tableStore.elements());

  loading = computed(() => this.tableStore.elements() === null);

  ngOnInit(): void {
    this.tableService.getElements().subscribe(data => {
      this.tableStore.setElements(data);
    });
  }
}
