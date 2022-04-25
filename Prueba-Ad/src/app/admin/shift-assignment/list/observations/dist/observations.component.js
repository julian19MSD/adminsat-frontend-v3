"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ShiftAssignmentObservationsComponent = void 0;
var core_1 = require("@angular/core");
var shift_assignment_observation_forms_1 = require("./shift-assignment-observation.forms");
var forms_1 = require("@angular/forms");
var cloneDeep = require("lodash/cloneDeep");
var operators_1 = require("rxjs/operators");
var dialog_1 = require("@angular/material/dialog");
var destroy_common_1 = require("@shared/commons/destroy.common");
var api_consts_1 = require("@shared/consts/api.consts");
var ShiftAssignmentObservationsComponent = /** @class */ (function (_super) {
    __extends(ShiftAssignmentObservationsComponent, _super);
    function ShiftAssignmentObservationsComponent(formManageService, notificationService, cdRef, shiftObservationHttp, dialogRef, data) {
        var _this = _super.call(this) || this;
        _this.formManageService = formManageService;
        _this.notificationService = notificationService;
        _this.cdRef = cdRef;
        _this.shiftObservationHttp = shiftObservationHttp;
        _this.dialogRef = dialogRef;
        _this.data = data;
        _this.formGroup = new forms_1.FormGroup(cloneDeep(shift_assignment_observation_forms_1.FormFieldsShiftAssignmentObservation));
        _this.tipoOptions = [];
        _this.subTipoOptions = [];
        _this.zonasControlOptions = [];
        _this.loading = true;
        _this.httpParams = {
            method: 'post',
            url: api_consts_1.API_URL.routes.shiftAssignment.observation.general
        };
        _this.now = new Date();
        return _this;
    }
    ShiftAssignmentObservationsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.formManageService.getFormStatus(this.formGroup)
            .pipe(operators_1.takeUntil(this.ngDestroyed$))
            .subscribe(function (errors) {
            _this.formStatus = errors;
            _this.cdRef.detectChanges();
        });
        this.getNoveltysTypeOptions();
        this.watchType();
        this.addTimeChange(this.addTime);
    };
    /**
     * Ajusta el formulario cuando se cambia el estado de agregar tiempo
     */
    ShiftAssignmentObservationsComponent.prototype.addTimeChange = function (state) {
        var _this = this;
        this.addTime = state;
        shift_assignment_observation_forms_1.FormRequiredFieldsShiftObservation.forEach(function (key) {
            if (!_this.addTime) {
                _this.formGroup.get(key).disable();
            }
            else {
                _this.formGroup.get(key).enable();
            }
        });
    };
    ShiftAssignmentObservationsComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.httpParams.params = { id: this.data.id };
        this.formManageService
            .submitForm(this.formGroup, this.httpParams)
            .subscribe(function () { return _this.dialogRef.close(true); }, function (err) {
            _this.notificationService.sendErrorNotification({}, err);
        });
    };
    /**
     * Vigila si cambia el tipo de novedad para traer nuevamente la informacion relacionada en el subtipo.
     */
    ShiftAssignmentObservationsComponent.prototype.watchType = function () {
        var _this = this;
        this.formGroup.get('tipo').valueChanges
            .pipe(operators_1.filter(function (e) { return !!e; }), operators_1.distinctUntilChanged(), operators_1.takeUntil(this.ngDestroyed$))
            .subscribe(function (selectedValue) {
            _this.getNoveltysSubTypeOptions(selectedValue);
        });
    };
    /**
     * Obtiene la lista de novedades padre.
     */
    ShiftAssignmentObservationsComponent.prototype.getNoveltysTypeOptions = function () {
        var _this = this;
        this.shiftObservationHttp.noveltysSelect({ primer_nivel: true, cliente: this.data.cliente })
            .pipe(operators_1.takeUntil(this.ngDestroyed$))
            .subscribe(function (res) {
            _this.tipoOptions = res;
            _this.getControlZones();
        }, function (err) {
            _this.dialogRef.close({ error: err });
        });
    };
    /**
     * Obtiene la lista de zonas de control del enturmaniento.
     */
    ShiftAssignmentObservationsComponent.prototype.getControlZones = function () {
        var _this = this;
        this.shiftObservationHttp.controlZonesSelect(this.data.id, { observacion: true })
            .pipe(operators_1.take(1))
            .subscribe(function (res) {
            _this.zonasControlOptions = res;
            _this.loading = false;
            _this.cdRef.detectChanges();
        }, function (err) { return _this.dialogRef.close({ error: err }); });
    };
    /**
     * Obtiene la lista de novedades hijo.
     */
    ShiftAssignmentObservationsComponent.prototype.getNoveltysSubTypeOptions = function (parentId) {
        var _this = this;
        this.loading = true;
        this.cdRef.detectChanges();
        this.shiftObservationHttp.noveltysSelect({ novedad_padre: parentId, cliente: this.data.cliente })
            .pipe(operators_1.takeUntil(this.ngDestroyed$))
            .subscribe(function (res) {
            _this.subTipoOptions = res;
            _this.loading = false;
            _this.cdRef.detectChanges();
        }, function (err) { return _this.dialogRef.close({ error: err }); });
    };
    ShiftAssignmentObservationsComponent = __decorate([
        core_1.Component({
            selector: 'adms-shift-assignment-observations',
            templateUrl: './observations.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ShiftAssignmentObservationsComponent);
    return ShiftAssignmentObservationsComponent;
}(destroy_common_1.CommonDestroy));
exports.ShiftAssignmentObservationsComponent = ShiftAssignmentObservationsComponent;
