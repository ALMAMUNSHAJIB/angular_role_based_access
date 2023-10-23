import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn, ActivatedRoute, mapToCanActivate
} from '@angular/router';

import {AuthService} from '../service/auth.service'
import {catchError, of} from 'rxjs';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot ,state: RouterStateSnapshot) => {
   const service = inject(AuthService);
   const router = inject(Router);
   const toastr = inject(ToastrService)

   if(service.IsloggedIn()){

    if(route.url.length > 0){

      let menu = route.url[0].path;
      if(menu == 'user'){

        if(service.GetUserRole() == 'admin'){
          return true

        }else{
          toastr.warning('You have donot access')
          router.navigate([''])
          return false
        }

      }else{
        return true
      }

    }else{
      return true
    }
   
   }else{
    router.navigate(['login'])
    return false
   }
   
};
