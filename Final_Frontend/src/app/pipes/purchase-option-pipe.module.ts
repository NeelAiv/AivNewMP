import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchaseCategory'
})
export class PurchaseOptionPipeModule implements PipeTransform {

  transform(items: Array<any>, purchase_type: string): Array<any> {
    return items.filter(item => item.purchase_option === purchase_type);
  }

 }
