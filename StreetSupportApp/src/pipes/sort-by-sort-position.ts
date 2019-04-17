import { Injectable, Pipe } from '@angular/core';

interface HasSortPosition {
  sortPosition: number
}

@Pipe({
  name: 'sortBySortPosition'
})
@Injectable()
export class SortBySortPosition {

  transform(items: HasSortPosition[]) {

    if (items === undefined || items === null) {
      return;
    }

    // highest sort position first
    return items.sort((a, b) => b.sortPosition - a.sortPosition);
  }
}
