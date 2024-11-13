import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetServicesService {
  BASE_URL = BASE_URL;
  constructor(private http: HttpClient) { }

  GetAllWidget() {
    return this.http.get(this.BASE_URL + '/widgets');
  }

  GetWidgetById(id) {
    return this.http.get(this.BASE_URL + '/widget/' + id);
  }

  GetWidgetByUserId(id) {
    return this.http.get(this.BASE_URL + '/widget/user/' + id);
  }

  uploadWidget(widget) {
    return this.http.post(this.BASE_URL + '/uploadFile', widget);
  }

  getBreakDownRating(id){

    return this.http.get(this.BASE_URL + '/ratingcount/'+id);
  }

  GetWidgetDetails(id) {
    return this.http.post(this.BASE_URL + '/widgetDetails/', id);
  }

  Update(id,widget) {

    return this.http.put(this.BASE_URL + '/update/' + id, widget);
  }

  Delete(id) {
    return this.http.delete(this.BASE_URL + '/delete/' + id);
  }

  GetAllComments(wid) {
    return this.http.get(this.BASE_URL + '/comment/' + wid);
  }

  EditWidget(id, formData) {
    return this.http.post(this.BASE_URL + '/uploadFile/' + id, formData);
  }

  uploadWigetImages(id, files) {
    console.log('service log  : ',files);
    return this.http.post(this.BASE_URL + '/uploadWidgetImages/' + id, files);
  }

  DownloadWidget(widget) {
    return this.http.get(this.BASE_URL + '/downloadWidget/' + widget);

  }

  getAllWidgets() {
    return this.http.get(this.BASE_URL + '/getAllWidgets');
  }

  getApprovedWidgets(): Observable<any> {
    return this.http.get(this.BASE_URL + '/widgets');
  }

  getUnapprovedWidgets(): Observable<any> {
    return this.http.get(this.BASE_URL +'/unapprovewidgets');
  }

  approveWidget(id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/approveWidget/${id}`, {});
  }

  unapproveWidget(id: number): Observable<any> {
    return this.http.post(`${this.BASE_URL}/unapproveWidget/${id}`, {});
  }


  //   GetWidgetJson(id) {
  //     return this.http.get(this.BASE_URL + '/getWidgetJson/' + id).then(function(response){
  //         var contentDisposition = response.headers('Content-Disposition');
  //         var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
  //         var json = JSON.stringify(response.data);
  //         var blob = new Blob([json], {type: "octet/stream"});
  //         saveFile(blob, filename);

  //         var isChrome = !!window.chrome && !!window.chrome.webstore;
  //         var isIE = /*@cc_on!@*/false || !!document.documentMode;
  //         var isEdge = !isIE && !!window.StyleMedia;


  //         if (isChrome){
  //             var url = window.URL || window.webkitURL;

  //             var downloadLink = angular.element('<a></a>');
  //             downloadLink.attr('href',url.createObjectURL(file));
  //             downloadLink.attr('target','_self');
  //             downloadLink.attr('download', filename);
  //             downloadLink[0].click();
  //         }
  //         else if(isEdge || isIE){
  //             window.navigator.msSaveOrOpenBlob(file);

  //         }
  //         else {
  //             var fileURL = URL.createObjectURL(file);
  //             window.open(fileURL);
  //         }

  //     }, handleError('Error deleting widget'));
  // }

  MakeComment(c) {
    return this.http.post(this.BASE_URL + '/makeComment', c);
  }

  // saveFile(blob, filename) {
  //   if (window.navigator.msSaveOrOpenBlob) {
  //     window.navigator.msSaveOrOpenBlob(blob, filename);
  //   } else {
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     const url = window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = filename;
  //     a.click();
  //     setTimeout(() => {
  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);
  //     }, 0)
  //   }
  // }
  saveFile(blob: Blob, filename: string): void {
    // Check if msSaveOrOpenBlob is available (Internet Explorer)
    if ((window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers (Chrome, Firefox, etc.)
      const a = document.createElement('a');
      document.body.appendChild(a);
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  }
}
