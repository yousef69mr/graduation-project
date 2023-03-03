from django.urls import path
from .views import CreateUserView, LoginView, UserView, LogoutView
urlpatterns = [
    path('register', CreateUserView.as_view()),
    path('login', LoginView.as_view()),
    path('loggeduser', UserView.as_view()),
    path('logout', LogoutView.as_view()),
]
