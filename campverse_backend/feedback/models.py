from django.db import models
from django.conf import settings


class Feedback(models.Model):
    FEEDBACK_TYPES = [
        ('course', 'Course/Academic'),
        ('teacher', 'Teacher/Staff'),
        ('hostel', 'Hostel/Facilities'),
        ('cafeteria', 'Cafeteria'),
        ('sports', 'Sports'),
        ('admin', 'Administrative'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    feedback_type = models.CharField(max_length=20, choices=FEEDBACK_TYPES)
    target_name = models.CharField(max_length=255)  # Category or specific target
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 stars
    comment = models.TextField()
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Feedback by {self.user.username if self.user and not self.is_anonymous else 'Anonymous'} - {self.target_name}"
