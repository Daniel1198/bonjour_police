import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commissariat',
  templateUrl: './commissariat.component.html',
  styleUrls: ['./commissariat.component.css']
})
export class CommissariatComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  data: any[] = [].constructor(7);

  constructor() { }

  ngOnInit(): void {
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.data;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.data;
  }

}
