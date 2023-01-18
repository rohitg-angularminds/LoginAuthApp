import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any;
  updateProductForm!: FormGroup;
  updateImageForm!: FormGroup;
  selectedImages: any = [] || null;
  curProductSize!: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private userService: LocalstorageService
  ) {}

  productId: any = this.userService.get('product_Id');

  ngOnInit(): void {

    // get product details using http service
    this.getProductDetails();

    // form for update product
    this.updateProductForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
    });

  // form for update product images
    this.updateImageForm = new FormGroup({
      new_images : new FormControl(),
      delete : new FormControl()
    })

  }

  deleteProduct(productId: string) {
    // console.log(productId);
    this.http.delete(`/products/${productId}`).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/seller//products');
        this.updateProductList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // function for update the product details
  updateProduct(productId: string) {
    this.http
      .patch(`/products/${productId}`, this.updateProductForm.value)
      .subscribe({
        next: (response) => {
          this.productDetails = response;
        },
      });
  }

    // function to fill details in form
  fillProductDetails(){
    this.updateProductForm = new FormGroup({
      name: new FormControl(this.productDetails.name),
      description : new FormControl(this.productDetails.description),
      price : new FormControl(this.productDetails.price)
    })
  }

// function to get current selected size

getCurrentSize(event : any){
    this.curProductSize = event.target.innerHTML
}

// function to update product list
  updateProductList(){
    this.http.get('/products?limit=8').subscribe();
  }


  // funtion to get product details
  getProductDetails() {
    this.http.get(`/products/${this.productId}`).subscribe({
      next: (data) => {
        this.productDetails = data;
      },
    });
  }

// function to get selected images
uploadImage(event : any){
    this.selectedImages = (event.target as HTMLInputElement).files

    this.updateImageForm.patchValue({
      new_images : this.selectedImages,
    })
    this.updateImageForm.get('new_images')?.updateValueAndValidity()

}

  // funtion to update product image
  updateImages(productId : any){

    const imgArray = Object.values(this.selectedImages);

    var formData  = new FormData()
    formData.append('delete', this.updateImageForm.value.delete)
    imgArray.map((image:any) => {
      formData.append('new_images',image)
    })

    this.http.patch( `/products/images/${productId}`, formData).subscribe({
      next: (response) =>{
        console.log(response);
      }
    })
  }
}
