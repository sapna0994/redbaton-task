import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() childEvent = new   EventEmitter();
  isloading = false;
  productControl = new FormControl();
  productId: number;
  productTypes = [];
  productForm: FormGroup;
  allProductTypes: Observable<any[]>;
  name: string;
  productName: string;
   productList: any = [];
  @ViewChild('drawer', { static: true }) sidenav: MatSidenav;
  public isLoggedIn: boolean;
  	constructor(
       private fb: FormBuilder,
       private authService: AuthService,
       private route: Router,
  	) { }

    ngOnInit() {
      this.productForm = this.fb.group({
        productName: ['', [Validators.required]]
      });
      this.authService.getProducts().subscribe(data => {
        this.productTypes = data;
        this.allProductTypes = this.productControl.valueChanges
          .pipe(
            startWith(''),
            map(data => data ? this._filterTypes(data) : this.productTypes.slice())
          );
      });
    }
 private _filterTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productTypes.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  selectProduct(t: any) {
    this.productList = []
    const product = (this.productTypes).filter((data) => data.name === t.option.value);
    this.productId = product[0].id;
    this.productName = product[0].name;
    this.authService.productDetails({ id: this.productId }).subscribe(data => {
        if(data.length>0){
          this.productList = data
          this.childEvent.emit(this.productList);
        }
      });
  }
}
