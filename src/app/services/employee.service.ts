import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { employee } from '../shared/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees = new BehaviorSubject<employee[]>([]);
  constructor(private http: HttpClient) {}
  addEmployee(data: employee) {
    return this.http
      .post<employee>('http://localhost:3000/employee', data)
      .pipe(
        map((res) => {
          this.employees.next([...this.employees.getValue(), res]);
          return res;
        })
      );
  }
  getEmployee() {
    return this.http.get<employee[]>('http://localhost:3000/employee').pipe(
      map((res) => {
        this.employees.next(res);
        return res;
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http
      .delete<employee>(`http://localhost:3000/employee/${id}`)
      .pipe(
        map((res) => {
          // console.log(res);
          this.employees.next(
            this.employees.getValue().filter((e) => e.id != id)
          );
        })
      );
  }


  updateEmp(id:number, data:employee){
    return this.http.put(`http://localhost:3000/employee/${id}`,data)
  }
}
