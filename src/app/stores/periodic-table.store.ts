import { Injectable, signal } from '@angular/core';
import { PeriodicElement } from '../interfaces/periodicElement.interface';

@Injectable({ 
    providedIn: 'root' 
})

export class PeriodicTableStore {
  private elementsSignal = signal<PeriodicElement[] | null>(null);
  readonly elements = this.elementsSignal.asReadonly();

  setElements(data: PeriodicElement[]) {
    this.elementsSignal.set(data);
  }

  clear() {
    this.elementsSignal.set(null);
  }
}