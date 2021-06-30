import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  allAciveTodoItems$!: Observable<TodoItem[]>;
  constructor(private itemsService: ItemsService) {}

   ngOnInit() {
    this.allAciveTodoItems$ = this.itemsService.getAllItems(true);
  }

  async onCheck(itemId:number){
    try{
    await this.itemsService.toggleItemStatus(itemId);
    }catch(error){
      console.log(error);
    }
  }
}
