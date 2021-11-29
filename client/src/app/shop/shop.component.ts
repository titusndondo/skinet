import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/ProductType';
import { ShopService } from './shop.service';
import { IBrand } from 'c:/Users/TitusNdondo/Documents/Learn/Csharp/fullstack/skinet/client/src/app/shared/models/brands';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc'}
  ]

  totalCount: number;
  numberOfReturnedProducts: number;
  numberOfPages: number;
  indexes: number[];

  constructor(private shopService: ShopService) {
    this.shopParams = new ShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.numberOfPages = Math.ceil(response.count / response.pageSize);
        this.indexes = [...Array(this.numberOfPages).keys()];
        this.indexes = this.indexes.map(index => index + 1);
        this.totalCount = response.count;
        this.numberOfReturnedProducts = this.products.length;
      }, (error: Error) => {
        console.log(error)
      });
  }

  getBrands() {
    this.shopService.getBrands()
      .subscribe(response => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      }, error => {
        console.log(error);
      })
  }

  getTypes() {
    this.shopService.getType()
      .subscribe(response => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      }, error => {
        console.log(error);
      })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(pageNumber: number) {
    this.shopParams.pageNumber = pageNumber;
    this.getProducts();
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
