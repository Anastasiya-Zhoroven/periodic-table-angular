import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ELEMENT_DATA, PeriodicElement } from '../interfaces/periodicElement.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableService {
  getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
