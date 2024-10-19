import django_filters
from .models import User

class UserFilter(django_filters.FilterSet):
    activityLevel_min = django_filters.NumberFilter(field_name="activityLevel", lookup_expr='gte')
    activityLevel_max = django_filters.NumberFilter(field_name="activityLevel", lookup_expr='lte')

    class Meta:
        model = User
        fields = ['city', 'country', 'isNetworking', 'isMentor', 'level']