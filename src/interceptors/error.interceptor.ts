import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("passou");

      return next.handle(req)
      .catch((error, caught) => {
        let errObj = error;
        if(errObj.error) {
          errObj = errObj.error;
        }
        if(!errObj.status) {
          errObj = JSON.parse(errObj);
        }
        return Observable.throw(errObj);
      }) as any;
    }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}