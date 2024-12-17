import {
  Component,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { GridData } from '../../shared/models/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnChanges {
  @Input() visibleColumns: string[] = [];
  @Input() hiddenColumns: string[] = [];
  @Input() gridData: GridData[] = [];

  private dataService: DataService = inject(DataService);

  public allColumns: string[] = [];
  public isOpen = false;
 
  ngOnChanges(): void {
    this.getFilteredData();
  }
 
  public toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
 
  public toggleColumn(column: string): void {
    if (this.visibleColumns.includes(column)) {
      this.visibleColumns = this.visibleColumns.filter((col) => col !== column);
      this.hiddenColumns.push(column);
    } else {
      this.hiddenColumns = this.hiddenColumns.filter((col) => col !== column);
      this.visibleColumns.push(column);
    }
    this.getFilteredData();
  }
 
  public getFilteredData(): void {
    let filteredArray: Partial<GridData>[] = [];
    filteredArray = this.gridData.map((obj) => {
      const filteredObj: Partial<GridData> = {};
      this.visibleColumns.forEach((key) => {
        if (key in obj) {
          filteredObj[key as keyof GridData] = obj[key as keyof GridData];
        }
      });
      return filteredObj;
    });
    this.dataService.emitDataChange(filteredArray);
  }
}
