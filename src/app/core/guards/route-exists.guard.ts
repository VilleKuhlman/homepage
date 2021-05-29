  
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as fromRoot from '@vk-homepage/reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable({
  providedIn: 'root',
})
export class RouteExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
  ) {}

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasRouteInStore(name:string, token:string): Observable<boolean> {
    return this.store.pipe(
      select(fromRoot.selectPaths),
      map(paths => {
        return true;
      }),
      take(1)
    );
  }

  hasRoute(name: string, token: string): Observable<boolean> {
    return this.hasRouteInStore(name, token).pipe(
      switchMap(inStore => {
        if (!inStore) 
            this.router.navigate([name+"/cv"]);
   
          return of(inStore);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const name = (state.root.firstChild.url[0]) ? state.root.firstChild.url[0].toString(): "";
    return this.hasRoute(name, route.params['id']);
  }
}
