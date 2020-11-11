import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// Error Handling

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

export function validatorForFormControl(formField: any) {
  const validationRuleList = [];
  const fieldValidationList = formField.validations
  // tslint:disable-next-line: forin
  for (const key in fieldValidationList) {
    switch (key) {
      case 'required':
        if (fieldValidationList[key]) {
          validationRuleList.push(Validators.required)
        }
        break;

      case 'pattern':
        if (fieldValidationList[key]) {
          validationRuleList.push(Validators.pattern(fieldValidationList[key]))
        }
        break;

      case 'minLength':
        if (fieldValidationList[key]) {
          validationRuleList.push(Validators.minLength(Number(fieldValidationList[key])))
        }
        break;

      case 'maxLength':
        if (fieldValidationList[key]) {
          validationRuleList.push(Validators.maxLength(Number(fieldValidationList[key])))
        }
        break;

      default:
        break;
    }
  }

  return validationRuleList;
}
