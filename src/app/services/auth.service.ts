import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 api: string = "https://my-json-server.typicode.com/banshilaldangi/ecommerce/";
  constructor(
  	private http: HttpClient
  ) { }
  getProducts(): Observable<any> {
    return this.http.get<any>(this.api +  'products');
  }
  getFiatures(): Observable<any> {
    return this.http.get<any>(this.api +  'features');
  }
  getBrands(): Observable<any> {
    return this.http.get<any>(this.api +  'brands');
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(this.api +  'categories');
  }
  productDetails(data): Observable<any> {
    return this.http.get<any>(this.api +  'products?id='+ data.id);
  }
  getProductsAcordingCategoryBrand(data): Observable<any> {
    return this.http.get<any>(this.api +  'products?categoy_id='+ data.category_id+'&brand_id='+ data.brand_id);
  }
  getProductsAcordingCategory(data): Observable<any> {
    return this.http.get<any>(this.api +  'products?categoy_id='+ data.category_id);
  }
  getProductsAcordingBrand(data): Observable<any> {
    return this.http.get<any>(this.api +  'products?brand_id='+ data.brand_id);
  }
}
