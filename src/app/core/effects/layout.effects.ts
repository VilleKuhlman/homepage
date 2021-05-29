import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, delay,tap, filter, take,retryWhen, reduce } from 'rxjs/operators';
import { Router, ActivatedRoute,NavigationEnd} from '@angular/router';
import { LayoutActions } from '@vk-homepage/core/actions';
import { Path } from '@vk-homepage/core/models/path';
import { LayoutService } from '@vk-homepage/core/services';
import { select, Store } from '@ngrx/store';
import { of, from, } from 'rxjs';
import * as fromRoot from '@vk-homepage/reducers';

@Injectable()
export class LayoutEffects {
 
 /**
 * NGRX Effect triggered during app.compoment.ts is being initialized
 * @param getPaths type of NGRX Action which triggers the Effect
 * @returns NGRX Action in order to update the LayoutState with Paths
 */
  getPaths$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.getPaths),
      switchMap(() =>
        this.LayoutService.getPaths().pipe(
          map((paths: {[id: number] : Path}) =>
          LayoutActions.getPathsSuccess({ paths })
          ),
        )
      )
    )
  );

 /**
 * NGRX Effect triggered after Paths have been succesfully fetched from Store
 * @param getPathsSuccess type of NGRX Action which triggers the Effect
 * @returns NGRX Action to hide the Application's loading screen
 */
  loadingScreen$  = createEffect(() =>
    this.actions$.pipe(
      ofType(LayoutActions.getPathsSuccess),
      delay(4500),
      map(() =>
      LayoutActions.hideLoadingScreen()
      )
    )
  );
  
 /**
 * RXJS Observable triggered by Angular router's navigation event.
 * Fetches the current route and it's token from Angular's ActivatedRoute
 * Emits the found route information as a simplified object
 * @param NavigationEnd An event triggered when a navigation ends successfully
 * @returns routeObj containing the route information as a simplified object
 */
  getRouteData$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => {
      return this.activatedRoute.firstChild;
    }),
    map((route) => {
      let routeObj = {token:"", name:""};
      routeObj.name = (route.snapshot.url[0]) ? route.snapshot.url[0].path.toString(): "";
      if(route.snapshot.paramMap.get('id'))
        routeObj.token = (route.snapshot.paramMap.get('id'))
      else if(route.firstChild && route.firstChild.snapshot.url[0])
        routeObj.token =  route.firstChild.snapshot.url[0].path.toString();
      return routeObj.token ? [routeObj.name, routeObj.token] : [routeObj.name];  
    }),
  );

 /**
 * NGRX Effect triggered by $getRouteData RXJS Observable which delivers the current route information after the navigation ends
 * Subscribes getStorePaths$ Observable to fetch all Paths from Store
 * Filters Paths by using the current route information, resulting into a single Path and it's ID
 * Emits Action with the current Path's ID in order to update the LayoutState
 * @returns NGRX Action in order to update the LayoutState with the current Path's ID
 */
  setCurrentRoadPoint$ = createEffect(() =>
    this.getRouteData$.pipe(
      mergeMap(routes => this.getStorePaths$.pipe(
        mergeMap(paths => from(routes).pipe(
          reduce((filteredPaths, route) => 
          filteredPaths.length > 0 ? 
          paths.filter(path => path.name === route && filteredPaths.filter(path => path.children).map(path => path.children).reduce((acc, val) => acc.concat(val), []).indexOf(path.id) > -1) 
          : 
          paths.filter(path => path.name === route),
          []),
          map(filteredPaths => filteredPaths.length === 1 ? 
            filteredPaths : filteredPaths.filter(filteredPath => !filteredPath.children && paths.filter(path => path.children).map(path => path.children).reduce((acc, val) => acc.concat(val), []).indexOf(filteredPath.id) === -1 ) ),
          take(1),
          map(paths => paths.length === 1 ? paths[0].id : 0)
          )  
        ),
      )),
      map((id) => LayoutActions.setCurrentPath({id})),
    ),
  );

 /**
 * RXJS Observable subscribed by $setCurrentRoadPoint Observable - after the navigation ends
 * Selects Paths from LayoutState and Emits them as array
 * @returns storePaths - Paths selected from LayoutState and put in array
 */
  getStorePaths$ = this.store.pipe(
    select(fromRoot.selectPaths),
    map(storePaths => {
      if (!storePaths) {
        throw storePaths;
      }
      return storePaths;
    }),        
    retryWhen(errors => errors.pipe(delay(100), take(10))),
    take(1),
    mergeMap(storePaths => { return of(Object.keys(storePaths).map(key => storePaths[key])) })
  );

  constructor(
    private actions$: Actions,
    private LayoutService: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) {  }
}