import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { StopwatchLogicService } from '../../services/stopwatch-logic.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild('waitButton') waitButton: ElementRef;
  public isWaitClicked: boolean;
  public stopwatchValue: number;

  constructor(private stopwatchLogicService: StopwatchLogicService) {}

  ngOnInit(): void {
    this.stopwatchLogicService.initStopwatch();
  }

  ngDoCheck() {
    this.isWaitClicked = this.stopwatchLogicService.isWaitClicked;
    this.stopwatchValue = this.stopwatchLogicService.stopwatchValue;
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
