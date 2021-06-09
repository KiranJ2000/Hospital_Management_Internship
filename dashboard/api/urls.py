from django.urls import path
from .views import SignUp, SignIn, IsUserAuth, SignOut, NumberDoctorNurse, ListDoctor, ListNurse, AddUser, UpdateUser, DeleteUser

urlpatterns = [
    path("doctor", ListDoctor.as_view()),
    path("nurse", ListNurse.as_view()),
    path("sign-up", SignUp.as_view()),
    path("sign-in", SignIn.as_view()),
    path("check-login", IsUserAuth.as_view()),
    path("sign-out", SignOut.as_view()),
    path("get-number", NumberDoctorNurse.as_view()),
    path("add-user", AddUser.as_view()),
    path("update-user", UpdateUser.as_view()),
    path("delete-user", DeleteUser.as_view())
]
