import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  shoppingProducts: Array<any> = [];
  limit: number = 5;
  currentPage: number = 1;
  searchInput: string = '';
  sortBy!: string;
  queryparams: string = `?limit=${this.limit}&page=${this.currentPage}&sortBy=${this.sortBy}`;
  pagesArray: any[] = [];

  constructor(
    private http: HttpService,
    private userService: LocalstorageService
  ) {}

  @Output() custLoggedStatus: Boolean = this.isLoggedin();
  username: string | null = localStorage.getItem('customer.name');

  ngOnInit(): void {
    this.getShoppingProducts();
  }

  getShoppingProducts() {
    this.queryparams = `?limit=${this.limit}&page=${this.currentPage}&sortBy=${this.sortBy}`;
    console.log(this.queryparams);

    this.http.get(`/shop/products${this.queryparams}`).subscribe({
      next: (res) => {
        this.shoppingProducts = res.results;
        this.pagesArray.length = res.totalPages;
        this.pagesArray.fill(0);
      },
    });
  }

  isLoggedin(): Boolean {
    return this.userService.getUserToken() !== null ? true : false;
  }

  custLogout() {
    this.userService.deleteUserToken();
    localStorage.removeItem('username');
    this.custLoggedStatus = this.isLoggedin();
  }

  // pagination
  changePage(e: any) {
    this.currentPage = parseInt(e.target.innerText);
    this.getShoppingProducts();
  }

  prevPage() {
    this.currentPage -= 1;
    this.getShoppingProducts();
  }

  nextPage() {
    this.currentPage += 1;
    this.getShoppingProducts();
  }

  updateLimit(e: any) {
    this.limit = parseInt(e.target.innerHTML);
    this.getShoppingProducts();
  }

  updateSortBy(e: any) {
    this.sortBy = e.target.innerHTML;
    this.getShoppingProducts();
  }
}
