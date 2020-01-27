from django.urls import path
from . import views

app_name = "homepy"

urlpatterns = [
    path("", views.home, name="home"),
]
