import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
    name: 'matchesCategorySubCategoryForWidgetGallery'
})
export class CatSubCatPipeWidgetGallery implements PipeTransform {
    transform(items: Array<any>,category : string, subCategory: string): Array<any> {
        if(subCategory==''|| subCategory==null || subCategory =='null')
        {
          return  items.filter(item => item.category === category);
        }
        else{
            return  items.filter(item => item.category === category && item.sub_category === subCategory );
        }
     

      }
}