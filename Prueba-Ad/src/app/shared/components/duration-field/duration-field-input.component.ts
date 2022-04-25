import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, ValidationErrors, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material/form-field';

let self;

export class DurationField {
  constructor(public days: number, public hours: number, public minutes: number, public seconds: number) {
  }
}

@Component({
  selector: 'app-duration-field',
  templateUrl: './duration-field-input.component.html',
  styleUrls: ['./duration-field-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: DurationFieldInput}],
  host: {
    '[class.duration-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class DurationFieldInput implements ControlValueAccessor, MatFormFieldControl<DurationField>, AfterViewInit, OnDestroy {
  static nextId = 0;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'duration-input';
  id = `duration-input-${DurationFieldInput.nextId++}`;
  describedBy = '';
  add = 1;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      days: [null, [Validators.max(364), Validators.min(0)]],
      hours: [null, [Validators.max(23), Validators.min(0)]],
      minutes: [null, [Validators.max(59), Validators.min(0)]],
      seconds: [null, [Validators.max(59), Validators.min(0)]],
    });

    self = this;

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get empty() {
    const {value: {days, hours, minutes, seconds}} = this.parts;
    return !days && !hours && !minutes && !seconds;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get errorState() {
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  private _placeholder: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): DurationField | null {
    const {value: {days, hours, minutes, seconds}} = this.parts;
    if (days >= 0 && days < 365 && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
      return new DurationField(days, hours, minutes, seconds);
    }
    return null;
  }

  set value(duration: DurationField | null) {

    if (typeof duration === 'number') {
      duration = this._toInternal(duration);
    }

    const {days, hours, minutes, seconds} = duration || new DurationField(null, null, null, null);
    this.parts.setValue({days, hours, minutes, seconds});
    this.stateChanges.next();
  }

  ngAfterViewInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValidators(this._validate);
    }
  }

  onChange = (_: any) => {
  };

  onTouched = () => {
  };

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  writeValue(duration: DurationField | null): void {
    this.value = duration;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    if (!this._hasValues()) {
      this.parts.reset();
      this.onChange(null);
    } else if (this.parts.valid) {
      this._transformInput();
    } else {
      this.onChange(null);
    }
  }

  _transformInput() {
    let duration = 0;
    if (this.parts.value.days > 0) {
      duration += this.parts.value.days * 1440;
    } else {
      this.parts.controls.days.reset(0);
    }

    if (this.parts.value.hours > 0) {
      duration += this.parts.value.hours * 60;
    } else {
      this.parts.controls.hours.reset(0);
    }

    if (this.parts.value.minutes > 0) {
      duration += this.parts.value.minutes;
    } else {
      this.parts.controls.minutes.reset(0);
    }

    if (this.parts.value.seconds > 0) {
      duration += this.parts.value.seconds / 60;
    } else {
      this.parts.controls.seconds.reset(0);
    }

    duration *= this.add;
    this.onChange(duration);
  }

  /**
   * Realiza validaciones de formulario. Si es requerido, valida que haya informacion y agrega los errores propios de cada control.
   */
  _validate(c: FormControl): ValidationErrors {
    const errors = {};

    if (self.parts.invalid) {
      errors['durationParse'] = true;
      ['days', 'hours', 'minutes', 'seconds'].forEach(key => {
        Object.keys(self.parts.get(key).errors || {}).forEach(errKey => {
          const fKey = key + '_' + errKey;
          errors[fKey] = self.parts.get(key).errors[errKey];
        });
      });
    }

    if (self._required && !self._hasValues()) {
      errors['required'] = true;
    }

    if (Object.keys(errors).length === 0) {
      return null;
    }

    return {...errors};
  }

  /**
   * Verifica que al menos uno de los controles tenga datos.
   */
  _hasValues(): boolean {
    let has = false;
    Object.keys(self.parts.value).forEach(key => {
      if (self.parts.value[key] > 0) {
        has = true;
      }
    });
    return has;
  }

  _focused(key: string) {
    if (!(this.parts.get(key).value > 0)) {
      this.parts.get(key).reset();
    }
  }

  _blured(key: string) {
    if (!this.parts.get(key).value) {
      this.parts.get(key).reset(0);
    }
  }

  _toInternal(duration: number): DurationField {
    this.add = duration < 0 ? -1 : 1;
    duration = Math.abs(duration);

    let hours = 0;
    let decimalHours = 0;

    let minutes = 0;
    let decimalMinutes = 0;

    let seconds = 0;

    let conversion = duration / 1440;
    const days = Math.floor(conversion);
    const decimalDays = conversion - days;

    if (decimalDays > 0) {
      conversion = decimalDays * 24;
      hours = Math.floor(conversion);
      decimalHours = conversion - hours;
    }
    if (decimalHours > 0) {
      conversion = decimalHours * 60;
      minutes = Math.floor(conversion);
      decimalMinutes = conversion - minutes;
    }
    if (decimalMinutes > 0) {
      conversion = decimalMinutes * 60;
      seconds = Math.ceil(conversion);
    }
    return new DurationField(days, hours, minutes, seconds);
  }
}
