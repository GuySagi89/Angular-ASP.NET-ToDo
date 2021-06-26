import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todaysDate!: number;
  listsAmount!: number;

  constructor(private router: Router, private listsService: ListsService) {}

  ngOnInit(): void {
    this.todaysDate = Date.now();

    this.listsAmount = this.listsService.getAllLists().length;
  }

  goToNewList() {
    this.router.navigate(['lists', '-1', 'edit']);
  }
  goToAllLists(){
    this.router.navigate(['lists']);
  }

  goToAllItems(){
    this.router.navigate(['items']);
  }
}
