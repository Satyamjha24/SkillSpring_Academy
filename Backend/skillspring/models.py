from django.db import models
from mongoengine import Document, StringField, FloatField, BooleanField, ListField


class Department(Document):
    DepartmentID = StringField(primary_key=True)
    DepartmentName = StringField(max_length=50)

class Announcement(Document):
    AnnouncementID = StringField(primary_key=True)
    Title = StringField(max_length=50)
    Description = StringField(max_length=50)
    PublishDate = StringField(max_length=50)

class Instructor(Document):
    InstructorID = StringField(primary_key=True)
    Name = StringField(max_length=50)
    Gender = StringField(max_length=50)
    DoB = StringField(max_length=50)
    DepartmentID = StringField(max_length=50)
    Email = StringField(max_length=50)
    ContactNum = FloatField(max_length=50)

class Course(Document):
    CourseCode = StringField(primary_key=True)
    Name = StringField(max_length=50)
    DepartmentID = StringField(max_length=50)
    Credits = FloatField(max_length=50)
    Description = StringField(max_length=50)
    InstructorID = StringField(max_length=50)

class Student(Document):
    StudentID = StringField(primary_key=True)
    Name = StringField(max_length=50)
    Gender = StringField(max_length=50)
    DoB = StringField(max_length=50)
    Major = StringField(max_length=50)
    Email = StringField(max_length=50)
    ContactNum = FloatField(max_length=50)

class Enrollment(Document):
    EnrollmentID = StringField(primary_key=True)
    StudentID = StringField(max_length=50)
    CourseCode = StringField(max_length=50)
    EnrollmentDate = StringField(max_length=50)

class Assignment(Document):
    AssignmentID = StringField(primary_key=True)
    CourseCode = StringField(max_length=50)
    Title = StringField(max_length=50)
    Description = StringField(max_length=50)
    DueDate = StringField(max_length=50)

class Submission(Document):
    SubmissionID = StringField(primary_key=True)
    AssignmentID = StringField(max_length=50)
    StudentID = StringField(max_length=50)
    SubmissionDate = StringField(max_length=50)
    Status = StringField(max_length=50)
    Remarks = StringField(max_length=50)


 
