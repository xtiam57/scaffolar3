import { Component, OnInit } from '@angular/core';
import { RESTfulService } from '../../services/restful.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'scaffolar';

  model = {
    left: true,
    middle: false,
    right: false
  };

  constructor(private restful: RESTfulService) {}

  ngOnInit() {
    this.restful
      .get('search', {
        q: 'title:DNA',
        h: 'hello'
      })
      .then((response) => {
        console.log(response);
      });
  }
}
