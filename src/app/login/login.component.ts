import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder,
    private toastar: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear()
  }

  userdata:any;

  loginform = this.builder.group({
    username:this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

   proceedrelogin() {
    if (this.loginform.valid) {
    //   this.service
    //     .proceesdregister(this.loginform.value)
    //     .subscribe((res) => {
    //       this.toastar.success(
    //         'Please contact admin for enable access',
    //         'Registed Successfull!'
    //       );
    //       this.router.navigate(['login']);
    //     });
    // } else {
    //   this.toastar.warning('Please enter valid data');
    // }
    this.service.Getbycode(this.loginform.value.username).subscribe(res => {
      this.userdata = res;
      console.log(this.userdata);
      if(this.userdata.password === this.loginform.value.password){
        if(this.userdata.isactive === true){

          sessionStorage.setItem('username', this.userdata.id);
          sessionStorage.setItem('userrole', this.userdata.role);
          this.router.navigate([''])

        }else{
          this.toastar.error('Please contact admin', 'In Active user')
        }

      }else{
        this.toastar.error('Invalid credentials')
      }
    })
  }
}

}
