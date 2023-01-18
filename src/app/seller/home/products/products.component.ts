import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd} from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  createProductForm!: FormGroup;
  imagesArray: any = [] || null;
  products: Array<any> = [];
  images: Array<any> = [];
  limit: number = 5;
  currentPage: number = 1;
  searchInput: string = '';
  queryparams: string = `?limit=${this.limit}&page=${this.currentPage}`;
  pagesArray: any[] = [];

  constructor(
    private http: HttpService,
    private userService: LocalstorageService,
    private router: Router

  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        this.getProductList()
      }
    });
  }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      images: new FormControl(),
    });

    this.getProductList();
  }

  // function for create new product ---------

  createProduct() {
    // array created of filelist object
    const arr = Object.values(this.imagesArray);

    var formData = new FormData();
    formData.append('name', this.createProductForm.value.name);
    formData.append('description', this.createProductForm.value.description);
    formData.append('price', this.createProductForm.value.price);

    // map is used to send each image of an array
    arr.map((image: any) => {
      formData.append('images', image);
    });

    this.http.post(formData, '/products').subscribe({
      next: (response) => {
        this.getProductList();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // function for selecting images -------
  uploadImage(event: any): void {
    this.imagesArray = (event.target as HTMLInputElement).files;
    this.createProductForm.patchValue({
      images: this.imagesArray,
    });
    this.createProductForm.get('images')?.updateValueAndValidity();
  }

  getProductList(): any {
    this.queryparams =
      this.searchInput == ''
        ? `?limit=${this.limit}&page=${this.currentPage}`
        : `?limit=${this.limit}&page=${this.currentPage}&name=${this.searchInput}`;

    this.http.get(`/products${this.queryparams}`).subscribe({
      next: (data: any) => {
        this.products = data.results;
        this.pagesArray.length = data.totalPages;
        this.pagesArray.fill(0);
      },
    });
  }

  setProductId(productId: any) {
    this.userService.set('product_Id',productId);
  }

// pagination
  changePage(e: any) {
    this.currentPage = parseInt(e.target.innerText);
    this.getProductList();
  }

  prevPage() {
    this.currentPage -= 1;
    this.getProductList();
  }

  nextPage() {
    this.currentPage += 1;
    this.getProductList();
  }

  updateLimit(e: any) {
    this.limit = parseInt(e.target.innerHTML);
    this.getProductList();
  }
}
