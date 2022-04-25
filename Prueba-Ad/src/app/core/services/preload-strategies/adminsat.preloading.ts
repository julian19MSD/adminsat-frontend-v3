import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route, Router} from '@angular/router';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminsatPreloadingStrategy implements PreloadingStrategy {

  constructor(
    private router: Router
  ) {
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.preload || route.data?.preloadUrls?.includes(this.router.url)) {
      return load();
    }
    return of(null);
  }
}



