from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Sum
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils.datastructures import MultiValueDictKeyError

from .models import Donation, Institution, Category
from django.contrib.auth.models import User
from django.views import View


class IndexView(View):
    def get(self, request):
        foundations = Institution.objects.filter(type=1)
        ngos = Institution.objects.filter(type=2)
        local_collections = Institution.objects.filter(type=3)
        donations = Donation.objects.all()
        num_of_inst = Institution.objects.count()
        if donations.count() == 0:
            bags = 0
        else:
            bags = 0
            for object in donations:
                bags += object.quantity
        context = {
            "foundations": foundations,
            "ngos": ngos,
            "local_collections": local_collections,
            "bags": bags,
            "num_of_inst": num_of_inst,
        }
        return render(request, "index.html", context)


class Register(View):
    template_name = 'register.html'

    def get(self, request):
        return render(request, self.template_name)

    def post(self, request):
        User.objects.create_user(username=request.POST['email'], first_name=request.POST['name'],
                                 last_name=request.POST['surname'],
                                 email=request.POST['email'], password=request.POST['password2'])
        return redirect('/login')


class Login(View):
    def get(self, request):
        return render(request, 'login.html', {})

    def post(self, request):
        user = authenticate(username=request.POST['email'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return redirect('/register')


class LogoutView(LoginRequiredMixin, View):
    def get(self, request):
        logout(request)
        return redirect('/')


class FormConfirmation(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "form-confirmation.html")


class Form(LoginRequiredMixin, View):
    def get(self, request):
        categories = Category.objects.all()
        institutions = Institution.objects.all()
        context = {"categories": categories,
                   "institutions": institutions}
        return render(request, "form.html", context)

    def post(self, request):
        quantity = int(request.POST['bags'])
        categories = request.POST.getlist('categories')
        organisation = int(request.POST['organization'])
        address = request.POST['address']
        city = request.POST['city']
        postcode = request.POST['postcode']
        phone = request.POST['phone']
        date = request.POST['data']
        time = request.POST['time']
        pick_up_comment = request.POST['more_info']
        user = self.request.user
        donation = Donation.objects.create(quantity=quantity, institution_id=organisation, address=address,
                                           phone_number=phone, city=city, zip_code=postcode, pick_up_date=date,
                                           pick_up_time=time, pick_up_comment=pick_up_comment, user=user)
        donation.categories.set(categories)
        donation.save()
        return redirect('form_confirmation')


class UserProfile(LoginRequiredMixin, View):
    def get(self, request):
        user = request.user
        donation = Donation.objects.all().filter(user=user).order_by('is_taken', 'pick_up_date', 'pick_up_time')
        context = {"user": user,
                   "donation": donation}
        return render(request, "user_profile.html", context)

    def post(self, request):
        try:
            donation_id = int(request.POST['is_taken'])
            update_is_taken = Donation.objects.get(pk=donation_id)
            update_is_taken.is_taken = True
            update_is_taken.save()
        except MultiValueDictKeyError:
            user = request.user
            donation = Donation.objects.all().filter(user=user).order_by('is_taken', 'pick_up_date', 'pick_up_time')
            context = {"user": user,
                       "donation": donation,
                       "message": "Zaznacz, czy odebrano"}
            return render(request, "user_profile.html", context)

        return redirect('user-profile')


def get_institution_by_category(request):
    category_id = request.GET.getlist('category_id')
    if category_id is None:
        institutions = Institution.objects.all()
    else:
        list_cat = []
        list_cat_not_duplicate = []
        for id in category_id:
            category = Category.objects.get(pk=id)
            institutions = Institution.objects.filter(categories=category)
            list_cat.append(institutions)
        for institution in list_cat:
            for inst in institution:
                if inst not in list_cat_not_duplicate:
                    list_cat_not_duplicate.append(inst)
        return render(request, "institution_list.html", {"list_cat_not_duplicate": list_cat_not_duplicate})
