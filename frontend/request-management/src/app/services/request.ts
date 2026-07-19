import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../interfaces/request.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/requests';

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  createRequest(request: Omit<Request, 'id' | 'createAt' | 'updateAt'>): Observable<Request> {
  return this.http.post<Request>(this.apiUrl, request);
}

updateStatus(id: number, status: string): Observable<Request> {
  return this.http.patch<Request>(
    `${this.apiUrl}/${id}/status`,
    { status }
  );
}

deleteRequest(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}