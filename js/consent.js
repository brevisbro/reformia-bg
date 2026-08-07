/* =========================================
   REFORMIA BG — Съгласие за бисквитки
   Consent Mode v2. Отказът е по подразбиране и се задава
   в <head> на всяка страница, преди Google тагът да тръгне.
   Тук стои само лентата, с която посетителят сменя избора си.
   ========================================= */

(function () {
  var KEY = 'reformia_consent';   // 'all' | 'necessary'
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved) return;              // вече е избрал — не го питаме пак

  var CSS =
    '.cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:var(--bg-card,#fff);' +
    'border-top:1px solid var(--border-gold,rgba(166,124,58,.28));box-shadow:0 -4px 20px rgba(0,0,0,.08);' +
    'transform:translateY(100%);transition:transform .35s ease}' +
    '.cc.is-open{transform:translateY(0)}' +
    '.cc__in{max-width:var(--max-w,1280px);margin:0 auto;padding:20px 24px;display:flex;gap:24px;' +
    'align-items:center;justify-content:space-between;flex-wrap:wrap}' +
    '.cc__txt{flex:1 1 340px;font-family:var(--sans,system-ui,sans-serif);font-size:14px;line-height:1.65;' +
    'color:var(--text-soft,#2C2C28)}' +
    '.cc__txt a{color:var(--gold,#A67C3A);text-decoration:underline;text-underline-offset:2px}' +
    '.cc__btns{display:flex;gap:12px;flex-wrap:wrap}' +
    '.cc__b{font-family:var(--sans,system-ui,sans-serif);font-size:13px;letter-spacing:.04em;' +
    'text-transform:uppercase;padding:12px 24px;border-radius:var(--radius,2px);cursor:pointer;' +
    'transition:background .3s ease,color .3s ease;white-space:nowrap}' +
    '.cc__b--no{border:1px solid var(--border,#E6E2DA);background:none;color:var(--muted,#4E4E48)}' +
    '.cc__b--no:hover{border-color:var(--gold,#A67C3A);color:var(--gold,#A67C3A)}' +
    '.cc__b--yes{border:1px solid var(--gold,#A67C3A);background:var(--gold,#A67C3A);color:#fff}' +
    '.cc__b--yes:hover{background:var(--gold-dk,#7A5A20);border-color:var(--gold-dk,#7A5A20)}' +
    '@media(max-width:640px){.cc__in{padding:18px;gap:16px}.cc__btns{width:100%}.cc__b{flex:1}}';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'cc';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Съгласие за бисквитки');
  bar.innerHTML =
    '<div class="cc__in">' +
      '<p class="cc__txt">Използваме бисквитки, за да измерваме кои реклами водят до запитване. ' +
      'Без Вашето съгласие работят само необходимите за сайта. ' +
      '<a href="/policies/privacy">Политика за поверителност</a></p>' +
      '<div class="cc__btns">' +
        '<button class="cc__b cc__b--no" type="button">Само необходимите</button>' +
        '<button class="cc__b cc__b--yes" type="button">Приемам всички</button>' +
      '</div>' +
    '</div>';

  function choose(all) {
    try { localStorage.setItem(KEY, all ? 'all' : 'necessary'); } catch (e) {}
    if (typeof gtag === 'function') {
      var v = all ? 'granted' : 'denied';
      gtag('consent', 'update', {
        ad_storage: v,
        ad_user_data: v,
        ad_personalization: v,
        analytics_storage: v
      });
    }
    bar.classList.remove('is-open');
    setTimeout(function () { bar.remove(); }, 400);
    // Лентата си отива — чатът може да покаже балона си (js/chat.js).
    document.dispatchEvent(new CustomEvent('reformia:consent'));
  }

  bar.querySelector('.cc__b--no').addEventListener('click', function () { choose(false); });
  bar.querySelector('.cc__b--yes').addEventListener('click', function () { choose(true); });

  document.body.appendChild(bar);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { bar.classList.add('is-open'); });
  });
})();
