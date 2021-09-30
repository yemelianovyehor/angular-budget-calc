import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appNotZeroValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: NotZeroValidatorDirective,
    multi:true
  }]
})
export class NotZeroValidatorDirective implements Validator {

  validate(control: AbstractControl) : {[key:string] : any} | null{
    return (control.value===0?{'numberInvalid':true}: null);
  }
}
