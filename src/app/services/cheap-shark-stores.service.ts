import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheapSharkStoresService {
  apiHost = `${environment.apiHost}stores`;

  constructor(private http: HttpClient) {}

  async getStores(): Promise<any[]> {
    return await this.http.get<any[]>(this.apiHost).toPromise();
  }
}
