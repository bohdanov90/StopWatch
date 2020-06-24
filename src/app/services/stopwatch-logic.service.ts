import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, interval, Subject, fromEvent } from 'rxjs';
import { IStopwatch } from '../interfaces/stopwatch';
import { switchMap, tap, takeUntil, bufferTime, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StopwatchLogicService {
  public stopwatch$: BehaviorSubject<IStopwatch> = new BehaviorSubject({
    isPaused: true,
    value: 0,
  });
  public isWaitClicked = false;
  public stopwatchValue = 0;
  public onDestroy$: Subject<void> = new Subject<void>();

  public initStopwatch(): void {
    this.stopwatch$
      .pipe(
        switchMap(data => {
          return data.isPaused
            ? NEVER
            : interval(1000).pipe(
                tap(() => {
                  data.value++;
                  this.stopwatchValue = data.value;
                })
            );
        }),
        takeUntil(this.onDestroy$),
      ).subscribe();
  }

  public startStopStopwatch(): void {
    if (!!this.stopwatch$.getValue().isPaused && !!this.isWaitClicked) {
      this.startAndContinueCounter();

      return;
    }
    if (!!this.stopwatch$.getValue().isPaused) {
      this.startAndResetCounter();

      return;
    }
    this.stopAndResetCounter();
  }

  public resetStopwatch(): void {
    this.startAndResetCounter();
  }

  public waitStopwatch(button: Element): void {
    fromEvent(button, 'click').pipe(
      bufferTime(300),
      filter(arr => arr.length === 2),
      tap(() => {
        this.stopwatch$.next({
        isPaused: true,
        value: this.stopwatch$.getValue().value
        });
        this.isWaitClicked = true;
    }),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  private startAndResetCounter(): void {
    this.stopwatch$.next({isPaused: false, value: 0});
    this.stopwatchValue = 0;
  }

  private startAndContinueCounter(): void {
    this.stopwatch$.next({
      isPaused: false,
      value: this.stopwatch$.getValue().value
    });
  }

  private stopAndResetCounter(): void {
    this.stopwatch$.next({isPaused: true, value: 0});
    this.stopwatchValue = 0;
  }
}
