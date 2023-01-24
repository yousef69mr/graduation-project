from django.contrib import admin

from .models import Language, Governorate, GovernorateLanguageBased


class LanguageAdmin(admin.ModelAdmin):
    model = Language
    ordering = ['id']
    list_display = ['id', 'name', 'code',
                    'country_code', 'dir', 'created', 'active']

    list_display_links = ['id', 'name', 'code', 'country_code']
    list_filter = ['created', 'active']


admin.site.register(Language, LanguageAdmin)


class GovernorateAdmin(admin.ModelAdmin):
    model = Governorate
    ordering = ['id']
    list_display = ['id', 'title','area', 'created', 'active']
    list_display_links = ['id', 'title','area', 'created']
    list_filter = ['created', 'active']


admin.site.register(Governorate, GovernorateAdmin)


class GovernorateLanguageBasedAdmin(admin.ModelAdmin):
    model = GovernorateLanguageBased
    ordering = ['id']
    list_display = ['id', 'name', 'lang', 'created', 'active']
    list_display_links = ['id', 'name', 'lang', 'created']
    list_filter = ['created', 'lang', 'active']


admin.site.register(GovernorateLanguageBased, GovernorateLanguageBasedAdmin)
