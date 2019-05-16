import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { StringUtilService } from 'src/app/services/string-util.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-textarea-inline',
  templateUrl: './textarea-inline.component.html',
  styleUrls: ['./textarea-inline.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaInlineComponent),
    multi: true
  }]
})
export class TextareaInlineComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') input: ElementRef; // input DOM element
  @ViewChild('buttonSave') buttonSave: ElementRef; // button DOM element
  @ViewChild('buttonCancel') buttonCancel: ElementRef; // button DOM element

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() cols: number;
  @Input() rows: number;
  @Input() buttons = true;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() beforeSave: EventEmitter<any> = new EventEmitter();
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  public isEditing = false; // Is Component in edit mode?
  protected inputReqflag = false;
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  protected id: string;
  protected hasError = false;
  protected errorMessage: string;
  protected buttonHasFocus = false;
  private _originalValue: any;
  private _value: any; // Private variable for input value
  private _subject: Subject<any> = new Subject();

  constructor(el: ElementRef, stringUtil: StringUtilService) {
    this.id = stringUtil.getGUID(true);
  }

  // Control Value Accessors for ngModel
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  // Required forControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  // Required forControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onSave() {
    const value = this.input.nativeElement.value;
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

    const validations = ['maxLength', 'minLength'];

    _.each(validations, (validation) => {
      if (!_.isNull(this[validation]) && !_.isUndefined(this[validation])) {
        if (_.isNumber(this[validation])) {
          if (validation === 'minLength' && value.length < this[validation]) {
            this.hasError = true;
            this.errorMessage = `Minimum length is ${this[validation]}.`;
          } else if (validation === 'maxLength' && value.length > this[validation]) {
            this.hasError = true;
            this.errorMessage = `Maximum length is ${this[validation]}.`;
          } else {
            console.warn('Unknown number validation.');
            return;
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

  ngOnInit() { }
}
