import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, delay, filter, finalize, map, retryWhen, share} from 'rxjs/operators';
import makeWebSocketObservable, {GetWebSocketResponses, WebSocketOptions} from 'rxjs-websockets';
import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {environment} from '@environments/environment';

@Injectable()
export class WebSocketService {
  private wsState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private input$: Subject<string> = new Subject<string>();
  private subject = new Subject<any>();


  /**
   * Envia mensajes a los demas componentes de la aplicaion.
   * @param channel: El nombre del canal.
   * @param message: El mensaje a enviar
   */
  sendMsg(channel: string, message: any) {
    this.subject.next({channel, message});
  }

  /**
   * Le permite a los demas componentes de la aplicacion recibir mensajes.
   * @param _channel: El canal a escuchar.
   */
  getMsg(_channel: string): Observable<any> {
    return this.subject.asObservable()
      .pipe(
        filter((value: { channel: string, message: any }) => (value.channel === _channel),)
      );
  }

  /**
   * Se conecta al servicio de websocket para recibir reportes en tiempo real.
   * @param jwt: EL token de autenticacion.
   */
  connect(jwt): Observable<string | ArrayBuffer | Blob> {

    const options: WebSocketOptions = {
      makeWebSocket: (url: string, protocols?: string | string[]) => new WebSocket(url, protocols),
      protocols: 'jwt_' + jwt
    };

    return this.makeJsonWebSocketObservable(environment.webSocketUrl, options)
      .pipe(
        switchMap((getResponses: GetWebSocketResponses) => {
          this.wsState.next(true);
          return getResponses(this.input$);
        }),
        catchError(err => {
          this.wsState.next(false);
          return throwError(err);
        }),
        retryWhen(errors => errors.pipe(delay(5000))),
        share(),
        finalize(() => this.wsState.next(null))
      );
  }

  /**
   * Devuelve un Observalbe para que quien se suscriba pueda conocer si el servicio esta conectado o no.
   */
  getConnectionSatate(): Observable<boolean> {
    return this.wsState.asObservable();
  }

  /**
   * Permite enviar mensajes el webSocket
   * @param message: El mensaje a enviar.
   */
  send(message: string): void {
    this.input$.next(message);
  }


  /**
   * Habilita el uso de mensajes JSON en el Websocket
   * @param url: La url del servidor
   * @param options: Las opciones de conexion.
   */
  private makeJsonWebSocketObservable(
    url: string,
    options?: WebSocketOptions,
  ): Observable<any> {
    const socket$ = makeWebSocketObservable<string>(url, options);
    return socket$.pipe(
      map(
        (getResponses: GetWebSocketResponses<string>) =>
          (input$: Observable<object>) =>
            getResponses(
              input$.pipe(
                map(request => JSON.stringify(request)),
              ),
            ).pipe(
              map(response => {
                try {
                  return JSON.parse(response);
                } catch (e) {
                  return response as any;
                }
              }),
            )
      ),
    );
  }
}
