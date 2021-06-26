import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NEW_LIST_PAGE } from 'src/app/core/constants/general-constants';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todaysDate!: number;
  listsAmount!: Observable<number>;

  constructor(private router: Router, private listsService: ListsService) {}

  ngOnInit(): void {
    this.todaysDate = Date.now();
    this.listsAmount = this.listsService.getListSize();
  }

  goToNewList() {
    this.router.navigate([NEW_LIST_PAGE]);
  }
  goToAllLists() {
    this.router.navigate(['lists']);
  }

  goToAllItems() {
    this.router.navigate(['items']);
  }
}
