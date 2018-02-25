import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  message: string;
  details: string;
  show: boolean = false;

  constructor() { }

  error(message: string, details?: string) {
    this.message = message;
    this.details = details ? details : null;
    this.show = true;
  }

  clear() {
    this.message = null;
    this.details = null;
    this.show = false;
  }

}
