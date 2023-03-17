import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../shared/employee.interface';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss'],
})
export class EmpEditComponent implements OnInit {
  empForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpEditComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) {
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
  
    if (this.empForm.valid) {

      if(this.data){
          this.empService.updateEmp(this.data.id, this.data).subscribe({
            next:(val:any)=>{
                alert('Employee Data Updated !!')
                this.dialogRef.close(true);
            }, error:(err:any)=>{
              console.log(err)
            }
          })
      }else{
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: employee) => {
            alert('employe add sucessfully !!');
  
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
      }

     
  }
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
}
