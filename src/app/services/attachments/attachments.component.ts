import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ListParams } from 'src/app/base/list-params';
import * as _ from 'underscore';
import { NumberUtilService } from '../number-util.service';
import { AttachmentsService } from './attachments.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {
  @Input() id: string;
  counter = 0;
  size = 'lg';
  files = [];
  folders = [];
  tags: Observable<any>;
  count = 0;
  isUploading = false;
  loadingPromise;
  selectValue: any;

  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  search = {
    text: undefined,
    folder: undefined
  };

  constructor(public modal: NgbActiveModal, private attachmentsService: AttachmentsService, formBuilder: FormBuilder, private numberUtil: NumberUtilService) {
    this.form = formBuilder.group({
      tag: [null, Validators.required],
      fileDTO: [null, Validators.required]
    });
   }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loadingPromise = this.attachmentsService.list(this.id).subscribe((response) => {
      this.files = response.data;
      this.getFolders();
    });
  }

  getFolders() {
    const groups = _.groupBy(this.files, (value) => (_.isEmpty(value.tag) ? null : value.tag.toUpperCase()));
    this.folders = [];

    _.each(groups, (value, key) => {
      this.folders.push({
        tag: key === 'null' ? null : key,
        count: _.size(value)
      });
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const that = this;
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('fileDTO').setValue({
          fileName: file.name,
          fileType: file.type,
          fileSize: that.numberUtil.convertToFileSize(file.size),
          fileExtension: /(?:\.([^.]+))?$/.exec(file.name)[1],
          content: (<string>reader.result).split(',')[1]
        });
      };
    }
  }

  upload() {
    const payload = JSON.parse(JSON.stringify(this.form.value));

    delete payload.fileDTO.fileSize;
    delete payload.fileDTO.fileType;

    this.loadingPromise = this.attachmentsService.upload(payload, this.id).subscribe(() => {
      // Clean form
      this.form.get('tag').setValue(null);
      this.form.get('fileDTO').setValue(null);
      this.fileInput.nativeElement.value = '';

      this.counter++;

      this.load();
    });
  }

  update({ value, oldValue, editor }, id: string, field: string) {
    this.attachmentsService.update(id, { [field]: value }, true).subscribe((response) => {
      editor.next(response);
    }, () => {
      editor.error('error');
    });
  }

  clearFile() {
    this.form.get('fileDTO').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  searchTag(keyword: string) {
    return this.tags = this.attachmentsService.listTags(new ListParams({ keyword }));
  }
}
