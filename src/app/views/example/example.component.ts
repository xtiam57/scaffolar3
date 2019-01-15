import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../../services/messages.service';
import { ExporterService } from '../../services/exporter.service';
import { PromptService } from 'src/app/services/prompt/prompt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExampleComponent } from '../modal-example/modal-example.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() params: any;
  @Input() message: string;
  test;
  asideOpened = false;

  @LocalStorage() title = 'scaffolar';

  model = {
    left: true,
    middle: false,
    right: false
  };

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  cols = [{ headerName: 'Make', field: 'make' }, { headerName: 'Model', field: 'model' }, { headerName: 'Price', field: 'price' }];

  rows = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  next = 0;

  constructor(private messageService: MessagesService, private exporter: ExporterService, private prompt: PromptService, private modalService: NgbModal) {}

  ngOnInit() {}

  showSuccess() {
    this.messageService.create('Hello world!', 'Title');
  }

  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }

  export() {
    this.exporter.saveAs();
  }

  open() {
    const prompt = this.prompt.open(
      'The title',
      `Test Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.`,
      {
        cancelButtonText: 'Shut up!',
        centered: true,
        inputs: [
          //   {
          //     label: 'Title',
          //     placeholder: 'The title',
          //     // map: 'description',
          //     type: 'text',
          //     maxlength: 10,
          //   },
          //   {
          //     label: 'Description',
          //     placeholder: '',
          //     // map: 'description',
          //     type: 'textarea'
          //   },
          {
            label: 'Reference Cost',
            placeholder: '',
            // map: 'referenceCost',
            type: 'number',
            min: 1,
            max: 10
          }
        ],
        selects: [
          {
            label: 'Term Unit',
            key: 'itemValue',
            data: [
              // 'A', 'B', 'C'
              { itemValue: 'A', id: 1 },
              { itemValue: 'B', id: 2 },
              { itemValue: 'C', id: 3 }
            ]
          }
        ]
      }
    );

    prompt.result.then((response) => console.log(response), (cause) => console.log(cause));
  }

  openComposeModal() {
    const promptRef = this.modalService.open(ModalExampleComponent, {
      backdrop: false,
      container: '#compose-container',
      windowClass: 'compose-modal'
    });
  }
}
