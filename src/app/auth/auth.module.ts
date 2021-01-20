import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}  
];

@NgModule({
  declarations: [
    // コンポーネント宣言
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    // *ngForなど利用するため
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap:[
    
  ]
})
export class AuthModule { }
