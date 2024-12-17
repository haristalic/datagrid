import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../components/data-grid/data-grid.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { DataService } from '../shared/service/data.service';
import { GridData } from '../shared/models/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DataGridComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private dataService: DataService = inject(DataService);
  public allColumns: string[] = [];
  public visibleColumns: string[] = [];
  public hiddenColumns: string[] = [];
  public gridData: GridData[] = [];

  ngOnInit(): void {
    this.dataService.getColumnsName().subscribe({
      next: (data: string[]) => {
        this.allColumns = data;
        this.visibleColumns = this.allColumns.slice(0, 5);
        this.hiddenColumns = this.allColumns.filter(
          (col) => !this.visibleColumns.includes(col)
        );
      },
    });
    this.dataService.getAllData().subscribe({
      next: (data: GridData[]) => {
        this.gridData = data;
      },
    });
  }

  public filter(searchTerm: string):void {
    if (searchTerm.length > 2) {
      const data = this.gridData.filter((item) => {
        return Object.values(item).some((itemValue) => {
          return (
            itemValue &&
            itemValue
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        });
      });
      this.dataService.emitDataChange(data);
    }
  }
  public filteredData(data: GridData[]):void {
    if (data) {
      this.gridData = data;
    }
  }
}
