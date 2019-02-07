import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Data } from '../shared/data.model';
import { HomeService } from '../shared/home.service';

/**
 * @title Table retrieving data through HTTP
 */
export interface Field {
  field: string;
  type: string;
  formula: string;
  selected:boolean;
}
@Component({
  selector: 'app-resourse',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
  
  encapsulation: ViewEncapsulation.None
})
export class FormulaComponent implements OnInit {
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  data: Data[] = [];
  fields:Field[] = [];
  dataSource: MatTableDataSource<Data>;
  ifAdd:boolean = false;
  lastColumn: string = 'name';
  projectNumber:string;
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService:HomeService) {
    // Create 100 users
    // Assign the data to the data source for the table to render
  }
  getData(){
    this.dataService.currentData.subscribe(data => this.data = data);
    this.dataService.currentProject.subscribe(project => this.projectNumber = project);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    if(localStorage.getItem('fields') == undefined){
        this.fields.push({"field":"name","type":"string","formula":"","selected": true});
        this.fields.push({"field":"costcode","type":"string","formula":"","selected": true});
        this.fields.push({"field":"_id","type":"string","formula":"","selected": true});
        localStorage.setItem('fields', JSON.stringify(this.fields));
    }else{
      this.fields=JSON.parse(localStorage.getItem('fields'));
    }
    for(let field in this.fields){
      if(this.fields[field].selected == true || this.fields[field].field == 'name'){
        this.displayedColumns.push(this.fields[field].field);
      }
    }
    this.columnsToDisplay = this.displayedColumns.slice();
    this.getData();
  }
  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.lastColumn = this.displayedColumns[randomColumn]
    this.columnsToDisplay.push(this.lastColumn);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
    this.lastColumn = this.columnsToDisplay[this.columnsToDisplay.length - 1];
  }
  updateData(index){
    this.dataService.updateData(this.projectNumber, this.data[index + this.dataSource.paginator.pageIndex*this.dataSource.paginator.pageSize]).subscribe(
      (updatedData)=>{
        console.log(updatedData);
      }
    );
  }
  calculate(element, column){
    const cal = this.findFormula(column).split(" ");
    var res = 0;
    switch(cal[1]){
      case '+':
        res = element[cal[0]] + element[cal[2]];
        break;
      case '-':
        res = element[cal[0]] - element[cal[2]];
        break;
      case '*':
        res = element[cal[0]] * element[cal[2]];
        break;
      case '/':
        res = element[cal[0]] / element[cal[2]];
        console.log(element[cal[2]]);
        break;
    }
    return isNaN(res) ? '' : res;
  }
  findFormula(column){
    for(let item in this.fields){
      if(column == this.fields[item].field){
        return this.fields[item].formula;
      }
    }
    return 'Not Found';
  }
  returnType(column):string{
    for(let item in this.fields){
      if(column == this.fields[item].field){
        return this.fields[item].type;
      }
    }
    return 'Not Found';
  }
}
/** An example database that the data source uses to retrieve data for the table. */