var radioBox1 = document.getElementById('myCheck1');
var radioBox2 = document.getElementById('myCheck2');
var form = document.getElementById('form');
var firstCard = document.querySelector('.bank-cards__item--first');
var secondCard = document.querySelector('.bank-cards__item--second');
// Get the form


// Get the checkbox
function formAppearance() {
  // If the radio is checked, display the form
  if (radioBox1.checked == true || radioBox2.checked == true) {
    console.log(radioBox1.checked,radioBox2.checked)
    form.style.position = 'static';
  } else {
    form.style.position = 'absolute';
  }

  if (radioBox1.checked) {
    firstCard.classList.add('bank-cards__item--active');
    secondCard.classList.remove('bank-cards__item--active');
  }

  if (radioBox2.checked) {
    secondCard.classList.add('bank-cards__item--active');
    firstCard.classList.remove('bank-cards__item--active');
  }
}

// validation
var inputs = document.querySelectorAll('.form__input--required');
var labels = document.querySelectorAll('.form__label--required');
var requiredFieldMarks = document.querySelectorAll('.form__required-field');
var submit = document.querySelector('.form__send');
var errorInputClass = 'form__input--not-filled';
var errorLabelClass = 'form__label--not-filled';
var errorSpanClass = 'form__required-field--not-filled';

var checkValidity = function (input) {
  var validity = input.checkValidity();

  if (!validity) {
    return false;
  }

  return true;
}

submit.addEventListener('click', function (evt) {
  evt.preventDefault();

  for (var j = 0; j < inputs.length; j++) {
    var input = inputs[j];
    var label = labels[j];
    var span = requiredFieldMarks[j];

    if (checkValidity(input) === false) {
      input.classList.add(errorInputClass);
      label.classList.add(errorLabelClass);
      span.classList.add(errorSpanClass);
    }
  }
});

// selects
var options = document.querySelectorAll('.jcf-option-form__option ');

for (var x = 0; x < options.length; x++) {
  var option = options[x];

  option.addEventListener('change', function () {
    option.style.color = '#053490';
  });
}

