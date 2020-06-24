import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { StopwatchLogicService } from '../../services/stopwatch-logic.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit, OnDestroy {

  @ViewChild('waitButton') waitButton: ElementRef;

  constructor(public stopwatchLogicService: StopwatchLogicService) {}

  ngOnInit(): void {
    this.stopwatchLogicService.initStopwatch();
  }

  ngOnDestroy(): void {
    this.stopwatchLogicService.onDestroy$.next();
    this.stopwatchLogicService.onDestroy$.complete();
  }

  public onStartStopClick(): void {
    this.stopwatchLogicService.startStopStopwatch();
  }

  public onWaitClick(): void {
    this.stopwatchLogicService.waitStopwatch(this.waitButton.nativeElement);
  }

  public onResetClick(): void {
    this.stopwatchLogicService.resetStopwatch();
  }
}
