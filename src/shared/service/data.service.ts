import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { GridData } from '../models/data';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private allData = new Subject<GridData[]>();

  public getColumnsName(): Observable<string[]> {
    return this.http.get<string[]>(environment.gridDataUrl + `kolone`);
  }

  public getAllData(): Observable<GridData[]> {
    return this.http.get<GridData[]>(environment.gridDataUrl + `sifre`);
  }
  public dataChangeListener(): Observable<GridData[]> {
    return this.allData.asObservable();
  }
  public emitDataChange(data: GridData[]): void {
    this.allData.next(data);
  }
}
