import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { SearchStringService } from '../service/search-string.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('showSearch') showSearch: boolean;
  @Output() closeSearch = new EventEmitter<boolean>();
  inputValue: string;

  constructor(private searchStringService: SearchStringService) { }

  ngOnInit() {
  }

  // @HostListener() only supports window, document, and body as global event targets, 
  // otherwise it only supports the components host element.
  // To access window event, simply use 'window:keydown' instead of 'keydown'
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enter();
    }
    if (event.key === 'Escape') {
      this.close();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  enter(): void {
    if(this.inputValue && this.inputValue.trim()) {
      this.searchStringService.updateSearchString(this.inputValue);
    }
    this.close();
  }

  close(): void {
    this.inputValue = null;
    this.closeSearch.emit(true);
  }

}
