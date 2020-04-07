import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@Input() childEvent = MenuComponent;
	public fetchingData = false;
  	public showDetails = false;
  	public noShowDetails = false;
  	filterForm: FormGroup;
  	productList: any = [];
  	featureList: any = [];
  	brandList: any = [];
  	categoryList: any = [];
  	categoryId: string;
  	brandId: string;
  	constructor(
	  	private authService: AuthService,
	  	private route: Router,
	  	private fb: FormBuilder,
	) {
		this.productList;
  		this.filterForm = this.fb.group({
  			brands:  ['', [Validators.required]],
		    categories: ['', [Validators.required]]
		});
	}

	ngOnInit() {
	  	this.authService.getProducts().subscribe(data => {
	  		if(data.length>0){
	  			this.fetchingData = true;
        		this.showDetails = true;
        		this.productList = data;
	  		} else {
	  			this.fetchingData = true;
        		this.noShowDetails = true;
	  		} 
	    });
	    this.authService.getCategories().subscribe(data => {
	  		if(data.length>0){	
        		this.categoryList = data;
	  		}
	    });
	    this.authService.getFiatures().subscribe(data => {
	  		if(data.length>0){	
        		this.featureList = data;
	  		}
	    });
	    this.authService.getBrands().subscribe(data => {
	  		if(data.length>0){	
        		this.brandList = data;
	  		}
	    });
	}
	productDtails(id: number){
		this.route.navigate(['/product-details', id]);
	}
	filterApply() {
		this.noShowDetails = false;
		this.productList = [];
		this.categoryId =  this.filterForm.get('categories').value;
		this.brandId =  this.filterForm.get('brands').value;
		
		if(this.categoryId !== "" && this.brandId !== ""){
			this.authService.getProductsAcordingCategoryBrand({category_id: this.categoryId, brand_id: this.brandId}).subscribe(data => {
		  		if(data.length>0){
		  			this.fetchingData = true;
	        		this.showDetails = true;
	        		this.productList = data;
		  		} else {
		  			this.fetchingData = true;
	        		this.noShowDetails = true;
		  		} 
		    });
		} 
		if(this.categoryId !== "" && this.brandId === ""){
			this.authService.getProductsAcordingCategory({category_id: this.categoryId}).subscribe(data => {
		  		if(data.length>0){
		  			this.fetchingData = true;
	        		this.showDetails = true;
	        		this.productList = data;
		  		} else {
		  			this.fetchingData = true;
	        		this.noShowDetails = true;
		  		} 
		    });
		} 
		if(this.categoryId === "" && this.brandId !== ""){
			this.authService.getProductsAcordingBrand({brand_id: this.brandId}).subscribe(data => {
		  		if(data.length>0){
		  			this.fetchingData = true;
	        		this.showDetails = true;
	        		this.productList = data;
		  		} else {
		  			this.fetchingData = true;
	        		this.noShowDetails = true;
		  		} 
		    });
		} 
	}
}
