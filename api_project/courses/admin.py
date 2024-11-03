# admin.py

from django.contrib import admin
from django import forms
from .models import (
    IAuthor,
    ICourseContent,
    ICourse,
    CourseRating,
    ICourseSection,
    UserCourseProgress,
    UserCourseContentProgress,
    IComment,
    IQuizQuestion,
    IFormField,
    PollQuestion,
    PollOption,
    SurveyQuestion,
    IUploadContent,
    IDiscussion,
)

class IQuizQuestionInline(admin.TabularInline):
    model = IQuizQuestion
    extra = 1

class IFormFieldInline(admin.TabularInline):
    model = IFormField
    extra = 1

class PollOptionInline(admin.TabularInline):
    model = PollOption
    extra = 1

class PollQuestionInline(admin.StackedInline):
    model = PollQuestion
    extra = 1
    inlines = [PollOptionInline]

class SurveyQuestionInline(admin.TabularInline):
    model = SurveyQuestion
    extra = 1

class ICourseContentInline(admin.TabularInline):
    model = ICourseContent
    extra = 1

class ICourseSectionInline(admin.TabularInline):
    model = ICourseSection
    extra = 1

class ICommentInline(admin.TabularInline):
    model = IComment
    extra = 1


@admin.register(IAuthor)
class IAuthorAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'email', 'avatar')}),
        ('Additional Info', {'fields': ('description',)}),
    )
    list_display = ('name', 'email')
    search_fields = ('name', 'email')
    ordering = ('name',)

@admin.register(ICourseContent)
class ICourseContentAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('title', 'type', 'description')}),
        ('Content Details', {'fields': ('url', 'duration')}),
    )
    list_display = ('title', 'type', 'duration')
    list_filter = ('type',)
    search_fields = ('title', 'description')
    ordering = ('title',)
    inlines = [
        IQuizQuestionInline,
        IFormFieldInline,
        SurveyQuestionInline,
    ]

@admin.register(ICourse)
class ICourseAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('title', 'course', 'type', 'order')}),
        ('Details', {'fields': ('description', 'cover_image', 'total_duration')}),
        ('Authors & Resources', {'fields': ('authors', 'resources')}),
        ('Ratings', {'fields': ('average_rating', 'no_of_ratings')}),
    )
    list_display = ('title', 'course', 'type', 'order', 'average_rating')
    list_filter = ('course', 'type')
    search_fields = ('title', 'description')
    ordering = ('order',)
    filter_horizontal = ('authors', 'resources')
    inlines = [ICourseSectionInline]

@admin.register(CourseRating)
class CourseRatingAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'course', 'rating')}),
        ('Timestamp', {'fields': ('timestamp',)}),
    )
    list_display = ('user', 'course', 'rating', 'timestamp')
    list_filter = ('rating', 'timestamp')
    search_fields = ('user__username', 'course__title')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)
    autocomplete_fields = ('user', 'course')

@admin.register(ICourseSection)
class ICourseSectionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('title', 'course')}),
        ('Contents', {'fields': ('contents',)}),
    )
    list_display = ('title', 'course')
    search_fields = ('title', 'course__title')
    ordering = ('course', 'title')
    filter_horizontal = ('contents',)
    autocomplete_fields = ('course',)

@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'course')}),
        ('Progress', {'fields': ('is_unlocked', 'is_completed', 'progress')}),
    )
    list_display = ('user', 'course', 'is_completed', 'progress')
    list_filter = ('is_completed', 'is_unlocked')
    search_fields = ('user__username', 'course__title')
    ordering = ('user', 'course')
    autocomplete_fields = ('user', 'course')

@admin.register(UserCourseContentProgress)
class UserCourseContentProgressAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'content')}),
        ('Completion Status', {'fields': ('is_completed',)}),
    )
    list_display = ('user', 'content', 'is_completed')
    list_filter = ('is_completed',)
    search_fields = ('user__username', 'content__title')
    ordering = ('user', 'content')
    autocomplete_fields = ('user', 'content')

@admin.register(IComment)
class ICommentAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'content')}),
        ('Comment Details', {'fields': ('timestamp', 'parent', 'likes')}),
    )
    list_display = ('user', 'content_preview', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('user__username', 'content')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)
    filter_horizontal = ('likes',)

    def content_preview(self, obj):
        return obj.content[:50]
    content_preview.short_description = 'Content Preview'

@admin.register(IQuizQuestion)
class IQuizQuestionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('content', 'type', 'question')}),
        ('Options & Answer', {'fields': ('options', 'correct_answer')}),
    )
    list_display = ('question', 'type', 'content')
    list_filter = ('type',)
    search_fields = ('question', 'content__title')
    ordering = ('content',)
    autocomplete_fields = ('content',)

@admin.register(IFormField)
class IFormFieldAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('content', 'label', 'type')}),
        ('Additional Settings', {'fields': ('options', 'accept')}),
    )
    list_display = ('label', 'type', 'content')
    list_filter = ('type',)
    search_fields = ('label', 'content__title')
    ordering = ('content',)
    autocomplete_fields = ('content',)

@admin.register(PollQuestion)
class PollQuestionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('content', 'question')}),
    )
    list_display = ('question', 'content')
    search_fields = ('question', 'content__title')
    ordering = ('content',)
    autocomplete_fields = ('content',)
    inlines = [PollOptionInline]

@admin.register(PollOption)
class PollOptionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('poll_question', 'label', 'votes')}),
    )
    list_display = ('label', 'poll_question', 'votes')
    search_fields = ('label', 'poll_question__question')
    ordering = ('poll_question',)
    autocomplete_fields = ('poll_question',)

@admin.register(SurveyQuestion)
class SurveyQuestionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('content', 'question', 'type')}),
        ('Options & Settings', {'fields': ('options', 'rating_scale', 'placeholder')}),
    )
    list_display = ('question', 'type', 'content')
    list_filter = ('type',)
    search_fields = ('question', 'content__title')
    ordering = ('content',)
    autocomplete_fields = ('content',)

@admin.register(IUploadContent)
class IUploadContentAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user', 'title', 'description')}),
        ('Upload Details', {'fields': ('accepted_file_types', 'multiple', 'files')}),
    )
    list_display = ('title', 'user', 'multiple')
    list_filter = ('multiple',)
    search_fields = ('title', 'user__username')
    ordering = ('user',)
    autocomplete_fields = ('user',)

@admin.register(IDiscussion)
class IDiscussionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('title', 'author', 'description')}),
        ('Details', {'fields': ('timestamp',)}),
        ('Comments', {'fields': ('comments',)}),
    )
    list_display = ('title', 'author', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('title', 'author__username', 'description')
    ordering = ('-timestamp',)
    readonly_fields = ('timestamp',)
    filter_horizontal = ('comments',)
    autocomplete_fields = ('author',)

