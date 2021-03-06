document.addEventListener("DOMContentLoaded", function() {
  /**
   * HomePage - Help section
   */
  class Help {
    constructor($el) {
      this.$el = $el;
      this.$buttonsContainer = $el.querySelector(".help--buttons");
      this.$slidesContainers = $el.querySelectorAll(".help--slides");
      this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
      this.init();
    }

    init() {
      this.events();
    }

    events() {
      /**
       * Slide buttons
       */
      this.$buttonsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("btn")) {
          this.changeSlide(e);
        }
      });

      /**
       * Pagination buttons
       */
      this.$el.addEventListener("click", e => {
        if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
          this.changePage(e);
        }
      });
    }

    changeSlide(e) {
      e.preventDefault();
      const $btn = e.target;

      // Buttons Active class change
      [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
      $btn.classList.add("active");

      // Current slide
      this.currentSlide = $btn.parentElement.dataset.id;

      // Slides active class change
      this.$slidesContainers.forEach(el => {
        el.classList.remove("active");

        if (el.dataset.id === this.currentSlide) {
          el.classList.add("active");
        }
      });
    }

    /**
     * TODO: callback to page change event
     */
    changePage(e) {
      e.preventDefault();
      const page = e.target.dataset.page;

      console.log(page);
    }
  }
  const helpSection = document.querySelector(".help");
  if (helpSection !== null) {
    new Help(helpSection);
  }

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
        if (this.currentStep === 2){
            let s = get_id_categories();
            let v = fetch_url(s);
            get_institution(v);
    }
        if (this.currentStep === 5){
            const bagQuantity = document.querySelector('.icon-bag').nextElementSibling;
            const bags = document.getElementsByName('bags')[0];
            const cat = Array.from(document.querySelectorAll('input[type=checkbox][name=categories]:checked'))
            let checked_cat = [];
                for (let i = 0; i < cat.length; i++) {
                        checked_cat.push(cat[i].nextElementSibling.nextElementSibling.textContent);
                    }
            if (bags.value == 1){
            bagQuantity.innerText = `${bags.value} worek kategorii: ${checked_cat}`;
            }
            else if ( 2<= bags.value && bags.value < 5) {
            bagQuantity.innerText = `${bags.value} worki kategorii: ${checked_cat}`;
            }
            else {
            bagQuantity.innerText = `${bags.value} worków kategorii: ${checked_cat}`;
            }

            const institution = document.querySelector('input[type=radio][name=organization]:checked').nextElementSibling.nextElementSibling.children[0]
            const institution_info = document.querySelector('.icon-hand').nextElementSibling;
            institution_info.innerText = institution.textContent;
            const street = document.querySelector('[name="address"]').value;
            const city = document.querySelector('[name="city"]').value;
            const postcode = document.querySelector('[name="postcode"]').value;
            const phone = document.querySelector('[name="phone"]').value;
            const date = document.querySelector('[name="data"]').value;
            const time = document.querySelector('[name="time"]').value;
            const more_info = document.querySelector('[name="more_info"]').value;
            const address = Array.from(document.querySelectorAll('#address-information li'));
            const picktime = Array.from(document.querySelectorAll('#date-time li'));
            address[0].innerText = street;
            address[1].innerText = city;
            address[2].innerText = postcode;
            address[3].innerText = phone;
            picktime[0].innerText = date;
            picktime[1].innerText = time;
            picktime[2].innerText = more_info;
    }
          this.updateForm();

        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
      this.$step.parentElement.hidden = this.currentStep >= 6;


      // TODO: get data from inputs and show them in summary
    }

    /**
     * Submit form
     *
     * TODO: validation, send data to server
     */
    submit(e) {
      e.preventDefault();
      this.currentStep++;
      this.updateForm();
      document.getElementById('donation-form').submit();
    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});

function get_id_categories(){
    const ids = [];
    var categories = Array.from(document.querySelectorAll('input[type=checkbox][name=categories]:checked'));
        categories.forEach(function (el) {
                     ids.push(el.value);
                });
                return ids;
        }
function fetch_url(id_list, name='category_id') {
  let ret_string = "";
   for (var i=0; i<id_list.length; i++)
  {
     ret_string += name + "=" + id_list[i] + '&';
  }
    return ret_string;
}
function get_institution(categories_ids){
    let address = '/get_institution?' + categories_ids;
    let el = document.querySelector('#step3')
        fetch(address)
            .then(function (result) {
             return result.text();
               }).then(function(result){
              el.innerHTML = result;
               })
               }
