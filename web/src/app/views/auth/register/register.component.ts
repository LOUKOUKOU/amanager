import { LoginService } from '@/services/LoginService';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [LoginService],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class RegisterComponent {
  protected form!: FormGroup;
  protected submitted = false;
  private loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      organisationName: ['', Validators.required],
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
    this.loginService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
        // get return url from query parameters or default to home page
        // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        // this.alertService.error(error);
        this.loading = false;
      },
    });
  }
}
