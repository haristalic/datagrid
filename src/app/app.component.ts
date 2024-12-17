import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataGridComponent } from '../components/data-grid/data-grid.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SearchComponent } from '../components/search/search.component';
import { DataService } from '../shared/service/data.service';
import { GridData } from '../shared/models/data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DataGridComponent,
    SidebarComponent,
    SearchComponent,
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
        console.log(this.gridData);

      },
    });
    console.log(this.gridData);
  }
  
}
