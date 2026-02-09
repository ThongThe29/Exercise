import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const forbidden = regexp.test(control.value);
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
}

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');

    return password && confirmPass && password.value !== confirmPass.value ? { 'misMatch': true } : null;
};
