from django.urls import path
from . import views
urlpatterns = [
    path('announcements/', views.get_announcements, name='announcements-list'),
    path('departments/', views.get_departments, name='departments-list'),
    path('instructors/', views.get_instructors, name='instructors-list'),
    path('students/', views.get_students, name='students-list'),
    path('courses/', views.get_courses, name='courses-list'),
    path('enrollments/', views.get_enrollments, name='enrollments-list'),
    path('assignments/', views.get_assignments, name='assignments-list'),
    path('submissions/', views.get_submissions, name='submissions-list'),
    path('add_announcement/', views.add_announcement, name='add_announcement'),
    path('add_department/', views.add_department, name='add_department'),
    path('add_instructor/', views.add_instructor, name='add_instructor'),
    path('add_course/', views.add_course, name='add_course'),
    path('add_student/', views.add_student, name='add_student'),
    path('add_enrollment/', views.add_enrollment, name='add_enrollment'),
    path('add_assignment/', views.add_assignment, name='add_assignment'),
    path('add_submission/', views.add_submission, name='add_submission'),
]
