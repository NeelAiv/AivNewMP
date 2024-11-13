import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategorySubCategory'
})
export class MatchesCategorySubCategoryPipe implements PipeTransform {
    transform(items: Array<any>,category : string, subCategory: string): Array<any> {
      if(!subCategory || subCategory==''|| subCategory==null || subCategory =='null')
      {
        const itemsbyCat= items.filter(item => item.category === category);
        return itemsbyCat;
      }
      else{
          const itemsbyCat = items.filter(item => item.category === category && item.sub_category === subCategory);
          return itemsbyCat;
        }
        
    }
}