/* =========================================
   REFORMIA BG — Main JS
   ========================================= */

(function () {

  /* ── Navbar scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.navbar__mobile a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .navbar__mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hrefFile = href.split('/').pop();
    if (hrefFile === currentPath) a.classList.add('active');
    if (currentPath === '' && href.includes('index')) a.classList.add('active');
  });

  /* ── Product image gallery ── */
  const mainImg = document.querySelector('.product-gallery__main img');
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  if (mainImg && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 180);
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
    if (thumbs[0]) thumbs[0].classList.add('active');
  }

  /* ── Color swatches ── */
  const swatches = document.querySelectorAll('.swatch');
  const swatchLabel = document.querySelector('.swatch-selected');
  const mainImgEl = document.querySelector('.product-gallery__main img');
  if (swatches.length) {
    swatches.forEach(sw => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('active'));
        sw.classList.add('active');
        if (swatchLabel) swatchLabel.textContent = sw.dataset.name;
        if (mainImgEl && sw.dataset.img) {
          mainImgEl.style.opacity = '0';
          setTimeout(() => {
            mainImgEl.src = sw.dataset.img;
            mainImgEl.style.opacity = '1';
          }, 180);
          /* also highlight matching thumbnail */
          const matchThumb = document.querySelector(`.product-gallery__thumb[data-src="${sw.dataset.img}"]`);
          if (matchThumb) {
            document.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
            matchThumb.classList.add('active');
          }
        }
      });
    });
    swatches[0].classList.add('active');
    if (swatchLabel) swatchLabel.textContent = swatches[0].dataset.name;
  }

  /* ── Filter tabs (products page) ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-item');
  if (filterTabs.length && productCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Contact form ── */
  const form = document.querySelector('.inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const phone = data.get('phone') || '';
      const email = data.get('email') || '';
      const product = data.get('product') || '';
      const color = data.get('color') || '';
      const message = data.get('message') || '';

      const subject = encodeURIComponent(`Запитване от ${name} — ${product}`);
      const body = encodeURIComponent(
        `Запитване за: ${product}\n` +
        `Цвят: ${color}\n\n` +
        `Клиент: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Имейл: ${email}\n\n` +
        `Съобщение:\n${message}`
      );
      window.location.href = `mailto:support@thereformia.com?subject=${subject}&body=${body}`;
      showToast('Запитването е подготвено', 'Вашият имейл клиент ще се отвори автоматично.');
    });
  }

  /* Pre-fill product from URL param */
  const urlParams = new URLSearchParams(window.location.search);
  const preProduct = urlParams.get('product');
  const productSelect = document.querySelector('select[name="product"]');
  if (preProduct && productSelect) {
    const options = productSelect.querySelectorAll('option');
    options.forEach(opt => {
      if (opt.value.includes(preProduct) || opt.text.includes(preProduct)) {
        opt.selected = true;
      }
    });
  }

  /* ── Toast helper ── */
  function showToast(title, text) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.innerHTML = `<strong>${title}</strong>${text}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

})();
