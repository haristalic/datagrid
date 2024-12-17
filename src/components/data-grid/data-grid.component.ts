import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GridData } from '../../shared/models/data';
import { DataService } from '../../shared/service/data.service';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent implements OnInit {
  private dataService: DataService = inject(DataService);
  public gridData: GridData[] = [];
  
  ngOnInit(): void {
    this.dataService.dataChangeListener().subscribe((data) => {
      this.gridData = data;
    });
  }
}
