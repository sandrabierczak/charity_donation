"""oddam_w_dobre_rece URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path
from application.views import IndexView, Login, Register, Form, LogoutView, get_institution_by_category,FormConfirmation

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', IndexView.as_view()),
                  path('login/', Login.as_view(), name='login'),
                  path('logout/', LogoutView.as_view(), name='logout'),
                  path('register/', Register.as_view(), name='register'),
                  path('form/', Form.as_view(), name='test'),
                  path('form/confirmation', FormConfirmation.as_view(), name='form_confirmation'),
                  path('get_institution/', get_institution_by_category),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
