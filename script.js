let isArabic = false;
const toggleBtn = document.getElementById("langToggle");
const elements = document.querySelectorAll("[data-en]");

toggleBtn.addEventListener("click", () => {
  isArabic = !isArabic;
  document.body.style.direction = isArabic ? "rtl" : "ltr";
  toggleBtn.textContent = isArabic ? "English" : "العربية";
  elements.forEach(el => {
    el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
  });
});
