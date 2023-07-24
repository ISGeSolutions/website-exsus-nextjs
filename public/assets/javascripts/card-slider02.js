let carousel01 = document.querySelector(".carousel01"),
        firstImg = carousel01.querySelectorAll(".card_slider_inr")[0],
        arrowIcons = document.querySelectorAll(".card_slider_row i");

        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

        let showHideIcons = () => {
            let scrollWidth = carousel01.scrollWidth - carousel01.clientWidth;
            arrowIcons[0].style.display = carousel01.scrollLeft == 0 ? "none" : "block";
            arrowIcons[1].style.display = carousel01.scrollLeft == scrollWidth ? "none" : "block";
        }

        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth;
                carousel01.scrollLeft += icon.id == "leftt" ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(), 60); 
            });
        });

        let autoSlide = () => {
            
            if(carousel01.scrollLeft - (carousel01.scrollWidth - carousel01.clientWidth) > -1 || carousel01.scrollLeft <= 0) return;

            positionDiff = Math.abs(positionDiff); 
            let firstImgWidth = firstImg.clientWidth;
        
            let valDifference = firstImgWidth - positionDiff;

            if(carousel01.scrollLeft > prevScrollLeft) { 
                return carousel01.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
        
            carousel01.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }

        let dragStart = (e) => {
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel01.scrollLeft;
        }

        let dragging = (e) => {
            if(!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel01.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel01.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        }

        let dragStop = () => {
            isDragStart = false;
            carousel01.classList.remove("dragging");

            if(!isDragging) return;
            isDragging = false;
            autoSlide();
        }

        carousel01.addEventListener("mousedown", dragStart);
        carousel01.addEventListener("touchstart", dragStart);

        document.addEventListener("mousemove", dragging);
        carousel01.addEventListener("touchmove", dragging);

        document.addEventListener("mouseup", dragStop);
        carousel01.addEventListener("touchend", dragStop);

