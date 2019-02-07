import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';

export interface Column {
  columns: string;
}
export interface Field {
  field: string;
  type: string;
  formula: string;
  selected:boolean;
}


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  
  encapsulation: ViewEncapsulation.None
})

export class TemplateComponent implements OnInit {
  ELEMENT_DATA: Column[] = [
  ];
  newColumns: Field[] = [
  {
    field: '',
    type: 'string',
    formula:'',
    selected:false
  }
];
  valid:boolean = true;
  show:boolean = false;
  private _opened: boolean = false;
  private _toggleSidebar() {
    this._opened = !this._opened;
  }  
  displayedColumns: string[] = ['columns','select'];
  dataSource = new MatTableDataSource<Column>(this.ELEMENT_DATA);
  selection = new SelectionModel<Column>(true, []);
  fields:Field[] = [];
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  addField(){
    this.newColumns.push(
      {
        field: '',
        type: 'string',
        formula:'',
        selected:false
      }
    );
  }
  deleteField(index){    
    this.fields=this.fields.filter(
      (data)=>{
        if(data.field === this.newColumns[index].field){
          return false;
        }
        return true;
      }
    );
    if(this.newColumns[index].type === 'formula') this.valid = true;
    this.loadTable();
    this.newColumns.splice(index,1);
  }
  save(){
    for(let item in this.newColumns){
      let bool = true;
      for(let field in this.fields){
        if(this.newColumns[item].field == "" || this.newColumns[item].field == this.fields[field].field){
          bool = false;
          break;
        }
      }
      if(bool){
        this.fields.push(this.newColumns[item]);
      }
    }
    this.loadTable();
  }
  loadTable(){
    this.ELEMENT_DATA = [];
    for(let item in this.fields){
      this.ELEMENT_DATA.push({"columns":this.fields[item].field});
    }
    this.dataSource = new MatTableDataSource<Column>(this.ELEMENT_DATA);
  }
  constructor(private router:Router) {}
  saveFields(){
    for(let field in this.fields){
      let bool = true;
      for(let item in this.selection.selected){
        if(this.fields[field].field === this.selection.selected[item].columns){
          this.fields[field].selected = true;
          bool = false;
          break;
        }
      }
      if(bool){
        this.fields[field].selected = false;
      }
    }
    localStorage.setItem('fields', JSON.stringify(this.fields));
    this.router.navigate(['/home/formula']);
  }
  ifExist(column):boolean{
    for(let item in this.newColumns){
      if(this.newColumns[item].field == column) return true;
    }
    return false;
  }
  checkValid(formula){
    this.valid = false;
    const columns = formula.split(" ");
    var bool = false;
    for(let i = 0; i < columns.length; i++){
      if(columns[i] != '+' && columns[i] != '-' && columns[i] != '*' && columns[i] != '/' ){
        console.log(columns[i]);
        if(this.ifExist(columns[i]) == false) {
          this.valid = false;
          this.show = true;
          return;
        }else{
          bool = true;
        }
      }
    }
    if(bool){
      this.show = false;
      this.valid = true;
    }else{
      this.show = true;
      this.valid = false;
    }
    return;
  }
  ifFormula(column){
    if(column.type === "formula") this.valid = false;
  }
  findIndex(field){
    for(let i = 0; i < this.ELEMENT_DATA.length; i++){
      console.log(this.ELEMENT_DATA[i].columns)
      if(this.ELEMENT_DATA[i].columns === field){
        return i;
      }
    }
  }
  ifSelected(){
    for(let item in this.fields){
      if(this.fields[item].selected == true){
        var index = this.findIndex(this.fields[item].field);
        if(index >= this.ELEMENT_DATA.length) { console.log("here")}
        this.selection.select(this.ELEMENT_DATA[index]);
      }
    }
  }
  ngOnInit() {
    this.fields = JSON.parse(localStorage.getItem('fields'));
    this.loadTable();
    this.ifSelected();
  }

}
