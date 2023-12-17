import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent extends BaseComponent {

  userImg: File | null = null;
  constructor(
    protected readonly api : ApiService,
    protected readonly fb : FormBuilder,
    protected readonly router : Router
  ) {
    super(api);
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onUpload({ files }: { files: FileList}) {
    console.log(files);
    this.userImg = files[0];
  }

  removeFile() {
    this.userImg = null;
  }

  handleregister(){
    if (this.isFormValid()){
      this.loading = true;
      const formData = new FormData();
      const { firstName, lastName, email, password } = this.formGroup.value;

      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('active', '1');
      formData.append('roleId', '2');
      if (this.userImg) formData.append('img',this.userImg);

      this.createService({url: `${UriConstants.USERS}/create`, data: formData})
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: error => {
          this.alertConfiguration('ERROR', error);
          this.openAlert();
          this.loading = false;
        }
      });
    }
  }
}
