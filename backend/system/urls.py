from django.urls import path, include
# from rest_framework import routers
from api.views import GovernoratesView, LandmarksView, TicketsView


urlpatterns = [
    # path('', include(system_router.urls)),
    path('<str:lang_code>/governorates/',
         GovernoratesView.as_view(), name='governorates'),
    path('<str:lang_code>/landmarks/',
         LandmarksView.as_view(), name='landmarks'),
    path('<str:lang_code>/<int:landmark_id>/<int:event_id>/tickets/',
         TicketsView.as_view(), name='tickets')

]
