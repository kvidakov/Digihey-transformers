import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Transformer } from '../transformer-class/transformer';
import { Factions } from '../transformer-class/factions';
import { VehicleTypes } from '../transformer-class/vehicle-types';

@Injectable()
export class TransformersService {
  private apiUrl = 'http://localhost:3000';
  private headers = new Headers({'Content-Type': 'application/json'});
  public maxId = 0;
  constructor(private http: Http) { }

  getTransformers(): Observable<Transformer[]> {
    return this.http.get(`${this.apiUrl}/transformers`).map((res: Response) => res.json() as Transformer[]).catch(this.handleError);
  }

  getFactions(): Observable<Factions[]> {
    return this.http.get(`${this.apiUrl}/factions`).map((res: Response) => res.json() as Factions[]).catch(this.handleError);
  }

  getVehicleGroups(groupName): Observable<VehicleTypes[]> {
    console.log('group name ---- ' + groupName);
    return this.http.get(`${this.apiUrl}/vehicleTypes?group=${groupName}`)
      .map((res: Response) => res.json() as VehicleTypes[]).catch(this.handleError);
  }
  getVehicleTypes(): Observable<VehicleTypes[]> {
    return this.http.get(`${this.apiUrl}/vehicleTypes`).map((res: Response) => res.json() as VehicleTypes[]).catch(this.handleError);
  }

  updateStatus(id, data) {
    console.log('data --- ' + data);
    return this.http.put(`${this.apiUrl}/transformers/${id}`, data)
      .map((res) => res.json()).catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
}
