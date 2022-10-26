import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  // ElementRef
  @ViewChild('sliderContainer') slidercontainer: ElementRef;
  @ViewChild('dragThumbOne') dragThumbOne: ElementRef;
  @ViewChild('dragThumbTwo') dragThumbTwo: ElementRef;
  // Input data
  @Input() minValue: number; // the minValue on the slider
  @Input() maxValue: number; // the maxValue on the slider
  @Input() thumbOneInitValue: number; // initial value of the thumb 1 when the slider appear
  @Input() thumbTwoInitValue: number; // initial value of the thumb 2 when the slider appear
  @Input() sliderCssType: number; // initial value of the thumb 2 when the slider appear
  // Event
  @Output() sliderChangeEvent = new EventEmitter<any>();

  // Othre Values
  rangeValue: number = 100;
  sliderContainerwitdhInPixels = 300;
  stepInPixels: number = 3;

  thumbOneValue: number = 0;
  thumbTwoValue: number = 5;
  lastValue1: number = 0;
  lastValue2: number = 5;

  sliderContainerPosition = { top: 0, left: 0 };

  dragPosition1 = { x: 0, y: 0 };
  dragPosition2 = { x: 0, y: 0 };

  constructor() {}

  ngOnInit() {
    // redefine range value between minValue and maxValue of the slider
    this.rangeValue = this.maxValue - this.minValue;
    // initialize values
    this.thumbOneValue = this.thumbOneInitValue;
    this.thumbTwoValue =
      this.thumbTwoInitValue != null ? this.thumbTwoInitValue : undefined;
  }

  ngAfterViewInit() {
    console.log(this.dragThumbOne.nativeElement.getBoundingClientRect());
    // define "sliderContainerwitdhInPixels" "stepInPixels" "sliderContainerPosition" with real values
    this.setValues();
    // Initialize Position in pixels of thumb1 and thumb2
    let stepsthumbOne = this.thumbOneInitValue - this.minValue;
    this.dragPosition1.x = stepsthumbOne * this.stepInPixels;
    let stepsthumbTwo = this.thumbTwoInitValue - this.minValue;
    this.dragPosition2.x = stepsthumbTwo * this.stepInPixels;
  }

  onResize(e) {
    // define "sliderContainerwitdhInPixels""stepInPixels" "sliderContainerPosition" with real values
    this.setValues();
    // Set Position in pixels of thumb1 and thumb2
    let stepsthumbOne = this.thumbOneValue - this.minValue;
    this.dragPosition1.x = stepsthumbOne * this.stepInPixels;
    let stepsthumbTwo = this.thumbTwoValue - this.minValue;
    this.dragPosition2.x = stepsthumbTwo * this.stepInPixels;
  }

  /**
   * get unity
   */
  getUnity() {
    return this.sliderCssType == 1 ? '°' : 'mn';
  }

  convertHM(minutes) {
    let hours = Math.floor(minutes / 60);
    let min = minutes % 60;
    let minPrint = min < 10 ? '0' + min : min;
    return hours + 'h' + min + 'm';
  }

  /**
   * minMove()
   * called when user move the thumb1
   */
  minMove(e) {
    let value: number = 0; // print value in °c
    value =
      (e.source.element.nativeElement.getBoundingClientRect().x -
        this.sliderContainerPosition.left) /
        this.stepInPixels +
      this.minValue;
    value = Math.round((value / 100) * 100);

    if (value != this.lastValue1) {
      this.lastValue1 = value;
      this.thumbOneValue = value;
      this.sliderChangeEvent.emit({
        value1: this.thumbOneValue,
        value2: this.thumbTwoValue,
      });
    }

    // if (
    //   this.dragThumbOne.nativeElement.getBoundingClientRect().right >=
    //   this.dragThumbTwo.nativeElement.getBoundingClientRect().left
    // ) {
    //   //return false;
    // }
  }

  /**
   * maxMove()
   * called when user move the thumb2
   */
  maxMove(e) {
    let value: number = 0; // print value in °c
    value =
      (e.source.element.nativeElement.getBoundingClientRect().x -
        this.sliderContainerPosition.left) /
        this.stepInPixels +
      this.minValue;
    value = Math.round((value / 100) * 100);

    if (value != this.lastValue2) {
      this.lastValue2 = value;
      this.thumbTwoValue = value;
      this.sliderChangeEvent.emit({
        value1: this.thumbOneValue,
        value2: this.thumbTwoValue,
      });
    }

    // if (
    //   this.dragThumbOne.nativeElement.getBoundingClientRect().right >=
    //   this.dragThumbTwo.nativeElement.getBoundingClientRect().left
    // ) {
    //   //return false;
    // }
  }

  /**
   * SET VALUES
   * define "sliderContainerwitdhInPixels" "stepInPixels" "sliderContainerPosition" with real values
   */
  setValues() {
    // sliderContainerwitdhInPixels
    this.sliderContainerwitdhInPixels =
      this.slidercontainer.nativeElement.getBoundingClientRect().width;
    console.log('largeur slidercontainer', this.sliderContainerwitdhInPixels);
    // stepInPixels
    this.stepInPixels = this.sliderContainerwitdhInPixels / this.rangeValue;
    console.log('stepInPixels : ', this.stepInPixels);
    // sliderContainerPosition
    this.sliderContainerPosition.top =
      this.slidercontainer.nativeElement.getBoundingClientRect().top;
    this.sliderContainerPosition.left =
      this.slidercontainer.nativeElement.getBoundingClientRect().left;
    console.log('sliderPosition', this.sliderContainerPosition);
  }
}
