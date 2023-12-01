import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProcessData } from '../models/process-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

    constructor() { }

    public onSomeEvent(): Observable<ProcessData[]> {
        return of([]);
    }
}
