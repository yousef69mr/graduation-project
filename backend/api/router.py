from rest_framework import routers
from .views import UsersView, LanguageView, GovernoratesView

# system_router = routers.DefaultRouter()

# system_router.register(r'ar', GovernorateView, 'ar')


router = routers.DefaultRouter()
router.register(r'languages', LanguageView, 'language')
router.register(r'users', UsersView, 'user')
# router.registry.extend(system_router.registry)

