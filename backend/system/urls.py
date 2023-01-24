from django.urls import path, include
from rest_framework import routers
from api.views import GovernoratesView


urlpatterns = [
    # path('', include(system_router.urls)),
    path('<str:lang_code>/governorates/',
         GovernoratesView.as_view(), name='governorates')

]
