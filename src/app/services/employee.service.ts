import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee } from '../shared/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) { 


  }
  addEmployee(data:employee){
    return this.http.post<employee >('http://localhost:3000/employee',data)
  }
  getEmployee(){
    return this.http.get<employee []>('http://localhost:3000/employee');
  }
}
