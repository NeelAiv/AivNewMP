import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
transform( array: Array<any>, orderField: string, orderType ): Array<string> {
     const ad:any[] =  array.sort( ( a: any, b: any ) => {
        let ae = a[ orderField ];
        let be = b[ orderField ];
        if ( ae == undefined && be == undefined ) return 0;
        if ( ae == undefined && be != undefined ) return orderType ? 1 : -1;
        if ( ae != undefined && be == undefined ) return orderType ? -1 : 1;
        if ( ae == be ) return 0;
        return orderType == 'true' ? (ae.toString().toUpperCase() > be.toString().toUpperCase() ? -1 : 1) : (be.toString().toUpperCase() > ae.toString().toUpperCase() ? -1 : 1) ;
    } );
    return ad;
  }
}