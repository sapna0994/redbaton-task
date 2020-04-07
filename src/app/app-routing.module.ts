import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [{ path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }]
  },
  {
    path: 'product-details',
    children: [{ path: ':id', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
