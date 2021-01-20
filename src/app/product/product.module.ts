import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  { path: 'products', component: ProductComponent,
    children:[
      { path: '', component: ProductListingComponent,canActivate:[ AuthGuard ]  },
      { path: ':productId', component: ProductDetailComponent,canActivate:[ AuthGuard ]  }
    ] 
  },
];

@NgModule({
  declarations: [
    // コンポーネント宣言
    ProductListingComponent,
    ProductDetailComponent,
    ProductComponent
  ],
  imports: [
    // *ngForなど利用するため
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap:[
    
  ]
})
export class ProductModule { }
