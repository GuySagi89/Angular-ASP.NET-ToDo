import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NEW_LIST_PAGE } from 'src/app/core/constants/general-constants';
import { ItemsService } from 'src/app/core/services/items.service';
import { ListsService } from 'src/app/core/services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  todaysDate!: number;
  listsAmount!:number;
  itemsAmount!:number
  activeItemsAmount!:number

  constructor(private router: Router, private listsService: ListsService,private itemsService:ItemsService) {}

  async ngOnInit() {
    this.todaysDate = Date.now();
    this.listsAmount= await this.listsService.getListscount();
    this.itemsAmount =await  this.itemsService.getItemscount(false);
    this.activeItemsAmount = await this.itemsService.getItemscount(true);
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
