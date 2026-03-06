from rest_framework import serializers
from .models import LostFoundItem


class LostFoundItemSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.CharField(source='posted_by.get_full_name', read_only=True)

    class Meta:
        model = LostFoundItem
        fields = ['id', 'title', 'description', 'status', 'location', 'date', 'contact_info', 'image', 'posted_by', 'posted_by_name', 'is_resolved', 'created_at', 'updated_at']
        read_only_fields = ['id', 'posted_by', 'is_resolved', 'created_at', 'updated_at']
