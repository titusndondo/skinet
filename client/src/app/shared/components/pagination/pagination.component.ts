import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalCount: number;
  @Input() pageNumber: number;
  @Input() numberOfPages: number;
  @Input() indexes: number[];

  @Output() pageChanged = new EventEmitter<number>();
  @Output() goToFirstPage = new EventEmitter<number>();
  @Output() goToLastPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPaginationChanged(index: number) {
    this.pageChanged.emit(index);
    console.log(this.pageNumber);
  }

  onGoToFirstPage() {
    this.goToFirstPage.emit();
  }

  onGoToLastPage() {
    this.goToLastPage.emit();
  }

}
