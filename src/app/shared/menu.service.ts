import { Injectable, EventEmitter } from '@angular/core';
import { Product } from './product';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType} from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  addingProduct = new EventEmitter<Product>();

  productList: Product[] = [
    {
      title: "Simple Burger",
      description: "Just a simple burger, comes with cheese.",
      price: 12,
      category: "Hamburger",
      imageUrl: "../../assets/food-images/hamburger1.jpg",
      status: true
    },
    {
      title: "Double Burger",
      price: 14,
      category: "Hamburger",
      imageUrl: "../../assets/food-images/hamburger2.jpg",
      status: true
    },
    {
      title: "Cool Burger",
      price: 13,
      category: "Hamburger",
      imageUrl: "../../assets/food-images/hamburger3.jpg",
      status: true
    },
    {
      title: "Salmon",
      price: 15,
      category: "Fish",
      imageUrl: "../../assets/food-images/fish1.jpg",
      status: true
    }
  ]

  constructor(private http: HttpClient) { 
  }

  fetchProductByCategory(category: string) {
    return this.http
      .get<Product[]>(
        'http://localhost:3000/products?category=' + category
      ).pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          return throwError(errorMessage);
        })
      );
  }

  getProductsByCategory(category: string = 'Hamburger'){

    let productsArr = this.productList.filter((item) => {return (item.category == category && item.status == true)})
    return productsArr;
  }

  addProduct(product: Product){
    this.addingProduct.emit(product);
  }
}
