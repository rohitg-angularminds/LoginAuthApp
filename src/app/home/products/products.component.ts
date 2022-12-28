import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  createProductForm!: FormGroup;
  imagesArray: any = [] || null;
  products: Array<any> = [];
  images : Array<any> = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      images: new FormControl(),
    });

    this.getProductList();
  }

  createProduct() {
    // array crated of filelist object
    const arr = Object.values(this.imagesArray);

    var formData = new FormData();
    formData.append('name', this.createProductForm.value.name);
    formData.append('description', this.createProductForm.value.description);
    formData.append('price', this.createProductForm.value.price);

    // map is used to send each image of arr array
    arr.map((image: any) => {
      formData.append('images', image);
    });

    this.http.post(formData, '/products').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // function for selecting images
  uploadImage(event: any): void {
    this.imagesArray = (event.target as HTMLInputElement).files;
    this.createProductForm.patchValue({
      images: this.imagesArray,
    });
    this.createProductForm.get('images')?.updateValueAndValidity();
  }

  getProductList(): any {
    this.http.get('/products?limit=8').subscribe({
      next: (data: any) => {
        console.log(data.results);
        this.products = data.results;

      },
    });
  }

  deleteProduct(productId : string){
// console.log(productId);
this.http.delete(`/products/${productId}`).subscribe({
  next: (response) => {
    this.getProductList();
  },
  error: (err) => {console.log(err)},

})
  }

  updateProduct(productId : string){
    

  }

}
