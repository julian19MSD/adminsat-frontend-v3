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
exports.WorkdayConfigFilterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var cloneDeep = require("lodash/cloneDeep");
var filter_common_1 = require("@shared/commons/filter.common");
var filter_forms_1 = require("@admin/workday-config/list/filter/filter.forms");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var WorkdayConfigFilterComponent = /** @class */ (function (_super) {
    __extends(WorkdayConfigFilterComponent, _super);
    function WorkdayConfigFilterComponent(data, store, route, router, translate, formManageService, bottomSheetRef, cdRef) {
        var _this = _super.call(this, data, store, route, router, translate, formManageService, bottomSheetRef, cdRef) || this;
        _this.data = data;
        _this.store = store;
        _this.route = route;
        _this.router = router;
        _this.translate = translate;
        _this.formManageService = formManageService;
        _this.bottomSheetRef = bottomSheetRef;
        _this.cdRef = cdRef;
        _this.formGroup = new forms_1.FormGroup(cloneDeep(filter_forms_1.formFieldsFilter));
        _this.filterConversionKeys = {
            cliente__in: 'array_int'
        };
        return _this;
    }
    WorkdayConfigFilterComponent = __decorate([
        core_1.Component({
            selector: 'adms-workday-config-filter',
            templateUrl: './filter.component.html'
        }),
        __param(0, core_1.Inject(bottom_sheet_1.MAT_BOTTOM_SHEET_DATA))
    ], WorkdayConfigFilterComponent);
    return WorkdayConfigFilterComponent;
}(filter_common_1.CommonFilter));
exports.WorkdayConfigFilterComponent = WorkdayConfigFilterComponent;
