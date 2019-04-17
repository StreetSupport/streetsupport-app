import { Injectable, Pipe } from '@angular/core';

export interface ClientGroupFilter {
  filterTypes: string[]
}

@Pipe({
  name: 'filterByClientGroup'
})
@Injectable()
export class FilterByClientGroup {

  transform(items: any[], filter: ClientGroupFilter): any {

    if (!items) {
      return;
    }    

    if(!filter || !filter.filterTypes) {
      return items;
    }    
    
    return items.filter(item => item.clientGroups != null && 
      filter.filterTypes.every(
        filterType => item.clientGroups.some(
          clientGroup => clientGroup.key == filterType
        )
      )
    )
  }
}
