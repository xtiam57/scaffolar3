import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { StringUtilService } from 'src/app/services/string-util.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-typeahead-inline',
  templateUrl: './typeahead-inline.component.html',
  styleUrls: ['./typeahead-inline.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TypeaheadInlineComponent),
    multi: true
  }]
})
export class TypeaheadInlineComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') input: ElementRef; // input DOM element
  @ViewChild('buttonSave') buttonSave: ElementRef; // button DOM element
  @ViewChild('buttonCancel') buttonCancel: ElementRef; // button DOM element

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() buttons = true;
  @Input() options: any;
  @Input() displayValue: string;
  @Input() openOnFocus = false;
  @Input() isAsync = true;
  @Input() dropup = false;
  @Input() container = '';

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() beforeSave: EventEmitter<any> = new EventEmitter();
  @Output() afterSave: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  public isEditing = false; // Is Component in edit mode?
  public onChange: any = Function.prototype; // Trascend the onChange event
  public onTouched: any = Function.prototype; // Trascend the onTouch event
  protected id: string;
  protected hasError = false;
  protected errorMessage: string;
  protected buttonHasFocus = false;
  protected noResults = false;
  protected hasChanged = false;
  protected minLength = 1;
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

    if (this.noResults) {
      this.focus();
      return;
    }

    if (!_.isEmpty(this.displayValue) && !_.isObject(this.value)) {
      this.value = this._originalValue;
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
    this.hasChanged = false;
    this.close.emit();
  }

  onCancel() {
    this.isEditing = false;
    this.value = this._originalValue;
    this.hasError = false;
    this.noResults = false;
    this.hasChanged = false;
    this.cancel.emit();
    this.close.emit();
  }

  onEnter() {
    if (this.required) {
      if (_.isEmpty(this.value)) {
        this.hasError = true;
        this.errorMessage = 'This field is required.';
        this.focus();
        return;
      }
    }

    if (this.noResults) {
      this.focus();
      return;
    }

    if (!this.hasChanged) {
      this.onCancel();
    }
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

    if (!_.isEmpty(this.displayValue)) {
      this.value = value[this.displayValue];
    }

    this.focus();
    this.subscribe();
    this.open.emit();
  }

  focus() {
    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    }, 100);
  }

  subscribe() {
    this._subject = new Subject();
    this._subject.subscribe(
      () => {
        this.hasError = false;
        this.noResults = false;
        this.hasChanged = false;
        this.afterSave.emit(this.value);
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

  onSelect(option: TypeaheadMatch) {
    this.value = option.item;
    this.onSave();
  }

  onNoResults(value: boolean) {
    this.noResults = value;
  }

  onSearch(keyword: string) {
    this.hasChanged = true;
    if (this.openOnFocus) {
      this.minLength = 0;
    }
    return this.search.emit(keyword);
  }

  ngOnInit() { }
}
