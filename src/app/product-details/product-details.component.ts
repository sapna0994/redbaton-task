import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
 selected = 'option1'
 pid: number;
 productList: any = [];
  constructor(
  	private authService: AuthService,
  	private activatedRoute: ActivatedRoute
  ) { 
  	this.pid = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
  	this.authService.productDetails({ id: this.pid }).subscribe(data => {
	  		if(data){
        		this.productList = data;
	  		}
	    });
  }

}
