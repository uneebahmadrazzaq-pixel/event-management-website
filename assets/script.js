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

const photoLibrary = {
  wedding: [
    'https://images.unsplash.com/photo-1769230369743-0dfed883f998?auto=format&fit=crop&w=1800&q=82',
    'https://images.unsplash.com/photo-1632316962873-47ee3d309f02?auto=format&fit=crop&w=1800&q=82',
    'https://images.unsplash.com/photo-1768594266667-50aaa727ebf5?auto=format&fit=crop&w=1800&q=82'
  ],
  corporate: [
    'https://images.unsplash.com/photo-1754373695753-1069438691f8?auto=format&fit=crop&w=1800&q=82'
  ],
  party: [
    'https://images.unsplash.com/photo-1770806850642-5db99488cc75?auto=format&fit=crop&w=1800&q=82',
    'https://images.unsplash.com/photo-1755704282977-340323fa52df?auto=format&fit=crop&w=1800&q=82'
  ]
};

photoLibrary.all = [...photoLibrary.wedding, ...photoLibrary.corporate, ...photoLibrary.party];

const shuffle = items => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

const photoQueues = {};
document.querySelectorAll('img[data-random-image]').forEach((image, index) => {
  const poolName = image.dataset.photoPool || 'all';
  if (!photoQueues[poolName]?.length) photoQueues[poolName] = shuffle(photoLibrary[poolName] || photoLibrary.all);
  const nextPhoto = photoQueues[poolName].shift();
  image.style.opacity = '.25';
  image.addEventListener('load', () => { image.style.opacity = '1'; }, { once: true });
  image.src = nextPhoto;
  if (index > 1) image.loading = 'lazy';
});

const modal = document.querySelector('#gallery-modal');
if (modal) {
  const title = modal.querySelector('[data-modal-title]');
  const description = modal.querySelector('[data-modal-description]');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      title.textContent = item.dataset.label;
      description.textContent = item.dataset.description || 'A thoughtfully designed celebration, shaped around the people at its heart.';
      const selectedImage = item.querySelector('img');
      if (selectedImage) modal.querySelector('.modal-inner').style.backgroundImage = `linear-gradient(180deg, transparent 35%, rgba(7,18,22,.82)), url('${selectedImage.currentSrc || selectedImage.src}')`;
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
