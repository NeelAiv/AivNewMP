import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByDate'
})
export class NewAddedPipe implements PipeTransform {
    transform(array: Array<any>, orderField: string): any {
        // transform(items: Array<any>, subCategory: string): Array<any> {
        if (array) {
            let newVal = array.sort((a: any, b: any) => {
                let date1 = new Date(a.date);
                let date2 = new Date(b.date);
    
                if (date1 > date2) {
                    return 1;
                } else if (date1 < date2) {
                    return -1;
                } else {
                    return 0;
                }
            });
    
            return newVal;
        }
    }
}

// let now: Date = new Date();
        
// array.sort((a: any, b: any) => {
//   let date1: Date = new Date(a[orderField]);
//   let date2: Date = new Date(b[orderField]);

//   // If the first date passed
//   if(date1 < now){
//     // If the second date passed
//     if(date2 < now){
//       return 0
//     } else {
//       return 1
//     }
//   } else {
//     // If the second date passed
//     if(date2 < now) {
//       return -1
//     } else if(date1 < date2) {
//       return -1
//     } else if(date1 > date2) {
//       return 1
//     } else {
//       return 0;
//     }
//   }
// });
// }