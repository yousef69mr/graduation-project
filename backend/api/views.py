
from rest_framework import viewsets, permissions, views, status
# from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer, LanguageSerializer, GovernoratesSerializer
from users.models import User
from system.models import Language, GovernorateLanguageBased
# Create your views here.


class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LanguageView(viewsets.ModelViewSet):

    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class GovernoratesView(views.APIView):
    # queryset = GovernorateLanguageBased.objects.all()
    # serializer_class = GovernoratesSerializer
    lookup_field = 'lang_code'
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, lang_code, format=None):

        language = get_object_or_404(Language, code=lang_code)

        governorates = GovernorateLanguageBased.objects.all().filter(lang=language)
        # print(governorates)
        serializer = GovernoratesSerializer(governorates, many=True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GovernoratesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GovernorateView(RetrieveUpdateDestroyAPIView):

#     serializer_class = GovernoratesSerializer
#     lookup_url_kwarg = 'lang_code'
#     lookup_field = 'lang_code'

#     def get(self, request,lang_code):

#         code = self.kwargs.get('lang_code')
#         lang = get_object_or_404(Language, code)
#         queryset = GovernorateLanguageBased.objects.filter(lang=lang)
#         serializer = GovernoratesSerializer(queryset)
#         return Response(serializer.data)
