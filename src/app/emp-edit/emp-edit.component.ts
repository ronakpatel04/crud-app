import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../shared/employee.interface';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss']
})
export class EmpEditComponent {

  empForm: FormGroup;
  constructor(private fb : FormBuilder , private empService: EmployeeService , private dialogRef : DialogRef){

    this.empForm = this.fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    })
  }


  onFormSubmit(){
    if(this.empForm.valid){
     this.empService.addEmployee(this.empForm.value).subscribe({
      next : (val : employee) =>{
        alert('employe add sucessfully !!');
        this.dialogRef.close()
      }, error:(err:any) =>{
        console.log(err)
      }
     } )
   
    }
  }
    education :string [] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'

  ]
}
