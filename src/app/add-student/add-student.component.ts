import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { Router } from 'express';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  addStudent: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentservice: StudentService
  ) {
    this.addStudent = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      cohort: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  //this is to display students...
  onSubmit() {
    console.log(this.addStudent.value);
    this.studentservice
      .addStudent(this.addStudent.value)
      .subscribe((data: any) => {
        console.log(data);
        //this wiil redirect to student list
        this.router.navigate(['/list-student']);
      });
  }
}
