import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

import {WebSocketService} from '@admin/shared/services/web-socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RootAction} from '@store/root.action';
import {CommonDestroy} from '@shared/commons/destroy.common';
import {API_URL, STATIC_URL} from '@shared/consts/api.consts';

declare var webNotification: any;

let self;

@Component({
  selector: 'adms-header-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent extends CommonDestroy implements OnInit {
  @Input() mobile: boolean;
  @Input() orientation: string;

  soundStatus = 0;
  alarmCounter: number;
  wsConnectionState$: Observable<boolean>;
  fullScreen: boolean;
  private alarmSound = new Audio(STATIC_URL + '/sounds/alert.mp3');
  private notifySound = new Audio(STATIC_URL + '/sounds/notification_xilo.mp3');
  private canShowNotification = true;

  constructor(
    private socket: WebSocketService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private store: Store<RootAction>,
    private cdkRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: any
  ) {
    super();
    this.wsConnectionState$ = this.socket.getConnectionSatate();
    this.soundStatus = JSON.parse(localStorage.getItem('sound_status'));
    self = this;
  }

  ngOnInit(): void {
    this.counterAlarms();
    this.wsConnect();
    webNotification.requestPermission((granted) => {
      if (!granted) {
        this.translate.get(['DESKTOP_NOTIFICATIONS_DISABLED', 'CLOSE'])
          .subscribe(
            (res) => {
              this.snackBar.open(res.DESKTOP_NOTIFICATIONS_DISABLED, res.CLOSE, {duration: 10000});
            });
      }
    });
  }

  /**
   * Detiene/Reanuda la conexion del webScoket
   */
  pauseConnection() {
    this.socket.getConnectionSatate()
      .pipe(take(1))
      .subscribe(
        (state) => {
          if (state) {
            this.ngDestroyed$.next();
          } else if (null === state) {
            this.wsConnect();
          }
        });
  }

  /**
   * Activa/Desactiva el modo de pantalla completa.
   */
  setFullscreen() {
    if (!this.fullScreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
    this.fullScreen = !this.fullScreen;
  }

  /**
   * Cmbai el estado de la notificacion de sonido.
   * @param onlySet: Un booleando indicando si solo debe leer el ultimo estado y seterarlo.
   */
  changeSoundStatus(onlySet = null) {
    if (!onlySet) {
      this.soundStatus = 2 <= this.soundStatus ? 0 : this.soundStatus + 1;
      this.cdkRef.detectChanges();
    }
    switch (this.soundStatus) {

      case 1:
        this.alarmSound.loop = true;
        this.alarmSound.volume = 1;
        break;

      case 2:
        this.alarmSound.loop = false;
        this.alarmSound.volume = 0;
        this.notifySound.volume = 0;
        break;

      default:
        this.alarmSound.loop = false;
        this.alarmSound.volume = 1;
        this.notifySound.volume = 1;
        break;
    }
    localStorage.setItem('sound_status', JSON.stringify(this.soundStatus))
    this.playAlarm();
  }

  /**
   * Obtiene de la API el total de alarmas que tiene el usuario.
   */
  private counterAlarms(): void {
    this.httpClient.get(API_URL.alarm.counter)
      .subscribe(
        (res: { total: number }) => {
          this.alarmCounter = res.total;
          this.cdkRef.detectChanges();
          this.playAlarm();
        });
  }


  /**
   * Hace play al sonido de alarma.
   */
  private playAlarm(): void {
    if (this.alarmCounter && 2 !== this.soundStatus) {
      this.alarmSound.currentTime = 0;
      this.alarmSound.play();
    }
  }

  /**
   * Incia la conexion del servicio de websocket
   */
  private wsConnect() {
    const access = localStorage.getItem('access');

    this.socket.connect(access)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        (message: any) => {
          if (typeof (message) === 'object' && message.tipo) {
            this.processWsMessage(message);
          }
        }
      );
  }

  /**
   * Pone la plataforma en pantalla completa
   */
  private openFullscreen() {
    if (this.document.documentElement.requestFullscreen) {
      this.document.documentElement.requestFullscreen();
    } else if (this.document.documentElement.mozRequestFullScreen) {
      this.document.documentElement.mozRequestFullScreen();
    } else if (this.document.documentElement.webkitRequestFullscreen) {
      this.document.documentElement.webkitRequestFullscreen();
    } else if (this.document.documentElement.msRequestFullscreen) {
      this.document.documentElement.msRequestFullscreen();
    }
  }

  /**
   * Desactiva el modo de pantalla completa.
   */
  private closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      this.document.msExitFullscreen();
    }
  }

  /**
   * Procesa el mensaje recibio por el Websocket
   * @param message: El mensaje recibido por el Websocket.
   */
  private processWsMessage(message) {
    switch (message.tipo) {
      case 'reporte':
        this.socket.sendMsg('reporte', message);
        if (this.canShowNotification) {
          this.ckeckMustNotificate(message);
        }
        break;

      case 'tarea':
        this.socket.sendMsg('tarea', message);
        if (message.porcentaje === 100 && 2 !== this.soundStatus) {
          this.notifySound.currentTime = 0;
          this.notifySound.play();
        }
        break;

      case 'mobileye':
        this.socket.sendMsg('mobileye', message);
        break;
    }
  }

  /**
   * Verifica si debe mostrar una notificacion de escritorio
   * @param message: El mensaje a notificar.
   */
  private ckeckMustNotificate(message) {
    this.store.select('theme')
      .pipe(take(1))
      .subscribe(
        (profile) => {
          if (profile.alarmas.includes(message.evento_id)) {
            this.alarmCounter++;
            this.cdkRef.detectChanges();
            this.showDesktopNotification(message, 0);
          } else if (profile.notificaciones.includes(message.evento_id)) {
            this.showDesktopNotification(message, 1);
          }
        });
  }

  /**
   * Muestra la notificacion de escritorio
   * @param msg: El mensaje a mostrar
   * @param type: El tipo de mensaje.
   */
  private showDesktopNotification(msg: any, type: number) {
    this.canShowNotification = false;
    setTimeout(() => this.canShowNotification = true, 5000);

    webNotification.showNotification(msg.nombre.toUpperCase(), {
        body: msg.evento_nombre,
        icon: STATIC_URL + '/images/adminsat_logo.png',
        onClick: () => {
          if (0 === type) {
            self.router.navigate(['/alarms'], {
              queryParamsHandling: 'merge', queryParams: {
                evento_nombre__in: msg.evento_nombre,
                activo_nombre__in: msg.nombre,
                activo_placa__in: msg.placa,
                reporte_fecha__gte: msg.fecha_hora_equipo,
                reporte_fecha__lte: msg.fecha_hora_equipo
              }
            });
          } else if (1 === type) {
            if (self.router.url.startsWith('/monitoring/tracking')) {
              // self.store.dispatch(new SetAsset(msg.activo_id));
              this.socket.sendMsg('reporteId', msg.activo_id);
            } else {
              self.router.navigate(['/monitoring/tracking'], {queryParams: {reportId: msg.activo_id}});
            }
          }
        },
        autoClose: 10000
      },
      (error, hide) => {
        if (!error && 2 !== self.soundStatus) {
          if (0 === type) {
            self.playAlarm();
          } else if (1 === type) {
            self.notifySound.currentTime = 0;
            self.notifySound.play();
          }
        }
      });
  }
}
