import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';

const productDetailsRoutes: Routes = [{ path: '', component: ProductDetailsComponent }];
export const productDetailsRouting: ModuleWithProviders = RouterModule.forChild(productDetailsRoutes);
