import { Injectable } from '@angular/core';

import { LocalStorageService } from './localstorage.service'
import { ACLService } from '../acl/acl.service'
import { User } from 'app/routes/pages/models/user.model'

@Injectable()
export class TenantService {

  constructor(
    private localService: LocalStorageService,
    private aclService: ACLService
  ) { }

  get tenantId(): string {
    return this.localService.get('TENANTID')
  }
  set tenantId(v: string) {
    this.localService.set('TENANTID', v)
  }

  get name(): string {
    return this.localService.get('NAME')
  }
  set name(v: string) {
    this.localService.set('NAME', v)
  }

  get token(): string {
    return this.localService.get('TOKEN')
  }
  set token(v: string) {
    this.localService.set('TOKEN', v)
  }

  get aliasName(): string {
    return this.localService.get('ALIAS_NAME')
  }
  set aliasName(v: string) {
    this.localService.set('ALIAS_NAME', v)
  }

  login(user: User): void {
    this.name = user.name
    this.aliasName = user.aliasName
    this.token = user.token
    this.tenantId = user.tenantId

    this.aclService.set({
      role: [user.industry]
    })
  }

  logout() {
    this.localService.remove(['NAME', 'TENANTID', 'TOKEN', 'ALIAS_NAME'])
  }
}
