import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {  
     
    constructor(public storage: StorageService,
      public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle(req)
      .catch((error, caught) => {
        let errObj = error;
        if(errObj.error) {
          errObj = errObj.error;
        }
        if(!errObj.status) {
          errObj = JSON.parse(errObj);
        }

        switch(errObj.status) {
          case 401:
            this.handle401();
            break;
          case 403: 
            this.handle403();
            break;
          case 422:
            this.handle422(errObj);
            break;  
          default:
            this.handleDefault(errObj);
        }
        return Observable.throw(errObj);
      }) as any;
    }

    private handle403() {
      this.storage.setLocalUser(null);
    }

    private handleDefault(errObj: any): any {
      let title = `Erro ${errObj.status} : ${errObj.error}`;
      let message = errObj.message;
      this.handleError(title, message);
    } 
    
    private handle401() {
      let title = 'Erro 401: falha de authenticação';
      let message = 'Email ou senha incorretos';
      this.handleError(title, message);
    }

    private handle422(errObj: any) {
      let title = 'Erro 422: Validação';
      let message = this.listErros(errObj.errors);
      this.handleError(title, message);
    }

    private handleError(title: string, message: string) {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        enableBackdropDismiss: false,
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    }

    listErros(messages: FieldMessage[]): string {
      let errorMessage: string = '';
      messages.forEach(element => {
        errorMessage = errorMessage + `<p><strong>${element.fieldName}</strong> ${element.message}</p>`;
      });
      return errorMessage;
    }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}