const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const modal = document.querySelector('#gallery-modal');
if (modal) {
  const title = modal.querySelector('[data-modal-title]');
  const description = modal.querySelector('[data-modal-description]');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      title.textContent = item.dataset.label;
      description.textContent = item.dataset.description || 'A thoughtfully designed celebration, shaped around the people at its heart.';
      modal.showModal();
    });
  });
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    if (event.target === modal) modal.close();
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    const email = data.get('email');
    const type = data.get('event');
    const date = data.get('date') || 'Flexible';
    const message = data.get('message');
    const subject = encodeURIComponent(`Event enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nEvent: ${type}\nPreferred date: ${date}\n\n${message}`);
    const status = contactForm.querySelector('.form-status');
    status.textContent = 'Opening your email app…';
    window.location.href = `mailto:hello@everprior.com?subject=${subject}&body=${body}`;
  });
}
