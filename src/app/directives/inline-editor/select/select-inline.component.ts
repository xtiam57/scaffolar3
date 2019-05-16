import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { StringUtilService } from 'src/app/services/string-util.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-select-inline',
  templateUrl: './select-inline.component.html',
  styleUrls: ['./select-inline.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectInlineComponent),
    multi: true
  }]
})
export class SelectInlineComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') input: ElementRef; // input DOM element
  @ViewChild('buttonSave') buttonSave: ElementRef; // button DOM element
  @ViewChild('buttonCancel') buttonCancel: ElementRef; // button DOM element

  @Input() disabled = false;
  @Input() required = false;
  @Input() buttons = true;

  @Input() options: any[] = [];
  @Input() displayValue: string;
  @Input() compareValue = 'id';
  @Input() selectionValue: string;

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

  getItem(option: any) {
    return _.isEmpty(this.displayValue) ? option : option[this.displayValue];
  }

  getValue(option: any) {
    return _.isEmpty(this.selectionValue) ? option : option[this.selectionValue];
  }

  isSelected(option1: any, option2: any): boolean {
    return _.isEmpty(this.compareValue) ?
      JSON.stringify(option1) === JSON.stringify(option2) :
      option1[this.compareValue] === option2[this.compareValue];
  }

  ngOnInit() { }
}
