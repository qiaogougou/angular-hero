import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // messageService 必须是 public 类型，因为要在模板中绑定
  // angular 只能绑定到public属性
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
