/* =========================================
   REFORMIA BG — Чат на живо (tawk.to)
   Зарежда се за всички посетители. Чатът е услуга,
   която посетителят сам избира да ползва, затова не
   го крием зад съгласието за реклами.

   Единственото изключение: докато лентата за бисквитки
   е още на екрана, балонът стои скрит, за да не покрива
   бутона „Приемам всички“. Показваме го веднага щом
   посетителят направи избор.
   ========================================= */

(function () {
  var SRC = 'https://embed.tawk.to/6a7567b34073c61d4e99adf4/1jvd9q5i5';
  var KEY = 'reformia_consent';   // същият ключ, който ползва consent.js

  // Има ли вече направен избор? Ако няма — лентата ще се покаже.
  var decided = false;
  try { decided = !!localStorage.getItem(KEY); } catch (e) { decided = true; }

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  if (!decided) {
    // Скриваме балона, докато лентата е на екрана.
    window.Tawk_API.onLoad = function () {
      try { window.Tawk_API.hideWidget(); } catch (e) {}
    };

    document.addEventListener('reformia:consent', function () {
      try { window.Tawk_API.showWidget(); } catch (e) {}
    });
  }

  var s = document.createElement('script');
  s.async = true;
  s.src = SRC;
  s.charset = 'UTF-8';
  s.setAttribute('crossorigin', '*');

  var first = document.getElementsByTagName('script')[0];
  if (first && first.parentNode) {
    first.parentNode.insertBefore(s, first);
  } else {
    document.head.appendChild(s);
  }
})();
