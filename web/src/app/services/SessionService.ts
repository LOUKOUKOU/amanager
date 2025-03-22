import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Session {
  username: string;
  displayName: string;
  organisationName: string;
  access_token: string;
  profileId: string;
}

export interface Profile {
  profileId: string;
  type: string;
  displayName: string;
  tasks: number;
  projects: number;
  assignedProjects: number;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private sessionSubject: BehaviorSubject<Session | null>;
  public session$: Observable<Session | null>;
  constructor() {
    this.sessionSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('session')!)
    );
    this.session$ = this.sessionSubject.asObservable();
  }

  public get session() {
    return this.sessionSubject.value;
  }

  public get token() {
    return this.session?.access_token || '';
  }

  isAuthenticated() {
    return !!this.session;
  }

  setSession(session: Session) {
    this.sessionSubject.next(session);
    localStorage.setItem('session', JSON.stringify(session));
  }

  clearSession() {
    this.sessionSubject.next(null);
    localStorage.removeItem('session');
  }
}
