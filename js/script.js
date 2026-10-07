// Project Filter
const filterButtons = document.querySelectorAll('#projectFilters button');
const projects = document.querySelectorAll('.project-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Update active button
    filterButtons.forEach((b) => {
      b.classList.toggle('btn-primary', b === button);
      b.classList.toggle('btn-outline-light', b !== button);
    });

    // Show or hide projects
    projects.forEach((project) => {
      const show = filter === 'all' || project.dataset.tags.split(' ').includes(filter);
      project.classList.toggle('d-none', !show);
    });
  });
});

// Form Validation
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

// Mark a field valid or invalid
function setState(field, isValid) {
  field.classList.toggle('is-valid', isValid);
  field.classList.toggle('is-invalid', !isValid);
  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  success.classList.add('d-none');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const messageError = document.getElementById('messageError');

  // Name: not empty
  const nameOk = setState(name, name.value.trim() !== '');

  // Email: basic format check
  const emailOk = setState(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()));

  // Message: not empty, at least 10 characters
  const text = message.value.trim();
  messageError.textContent = text === '' ? 'Enter a message.' : 'Message must be at least 10 characters.';
  const messageOk = setState(message, text.length >= 10);

  // Success State
  if (nameOk && emailOk && messageOk) {
    success.classList.remove('d-none');
    form.reset();
    form.querySelectorAll('.form-control').forEach((f) => f.classList.remove('is-valid'));
  }
});
