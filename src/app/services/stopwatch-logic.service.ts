import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStopwatch } from '../interfaces/stopwatch';

@Injectable({
  providedIn: 'root'
})
export class StopwatchLogicService {
  public stopwatch$: BehaviorSubject<IStopwatch> = new BehaviorSubject({
    isPaused: true,
    value: 15,
  });

  setValue(data: IStopwatch): void {
    this.stopwatch$.next(data);
  }

  getValue$(): Observable<IStopwatch> {
    return this.stopwatch$.asObservable();
  }
}
