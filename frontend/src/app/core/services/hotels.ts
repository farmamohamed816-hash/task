import {
  inject,
  Injectable
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";

import {
  Observable
} from "rxjs";

import {
  API_BASE_URL
} from "../api.config";

import type {
  ApiResponse
} from '../../models/api-response';

import type {
  Hotels,
  CreateHotelsInput,
  UpdateHotelsInput
} from  '../../models/hotels';


@Injectable({
  providedIn: "root"
})
export class HotelsService {

    private readonly http =
        inject(HttpClient);

    private readonly url = `${API_BASE_URL}/Hotels`;


    getHotels(): Observable<ApiResponse<Hotels[]>> {
      return this.http.get<ApiResponse<Hotels[]>>(this.url);
    };

    getHotelsById(id: string): Observable<ApiResponse<Hotels>> {
      return this.http.get<ApiResponse<Hotels>>(`${this.url}/${id}`);
    };

    createHotels(Hotels: CreateHotelsInput): Observable<ApiResponse<Hotels>> {
      return this.http.post<ApiResponse<Hotels>>(this.url,Hotels);
    }

    deleteHotels(id: string): Observable<{success: boolean; message: string;}> {
      return this.http.delete<{success: boolean; message: string; }>(`${this.url}/${id}`);
    }

    updateHotels(id: string, updates: UpdateHotelsInput): Observable<ApiResponse<Hotels>> {
      return this.http.patch<ApiResponse<Hotels>>(`${this.url}/${id}`,updates);
    }


}