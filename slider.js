function slider({container, slide, nextArrow, prevArrow, totalCount, currentCounter, wrapper, field}) {
    // Slider

    const slides = document.querySelectorAll(slide),
         slider = document.querySelector(container),
         prev = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         total = document.querySelector(totalCount),
         current = document.querySelector(currentCounter),
         slidesWrapper = document.querySelector(wrapper),
         slidesField = document.querySelector(field),
         width = window.getComputedStyle(slidesWrapper).width;

    let slidIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slidIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slidIndex;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0 ) {
            dot.style.opacity = 1;

        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function zeroSlides(slides) {
        if (slides.length < 10) {
            current.textContent = `0${slidIndex}`;
         } else {
            current.textContent = slidIndex;
         }
    }

    function dotsSlides(dots) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slidIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (slidIndex == slides.length) {
            slidIndex = 1;
        } else {
            slidIndex++;
        }

     
         
        zeroSlides(slides);

        dotsSlides(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        
        if (slidIndex == 1) {
            slidIndex = slides.length;
        } else {
            slidIndex--;
        }

        zeroSlides(slides);
        dotsSlides(dots);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            zeroSlides(slides);

            dotsSlides(dots);

        });
     });

}

export default slider;