const menu = document.querySelector(".menu"); //Nav tag
const menuMain = menu.querySelector(".menu-main"); //ul tag
const goBack = menu.querySelector(".go-back"); //mobile back
const menuTrigger = document.querySelector(".mobile-menu-trigger"); //header icon
const closeMenu = menu.querySelector(".mobile-menu-close"); // mobile close

let subMenu;
menuMain.addEventListener("click", (e) => {
  if (!menu.classList.contains("active")) {
    return;
  }
  if (e.target.closest(".menu-item-has-children")) {
    const hasChildren = e.target.closest(".menu-item-has-children");
    showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click", () => {
  hideSubMenu();
});
menuTrigger.addEventListener("click", () => {
  toggleMenu();
});
closeMenu.addEventListener("click", () => {
  toggleMenu();
});
document.querySelector(".menu-overlay").addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  menu.classList.toggle("active");
  document.querySelector(".menu-overlay").classList.toggle("active");
}

function showSubMenu(hasChildren) {
  subMenu = hasChildren.querySelector(".sub-menu");
  subMenu.classList.add("active");
  subMenu.style.animation = "slideLeft 0.5s ease forwards";
  const menuTitle =
    hasChildren.querySelector("svg").parentNode.childNodes[0].textContent;
  menu.querySelector(".current-menu-title").innerHTML = menuTitle;
  menu.querySelector(".mobile-menu-head").classList.add("active");
}

function hideSubMenu() {
  subMenu.style.animation = "slideRight 0.5s ease forwards";
  setTimeout(() => {
    subMenu.classList.remove("active");
  }, 300);
  menu.querySelector(".current-menu-title").innerHTML = "";
  menu.querySelector(".mobile-menu-head").classList.remove("active");
}

function closeLeftNav() {
  document.getElementById("sideMenuLeft").style.width = "0";
}

function openLeftNav() {
  document.getElementById("sideMenuLeft").style.width = "100%";
}
window.onresize = function () {
  if (this.innerWidth > 991) {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  }
};

$(document).ready(function () {
  $(".header_country_list > ul .header_country_label").on(
    "mouseenter",
    function (event) {
      $(".header_country_list > ul .header_country_label").removeClass(
        "active"
      );
      $(this).addClass("active");
    }
  );

  $(".header_country_label").click(function () {
    $(".header_country_label").removeClass("responsive_drpdwn_cls");
    $(this).addClass("responsive_drpdwn_cls");
  });
});
