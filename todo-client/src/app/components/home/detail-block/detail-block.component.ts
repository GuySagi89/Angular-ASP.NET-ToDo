import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-block',
  templateUrl: './detail-block.component.html',
  styleUrls: ['./detail-block.component.css'],
})
export class DetailBlockComponent implements OnInit {
  constructor() {}

  @Input() icon!: string;
  @Input() amount!: number;
  @Input() title!:string;

  ngOnInit(): void {}
}
