setTimeout(() => {


  let carousel01 = document.querySelector(".carousel01"),
    firstImg1 = carousel01?.querySelectorAll(".card_slider_inr01")[0],
    arrowIcons1 = document.querySelectorAll(".card_slider_row01 i");

  let isdragStart1 = false,
    isdragging1 = false,
    prevPageX1,
    prevScrollLeft1,
    positionDiff1;

  let showHideIcons1 = () => {
    let scrollWidth = carousel01.scrollWidth - carousel01.clientWidth;
    if (arrowIcons1[0] || arrowIcons1[1]) {
      arrowIcons1[0].style.display = carousel01.scrollLeft == 0 ? "none" : "block";
      arrowIcons1[1].style.display =
        carousel01.scrollLeft == scrollWidth ? "none" : "block";
    }
  };

  arrowIcons1.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg1.clientWidth;
      carousel01.scrollLeft +=
        icon.id == "leftt" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons1(), 60);
    });
  });

  let autoSlide1 = () => {
    if (
      carousel01.scrollLeft -
      (carousel01.scrollWidth - carousel01.clientWidth) >
      -1 ||
      carousel01.scrollLeft <= 0
    )
      return;

    positionDiff1 = Math.abs(positionDiff1);
    let firstImgWidth = firstImg1.clientWidth;

    let valDifference = firstImgWidth - positionDiff1;

    if (carousel01.scrollLeft > prevScrollLeft1) {
      return (carousel01.scrollLeft +=
        positionDiff1 > firstImgWidth / 3 ? valDifference : -positionDiff1);
    }

    carousel01.scrollLeft -=
      positionDiff1 > firstImgWidth / 3 ? valDifference : -positionDiff1;
  };

  let dragStart1 = (e) => {
    isdragStart1 = true;
    prevPageX1 = e.pageX || e.touches[0].pageX;
    prevScrollLeft1 = carousel01.scrollLeft;
  };

  let dragging1 = (e) => {
    if (!isdragStart1) return;
    e.preventDefault();
    isdragging1 = true;
    carousel01.classList.add("dragging");
    positionDiff1 = (e.pageX || e.touches[0].pageX) - prevPageX1;
    carousel01.scrollLeft = prevScrollLeft1 - positionDiff1;
    showHideIcons1();
  };

  let dragStop1 = () => {
    if (carousel01?.classList) {
      isdragStart1 = false;
      carousel01.classList?.remove("dragging");

      if (!isdragging1) return;
      isdragging1 = false;
      autoSlide1();
    }
  };

  carousel01?.addEventListener("mousedown", dragStart1);
  carousel01?.addEventListener("touchstart", dragStart1);

  document.addEventListener("mousemove", dragging1);
  carousel01?.addEventListener("touchmove", dragging1);

  document.addEventListener("mouseup", dragStop1);
  carousel01?.addEventListener("touchend", dragStop1);
}, 1000);

