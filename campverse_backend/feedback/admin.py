from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['id', 'target_name', 'feedback_type', 'rating', 'is_anonymous', 'created_at']
    list_filter = ['feedback_type', 'rating', 'is_anonymous', 'created_at']
    search_fields = ['comment', 'target_name']
    readonly_fields = ['created_at', 'updated_at']
