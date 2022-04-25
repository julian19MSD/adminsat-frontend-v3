import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {map, takeUntil, takeWhile} from 'rxjs/operators';
import {DomSanitizer, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {RootAction} from '@store/root.action';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDrawer} from '@angular/material/sidenav';

import {CommonDestroy} from '@shared/commons/destroy.common';
import {LoadProfile, RestoreSinevaCollapseState, SetColorScheme, ToggleSinevaCollapseState} from '@store/actions/theme.action';
import {STATIC_URL} from '@shared/consts/api.consts';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'adms-admin',
  templateUrl: './admin.container.html',
  styleUrls: ['./admin.container.scss']
})
// tslint:disable-next-line:component-class-suffix
export class AdminContainer extends CommonDestroy implements OnInit {

  sideNavCollapse$: Observable<boolean>;
  foto$: Observable<SafeStyle>;
  logo: SafeUrl;
  userName$: Observable<string>;
  modbileDevice: boolean;
  noLogoImg = true;
  cliente: number;
  @ViewChild('drawer', {static: false}) private drawer: MatDrawer;

  constructor(
    private store: Store<RootAction>,
    private sanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: any
  ) {
    super();
    this.store.dispatch(new LoadProfile());
    this.store.dispatch(new RestoreSinevaCollapseState());

    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.Handset, Breakpoints.TabletPortrait, Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        takeUntil(this.ngDestroyed$)
      )
      .subscribe(
        (result) => {
          this.modbileDevice = result.matches;
        });
  }


  ngOnInit(): void {
    this.sideNavCollapse$ = this.store.select('theme', 'sideNavCollapse');
    this.userName$ = this.store.select('theme', 'nombre');

    this.store.select('theme', 'cliente')
      .pipe(
        map(res => this.cliente = res),
        takeWhile(e => !e)
      )
      .subscribe()

    this.store.select('theme', 'logoClient')
      .pipe(
        takeUntil(this.ngDestroyed$),
        map((res: string) => this.sanitizer.bypassSecurityTrustUrl(res))
      )
      .subscribe((logo) => this.logo = logo);

    this.foto$ = this.store.select('theme', 'foto')
      .pipe(
        map((res: string) => res ? res : `${STATIC_URL}/images/user-not-available.png`),
        map((res: string) => this.sanitizer.bypassSecurityTrustStyle(`url(${res})`))
      );
  }

  sideNavToogle() {
    if (this.modbileDevice) {
      this.drawer.toggle();
    } else {
      this.store.dispatch(new ToggleSinevaCollapseState(this.drawer.opened));
    }
  }

  setDarkMode(): void {

    let theme = localStorage.getItem('theme');

    if ('dark' === theme || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      theme = 'light';
      this.document.body.classList.remove('dark');
    } else {
      theme = 'dark';
      this.document.body.classList.add('dark');
    }
    this.store.dispatch(new SetColorScheme(theme as 'dark' | 'light'));

  }
}
