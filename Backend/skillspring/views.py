from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# views.py
from . import models

# Create your views here.

def get_departments(request):
    departments = models.Department.objects.all()
    
    # Convert departments to a list of dictionaries
    departments_data = [
        {
            'DepartmentID': department.DepartmentID,
            'DepartmentName': department.DepartmentName,
        }
        for department in departments
    ]
    
    return JsonResponse(departments_data, safe=False)


def get_instructors(request):
    instructors = models.Instructor.objects.all()
    
    # Convert instructors to a list of dictionaries
    instructors_data = [
        {
            'InstructorID': instructor.InstructorID,
            'Name': instructor.Name,
            'Gender': instructor.Gender,
            'DoB': instructor.DoB,
            'DepartmentID': instructor.DepartmentID,
            'Email': instructor.Email,
            'ContactNum': instructor.ContactNum,
        }
        for instructor in instructors
    ]
    
    return JsonResponse(instructors_data, safe=False)


def get_students(request):
    students = models.Student.objects.all()
    
    # Convert instructors to a list of dictionaries
    students_data = [
        {
            'StudentID': student.StudentID,
            'Name': student.Name,
            'Gender': student.Gender,
            'DoB': student.DoB,
            'Major': student.Major,
            'Email': student.Email,
            'ContactNum': student.ContactNum,
        }
        for student in students
    ]
    
    return JsonResponse(students_data, safe=False)


def get_enrollments(request):
    enrollments = models.Enrollment.objects.all()
    
    # Convert announcements to a list of dictionaries
    enrollments_data = [
        {
            'EnrollmentID': enrollment.EnrollmentID,
            'StudentID': enrollment.StudentID,
            'CourseCode': enrollment.CourseCode,
            'EnrollmentDate': enrollment.EnrollmentDate
        }
        for enrollment in enrollments
    ]
    
    return JsonResponse(enrollments_data, safe=False)


def get_assignments(request):
    assignments = models.Assignment.objects.all()
    
    # Convert announcements to a list of dictionaries
    assignments_data = [
        {
            'AssignmentID': assignment.AssignmentID,
            'CourseCode': assignment.CourseCode,
            'Title': assignment.Title,
            'Description': assignment.Description,
            'DueDate': assignment.DueDate,
        }
        for assignment in assignments
    ]
    
    return JsonResponse(assignments_data, safe=False)


def get_submissions(request):
    submissions = models.Submission.objects.all()
    
    # Convert announcements to a list of dictionaries
    submissions_data = [
        {
            'SubmissionID': submission.SubmissionID,
            'AssignmentID': submission.AssignmentID,
            'StudentID': submission.StudentID,
            'SubmissionDate': submission.SubmissionDate,
            'Status': submission.Status,
            'Remarks': submission.Remarks,
        }
        for submission in submissions
    ]
    
    return JsonResponse(submissions_data, safe=False)


def get_announcements(request):
    announcements = models.Announcement.objects.all()
    
    # Convert announcements to a list of dictionaries
    announcements_data = [
        {
            'AnnouncementID': announcement.AnnouncementID,
            'Title': announcement.Title,
            'Description': announcement.Description,
            'PublishDate': announcement.PublishDate
        }
        for announcement in announcements
    ]
    
    return JsonResponse(announcements_data, safe=False)

def get_courses(request):
    courses = models.Course.objects.all()
    
    # Convert announcements to a list of dictionaries
    courses_data = [
        {
            "CourseCode": course.CourseCode,
            "Name": course.Name,
            "DepartmentID": course.DepartmentID,
            "Credits": course.Credits,
            "Description": course.Description,
            "InstructorID": course.InstructorID
        }
        for course in courses
    ]
    
    return JsonResponse(courses_data, safe=False)




@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_announcement(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            announcement = models.Announcement(
                AnnouncementID=data['AnnouncementID'],
                Title=data['Title'],
                Description=data['Description'],
                PublishDate=data['PublishDate']
            )
            announcement.save()  # Save the new announcement to MongoDB
            return JsonResponse({'message': 'New Announcement added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_department(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            department = models.Department(
                DepartmentID=data['DepartmentID'],
                DepartmentName=data['DepartmentName'],
            )
            department.save()  # Save the new department to MongoDB
            return JsonResponse({'message': 'New Department added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_instructor(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            instructor = models.Instructor(
                InstructorID=data['InstructorID'],
                Name= data['Name'],
                Gender= data['Gender'],
                DoB= data['DoB'],
                DepartmentID= data['DepartmentID'],
                Email= data['Email'],
                ContactNum= data['ContactNum'],
            )
            instructor.save()  # Save the new instructor to MongoDB
            return JsonResponse({'message': 'New instructor added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_student(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            student = models.Student(
                StudentID=data['StudentID'],
                Name= data['Name'],
                Gender= data['Gender'],
                DoB= data['DoB'],
                Major= data['Major'],
                Email= data['Email'],
                ContactNum= data['ContactNum'],
            )
            student.save()  # Save the new student to MongoDB
            return JsonResponse({'message': 'New student added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_course(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            course = models.Course(
                CourseCode= data['CourseCode'],
                Name= data['Name'],
                DepartmentID= data['DepartmentID'],
                Credits= data['Credits'],
                Description= data['Description'],
                InstructorID= data['InstructorID']
            )
            course.save()  # Save the new course to MongoDB
            return JsonResponse({'message': 'New course added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_enrollment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            enrollment = models.Enrollment(
                EnrollmentID=data['EnrollmentID'],
                StudentID=data['StudentID'],
                CourseCode=data['CourseCode'],
                EnrollmentDate=data['EnrollmentDate']
            )
            enrollment.save()  # Save the new enrollment to MongoDB
            return JsonResponse({'message': 'New Enrollment data added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_assignment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            assignment = models.Assignment(
                AssignmentID=data['AssignmentID'],
                CourseCode=data['CourseCode'],
                Title=data['Title'],
                Description=data['Description'],
                DueDate=data['DueDate']
            )
            assignment.save()  # Save the new assignment to MongoDB
            return JsonResponse({'message': 'New assignment data added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt  # Disabling CSRF for demonstration purposes; you should handle CSRF properly in production
def add_submission(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            submission = models.Submission(
                SubmissionID=data['SubmissionID'],
                AssignmentID=data['AssignmentID'],
                StudentID=data['StudentID'],
                SubmissionDate=data['SubmissionDate'],
                Status=data['Status'],
                Remarks=data['Remarks']
            )
            submission.save()  # Save the new submission to MongoDB
            return JsonResponse({'message': 'New submission added successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)