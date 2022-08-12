from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status
from .serializers import *
from django.contrib.auth import get_user_model
from .models import Item, Category, Photo, StylePhoto
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
User = get_user_model()


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['description']    # ?search=
    ordering_fields = ['-created_at']  # ?ordering=
    ordering = ['-created_at']

    @action(detail=False, methods=['GET'])
    def price_18000(self, request):
        items = self.get_queryset().filter(price=18000)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def category_item(self, request):
        items = self.get_queryset().filter(category_id=request.category_id)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class StylePhotoViewSet(ModelViewSet):
    queryset = StylePhoto.objects.all()
    serializer_class = StylePhotoSerializer

    # 예시
    # @action(methods=['GET'], detail=True)
    # def view_first(self, request, *args, **kwargs):
    #     item = self.get_object()
    #     serializer = self.get_serializer(item)
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationSetViewSet(ModelViewSet):
    queryset = LocationSet.objects.all()
    serializer_class = LocationSetSerializer
