# adminsat-frontend-v3
Mejorar y colaborar en la aplicación Adminsat
AdminsatPWA
Este proyecto fue realizado con Angular CLI version 9.0.4.

Development server
Ejecutar ng serve para un dev server. Navegar a http://localhost:4200/.La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

Build
Para la construccion del proyecto para su futuro despliegue existen ambientes preestablecido que se deben ejecutar para su construcción.

npm build-stagging-transporte Es la construcción en el ambiente de pruebas.
npm build-transporte Es la construcción en el ambiente de producción de transporte.
npm build-valores Es la construcción en el ambiente de producción de valores.
la construccion para del proyecto queda alamacenada en el directorrio dist/.

Running unit tests
Run ng test to execute the unit tests via Karma.

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via Protractor.

Lanzamientos
2.18.0 26/10/2021
modulo de permanencia
modulo de permanencia creado en la seccion de eficiencia
modulo de eficiencia por activo
modulo de eficiencia de activos creado en la seccion de eficiencia
modulo de TPMS tableau
modulo de TPMS creado para incrusrtar la dashboard creada en tableau server
2.17.0 30/09/2021
mi flota
Se crea modulo de eficiencia con submodulo de mi flota
2.16.0 8/09/2021
ventanas operativas
CRUD de ventanas operativas creado dentro del formulario de Zonas de control
2.15.0 30/08/2021
control de instalaciones
Se crea modulo CRUD de tipo de zonas y tipo de sub-zonas
Se crea modulo CRUD de tipo de instalaciones y tipo de sub-instalaciones
Se crea Nuevo modulo de zonas de control
2.14.0 22/07/2021
Mensajeria
Se agrega al modulo de mensajeria el formulario de creación
2.14.0 21/07/2021
Mensajeria y monitoreo
Se agrega modulo de Mensajeria
En monitoreo se puede observa lel ultimo mensaje enviado y el ultimo mensaje recibido del equipo seleccionado
Se actualiza en monitoreo las opciones para enviar comando y listar comandos del equipo seleccionado
2.13.0 07/07/2021
Tableau
Se agrega modulo de Tableau Analisis de velocidades
2.12.0 13/06/2021
Tableau
Se agrega modulo de Tableau Jornadas laborales
Se agrega modulo de Tableau Composición de la flota
Se agrega modulo de Tableau Enturnamientos
Se agrega modulo de Tableau Tiempo monitoreo
Se agrega modulo de Tableau Excesos de velocidad
2.11.1 02/06/2021
Actores viales
Se agrega al formulario y a los detalles la licencia 2 y 3
2.11.0 31/05/2021
1 Alarmas Ecu
se agrega modulo de Alarmas Ecu
2 Noficaciones de seguimiento
Se agrega modulo de notificaciones de seguimiento
3 Notificaciones Ecu
Se agrega modulo de Notificaciones Ecu
2.10.1 05/05/2021
1 Reporte V2
Se corrige bug de consulta Ecu en los calculos
Se agrega la opcion de descargar jornadas laborales
2.10.0 19/04/2021
1 Comandos Auditoria
Se agrega modulo de Comandos Auditoria
2 Comandos Operaciones
Se agrega modulo de Comandos Operaciones
2.9.1 16/03/2021
1 Jornadas laborales
Se corrige error que al abrir la vista de ordenar jornadas laborales y se cerraba no se podia abrir de nuevo
2.9.0 10/03/2021
1 Noficaciones
Se agrega modulo de notificaciones
2.8.1 17/02/2021
1 Jornadas laborales
Nuevos filtros para Jornadas laborales
Cada item de la lista de jornadas laborales tiene un color dependiendo el estado de la jornada
Nuevo orden a las columnas de la lista
2 Ajustes jornadas laborales
Se agrega modulo de ajustes de jornada laboral
2.7.3 08/02/2021
1 Seguimiento
Al mapa se le agrega la opcion de medir distancias
2.7.2 03/02/2021
Seguimiento
a la vista de ultima ubicacion de seguimiento de activo se agrega la informacion de voltaje de bateria
2.7.1 27/01/2021
1 Informes V2
se migra el informe ECU
2 Jornadas laborales
Se agrega modulo de Jornadas laborales
2.6.2 21/09/2020
1 Actores viales
Se migra modulo de actores viales
2.6.1 25/07/2020
1. TPMS
Se agrega el módulo de TPMS
2. Informes V2
Se agrega el módulo de informes V2
Reportes V2 cuenta por el momento con el innforme de TPMS
2.5.2 05/02/2020
1. Rutas
Se agrega la opcion de pausar, reiniciar y restaurar enturnamientos.
2.5.1 19/12/2019
1. Activos
Se agrega el módulo de activos.
Se mejoran los filtros y ordenamiento
Se realiza un retoque a la interfaz de usuario
Se quita el botón de asociar activo
Se pasa la descarga de lista a tareas en segundo plano.
Se pasa la eliminación de activos a tareas en segundo plano.
La descarga de lista mantiene los filtros y ordenamiento de la lista web.
2. Rutas
Se agrega el módulo de rutas novedades.
Se mejoran los filtros y ordenamiento
Se agrega el detalle de rutas
Se agrega el detalle de enturnamientos
Se agrega la opcion de agregar observaciones y se mejora el campo de duracion.
Se agrega la opcion de editar la fecha de ingreso y salida a zona de control en los enturnamientos.
Se agrega el CRUD de entrunamientos.
Se agrega descarga de lista de enturnamientos.
Ajusta lista de zonas de control en observaciones para mostrar solo las zonas de control a partir de la ultima a la que ingreso el activo.
Se agrega el modulo de historico de enturnamientos.
3. Gettze
Agrega modulo de mi riesgo promedio.
4. General
Elimina el MessegerService y el PaginatorService y los cambia por estado y clase base respectivamente.
Se crea una base para formularios.
Se realiza una actualización general de paquetes.
angular → 8.2.13
@angular/material → 8.2.3
@ngrx/effects → 8.6.0
@ngrx/store-devtools → 8.6.0
@ngrx/store → 8.6.0
@ngrx/schematics → 8.6.0
core-js → 3.6.0
codelyzer → 5.2.1
@types/jasmine → 3.4.6
@types/node → 12.12.21
Se crean clases base para la gestion de idioma del sitio e idioma de los datePicker y dateTimePicker
Se mejora la gestion de tema.
Se agrega el modulo de historico de reportes con un player de ruta en streetView.
2.4.2 01/10/2019
1. Controls
Verifica el permiso de notificaciones de escritorio al cargar la pagina.
Muestra un mensaje si hay un error al motrar una notificacion.
2. Monitoreo
Ajusta el color de la linea que divide la lista de reportes en el modo claro.
Suspende la actualizacion en tiempo real si se esta cargando informacion.
2.4.1 01/10/2019
1. Monitoreo
Arregla bug que se quedaba cargando cuando un usuario que tenia acceso a solo un cliente entraba a monitoreo con el filtro de cliente activo.
2. Controls
Cambia es servicio del websocket para usar redux en vez de un service.
2.4.0 25/09/2019
1. Monitoreo
Quita seleccion inicial de cliente cuando se carga el modulo por primera vez.
Colapsa la barra lateral al cargar el modulo y la restaura cuando se cierra el modulo.
Agre minimap, para mostrar en paralelo el streeView y el mapa.
2. General
Mejora la forma como se muestra el loader, validando si la url realmente tuvo cambios.
Implementa redux para manejo del tema y el idioma.
Mejora el WebSokcet para solucionar el problema que no detectaba la desconexion.
3. Dashboard
Solo carga el mapa en resumen de activos cuando hay marcadores que mostrar.
2.3.1 05/09/2019
1. Perfil
Se actualiza el modulo de sesiones abiertas para operar con nueva libreria.
2. General
Se modifica recaptcha para se genere en cada peticion y asi prevenir el mensaje molesto de recaptcha invalido.
2.3.0 04/09/2019
1. General
Se elimna el uso de la libreria sweetalert2 y se ajustan en su lugar dialogos para las notificaciones.
2.2.0 14/08/2019
1. General
Se desactiva temporalmente el verificador de "wake-up" del navegador para recargar la página en caso de tiempos prolongados de inactividad del navegador, tan pronto se active la pestaña.
Se realiza una actualización general de paquetes.
core-js → 3.2.1
sweetalert2 → 8.15.3
zone.js → 0.10.2
@types/jasmine → 3.4.0
@types/node → 12.7.1
karma-chrome-launcher → 3.1.0
2.1.0 06/08/2019
1. Perfil
Se corrige problema con las opciones con el selector de fecha y hora para excel.
2. Alarmas
Se corrige el problema que cerraba de inmediato la confirmación de atención o actualización.
Se agrega filtro por clientes.
2. General
Se implementa una clase base para filtros.
Se establece un tiempo de 10 segundos para mostrar y cerrar automáticamente el mensaje de falta de conexión con la API.
Se agrega un verificador de "wake-up" del navegador para recargar la página en caso de tiempos prolongados de inactividad del navegador, tan pronto se active la pestaña.
Se realiza una actualización general de paquetes.
Angular → 8.2.0
@angular/material → 8.1.2
@auth0/angular-jwt → 3.0.0
@ckeditor/ckeditor5-build-decoupled-document → 12.3.1
moment-timezone → 0.5.26
ngx-mat-select-search → 1.8.0
queueing-subject → 0.3.4
rxjs-websockets → 7.0.2
sweetalert2 → 8.15.2
zone.js → 0.10.1
@types/jasmine → 3.3.16
@types/node → 12.7.0
karma → 4.2.0
karma-chrome-launcher → 3.0.0
karma-coverage-istanbul-reporter → 2.1.0
2.0.5
1. Tareas
Agrega un cuarto estado de tarea cuando se genera el archivo truncado por exceso de información.
2. General
Agrega al menú de llegando a cero el contador de eventos.
2.0.4
1. General
Ajusta iconos que se veían mas pequeños
Corrige problema de validación de permisos cuando va de FE V1 a un modulo con permisos en FE V2
2.0.3
1. General
Se cambia la forma de renderizar la imagen del cargador para que no permita ser seleccionada.
Se ajusta la validación de permisos y autenticación para accerder a las diferentes urls.
2.0.2
1. Menu lateral
Se corrige un bug que mostraba varios divisores agrupados cuando no se tenian todos los permisos.
2.0.1
1. Alarmas
Se cambia la url de atencion de alarmas para ajustar bug con permisos.
2.0.0
1. Módulos Públicos
Se agrega protección por recaptcha al login, para ayudar a proteger autenticaciones de bots.
Se agrega un botón en el formulario de inicio de sesión para ver u ocultar el texto en el campo de contraseña.
Se rediseña la apariencia del módulo.
Se agrega un nuevo módulo para recuperar contraseña.
Se agrega una protección de acceso que bloquea el acceso durante 10 minutos en caso de que se realice una mala autenticación 5 veces.
Se rediseña el modulo de verificación de correo electrónico.
2. Administrador (Layout general de plataforma)
Se realiza un rediseño completo del modulo administrativo. De esta forma se facilita el acceso rápido a las principales herramientas desde cualquier modulo.
Se agrega la opción de pausar o reanudar los eventos en tiempo real haciendo click en el icono de sicronización (WebSocket).
Se agrega un botón para activar/desactivar el modo de pantalla completa.
Se agrega una opción de modo oscuro, para ayudar a proteger la visión del usuario durante periodos de tiempo prolongados usando la plataforma.
Se creo un sistema de notificación, que informe cuando se haya desplegado una nueva versión de la aplicación.
3. Dashboard
Se agrega un control para cambiar el tipo de mapa.
Se agrupan los marcadores en cluster para agiliza la renderizacion.
Se agrega un tooltip en el mapa con información del reporte. Este se activa al poner el cursor sobre el pin del reporte.
Se activa la interacción con el mapa.
Se agrega un control que permite actualizar la información sin refrescar la pagina.
Se crea un acceso directo desde el resumen de activos hacia monitoreo que permite hacer un filtro rápido por activos en taller,o que lleven 3 horas, 12 horas o mas de un día sin reportar.
4. Monitoreo
Se agrega un nuevo control que muestra en el mapa un circulo con un radio de 20Km para identificar activos mas cercanos a una ubicación* Se agrega una nueva capa al mapa que permite activar el mapa nocturno.
Se agrega en los controles del módulo un control selector de cliente seleccionar un cliente. Esta opción solo es visible para usuarios que pueden ver varios clientes.
Se agrupan en cluster las zonas de control y puntos de interés para agilizar la renderización.
Se agrega un control #767 que abre un dialogo con los últimos tweets del invías.
Se agrega un control para ajustar el zoom del mapa a los marcadores. Si se esta viendo un detalle de reporte, este control ajusta el mapa al marcador activo.
Se cambian los filtros, ordenamiento y paginación del FrontEnd hacia el Backend para ayudar a reducir la carga del navegador con volúmenes grandes de información.
Se agregan nuevos filtros.
Se usa una paginación para las listas.
Se muestran las unidades de medida de acuerdo a la configuración del usuario.
Se hace un rediseño básico del detalle del reporte.
Se cambia la forma de los controles para llamar los detalles de activo, actor vial y zonas de control.
Se mejora la presentación de los controles para comandos, ubicación, zoom earth, etc.
Se agrega un nuevo control que muestra en el mapa un circulo con un radio de 20Km para identificar activos mas cercanos a una ubicación.
Ahora se muestra en el mapa las zonas de control del reporte cuando se entra al detalle de reporte.
Se agrega colores a las zonas de control para identificar rápidamente su nivel de riesgo.
Se optimiza en general la carga de la información.
Se cambia el modo de envío de comandos a ejecución en segundo plano.
5. Alarmas
Se agrega protección por recaptcha para ayudar a proteger modificación de información por parte de bots.
Se cambia la forma de dialogo a módulo independiente.
Se agrega una herramienta de filtros, ordenamiento y búsqueda mas completo.
Se agrega la opción de atender múltiples alarmas en simultaneo con un solo mensaje.
Se usa un esquema de paginación que agiliza la carga de la información.
Se muestra el detalle de la alarma (Información del evento).
Se muestra un color asociado al tipo de evento, para facilitar su identificación en caso de tener múltiples eventos de alarma configurados.
6. Tareas
Se realiza el modulo para esta versión de FrontEnd. Se mantiene el concepto del modulo en el FrontEnd V1.
7. Perfil
Se agrega protección por recaptcha para ayudar a proteger modificación de información por parte de bots.
Se independiza el módulo de cambiar contraseña
Se agrega un botón para ver u ocultar el texto de la contraseña.
Se agrega una verificación que ayuda a prevenir contraseñas comunes o con patrones faciales de identificar, tales como usar el mismo nombre de usuario en la contraseña.
Se agrega una validación de correo electrónico y un botón para enviar el correo de verificación.
Se agrega un sección de formatos para que cada usuario pueda definir la unidad de medida que dese ver en la plataforma (Kilómetros, Millas, Litros, Galones, etc.).
Se modifica el campo de correo como único, para que se pueda utilizar para la recuperación de contraseña.
8. Sesiones
Se crea este módulo para administrar y cerrar todas las sesiones abiertas en otros dispositivos.
