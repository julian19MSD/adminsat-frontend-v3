import { Component, OnInit } from '@angular/core';
import { RootAction } from '@store/root.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { LoadPublicTheme } from '@store/actions/theme.action';
import { STATIC_URL } from '@shared/consts/api.consts';


@Component({
  selector: 'adms-public',
  templateUrl: './public.container.html',
  styleUrls: ['./public.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class PublicContainer implements OnInit {

  noImg = true;
  logo$: Observable<SafeUrl>;
  fondo$: Observable<SafeStyle>;
  isHandset$: Observable<boolean>;

  constructor(
    private store: Store<RootAction>,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver
  ) {
    this.store.dispatch(new LoadPublicTheme()
    );
  }

  ngOnInit(): void {
    // this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
    //   .pipe(map((result) => result.matches));
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(map((result: BreakpointState) =>
        result.matches
      ));

    this.logo$ = this.store.select('theme', 'logoClient')
      .pipe(
        map((res: string) => this.sanitizer.bypassSecurityTrustUrl(res))
      );

    this.fondo$ = this.store.select('theme', 'fondoLogin')
      .pipe(
        map((res: string) => res ? res : `${STATIC_URL}/images/login_background.jpg`),
        map((res: string) => this.sanitizer.bypassSecurityTrustStyle(`url(${res})`))
      );
  }
}
