import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateUtilService } from 'src/app/services/date-util.service';
import { StringUtilService } from 'src/app/services/string-util.service';
import { TimeUtilService } from 'src/app/services/time-util.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-input-inline',
  templateUrl: './input-inline.component.html',
  styleUrls: ['./input-inline.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputInlineComponent),
    multi: true
  }]
})
export class InputInlineComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') input: ElementRef; // input DOM element
  @ViewChild('buttonSave') buttonSave: ElementRef; // button DOM element
  @ViewChild('buttonCancel') buttonCancel: ElementRef; // button DOM element

  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' = 'text';
  @Input() disabled = false;
  @Input() required = false;
  @Input() min: any;
  @Input() max: any;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() pattern: RegExp;
  @Input() step = 1;
  @Input() decimal = true;
  @Input() buttons = true;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() beforeSave: EventEmitter<any> = new EventEmitter();
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  public isEditing = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  protected id: string;
  protected hasError = false;
  protected errorMessage: string;
  protected buttonHasFocus = false;
  private _originalValue: any;
  private _value: any; // Private variable for input value
  private _subject: Subject<any> = new Subject();

  constructor(el: ElementRef, stringUtil: StringUtilService, private dateUtil: DateUtilService, private timeUtil: TimeUtilService, private datePipe: DatePipe) {
    this.id = stringUtil.getGUID(true);
  }

  // Control Value Accessors for ngModel
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      if (this.type === 'number') {
        this._value = Number(v);
      }
      this.onChange(this._value);
    }
  }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  // Required for ControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  // Required for ControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onSave() {
    const value = this.input.nativeElement.value;
    const valueAsNumber = this.input.nativeElement.valueAsNumber;
    this.errorMessage = '';
    this.hasError = false;

    if (this.required) {
      if (_.isEmpty(value)) {
        this.hasError = true;
        this.errorMessage = 'This field is required.';
        this.focus();
        return;
      }
    }

    if (!_.isNaN(valueAsNumber) && !this.decimal && _.contains(value, '.')) {
      this.hasError = true;
      this.errorMessage = 'Decimal places are not allowed.';
      this.focus();
      return;
    }

    const validations = ['maxLength', 'minLength', 'min', 'max', 'pattern'];

    _.each(validations, (validation) => {
      if (!_.isNull(this[validation]) && !_.isUndefined(this[validation])) {
        if (_.isNumber(this[validation])) {
          if (validation === 'minLength' && value.length < this[validation]) {
            this.hasError = true;
            this.errorMessage = `Minimum length is ${this[validation]}.`;
          } else if (validation === 'maxLength' && value.length > this[validation]) {
            this.hasError = true;
            this.errorMessage = `Maximum length is ${this[validation]}.`;
          } else if (validation === 'min' && valueAsNumber < this[validation]) {
            this.hasError = true;
            this.errorMessage = `Minimum value is ${this[validation]}.`;
          } else if (validation === 'max' && valueAsNumber > this[validation]) {
            this.hasError = true;
            this.errorMessage = `Maximum value is ${this[validation]}.`;
          } else {
            console.warn('Unknown number validation.');
            return;
          }
        } else if (validation === 'pattern' && !(new RegExp(this[validation]).test(value))) {
          this.hasError = true;
          this.errorMessage = 'Invalid pattern.';
        } else if (_.isDate(this[validation])) {
          if (this.type === 'time') {
            const time = `${this.datePipe.transform(this[validation], 'yyyy-MM-dd')}T${value}`;
            if (validation === 'min' && this.timeUtil.isBefore(time, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values at or after ${this.datePipe.transform(this[validation], 'HH:mm')} are allowed.`;
            } else if (validation === 'max' && this.timeUtil.isAfter(time, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values at or before ${this.datePipe.transform(this[validation], 'HH:mm')} are allowed.`;
            }
          } else {
            if (validation === 'min' && this.dateUtil.isBefore(value, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values on or after ${this.datePipe.transform(this[validation], 'dd/MMM/yyyy')} are allowed.`;
            } else if (validation === 'max' && this.dateUtil.isAfter(value, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values on or before ${this.datePipe.transform(this[validation], 'dd/MMM/yyyy')} are allowed.`;
            }
          }
        } else if (_.isString(this[validation])) {
          const regexIso8601 = /^\d{4}-\d{1,2}-\d{1,2}(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?$/gi;
          const regexTime = /^([\d]{1,2}):([\d]{1,2})(\:([\d]{1,2}))*(\.\d*)?$/gi;

          if (this.type === 'time' && this[validation].match(regexTime) && value.match(regexTime)) {
            const time = this.timeUtil.convertTimeToDate(value);
            const test = this.timeUtil.convertTimeToDate(this[validation]);
            if (validation === 'min' && this.timeUtil.isBefore(time, test)) {
              this.hasError = true;
              this.errorMessage = `Only values at or after ${this[validation]} are allowed.`;
            } else if (validation === 'max' && this.timeUtil.isAfter(time, test)) {
              this.hasError = true;
              this.errorMessage = `Only values at or before ${this[validation]} are allowed.`;
            }
          }

          if (this.type === 'date' && this[validation].match(regexIso8601) && value.match(regexIso8601)) {
            if (validation === 'min' && this.dateUtil.isBefore(value, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values on or after ${this.datePipe.transform(this[validation], 'dd/MMM/yyyy')} are allowed.`;
            } else if (validation === 'max' && this.dateUtil.isAfter(value, this[validation])) {
              this.hasError = true;
              this.errorMessage = `Only values on or before ${this.datePipe.transform(this[validation], 'dd/MMM/yyyy')} are allowed.`;
            }
          }
        }
      }
    });

    if (this.hasError) {
      this.focus();
      return;
    }

    const valueToEmit = {
      value: this._value,
      oldValue: this._originalValue,
      editor: this._subject
    };

    // Casting
    if (this.type === 'number') {
      valueToEmit.oldValue = _.isEmpty(valueToEmit.oldValue) ? null : Number(valueToEmit.oldValue);
    } else if (this.type === 'date') {
      valueToEmit.oldValue = _.isEmpty(valueToEmit.oldValue) ? null : new Date(valueToEmit.oldValue);
    }

    if (this._originalValue != this._value) {
      this.beforeSave.emit(valueToEmit);
      this.save.emit(valueToEmit);
    }

    this.isEditing = false;
    this.close.emit();
  }

  onCancel() {
    this.isEditing = false;
    this.value = this._originalValue;
    this.hasError = false;
    this.cancel.emit();
    this.close.emit();
  }

  onBlur($event: Event) {
    setTimeout(() => {
      if (!this.buttonHasFocus) {
        this.onCancel();
      }
    }, 100);
  }

  // Start the editting process for the input element
  edit(value: any) {
    if (this.disabled) {
      return;
    }

    this.isEditing = true;
    this.buttonHasFocus = false;
    this._originalValue = value;

    this.focus();
    this.subscribe();
    this.open.emit();
  }

  focus() {
    setTimeout(() => { this.input.nativeElement.focus(); }, 100);
  }

  subscribe() {
    this._subject = new Subject();
    this._subject.subscribe(
      () => {
        this.hasError = false;
        this.afterSave.emit(this._value);
      },
      (err: any) => {
        this.hasError = true;
        this.value = this._originalValue;
        this.edit(this.value);
      },
      () => {
        this.afterSave.emit(this.value);
      }
    );
  }

  isEmpty(): Boolean {
    return _.isNull(this._value) || _.isUndefined(this._value) || this._value === '';
  }

  ngOnInit() {
    // Default email pattern
    if (this.type === 'email' && _.isEmpty(this.pattern)) {
      this.pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }
    if (this.type === 'time' && this.step === 1) {
      this.step = 60;
    }
  }
}
