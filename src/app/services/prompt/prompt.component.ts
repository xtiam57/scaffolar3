import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { StringUtilService } from '../string-util.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() options: any;

  private _inputOptions = {
    label: null,
    type: 'text',
    map: null,
    placeholder: null,
    value: null,
    name: null,
    minlength: null,
    maxlength: null,
    max: null,
    min: null,
    step: 'any',
    pattern: null,
    petternErrorMessage: 'The structure of the field is wrong.',
    required: true,
    extraInputClasses: '',
    extraLabelClasses: '',
    compareTo: null
  };

  private _selectOptions = {
    label: null,
    map: null,
    name: null,
    value: null,
    required: true,
    extraInputClasses: '',
    extraLabelClasses: '',
    compareTo: null,
    key: 'value',
    flattenResponse: false,
    data: []
  };

  constructor(public modal: NgbActiveModal, private stringUtil: StringUtilService) {}

  ngOnInit() {
    this._transformInputs();
    this._transformSelects();
  }

  private _transformInputs(): void {
    if (!_.isArray(this.options.inputs)) {
      return;
    }
    for (let i = 0; i < this.options.inputs.length; i++) {
      this.options.inputs[i] = this._getInput(this.options.inputs[i], i);
    }
  }

  private _transformSelects(): void {
    if (!_.isArray(this.options.selects)) {
      return;
    }
    for (let i = 0; i < this.options.selects.length; i++) {
      this.options.selects[i] = this._getSelect(this.options.selects[i], i);
    }
  }

  private _getInput(options: any, index: number): any {
    if (_.isEmpty(options.map)) {
      options.map = options.label ? this.stringUtil.camelize(options.label, true) : index;
    }
    if (_.isEmpty(options.name)) {
      options.name = options.label ? this.stringUtil.camelize(options.label, true) : index;
    }
    return _.defaults({}, options, _.clone(this._inputOptions));
  }

  private _getSelect(options: any, index: number): any {
    if (_.isEmpty(options.map)) {
      options.map = options.label ? this.stringUtil.camelize(options.label, true) : index;
    }
    if (_.isEmpty(options.name)) {
      options.name = options.label ? this.stringUtil.camelize(options.label, true) : index;
    }
    return _.defaults({}, options, _.clone(this._selectOptions));
  }

  close() {
    const response = {};

    for (let i = 0; i < this.options.inputs.length; i++) {
      const item = this.options.inputs[i];
      response[item.map] = item.type !== 'number' ? item.value : parseFloat(item.value);
    }

    for (let i = 0; i < this.options.selects.length; i++) {
      const item = this.options.selects[i];
      response[item.map] = item.value;
    }

    this.modal.close(response);
  }
}
