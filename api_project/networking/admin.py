from django.contrib import admin
from .models import IResource, IDiscussion, Trophy, UserInput
from django import forms

class IResourceAdminForm(forms.ModelForm):
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Comma-separated tags'}),
        required=False,
        help_text='Enter comma-separated tags.'
    )

    class Meta:
        model = IResource
        fields = '__all__'

    def clean_tags(self):
        tags_str = self.cleaned_data.get('tags', '')
        print(tags_str)
        tags_list = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
        return tags_list

@admin.register(IResource)
class IResourceAdmin(admin.ModelAdmin):
    form = IResourceAdminForm
    list_display = ('title', 'type', 'category', 'createdBy', 'createdAt')
    list_filter = ('type', 'category', 'createdBy')
    search_fields = ('title', 'description', 'tags')
    fields = (
        'title', 'description', 'link', 'file', 'type', 'category', 'createdBy',
        'tags', 'language', 'isOfficial'
    )


admin.site.register(Trophy)
admin.site.register(UserInput)

@admin.register(IDiscussion)
class IDiscussionAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'timestamp')
    search_fields = ('title', 'author', 'content')
    list_filter = ('author', 'timestamp')

