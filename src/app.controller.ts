import { Controller, Get, Render, Post, Body, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateStudentDto } from './createstudent.dto.js';
import { error } from 'console';

interface Student {
  name: string;
  age: number;
}

@Controller()
export class AppController {
  students: Student[] = [];
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get('newstudent')
  @Render('newstudent')
  newStudentForm() {
    return {
      students: this.students
    }
  }
  @Post('newstudent')
  @Render('newstudent')
  newStudent(@Body() body: CreateStudentDto) {
    // TODO hibaüzenetek tömbösítése
    // TODO megfelelő státuszkód
    // TODO lehetséges frissíteni az oldalt form újratöltés nélkül
    if (!body.name) {
      // throw new BadRequestException("Érvénytelen név");
      return {
        error: 'Érvénytelen név',
        students: this.students,
        newStudent: body,
      }
    }
    if (!body.age) {
      return {
        error: 'Érvénytelen életkor',
        students: this.students,
        newStudent: body,
      }
    }

    const age = parseInt(body.age);

    if (!age || isNaN(age) || age < 1) {
      return {
        error: 'Érvénytelen életkor',
        student: this.students,
        newStudent: body,
      }
    }

    const student: Student = {
      name: body.name,
      age: parseInt(body.age),
    }
    this.students.push(student);

    return {
      students: this.students
    }
  }
}
