from django.contrib.auth.models import User
from django import forms


class AddUserForm(forms.Form):
    """
    User registration form. Check if password are equal, user and email are not exists in db
    """
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Repeat Password', widget=forms.PasswordInput())
    e_mail = forms.EmailField(label='E-mail', max_length=64)

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError('Passwords are different')
        return password2

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username:
            user = User.objects.filter(username=username).exists()
            if user:
                raise forms.ValidationError('User is not available')
        return username

    def clean_e_mail(self):
        e_mail = self.cleaned_data.get('e_mail')
        if e_mail:
            user = User.objects.filter(email=e_mail).exists()
            if user:
                raise forms.ValidationError('Email is already used, please select')
        return e_mail
