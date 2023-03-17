import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { employee } from './shared/employee.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private empService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmp();
  }
  addEmployee() {
    this.dialog.open(EmpEditComponent);
  }
  getEmp() {
    this.empService.getEmployee().subscribe((res) => {
          
    });
    this.empService.employees.subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteEmp(id:number){
      this.empService.deleteEmployee(id).subscribe(res =>{
     
      })
      this.empService.employees.subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

  }

  // openAddEditForm(){
  //   const dialogRef =  this.dialog.open(EmpEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next:(val)=>{
  //       if(val){
  //         this.getEmp();
  //       }
  //     }
  //   })
  // }


  editEmp(data:any){
          this.dialog.open(EmpEditComponent,{
            data:data
          })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
