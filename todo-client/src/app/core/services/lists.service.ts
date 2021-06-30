import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../models/todo-item.model';
import { TodoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private serverURL = `${environment.serverURL}/lists`;

  constructor(private httpClient: HttpClient) {}

  getAllLists() {
    return this.httpClient.get<TodoList[]>(this.serverURL);
  }

  getAllListsItems(id: number) {
    const url = `${this.serverURL}/${id}/items`;
    return this.httpClient.get<TodoItem[]>(url);
  }

  getListByID(id: number) {
    const url = `${this.serverURL}/${id}`;
    return this.httpClient.get<TodoList>(url);
  }

  addList(list: TodoList) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let jsonList = JSON.stringify(list);
    return this.httpClient
      .post<TodoList>(this.serverURL, jsonList, httpOptions)
      .toPromise();
  }

  async deleteListByID(id: number) {
    const url = `${this.serverURL}/${id}`;
    try {
      await this.httpClient.delete<any>(url).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async editList(list: TodoList) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const url = `${this.serverURL}/${list.id}`;
    let jsonList = JSON.stringify(list);
    await this.httpClient
      .put<TodoList>(this.serverURL, jsonList, httpOptions)
      .toPromise();
  }

  getListscount() {
    return this.httpClient
      .get<TodoList[]>(this.serverURL)
      .pipe(map((l) => l.length));

  }
}
