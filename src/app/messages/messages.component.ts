import { MessagesService } from './../services/messages.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zap-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
