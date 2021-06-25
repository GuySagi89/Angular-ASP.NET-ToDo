import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todaysDate!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.todaysDate = Date.now();
  }

  navigateToEdit() {
    this.router.navigate(['lists', '-1', 'edit']);
  }
}
