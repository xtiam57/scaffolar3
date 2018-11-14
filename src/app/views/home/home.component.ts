import { Component, OnInit } from '@angular/core';
import { RESTfulService } from '../../services/restful.service';
import { NumberUtilService } from 'src/app/services/number-util.service';
import { GridStackItem, GridStackOptions, GridStackItemComponent, GridStackComponent} from 'ng4-gridstack';

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
    public options: GridStackOptions = new GridStackOptions();
    public widget1: GridStackItem = new GridStackItem();
    public widget2: GridStackItem = new GridStackItem();
  constructor(private restful: RESTfulService, private numberUtilService: NumberUtilService) {}

  ngOnInit() {
    console.log(this.numberUtilService.round(2.53469, 4));
    console.log(this.numberUtilService.acum(5.5, 4));
    console.log(this.numberUtilService.fromFraction('2 1/4'));
    console.log(this.numberUtilService.toFraction(2.33));
    console.log(this.numberUtilService.convertDDToDMS(2.33, true, true));
    console.log(this.options);
    console.log(this.widget1);
    console.log(this.widget1);

    this.widget1.x = 0;
    this.widget1.y = 0;
    this.widget1.width = 4;
    this.widget1.height = 4;

    this.widget2.x = 1;
    this.widget2.y = 0;
    this.widget2.width = 4;
    this.widget2.height = 4;

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
