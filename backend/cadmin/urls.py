from django.urls import path
from .views import AdminLogin,logout,StudentListView, TeacherListView,AdminUpdateUser, AdminBlockUser, AdminUnblockUser


urlpatterns = [
    path('',AdminLogin.as_view()),
    path('logout/', logout, name='logout'),
    path('students/', StudentListView.as_view(), name='student-list'),
    path('teachers/', TeacherListView.as_view(), name='teacher-list'),

    path('updateuser/<int:pk>/', AdminUpdateUser.as_view(), name='admin-update-user'),
    path('blockuser/<int:pk>/', AdminBlockUser.as_view(), name='admin-block-user'),
    path('unblockuser/<int:pk>/', AdminUnblockUser.as_view(), name='admin-unblock-user'),
    # path('user-search/',AdminSearchUser.as_view()),
    
]
