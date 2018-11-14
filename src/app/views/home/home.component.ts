import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @LocalStorage() title = 'scaffolar';

  model = {
    left: true,
    middle: false,
    right: false
  };

  constructor(private message: MessagesService) {}

  ngOnInit() {
    // this.restful
    //   .get('search', {
    //     q: 'title:DNA',
    //     h: 'hello'
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }

  showSuccess() {
    this.message.create('Hello world!', 'Title');
  }
}
