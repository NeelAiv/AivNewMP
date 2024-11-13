import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesSubCategory'
})
export class MatchesSubCategoryPipe implements PipeTransform {
    transform(items: Array<any>, subCategory: string): Array<any> {
        return items.filter(item => item.sub_category.toLowerCase() === subCategory.toLowerCase());
    }
}