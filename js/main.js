(function () {
    var header = document.querySelector('.homepage #header');
    var body = document.querySelector('body');
    if (header) {
        header.style.height = window.innerHeight + 'px';
        header.style.paddingTop = (window.innerHeight / 3) + 'px';
        setTimeout(function () {
            document.body.classList.add('init');
        }, 100);
        if (Modernizr.touch) {
            document.querySelector('.carousel').style.overflow = "auto";
            document.querySelector('.carousel .forward').style.display = "none";
            document.querySelector('.carousel .backward').style.display = "none";
        }
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
                setTimeout(animateScroll, increment);
            }
        };
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
