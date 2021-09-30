import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: 'appNotZeroValidator',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: notZeroValidatorDirective
    }]
})

export function notZeroValidatorDirective():Validator{


    /*return (control: AbstractControl) : ValidationErrors | null =>{
        const forbidden = control.value === 0;
        return forbidden ? {value: control.value} : null;
    };*/
}