// 组建部分，代码逻辑
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './test.less']
})
export class AppComponent {
  title = 'Angular Heros';

  getTitle(){
    return this.title;
  }
}
