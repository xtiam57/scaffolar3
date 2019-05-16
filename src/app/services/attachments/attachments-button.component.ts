import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AttachmentsLauncherService } from './attachments-launcher.service';
import { AttachmentsService } from './attachments.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-attachments-button',
  templateUrl: './attachments-button.component.html',
  styleUrls: ['./attachments-button.component.scss']
})
export class AttachmentsButtonComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() buttonClass = 'btn-link btn-xs p-0';
  counter = 0;

  constructor(private attachmentsLauncherService: AttachmentsLauncherService, private attachmentsService: AttachmentsService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.id && !_.isEmpty(changes.id.currentValue)) {
      this.attachmentsService.getCounter(this.id).subscribe((response: any) => {
        this.counter = response.data;
      });
    }
  }

  open() {
    this.attachmentsLauncherService.open(this.id)
      .then(
        (count: number) => this.counter += count,
        (count: number) => this.counter += count
      );
  }
}
