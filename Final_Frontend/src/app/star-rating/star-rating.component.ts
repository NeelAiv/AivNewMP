import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  // selected = 0;
  @Input() selected : number =0;
  @Input() disable : boolean = false;
  @Output() ratingChange = new EventEmitter();
  constructor() { }

  rating(rating){
    this.selected=rating;
    this.ratingChange.emit(this.selected);
  }

  ngOnInit(): void {
  }

}
