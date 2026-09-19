(() => {
  const form = document.querySelector('#registration-form');
  if (!form) return;

  const countryTrigger = document.querySelector('#country-trigger');
  const countryMenu = document.querySelector('#country-options');
  const countryInput = document.querySelector('#form-country');
  const countryCurrent = document.querySelector('#country-current');
  const countryOptions = [...countryMenu.querySelectorAll('[data-country]')];
  const studentPlan = form.elements.plan[1];
  const studentCard = document.querySelector('#student-plan-card');
  const generalPrice = document.querySelector('#general-plan-price');
  const planNote = document.querySelector('#plan-note');
  const submit = document.querySelector('#registration-submit');
  const status = document.querySelector('#registration-status');
  const success = document.querySelector('#registration-success');
  let sending = false;

  const setMenu = open => {
    countryMenu.hidden = !open;
    countryTrigger.setAttribute('aria-expanded', String(open));
  };

  const setCountry = option => {
    const country = option.dataset.country;
    countryInput.value = country;
    countryCurrent.innerHTML = `<iconify-icon icon="${option.dataset.icon}"></iconify-icon>${option.textContent.trim()}`;
    countryOptions.forEach(item => item.setAttribute('aria-selected', String(item === option)));
    const chile = country === 'Chile';
    studentPlan.disabled = !chile;
    studentCard.classList.toggle('unavailable', !chile);
    if (!chile && studentPlan.checked) form.elements.plan[0].checked = true;
    generalPrice.textContent = chile ? '$35.000 CLP' : 'US$36';
    planNote.textContent = chile ? 'El pase estudiantes requiere certificado de alumno regular vigente.' : 'Fuera de Chile se aplica el pase general internacional de US$36.';
    setMenu(false);
  };

  countryTrigger.addEventListener('click', () => setMenu(countryMenu.hidden));
  countryTrigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setMenu(true);
      countryOptions[0].focus();
    }
  });
  countryMenu.addEventListener('keydown', event => {
    const index = countryOptions.indexOf(document.activeElement);
    if (event.key === 'Escape') {
      setMenu(false);
      countryTrigger.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      countryOptions[(index + (event.key === 'ArrowDown' ? 1 : -1) + countryOptions.length) % countryOptions.length].focus();
    }
  });
  countryOptions.forEach(option => option.addEventListener('click', () => {
    setCountry(option);
    countryTrigger.focus();
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.country-field')) setMenu(false);
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    submit.disabled = true;
    submit.setAttribute('aria-disabled', 'true');
    status.className = 'form-status loading';
    status.textContent = 'Enviando tu inscripción…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.result !== 'success') throw new Error(result.error || 'No pudimos registrar tu inscripción.');
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = error.name === 'AbortError' ? 'La respuesta tardó demasiado. Revisa tu conexión e inténtalo nuevamente.' : error.message;
      submit.disabled = false;
      submit.removeAttribute('aria-disabled');
      sending = false;
    } finally {
      clearTimeout(timeout);
    }
  });
})();
