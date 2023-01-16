import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { passwordValidator } from 'src/app/services/validators/custom-validators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(private http: HttpService, private router:Router, private fb : FormBuilder) {}

  updateImageForm!: FormGroup;
  updateProfileForm! : FormGroup
  changePasswordForm! : FormGroup;

  customerDetails!: any;
  selectedImages: any = [] || null;
  profilePic!: string;

  @Output() successMessage: any;
  @Output() errorMessage: any;


  ngOnInit(): void {
    this.getCustomerProfile();
    console.log("hii");

    // update image form
    this.updateImageForm = new FormGroup({
      picture: new FormControl(),
    });

// update profile form
    this.updateProfileForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("",[Validators.email, Validators.required])
    })

    // change password form
    this.changePasswordForm = this.fb.group ({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    },
    { validator: passwordValidator('new_password', 'password') });
  }




  // function for get customer profile

  getCustomerProfile() {
    this.http.get('/shop/auth/self').subscribe({
      next: (data) => {
        this.customerDetails = data;
        // update profile form
     this.updateProfileForm = new FormGroup({
      name: new FormControl(this.customerDetails.name, [Validators.required]),
      email: new FormControl(this.customerDetails.email,[Validators.email, Validators.required])
    })
      },
    });
  }

  // function for update profile info

  updateProfileInfo(){
    this.http.patch('/customers/update-profile',this.updateProfileForm.value).subscribe({
      next: (res) => {
        this.customerDetails = res
        this.successMessage = "profile updated successfully"
        setTimeout( () => {
          this.router.navigateByUrl("/profile")
        }, 2000)
      }
    })
  }

  // function for select image

  uploadImage(event: any) {
    this.selectedImages = (event.target as HTMLInputElement).files;

    this.updateImageForm.patchValue({
      picture: this.selectedImages,
    });
    this.updateImageForm.get('picture')?.updateValueAndValidity();
  }


  // function for update profile pic

  updateProfilePic() {
    const imgArray = Object.values(this.selectedImages);

    var formData = new FormData();
    imgArray.map((img: any) => {
      formData.append('picture', img);
    });

    this.http.post(formData, '/customers/profile-picture').subscribe({
      next: (res) => {
        this.getCustomerProfile()
      },
    });
  }

  // function for delete profile pic

  deleteProfilePic(){
      this.http.delete('/customers/profile-picture').subscribe({
        next: (res) => {
        this.getCustomerProfile()
        }
      })
  }


  // function for change password

  changePassword(){
    delete this.changePasswordForm.value.password;

    this.http.post(this.changePasswordForm.value, '/customers/auth/change-password').subscribe({
      next: (res) => {},
      error: (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => { this.errorMessage=undefined;}, 2000)
      }
    })
  }
}
