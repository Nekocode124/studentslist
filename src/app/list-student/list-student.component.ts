import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  students: any;
  constructor(private studentservice: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudent();
  }

  //   loadStudent() {
  //     this.studentservice
  //       .subscribe((data: any) => {
  //         console.log(data);
  //       });
  //   }
  // }

  //THIS WILL SEND THE DATA TO STUDENTLIST AND IT WILL BE DISPLAY
  loadStudent() {
    this.studentservice.listStudent().subscribe((data: any) => {
      //console.log(data);
      this.students = data;
    });
  }
  //This is to delete students
  delStudent(datas: any) {
    this.studentservice.deleteStudent(datas._id).subscribe((data) => {
      console.log(data);
      //the filter check which student is deleted and return the right value.so the data will be filter and asignd the remaining one
      this.students = this.students.filter((u: any) => u !== datas);
    });
  }
}
