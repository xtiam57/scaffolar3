import * as _ from 'underscore';
import { FormGroup, FormBuilder } from '@angular/forms';

export class BaseClass {
  public form: FormGroup;
  public formBuilder = new FormBuilder();

  constructor() {

  }

  /**
   * Works like any opts copy.
   * @param to Shouild be 'this' parameter in extended class
   * @param from Object to fill in 'to'
   */
  public init(to: any, from: any): any {
    for (const key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }

    return to;
  }

  public flatten(input: any) {
    // Ignore things that aren't objects.
    if (typeof input !== 'object') {
      return input;
    }
    let length = 0;

    // It's an object or array
    for (const key in input) {
      // Just for own properties
      if (!input.hasOwnProperty(key)) {
        continue;
      }

      length++;

      const value = input[key];
      // If the value is another array or object, recursive call
      if (typeof value === 'object') {
        // Recurse into object
        const res = this.flatten(value);

        if (res === null) {
          length--;
          delete input[key];
        }
      } else if (key !== 'id') {
        // Delete the property only if:
        // - the key name === "id"
        // - The value has a property call "id" (to avoid delete
        //   objects or array like: "www: { foo: true }" or "www: ['Value1', 'Value2']")
        length--;
        delete input[key];
      }
    }

    return length > 0 ? input : null;
  }
}
