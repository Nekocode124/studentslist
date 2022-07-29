import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  addStudent: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentservice: StudentService,
    private url: ActivatedRoute
  ) {
    this.addStudent = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      cohort: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log(this.id);
    //the data will be fetched from this function and then this data will be passed thought the subscribe data.....it also will be mapping the fields
    this.studentservice.singleStudent(this.id).subscribe((data) => {
      this.addStudent.patchValue(data);
    });
  }

  onSubmit() {
    console.log(this.addStudent.value);
    this.studentservice
      .updateStudent(this.id, this.addStudent.value)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/list-student']);
      });
  }
}
