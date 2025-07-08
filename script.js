document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.t-inputquantity__wrapper span'),
        minusImage = document.createElement('img'),
        plusImage = document.createElement('img'),
        radioBtns = document.querySelectorAll('#rec806602915 fieldset label'),
        tabBtnFirst = document.querySelectorAll('.tab-btn')[0],
        tabBtnSecond = document.querySelectorAll('.tab-btn')[1],
        employeeInput = document.querySelector('input[type="number"]'); // <— поле количества

  // Установка иконок
  minusImage.style.cssText = 'width: 100%; height:100%;';
  plusImage.style.cssText = 'width: 100%; height:100%;';
  minusImage.setAttribute('src', 'https://static.tildacdn.com/tild3363-3135-4539-b061-616466336666/Shape.svg');
  plusImage.setAttribute('src', 'https://static.tildacdn.com/tild3336-3563-4333-a437-396137316361/Shape_1.svg');

  inputs.forEach((input, i) => {
    input.textContent = '';
    if (i === 0) input.appendChild(minusImage);
    if (i === 1) input.appendChild(plusImage);
  });
   
  // ???? Проверка условий
  function checkConditions() {
  const count = parseInt(employeeInput.value, 10);
  const isOneYearActive = tabBtnFirst.classList.contains('active');
  const isTwoYearActive = tabBtnSecond.classList.contains('active');
  
  let priceText = document.querySelector('span[data-calc-expr="count*year*720"]');
  let customPrice = document.querySelector('.t-calc__wrapper span[data-limitation="yes"]');

  if (!customPrice) {
    customPrice = document.createElement('span');
    customPrice.classList.add('t-calc');
    customPrice.setAttribute('data-limitation', 'yes');
    document.querySelector('.t-calc__wrapper').insertBefore(customPrice, priceText);
  }

  // Логика для "1 год"
  if (count >= 18 && isOneYearActive) {
    console.log("✅ Сотрудников ≥ 18 и выбран '1 год'");
    customPrice.textContent = '150 000';
    customPrice.style.display = '';
    priceText.style.display = 'none';
  } 
  else if (count < 18 && isOneYearActive) {
    customPrice.style.display = 'none';
    priceText.style.display = '';
  }

  // Логика для "2 года"
  if (count >= 15 && isTwoYearActive) {
    console.log("✅ Сотрудников ≥ 15 и выбран '2 год'");
    customPrice.textContent = '250 000';
    customPrice.style.display = '';
    priceText.style.display = 'none';
  } 
  else if (count < 15 && isTwoYearActive) {
    customPrice.style.display = 'none';
    priceText.style.display = '';
  }
}


  // Слушаем радиокнопки
  radioBtns.forEach((radio, i) => {
    radio.addEventListener('click', (e) => {
      const isFirst = (
        e.target === radioBtns[0] ||
        e.target === radioBtns[0].querySelector('input') ||
        e.target === radioBtns[0].querySelector('div') ||
        e.target === radioBtns[0].querySelector('span')
      );

      const isSecond = (
        e.target === radioBtns[1] ||
        e.target === radioBtns[1].querySelector('input') ||
        e.target === radioBtns[1].querySelector('div') ||
        e.target === radioBtns[1].querySelector('span')
      );

      if (isFirst) {
        console.log('first');
        document.querySelector('.forPrice .tn-atom').textContent = 'За 1 год';
        tabBtnFirst.classList.add('active');
        tabBtnSecond.classList.remove('active');
        checkConditions();
      }

      if (isSecond) {
        console.log('second');
        document.querySelector('.forPrice .tn-atom').textContent = 'За 2 года';
        tabBtnFirst.classList.remove('active');
        tabBtnSecond.classList.add('active');
        checkConditions();
      }
    });
  });

  // Слушаем изменение количества
  employeeInput.addEventListener('input', checkConditions);

  // (Необязательно) Слушаем программные изменения — MutationObserver
  const inputObserver = new MutationObserver(checkConditions);
  inputObserver.observe(employeeInput, { attributes: true, attributeFilter: ['value'] });
});
