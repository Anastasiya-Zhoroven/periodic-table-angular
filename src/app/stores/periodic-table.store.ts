import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { PeriodicElement, PeriodicElementKey, PeriodicElementValue } from '../interfaces/periodicElement.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableStore {
  // State
  elements: WritableSignal<PeriodicElement[] | null> = signal<PeriodicElement[] | null>(null);
  query: WritableSignal<string | null> = signal<string | null>('');

  // Computed
  loading: Signal<boolean> = computed(() => this.elements() === null);

  filteredElements: Signal<PeriodicElement[]> = computed(() => {
    const query: string | undefined = this.query()?.toLowerCase();
    const elements: PeriodicElement[] = this.elements() ?? [];
    if (query) {
      return elements.filter(element => Object.values(element).join(' ').toLowerCase().includes(query));
    }
    return elements;
  });

  // Methods
  setElements(elements: PeriodicElement[]): void {
    this.elements.set(elements);
  }

  setQuery(value: string | null): void {
    this.query.set(value);
  }

  updateElement(editedElement: PeriodicElement, field: PeriodicElementKey, value: PeriodicElementValue): void {
    const updated: PeriodicElement[] = (this.elements() ?? []).map(element =>
      element === editedElement ? { ...editedElement, [field]: value } : element
    );
    this.setElements(updated);
  }
}
