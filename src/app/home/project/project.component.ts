import { Component, OnInit, ViewChild, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Data } from '../shared/data.model';
import { HomeService } from '../shared/home.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-resourse',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
  selectionOne = new SelectionModel<Data>(true, []);
  selectionTwo = new SelectionModel<Data>(true, []);
  displayedColumns: string[] = ['select','name','costcode', '_id'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: Data[] = [];
  newData:Data[] = [];
  dataSource: MatTableDataSource<Data>;
  newDataSource: MatTableDataSource<Data>;
  selected = 'Project1';
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  @ViewChildren(MatPaginator) paginators: QueryList<MatPaginator>;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService:HomeService, private router:Router) {
    // Create 100 users
    // Assign the data to the data source for the table to render
  }
  getData(){
    this.dataService.fetchData(this.selected=='Project1' ? 1 : 2).subscribe(
      (data)=>{
        this.data=data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginators.first;
        this.dataSource.sort = this.sort;
        this.newDataSource = new MatTableDataSource(this.newData);
        this.newDataSource.paginator = this.paginators.last;
      }
    );
  }
  isAllSelectedOne() {
    const numSelected = this.selectionOne.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleOne() {
    this.isAllSelectedOne() ?
        this.selectionOne.clear() :
        this.dataSource.data.forEach(row => this.selectionOne.select(row));
  }
  checkAllOne() {
    this.dataSource.data.forEach(row => this.selectionOne.select(row));
  }
  clearAllOne(){
    this.selectionOne.clear();
  }
  isAllSelectedTwo() {
    const numSelected = this.selectionTwo.selected.length;
    const numRows = this.newDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleTwo() {
    this.isAllSelectedTwo() ?
        this.selectionTwo.clear() :
        this.newDataSource.data.forEach(row => this.selectionTwo.select(row));
  }

  checkAllTwo() {
    this.newDataSource.data.forEach(row => this.selectionTwo.select(row));
  }
  clearAllTwo(){
    this.selectionTwo.clear();
  }
  displayNewTable(){
    for(let item in this.selectionOne.selected){
      if(this.newData.length > 0 && this.exist(this.newData, this.selectionOne.selected[item])) continue;
      this.newData.push(this.selectionOne.selected[item]);
      this.newDataSource = new MatTableDataSource(this.newData);
      this.newDataSource.paginator = this.paginators.last;
    }
  }  
  clearNewTable(){
    this.newData=this.newData.filter(
      (data)=>{
        for(let item in this.selectionTwo.selected){
          if(data._id === this.selectionTwo.selected[item]._id){
            console.log(data);
            return false;
          }
        }
        return true;
      }
    );
    this.selectionTwo.clear()
    console.log(this.newData);
    this.newDataSource = new MatTableDataSource(this.newData);
    this.newDataSource.paginator = this.paginators.last;
  }
  exist(datas, data): boolean{
    for(let i = 0; i < datas.length; i++){
      if(data._id === datas[i]._id){
        return true;
      }
    }
    return false;
  }
  reloadData(){
    this.newData=[];
    this.getData();
    this.selectionOne.clear();
    this.selectionTwo.clear();
    this.dataService.passProjectNumber(this.selected=='Project1' ? '1' : '2');
  }
  passData(){
    this.dataService.passData(this.newData);
    this.dataService.passProjectNumber(this.selected=='Project1' ? '1' : '2');
    this.router.navigate(['/home/formula']);
  }
  ngOnInit() {
    this.getData();
    this.dataService.passProjectNumber(this.selected=='Project1' ? '1' : '2');
  }
  
}
