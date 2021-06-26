import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { EditListComponent } from './components/lists/edit-list/edit-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { ViewListComponent } from './components/lists/view-list/view-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'lists/:id/edit', component: EditListComponent },
  { path: 'lists/:id', component: ViewListComponent },
  {
    path: 'lists', component: ListsComponent,
  },
  { path: 'items', component: ItemsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
