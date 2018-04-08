import { Component, Input, OnChanges } from '@angular/core';

/**
 * Generated class for the FuelGaugeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fuel-gauge',
  templateUrl: 'fuel-gauge.html'
})
export class FuelGaugeComponent implements OnChanges{

  // @Input('progress') progress;
  @Input() public progress: any;
  @Input() public goal: any;
    

  current: any;
  infoAbove: any; 
  
  barPercent: any;
  barStyle: any;

  constructor() {
    
  }

  ngOnInit(){
    this.current = this.progress;  
    this.infoAbove = false;
    
    console.log(this.calculateBarPercent());
    this.barPercent = 100 - this.calculateBarPercent(); 
    console.log("Bar percent: " + this.barPercent);
  }  

  calculateBarPercent() {
    var percent = (this.current / this.goal) * 100;

    if (percent > 100) {
      percent = 100;
    }
    if (percent < 15) {
      this.infoAbove = true;
    }

    return percent;
  };

  ngOnChanges(changes) {
    console.log(changes);
    this.current = changes.progress.currentValue;

    this.barPercent = 100 - this.calculateBarPercent(); 
    console.log("Bar percent: " + this.barPercent);

  }

}
