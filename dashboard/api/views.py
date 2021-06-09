from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Authentication, User
from .serializers import AuthenticationSerializer, CreateUserSerializer, ListUserSerializer

# Create your views here.

class ListDoctor(generics.ListAPIView):
    queryset = User.objects.filter(occupation='doctor')
    serializer_class = ListUserSerializer

class ListNurse(generics.ListAPIView):
    queryset = User.objects.filter(occupation='nurse')
    serializer_class = ListUserSerializer

class SignUp(APIView):
    serializer_class = AuthenticationSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = Authentication(first_name=first_name, last_name=last_name, email=email, password=password)
            user.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'Bad request':'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)


class SignIn(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        email = request.data.get('currEmail')
        password = request.data.get('currPassword')


        if email and password:
            user = Authentication.objects.filter(email=email)
            if len(user) > 0:
                user = user[0]
                object_password = user.password

                if password == object_password:
                    self.request.session['logged_in'] = True
                    return Response({'Sucessfull':"Login sucessfull"}, status=status.HTTP_200_OK)

                return Response({"Wrong Password": "Login failed"}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({"User not available":"Invalid user"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"Bad request":"Invalid request"}, status=status.HTTP_400_BAD_REQUEST)


class SignOut(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if 'logged_in' in self.request.session:
            self.request.session.pop('logged_in')
        
        return Response({'Logged Out successfully':"Valid"}, status=status.HTTP_200_OK)

class IsUserAuth(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if 'logged_in' in self.request.session:
            return Response({"Logged in":"Valid login"}, status=status.HTTP_200_OK)

        return Response({"Unautherized entry":"Not valid"}, status=status.HTTP_401_UNAUTHORIZED)


class NumberDoctorNurse(APIView):
    def get(self, request, format=None):
        doctor = User.objects.filter(occupation='doctor')
        nurse = User.objects.filter(occupation='nurse')

        return JsonResponse({'doctorLen' : len(doctor), 'nurseLen':len(nurse)}, status=status.HTTP_200_OK)


class AddUser(APIView):
    def post(self, request, format=None):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            first_name = serializer.data.get("first_name")
            last_name = serializer.data.get("last_name")
            email = serializer.data.get("email")
            phone = serializer.data.get("phone")
            gender = serializer.data.get("gender")
            qualification = serializer.data.get("qualification")
            occupation = serializer.data.get("occupation")

            user = User(first_name=first_name, last_name=last_name, email=email, phone=phone, gender=gender, qualification=qualification, occupation=occupation)
            user.save()

            return Response(CreateUserSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response({'Bad request':'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUser(APIView):
    def patch(self, request, format=None):
        serializer = CreateUserSerializer(data=request.data)
        pk = request.data.get('id')
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            phone = serializer.data.get('phone')
            gender = serializer.data.get('gender')
            qualification = serializer.data.get('qualification')
            occupation = serializer.data.get('occupation')

            user = User.objects.filter(id=pk)

            if len(user) > 0:
                user = user[0]
                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.phone = phone
                user.gender = gender
                user.qualification = qualification
                user.occupation = occupation

                user.save(update_fields=['first_name', 'last_name', 'email', 'phone', 'gender', 'qualification', 'occupation'])

                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response({"User not found":"Invalid data"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"Bad data":"Invalid request"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    def post(self, request, format=None):
        pk = request.data.get('id')
        user = User.objects.filter(id=pk)

        if len(user) > 0:
            user = user[0]
            user.delete()

        return Response({'Deletion Successful':'Valid'}, status=status.HTTP_200_OK)
