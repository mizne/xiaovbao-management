import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { TenantService } from 'app/core/services/tenant.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private tenantService: TenantService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tenantService.token) {
      return true
    }

    this.router.navigate(['login'])
    console.warn('no token store in client!')
    return false
  }
}
