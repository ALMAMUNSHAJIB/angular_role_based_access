import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
   
  apiurl = 'http://localhost:3000/user'
  apirole = 'http://localhost:3000/role'

  GetAll(){
      return this.http.get(this.apiurl)
  }

  Getbycode(code: any){
      return this.http.get(this.apiurl + '/' + code)
  }

   GetAllRole(){
      return this.http.get(this.apirole)
  }

  proceesdregister(inputdata: any){
     return this.http.post(this.apiurl, inputdata)
  }

  Updateuser( code: any, inputdata: any){
    return this.http.put(this.apiurl+'/'+code, inputdata)
  }

  IsloggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  GetUserRole(){
    return sessionStorage.getItem('userrole') != null? sessionStorage.getItem('userrole')?.toString():'';
  }
}
