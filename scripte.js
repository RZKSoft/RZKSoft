document.addEventListener("DOMContentLoaded", () => {
  const switchLangBtn = document.getElementById("switch-lang");
  const languageMenu = document.getElementById("language-menu");
  const languageImage = document.querySelector("[data-translate='languageImage']");
  const languageTitle = document.querySelector("[data-translate='languageTitle']");

  // Показати/сховати меню мов
  switchLangBtn.addEventListener("click", () => {
    languageMenu.classList.toggle("show");
  });

  // Функція перекладу
  function applyTranslations(data) {
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (data[key]) {
        if (el.tagName === "IMG") {
          el.src = data[key];
        } else {
          el.innerHTML = data[key]; // використовуємо innerHTML для HTML-тексту
        }
      }
    });
  }



  // Завантажити мову
  function loadLanguage(lang) {
    fetch(`./lang/${lang}.json`)
      .then(response => {
        if (!response.ok) throw new Error("Language file not found");
        return response.json();
      })
      .then(data => {
        applyTranslations(data);
        localStorage.setItem("selectedLang", lang);
        languageMenu.classList.remove("show");
      })
      .catch(error => {
        console.error("Language load error:", error);
      });
  }

  // Обробка вибору мови
  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", () => {
      const selectedLang = option.getAttribute("data-lang");
      loadLanguage(selectedLang);
    });
  });

  // Завантажити мову з localStorage при старті
  const savedLang = localStorage.getItem("selectedLang") || "en";
  loadLanguage(savedLang);




    const menuIcon = document.getElementById('menuIcon');
    const sidePanel = document.getElementById('sidePanel');
    let isOpen = false;

    menuIcon.addEventListener('click', () => {
        isOpen = !isOpen;
        menuIcon.src = isOpen ? './images/close.png' : './images/menu.png';
        sidePanel.classList.toggle('show');
        menuIcon.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    });





  
});

