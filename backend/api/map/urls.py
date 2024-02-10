from django.urls import path
from . import views

urlpatterns = [
    path('', views.MapView.as_view()),
    path('place/list/', views.PlaceListView.as_view()),
    path('room/list/', views.RoomListView.as_view()),
]
