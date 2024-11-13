import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategory'
})
export class MostDownloadedPipe implements PipeTransform {
    transform(value: any, args?: any): any { 
    const sortedValues = value.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
    return sortedValues;
    }
}
// const sortedValues = value.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
// transform(items: Array<any>, category: string): Array<any> {
    // return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
// }