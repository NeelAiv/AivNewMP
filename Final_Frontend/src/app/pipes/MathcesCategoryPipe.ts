import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategory'
})
export class MathcesCategoryPipe implements PipeTransform {
    transform(items: Array<any>, category: string): Array<any> {
        return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
}