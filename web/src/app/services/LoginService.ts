import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs';
import { Session, SessionService } from './SessionService';
export interface LoginDetails {
  username: string;
  password: string;
}
export interface RegisterDetails {
  userId: string;
  email: string;
  username: string;
}

@Injectable()
export class LoginService {
  private APIUrl: string = environment.APIUrl;
  private sessionService: SessionService;

  constructor(private http: HttpClient) {
    this.sessionService = inject(SessionService);
  }

  login(loginDetails: LoginDetails) {
    return this.http
      .post<Session>(`${this.APIUrl}/auth/login`, {
        username: loginDetails.username,
        password: loginDetails.password,
      })
      .pipe(
        map((session: Session) => {
          this.sessionService.setSession(session);
          return session;
        })
      );
  }

  logout() {
    this.sessionService.clearSession();
  }

  register(registerDetails: RegisterDetails) {
    return this.http
      .post<Session>(`${this.APIUrl}/auth/register`, registerDetails)
      .pipe(
        map((user: Session) => {
          this.sessionService.clearSession();
          return user;
        })
      );
  }
}
