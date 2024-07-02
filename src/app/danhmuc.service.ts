import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OPERATIONS } from "../app/app.constants";
import { createRequestOption } from "../shared/utils/request";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({ providedIn: "root" })
export class DanhMucService {

  public resourceUrl = environment.baseUrl
  private subject = new Subject<any>();
  constructor(protected http: HttpClient) {}

  create(entity: any, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.resourceUrl + requestUrl + OPERATIONS.CREATE,
      entity,
      { observe: "response" }
    );
  }

  update(entity: any, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      this.resourceUrl + requestUrl + OPERATIONS.UPDATE + "?id=" + entity.id,
      entity,
      {
        observe: "response",
      }
    );
  }

  find(id: number, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${this.resourceUrl + requestUrl + OPERATIONS.DETAILS}/${id}`,
      { observe: "response" }
    );
  }

  getById(id: number, requestUrl: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.resourceUrl + requestUrl + OPERATIONS.DETAILS + "?id=" + id,
      { observe: "response" }
    );
  }

  query(req: any, requestUrl: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<any>(
      this.resourceUrl + requestUrl + OPERATIONS.SEARCH,
      { params: options, observe: "response" }
    );
  }

  delete(id: number, requestUrl: any): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl + requestUrl + "?id="}${id}`, {
      observe: "response",
    });
  }

  postOption(
    entity: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + requestUrl + option, entity, {
      observe: "response",
    });
  }

  post(requestUrl: any, option: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.resourceUrl + requestUrl + option, {
      observe: "response",
    });
  }

  getOption(
    req: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl + requestUrl + option, {
      params: options,
      observe: "response",
    });
  }

  putOption(
    entity: any,
    requestUrl: any,
    option: any
  ): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.resourceUrl + requestUrl + option, entity, {
      observe: "response",
    });
  }

  sendClickEvent() {
    this.subject.next("a");
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getAddress(requestUrl: string) {
    return this.http.get<any>(`${this.resourceUrl}${requestUrl}`);
  }

  
  get(
    requestUrl: any,
  ): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + requestUrl, {
      observe: "response",
    });
  }

  uploadFile(requestUrl: any, fileToUpload: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.http.post(this.resourceUrl + requestUrl, formData, { observe: 'response' });
  }
}
