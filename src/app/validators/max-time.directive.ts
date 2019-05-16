
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { maxTime } from './max-time-validator';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[maxTime][formControlName],[maxTime][formControl],[maxTime][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxTimeDirective),
    multi: true
  }]
})
export class MaxTimeDirective implements Validator, OnInit, OnChanges {
  @Input() maxTime: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = maxTime(this.maxTime);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'maxTime') {
        this.validator = maxTime(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
