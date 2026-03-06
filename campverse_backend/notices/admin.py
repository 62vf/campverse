from django.contrib import admin
from .models import Notice


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'is_pinned', 'is_active', 'created_at']
    list_filter = ['category', 'is_pinned', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_pinned', 'is_active']
    ordering = ['-is_pinned', '-created_at']
