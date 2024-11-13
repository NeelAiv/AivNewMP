import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byuser'
})
export class UserPipe implements PipeTransform {

  transform(items: Array<any>, userId: number): Array<any> {
    return items.filter(item => item.user_id === userId);
  }

 }
