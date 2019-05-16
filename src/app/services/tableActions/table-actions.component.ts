import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss']
})
export class TableActionsComponent implements OnInit {
  @Input() buttonClass = 'btn-primary';

  @Input() showCreateButton = true;
  @Output() create = new EventEmitter<void>();

  @Input() showRefreshButton = true;
  @Output() refresh = new EventEmitter<void>();

  @Input() showFilterButton = true;
  @Input() filtersToggleValue = false;
  @Output() filtersToggleValueChange = new EventEmitter<boolean>();
  @Output() removeFilters = new EventEmitter<void>();

  @Input() showExportButton = false;
  @Output() export = new EventEmitter<void>();

  @Input() showSearchButton = true;
  @Input() searchToggleValue = false;
  @Output() searchToggleValueChange = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  protected searchText = null;

  constructor() {}

  ngOnInit() {}

  onClickCreate() {
    this.create.emit();
  }

  onClickRefresh() {
    this.refresh.emit();
  }

  onClickFilter() {
    this.filtersToggleValue = !this.filtersToggleValue;
    this.filtersToggleValueChange.emit(this.filtersToggleValue);

    if (!this.filtersToggleValue) {
      this.removeFilters.emit();
    }
  }

  onClickExport() {
    this.export.emit();
  }

  onSearchClick() {
    this.searchToggleValue = !this.searchToggleValue;
    this.searchToggleValueChange.emit(this.searchToggleValue);

    if (!this.searchToggleValue && !_.isEmpty(this.searchText)) {
      this.searchText = null;
      this.search.emit(this.searchText);
    }
  }

  onSearch(text: string) {
    this.search.emit(text);
  }
}
