import { LoginService } from '@/services/LoginService';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
})
export class LoginComponent {
  protected form!: FormGroup;
  protected submitted = false;
  private loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  protected onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error(error.message);
        this.loading = false;
      },
    });
  }
}
