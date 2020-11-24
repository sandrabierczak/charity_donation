from .models import Institution, Category


def add_categories():
    # Category.objects.create(name="ubrania, które nadaja się do ponownego użycia")
    # Category.objects.create(name="ubrania, do wyrzucenia")
    # Category.objects.create(name="zabawki")
    # Category.objects.create(name="książki")
    Category.objects.create(name="meble")


def add_inst():
    Institution.objects.create(name="Lokalna zbiórka 1", description='Katowice', type=3)
    Institution.objects.create(name="Lokalna zbiórka 2", description='Kraków', type=3)


def add_category_to_inst():
    i1 = Institution.objects.get(id=7)
    i2 = Institution.objects.get(id=8)
    c1 = Category.objects.get(pk=1)
    c2 = Category.objects.get(pk=2)
    c3 = Category.objects.get(pk=3)
    c4 = Category.objects.get(pk=4)
    c5 = Category.objects.get(pk=5)
    i1.categories.add(c2)
    i1.categories.add(c3)
    i1.categories.add(c5)
    i2.categories.add(c1)
    i2.categories.add(c4)
    i2.categories.add(c2)

