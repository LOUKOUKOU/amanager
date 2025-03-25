import { Component, Input, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface FieldConfig {
  key: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  placeholder: string;
  errorMessage: string;
}

export interface FormConfig {
  fields: FieldConfig[];
  submitText?: string;
  name: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  host: {
    class: 'px-4 lg:px-10 py-10 pt-0',
    style: 'display: block;',
  },
})
export class FormComponent {
  protected form!: FormGroup;
  protected submitted = false;
  formSubmit = output<Record<string, string>>();
  @Input() formConfig: FormConfig = { fields: [], name: '' };
  @Input() values: Record<string, string> = {};
  @Input() title: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(this.getFormGroup());
  }

  ngOnInit() {
    this.form = this.formBuilder.group(this.getFormGroup());
  }

  get formControls() {
    return this.form.controls;
  }

  getFormGroup() {
    return this.formConfig.fields.reduce((acc, field) => {
      const ValidatorsArray = field.required ? [Validators.required] : [];
      if (field.type === 'email') {
        ValidatorsArray.push(Validators.email);
      }
      return {
        ...acc,
        [field.key]: ValidatorsArray.length ? ['', ValidatorsArray] : [''],
      };
    }, {});
  }

  formSubmitEvent() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formSubmit.emit(this.form.value);
  }
}
