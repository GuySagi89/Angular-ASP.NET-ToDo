import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css'],
})
export class ListCardComponent implements OnInit {
  constructor() {}
  @Input() icon = '';
  @Input() title = '';
  @Input() color = '';
  ngOnInit(): void {}
}
