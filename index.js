"use strict";



const PASS_AVERAGE = 50;
const MIN_ATTENDANCE = 75;
const STRUGGLING_MIN_AVERAGE = 40;
const STRUGGLING_MAX_AVERAGE = 49;
const LENIENCY_BONUS = 5;

const RESULT_PASSED = "ناجح";
const RESULT_REVIEW = "يحتاج مراجعة";

class Student {
  /**
   * @param {number} id - رقم الجلوس
   * @param {string} name - اسم الطالب
   * @param {number[]} grades - درجات 3 مواد
   * @param {number} attendance - نسبة الحضور (0 - 100)
   */
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  /** ناجح فقط لو المتوسط >= 50 والحضور >= 75. */
  getFinalResult() {
    const isAverageEnough = this.calculateAverage() >= PASS_AVERAGE;
    const isAttendanceEnough = this.attendance >= MIN_ATTENDANCE;

    return isAverageEnough && isAttendanceEnough ? RESULT_PASSED : RESULT_REVIEW;
  }
}

const studentsList = [
  new Student(101, "أحمد ياسر", [90, 85, 95], 92), // متفوق
  new Student(102, "علياء علي", [45, 40, 48], 80),   // متعثرة
  new Student(103, "محمد خالد", [70, 65, 75], 60),  // حضور ضعيف
  new Student(104, "منى حسن", [42, 49, 46], 85),    // متعثرة
];


const findStrugglingStudents = (students) =>
  students.filter((student) => {
    const average = student.calculateAverage();
    return average >= STRUGGLING_MIN_AVERAGE && average <= STRUGGLING_MAX_AVERAGE;
  });

const applyLeniency = (students) =>
  students.map((student) => {
    const originalAverage = student.calculateAverage();

    return {
      id: student.id,
      name: student.name,
      originalAverage: roundToTwoDecimals(originalAverage),
      newAverage: roundToTwoDecimals(originalAverage + LENIENCY_BONUS),
    };
  });

const sumNewAverages = (gracedStudents) =>
  gracedStudents.reduce((sum, student) => sum + student.newAverage, 0);

const calculateLeniencyAverage = (gracedStudents) => {
  if (gracedStudents.length === 0) {
  }
  return sumNewAverages(gracedStudents) / gracedStudents.length;
};


function roundToTwoDecimals(number) {
  return Number(number.toFixed(2));
}


function printStudentReports(students) {
  console.log("========== تقرير الطلاب ==========");

  students.forEach((student) => {
    const average = student.calculateAverage();

    console.log(
      `الاسم: ${student.name} | ` +
        `المتوسط: ${average.toFixed(2)} | ` +
        `التقدير: ${student.getGrade(average)} | ` +
        `النتيجة: ${student.getFinalResult()}`
    );
  });
}

function printGracedStudents(gracedStudents) {
  console.log("\n========== الطلاب المتعثرون بعد الرأفة ==========");
  console.log(gracedStudents);
}

function printLeniencyAverage(average) {
  console.log("\n========== متوسط الطلاب المتعثرين بعد التعديل ==========");
  console.log(`المتوسط: ${average.toFixed(2)}`);
}


function main() {
  const strugglingStudents = findStrugglingStudents(studentsList);
  const gracedStudents = applyLeniency(strugglingStudents);
  const leniencyAverage = calculateLeniencyAverage(gracedStudents);

  printStudentReports(studentsList);
  printGracedStudents(gracedStudents);
  printLeniencyAverage(leniencyAverage);
}

main();