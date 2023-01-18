

import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordValidator(password : string,confirmpassword : string ): ValidatorFn {

  return (control : AbstractControl): { [key: string]: boolean } | null => {
    const password1 = control.get(password)!.value
    const password2 = control.get(confirmpassword)!.value

    return password1 === password2 ? null : {misMatch: true} ;
   }

}



// /////////////////// Another way ////////////////


// export function passwordValidator2(
//    control: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = control.get('createpassword');
//   const confirmPassword = control.get('confirmpassword');

//   return password && confirmPassword && password.value != confirmPassword.value
//     ? { misMatch: true }
//     : null;
// }



