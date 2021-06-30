import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NEW_LIST_PAGE } from '../constants/general-constants';
import { ListsService } from '../services/lists.service';

@Injectable({
  providedIn: 'root',
})
export class ListsGuard implements CanActivate {


  constructor(private router: Router, private listsService: ListsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.listsService.getListscount().pipe(
      map((s) => {
        if (s === 0) {
          return this.router.parseUrl(NEW_LIST_PAGE);
        }
        return true;
      })
    );
  }
}
