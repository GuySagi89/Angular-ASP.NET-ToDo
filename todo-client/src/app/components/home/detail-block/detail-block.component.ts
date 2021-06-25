import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-block',
  templateUrl: './detail-block.component.html',
  styleUrls: ['./detail-block.component.css'],
})
export class DetailBlockComponent implements OnInit {
  constructor() {}

  @Input() icon: string = 'check';
  @Input() amount: number = 0;
  @Input() title: string = '0';

  ngOnInit(): void {}
}
