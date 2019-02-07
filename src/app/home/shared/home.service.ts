import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Data } from "./data.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeService {
    constructor(private http:HttpClient){}
    private datas = new BehaviorSubject<Data[]>(null);
    private project = new BehaviorSubject<string>(null);
    currentData = this.datas.asObservable();
    currentProject = this.project.asObservable();
    passData(data:Data[]) {
        this.datas.next(data);
    }
    passProjectNumber(project:string){
        this.project.next(project);
    }
    public fetchData(projectNumber):Observable<Data[]>{
        console.log('/api/data' + projectNumber);
        return <Observable<Data[]>> this.http.get('/api/data' + projectNumber);
    }
    public postData(projectNumber, data):Observable<Data[]>{
        console.log('/api/data' + projectNumber + '/postdata');
        return <Observable<Data[]>> this.http.post('/api/data' + projectNumber + '/postdata', data);
    }
    public updateData(projectNumber, data):Observable<Data[]>{
        return <Observable<Data[]>> this.http.put('/api/data' + projectNumber + '/update', data);
    }
}