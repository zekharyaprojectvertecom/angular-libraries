import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from "../../models/select-item";
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent<T = any> implements ControlValueAccessor {

  @Input() placeholder: string = "Select...";

  private onTouched: any = () => null;
  private onChange: any = () => null;
  public disabled: boolean;

  private _options: SelectItem<T>[];
  @Input()
  public get options(): SelectItem<T>[] {
    return this._options;
  }
  public set options(options: SelectItem<T>[]) {
    this.setSelectedLabel(options);
    this._options = options;
  }

  private _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(v: T) {
    this.setSelectedLabel(this.options);
    this._value = v;
  }

  public selectedLabel: string;

  constructor(private cd: ChangeDetectorRef) { }

  writeValue(value: T): void {
    this.value = value;
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  private setSelectedLabel(options: SelectItem<any>[]) {
    if (this.options && (this.value || (<unknown>this.value) === false || (<unknown>this.value) === 0)) {
      let option = options.find(o => o.value === this.value);
      this.selectedLabel = option ? option.label : this.placeholder;
    }
  }

  public itemClicked(option: SelectItem) {
    this.selectedLabel = option.label;
    this._value = option.value;
    this.onChange(this.value);
    this.onTouched(this.value)
  }

  public onDropdownBlur() {
    this.onTouched(this.value);
  }
}
