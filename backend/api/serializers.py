from rest_framework import serializers
from users.models import User
from system.models import Language, GovernorateLanguageBased, Governorate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile_image', 'full_name', 'first_name',
                  'last_name', 'gender', 'phone', 'is_active', 'is_staff', 'is_superuser', 'is_verified')


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'name', 'code', 'country_code', 'dir', 'active')


class GovernorateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Governorate
        fields = ('id', 'shape', 'emblem', 'area')


class GovernoratesSerializer(serializers.ModelSerializer):
    governorate = GovernorateSerializer(source='gov')
    language = LanguageSerializer(source='lang')

    class Meta:
        model = GovernorateLanguageBased
        fields = ('id', 'governorate', 'language', 'name', 'governor')
        # lookup_field = 'lang_code'
        # extra_kwargs = {
        #     'url': {'lookup_field': 'lang_code'}
        # }
