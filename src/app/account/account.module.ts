import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    AccountRoutingModule,
    CommonModule,
    AuthModule
  ]
})
export class AccountModule { }
