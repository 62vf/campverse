from rest_framework import viewsets, permissions
from .models import LostFoundItem
from .serializers import LostFoundItemSerializer


class LostFoundItemViewSet(viewsets.ModelViewSet):
    queryset = LostFoundItem.objects.all()
    serializer_class = LostFoundItemSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        
        if status and status != 'All':
            queryset = queryset.filter(status=status)
            
        return queryset
