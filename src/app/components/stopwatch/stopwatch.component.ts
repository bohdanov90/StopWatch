import { Component, OnInit } from '@angular/core';
import { StopwatchLogicService } from '../../services/stopwatch-logic.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {
  public stopwatchValue$: Observable<any>;

  constructor(
    private stopwatchLogicService: StopwatchLogicService,
  ) { }

  ngOnInit(): void {
    this.init().subscribe();
  }

  public init() {
    return this.stopwatchValue$ = this.stopwatchLogicService.getValue$().pipe(
      map(el => el.value * 1000),
      tap(el => console.log(el)),
    );
  }

  public startStop(): void {
    this.stopwatchLogicService.setValue({isPaused: false, value: 0});
  }

  public wait(): void {
    this.stopwatchLogicService.setValue({isPaused: true});
  }

  public reset(): void {
    this.stopwatchLogicService.setValue({value: 0});
  }
}
