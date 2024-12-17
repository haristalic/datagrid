import { Component, inject, OnInit } from '@angular/core';
import { GridData } from '../../shared/models/data';
import { DataService } from '../../shared/service/data.service';
import { DxDataGridModule } from 'devextreme-angular';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators'; // ispravno uvozimo filter i debounceTime
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [DxDataGridModule, FormsModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent implements OnInit {
  private dataService: DataService = inject(DataService);
  public gridData: GridData[] = [];
  public searchText: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  public filteredGridData: GridData[] = [];

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        filter((searchText) => searchText.length > 2)
      )
      .subscribe((searchText) => {
        this.performSearch(searchText);
      });
  }
  ngOnInit(): void {
    this.dataService.dataChangeListener().subscribe((data) => {
      this.gridData = data;
      this.filteredGridData = this.gridData;
      this.searchText = '';
    });
  }
  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }
  private performSearch(searchText: string) {
    if (searchText.length < 3) {
      this.filteredGridData = this.gridData;
      return;
    }
    this.filteredGridData = this.gridData.filter((item) =>
      Object.values(item).some(
        (val) =>
          val != null &&
          val.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
}
