import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MathcesCategoryPipe} from './MathcesCategoryPipe'
import {PurchaseOptionPipeModule} from './purchase-option-pipe.module'
import {OrderByPipe} from './OrderByPipe'
import { MatchesSubCategoryPipe } from './MatchesSubCategoryPipe'
import { UserPipe } from './UserPipe'
import { NewAddedPipe } from './NewAddedPipe'
import { from } from 'rxjs';
import { MatchesCategorySubCategoryPipe } from './catSubCatPipe'
import { CatSubCatPipeWidgetGallery } from './catSubCatPipeWidgetGallery'
@NgModule({
  declarations:[MathcesCategoryPipe,
                PurchaseOptionPipeModule,
                OrderByPipe,
                MatchesSubCategoryPipe,
                UserPipe,NewAddedPipe,
                MatchesCategorySubCategoryPipe,
                CatSubCatPipeWidgetGallery
              ], // <---
  imports:[CommonModule],
  exports:[MathcesCategoryPipe,
          PurchaseOptionPipeModule,
          OrderByPipe,
          MatchesSubCategoryPipe,
          UserPipe,
          NewAddedPipe,
          MatchesCategorySubCategoryPipe,
          CatSubCatPipeWidgetGallery
        ] // <---
})
export class MainPipeModule { }


