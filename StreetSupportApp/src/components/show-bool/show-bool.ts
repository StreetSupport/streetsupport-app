import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'show-bool',
  templateUrl: 'show-bool.html'
})
export class ShowBoolComponent {
 
  @Input('bool') bool=2;
  @Input('switch') do_switch;
  
  constructor() {
  }
  bool_click(){
    if(this.do_switch){
      switch(this.bool){
        case 0:
          this.bool = 2;
          break;
        case 1:
          this.bool = 0;
          break;
        case 2:
          this.bool = 1;
          break;
      }
    }
  }
}