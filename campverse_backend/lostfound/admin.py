from django.contrib import admin
from .models import LostFoundItem


@admin.register(LostFoundItem)
class LostFoundItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'location', 'date', 'posted_by', 'is_resolved', 'created_at']
    list_filter = ['status', 'is_resolved', 'created_at']
    search_fields = ['title', 'description', 'location']
    list_editable = ['is_resolved']
    ordering = ['-created_at']
