import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() placeholder = 'Search Data';
  @Input() inputDisabled = false;
  @Output() searchEventChange = new EventEmitter<string>();

  public searchValueChanged: Subject<string> = new Subject<string>();
  public searchValue = '';

  constructor() {
    this.searchValueChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => {
        this.searchEventChange.emit(value);
      });
  }

  public searchValueChange(searchValue: string): void {
    this.searchValueChanged.next(searchValue);
  }
  public clickClear(): void {
    this.searchValue = '';
    this.searchValueChange(this.searchValue);
  }
}
