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
  listsSize$!: Observable<number>;

  constructor(private router: Router, private listsService: ListsService) {
    // this.listsSize$ = this.listsService.getListSize();
  }

  canActivate() //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   return this.listsService.getListSize().pipe(
  //     map((s) => {
  //       if (s === 0) {
  //         return this.router.parseUrl(NEW_LIST_PAGE);
  //       }
  //       return true;
  //     })
  //   );
  // }
  {
    return true;
  }
}
