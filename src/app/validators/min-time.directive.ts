
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';
import { minTime } from './min-time-validator';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[minTime][formControlName],[minTime][formControl],[minTime][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinTimeDirective),
    multi: true
  }]
})
export class MinTimeDirective implements Validator, OnInit, OnChanges {
  @Input() minTime: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  ngOnInit() {
    this.validator = minTime(this.minTime);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'minTime') {
        this.validator = minTime(changes[key].currentValue);
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
