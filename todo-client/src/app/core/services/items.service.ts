import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItem } from '../models/todo-item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private serverURL = `${environment.serverURL}/items`;

  constructor(private httpClient: HttpClient) {}

  getAllItems(activeItems: boolean): Observable<TodoItem[]> {
    let url=this.serverURL;

    if(activeItems){
       url = `${this.serverURL}?activeItems=true`;
    }

    return this.httpClient.get<TodoItem[]>(url);
  }

  getItemById(id: number): Promise<TodoItem> {
    const url = `${this.serverURL}/${id}`;
    return this.httpClient.get<TodoItem>(url).toPromise();
  }

  async toggleItemStatus(id: number) {
    const url = `${this.serverURL}/${id}/toggle`;
    try{
    await this.httpClient.put<any>(url, '').toPromise();
    }catch(error){console.log(error)};
  }

  addItem(item: TodoItem) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let jsonItem = JSON.stringify(item);
    return this.httpClient
      .post<TodoItem>(this.serverURL, jsonItem, httpOptions)
      .toPromise();
  }

  getItemscount(activeitems:boolean) {;
    let url=this.serverURL;

    if(activeitems){
       url = `${this.serverURL}?activeItems=true`;
    }

    return this.httpClient
      .get<TodoItem[]>(url)
      .pipe(map(i => i.length))
      .toPromise();
  }
}
