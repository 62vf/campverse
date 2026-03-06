from rest_framework import serializers
from .models import Course, Faculty, Timetable, Attendance, Fee


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'credits', 'students', 'fees', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'subject', 'phone', 'email', 'department', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class TimetableSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    faculty_name = serializers.CharField(source='faculty.name', read_only=True)
    
    class Meta:
        model = Timetable
        fields = ['id', 'day', 'course', 'course_name', 'slot', 'room', 'faculty', 'faculty_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_course(self, value):
        # Handle course from form (could be int or string)
        if isinstance(value, str):
            try:
                return int(value)
            except ValueError:
                raise serializers.ValidationError("Invalid course ID")
        return value
    
    def validate_faculty(self, value):
        # Handle faculty from form (could be int, string, or null)
        if value is None or value == '' or value == 'null':
            return None
        if isinstance(value, str):
            try:
                return int(value)
            except ValueError:
                raise serializers.ValidationError("Invalid faculty ID")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    
    class Meta:
        model = Attendance
        fields = ['id', 'date', 'course', 'course_name', 'present', 'total', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_date(self, value):
        # Handle date from form input (YYYY-MM-DD string)
        if isinstance(value, str):
            from datetime import datetime
            try:
                return datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                raise serializers.ValidationError("Invalid date format. Use YYYY-MM-DD")
        return value


class FeeSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    
    class Meta:
        model = Fee
        fields = ['id', 'student_name', 'course', 'course_name', 'amount', 'status', 'date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_date(self, value):
        # Handle date from form input (YYYY-MM-DD string)
        if isinstance(value, str):
            from datetime import datetime
            try:
                return datetime.strptime(value, '%Y-%m-%d').date()
            except ValueError:
                raise serializers.ValidationError("Invalid date format. Use YYYY-MM-DD")
        return value
