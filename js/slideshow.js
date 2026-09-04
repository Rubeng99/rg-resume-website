/* ==========================================================================
   Slideshow for projects.html.

   The old version threw a TypeError on page load: the dot elements were
   commented out in the HTML, so `dots[slideIndex - 1].className` read a
   property off `undefined` and the script died before the first slide was
   ever shown. This version checks what actually exists on the page.
   ========================================================================== */

(function () {
    "use strict";

    var root = document.getElementById("slideshow");
    if (!root) return;

    var slides = Array.prototype.slice.call(root.querySelectorAll(".mySlides"));
    if (!slides.length) return;

    var dots = Array.prototype.slice.call(document.querySelectorAll(".dot"));
    var index = 0;

    function show(next) {
        // Wrap around at both ends.
        index = (next + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            var active = i === index;
            slide.classList.toggle("is-active", active);
            // Hide inactive slides from assistive tech as well as from view.
            slide.hidden = !active;
        });

        dots.forEach(function (dot, i) {
            var active = i === index;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-pressed", String(active));
        });
    }

    root.addEventListener("click", function (event) {
        var control = event.target.closest("[data-step]");
        if (!control) return;
        show(index + Number(control.dataset.step));
    });

    document.addEventListener("click", function (event) {
        var dot = event.target.closest(".dot[data-slide]");
        if (!dot) return;
        show(Number(dot.dataset.slide) - 1);
    });

    // Left/right arrow keys move through the slides once a control has focus.
    root.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            show(index - 1);
        } else if (event.key === "ArrowRight") {
            show(index + 1);
        } else {
            return;
        }
        event.preventDefault();
    });

    /* Swipe, for phones. Only counts as a swipe if the gesture is mostly
       horizontal, so it does not hijack vertical page scrolling. */
    var startX = 0;
    var startY = 0;

    root.addEventListener("touchstart", function (event) {
        startX = event.changedTouches[0].clientX;
        startY = event.changedTouches[0].clientY;
    }, { passive: true });

    root.addEventListener("touchend", function (event) {
        var dx = event.changedTouches[0].clientX - startX;
        var dy = event.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            show(index + (dx < 0 ? 1 : -1));
        }
    }, { passive: true });

    show(0);
})();
