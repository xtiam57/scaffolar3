import { Component, OnInit } from '@angular/core';
import { RESTfulService } from '../../services/restful.service';
import { NumberUtilService } from 'src/app/services/number-util.service';
import { LocalStorage } from 'ngx-store';

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

  constructor(private restful: RESTfulService, private numberUtilService: NumberUtilService) {}

  ngOnInit() {
    console.log(this.numberUtilService.round(2.53469, 4));
    console.log(this.numberUtilService.acum(5.5, 4));
    console.log(this.numberUtilService.fromFraction('2 1/4'));
    console.log(this.numberUtilService.toFraction(2.33));
    console.log(this.numberUtilService.convertDDToDMS(2.33, true, true));
    // this.restful
    //   .get('search', {
    //     q: 'title:DNA',
    //     h: 'hello'
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }
}
