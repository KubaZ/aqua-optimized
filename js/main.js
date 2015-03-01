// homepage
(function () {
    var header = document.querySelector('.homepage #header');
    var body = document.querySelector('body');
    if (header) {
        header.style.height = window.innerHeight + 'px';
        header.style.paddingTop = (window.innerHeight / 3) + 'px';
        setTimeout(function () {
            document.body.classList.add('init');
        }, 100);
        var isPortrait = window.matchMedia("(orientation: portrait)").matches;
        window.addEventListener('resize', function () {
            var newOrientation = window.matchMedia("(orientation: portrait)").matches;
            if (isPortrait !== newOrientation) {
                header.style.height = window.innerHeight + 'px';
                isPortrait = newOrientation;
            }
        }, false);
    }

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(animateScroll);
                    return;
                }
                setTimeout(animateScroll, increment);
            }
        };
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(animateScroll);
            return;
        }
        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    function handleScrollyButton (event) {
        event.preventDefault();
        var refElement = document.getElementById(event.target.getAttribute('href').replace('#', ''));
        scrollTo(body, body.scrollTop + refElement.getBoundingClientRect().top, 600);
    }

    scrollButtons = document.querySelectorAll('a.scrolly');
    for (var i = 0; i < scrollButtons.length; i++) {
        scrollButtons[i].addEventListener('click', handleScrollyButton, false);
    }
})();
// lazy images
(function () {
    var lazyImages = document.querySelectorAll('[data-lazy]');
    for (var i = 0; i < lazyImages.length; i++) {
        lazyImages[i].src = lazyImages[i].getAttribute('data-lazy');
    }
    function toggleNav () {
        header.classList.toggle('nav-open');
    }
    document.getElementById('navButton').addEventListener('click', toggleNav, false);
})();
// carousel
(function () {
    var carouselContainer = document.querySelector('.carousel');
    if (!carouselContainer) {
        return;
    }
    if (Modernizr.touch) {
        carouselContainer.style.overflow = "auto";
        carouselContainer.querySelector('.forward').style.display = "none";
        carouselContainer.querySelector('.backward').style.display = "none";
        return;
    }
    var reel = carouselContainer.querySelector('.reel'),
        currentPosition = 0,
        reelWidth,
        windowWidth;

    function moveBackward () {
        currentPosition = currentPosition + windowWidth;
        if (currentPosition > 0) {
            currentPosition = 0;
        }
        reel.style.left = currentPosition + "px";
    }

    function moveForward () {
        currentPosition = currentPosition - windowWidth;
        if (currentPosition < -reelWidth + windowWidth) {
            currentPosition = -reelWidth + windowWidth;
        }
        reel.style.left = currentPosition + "px";
    }

    function recalculateVariables () {
        reelWidth = reel.scrollWidth + parseInt(carouselContainer.getAttribute('data-offset'));
        windowWidth = window.innerWidth;
    }

    recalculateVariables();
    moveBackward();
    carouselContainer.addEventListener('moveForward', moveForward, false);
    carouselContainer.addEventListener('moveBackward', moveBackward, false);
    carouselContainer.querySelector('.forward').addEventListener('click', function (event) {
        event.preventDefault();
        var forwardEvent = new Event('moveForward');
        carouselContainer.dispatchEvent(forwardEvent);
    }, false);
    carouselContainer.querySelector('.backward').addEventListener('click', function (event) {
        event.preventDefault();
        var backwardEvent = new Event('moveBackward');
        carouselContainer.dispatchEvent(backwardEvent);
    }, false);
    window.addEventListener('resize', recalculateVariables, false);
})();
