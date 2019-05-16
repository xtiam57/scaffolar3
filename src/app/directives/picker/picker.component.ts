import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, OnChanges {
  @Input() list: any[] = [];
  @Input() icon: string[] = ['fas', 'bookmark'];
  @Input() picked: any;
  @Input() selectFirst = false;
  @Output() pickedChange: EventEmitter<any> = new EventEmitter();

  @Input() showCreateButton = false;
  @Input() showReportButton = false;
  @Input() showCommentsButton = false;
  @Input() showAttachmentButton = false;
  @Input() showDeleteButton = false;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() report: EventEmitter<any> = new EventEmitter();
  @Output() comment: EventEmitter<any> = new EventEmitter();
  @Output() attach: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (_.has(changes, 'picked')) {
      if (!_.isEmpty(changes.picked.currentValue)) {
        this.picked = changes.picked.currentValue;
        this.pickedChange.emit(this.picked);
        this.select.emit(this.picked);
      }
    }
  }

  onSelect(item: any) {
    this.picked = item;
    this.pickedChange.emit(this.picked);
    this.select.emit(this.picked);
  }

  onReport() {
    this.report.emit(this.picked);
  }

  onComment() {
    this.comment.emit(this.picked);
  }

  onAttach() {
    this.attach.emit(this.picked);
  }

  onDelete() {
    this.delete.emit(this.picked);
  }

  onCreate() {
    this.create.emit(this.picked);
  }
}
