import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Data } from '../shared/data.model';
import { HomeService } from '../shared/home.service';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-resourse',
  templateUrl: './resourse.component.html',
  styleUrls: ['./resourse.component.css'],
  
  encapsulation: ViewEncapsulation.None
})
export class ResourseComponent implements OnInit {
  displayedColumns: string[] = ['name','costcode'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Data[] = [];
  newData: Data = {'_id':'', 'costcode':'','name':''};
  dataSource: MatTableDataSource<Data>;
  ifAdd:boolean = false;
  lastColumn: string = 'costcode';
  columnName: string;
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService:HomeService, private modalService: NgbModal) {
    // Create 100 users
    // Assign the data to the data source for the table to render
  }
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  getData(){
    this.dataService.fetchData(1).subscribe(
      (data)=>{
        this.data=data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataService.passProjectNumber('1');
      }
    );
  }
  ngOnInit() {
    this.getData();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addColumn() {
    this.lastColumn = this.columnName;
    this.displayedColumns.push(this.columnName);
    this.columnsToDisplay.push(this.columnName);
    this.newData[this.columnName] = this.columnName;
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
      this.displayedColumns.pop();
      delete this.newData[this.lastColumn];
    }
    this.lastColumn = this.columnsToDisplay[this.columnsToDisplay.length - 1];
  }
  
  addRow() {
    this.ifAdd = true;
  }
  submitRow(){
    this.ifAdd = false;
    const newObj:Data = {"_id":this.newData._id,"costcode":this.newData.costcode, "name":this.newData.name};
    console.log(newObj);  
    this.dataService.postData(1, newObj).subscribe(
      ()=>{
        this.data.push(this.newData);
        this.dataSource = new MatTableDataSource(this.data);  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (errorResponse)=>{

      }
    );
  }
  cancelRow(){
    for(let item in this.newData){
      this.newData[item] = '';
      this.ifAdd = false;
    }
  }
  ifLast(column){
    return column === this.lastColumn;
  }
}
