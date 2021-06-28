import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  allTodoItems!: TodoItem[];
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.allTodoItems = this.itemsService.getActiveItems();
  }
}
