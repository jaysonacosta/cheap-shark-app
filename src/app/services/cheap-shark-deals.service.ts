import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheapSharkDealsService {
  apiHost = `${environment.apiHost}deals`;

  constructor(private http: HttpClient) {}

  async getSales(): Promise<any[]> {
    return await this.http
      .get<any[]>(
        `${this.apiHost}?&onSale=true`
      )
      .toPromise();
  }

  async getDeals(params: HttpParams): Promise<any[]> {
    return await this.http
      .get<any[]>(`${this.apiHost}`, {
        params,
      })
      .toPromise();
  }
}
