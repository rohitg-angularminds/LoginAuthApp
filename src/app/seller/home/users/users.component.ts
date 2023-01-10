import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchValue: any;
  constructor(private fb: FormBuilder, public httpService: HttpService) {}

  newuserForm!: FormGroup;
  usersList!: any;
  limit: number = 5;
  currentPage: number = 1;
  pagesArray: any[] = [];
  queryparams: string = `?limit=${this.limit}&page=${this.currentPage}`;
  userId: any = null;
  role!: string;
  serlNo = 1;
  loggedInUser!: any;
  index: number = 1;
  errorMessage!: string;
  searchInput: string = '';

  ngOnInit(): void {
    this.getUserList();

    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails') || '')['_id'];

    this.newuserForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  createNewUser() {
    this.httpService.post(this.newuserForm.value, '/users').subscribe({
      next: (data) => {
        this.getUserList();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }

  deleteUser(userId: string) {
    this.httpService.delete(`/users/${userId}`).subscribe((data) => {
      this.getUserList();
    });
  }

  getUserList() {
    if (this.searchInput == '') {
      this.queryparams = `?limit=${this.limit}&page=${this.currentPage}`;
    } else {
      this.queryparams = `?limit=${this.limit}&page=${this.currentPage}&name=${this.searchInput}`;
    }
    this.httpService
      .get(`/users/${this.queryparams}`)
      .subscribe((users: any) => {
        this.usersList = users.results;
        this.pagesArray.length = users.totalPages;
        this.pagesArray.fill(0);
      });
  }

  updateUserInfo() {
    delete this.newuserForm.value['role'];
    this.httpService
      .patch(`/users/${this.userId}`, this.newuserForm.value)
      .subscribe({
        next: (data) => {
          this.getUserList();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });

    this.userId = null;
  }

  updateUserRole(id: string, event: any) {
    this.httpService
      .patch(`/users/role/${id}`, { role: event.target.innerHTML })
      .subscribe((data) => {
        this.getUserList();
      });
  }

  getUserId(id: string) {
    this.userId = id;
  }

  // pagination functions

  changePage(e: any) {
    this.currentPage = parseInt(e.target.innerText);
    this.getUserList();
  }

  prevPage() {
    this.currentPage -= 1;
    this.getUserList();
  }

  nextPage() {
    this.currentPage += 1;
    this.getUserList();
  }

  updateLimit(e: any) {
    this.limit = parseInt(e.target.innerHTML);
    this.getUserList();
  }
}
