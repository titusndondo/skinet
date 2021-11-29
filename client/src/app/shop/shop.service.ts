import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrand } from '../shared/models/brands';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/ProductType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let productParams = new HttpParams();

    if (shopParams.brandId !== 0) {
      productParams = productParams.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      productParams = productParams.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      productParams = productParams.append('search', shopParams.search);
    }

    productParams = productParams.append('sort', shopParams.sort);
    productParams = productParams.append('pageIndex', shopParams.pageNumber.toString());
    productParams = productParams.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params: productParams })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getType() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

}
