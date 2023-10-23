import { Component,  Inject,  OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

 constructor(private builder: FormBuilder, private service: AuthService, @Inject(MAT_DIALOG_DATA) public data: any,
 private tostar : ToastrService, private dailog: MatDialogRef<UpdatepopupComponent>){

 }
  rolelist: any;
  editdata: any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res
    })

    if(this.data.usercode != null && this.data.usercode != ''){
      this.service.Getbycode(this.data.usercode).subscribe( res => {
        this.editdata = res;
        this.registerform.setValue({id: this.editdata.id, name: this.editdata.name, email: this.editdata.email, password: this.editdata.password,
        role: this.editdata.role, gender: this.editdata.gender, isactive: this.editdata.isactive})
      })
    }
  }





   registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });


  updateuser(){

    if(this.registerform.valid){
      this.service.Updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this.tostar.success('Update Successfully')
        this.dailog.close();
      })

    }else{
      this.tostar.warning('Please select role')
    }

  }


}
