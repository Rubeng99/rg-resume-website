/* ==========================================================================
   Site behaviour: mobile menu, header sizing, small page bits.
   Loaded with `defer`, so the DOM is ready by the time this runs.
   ========================================================================== */

(function () {
    "use strict";

    /* ----------------------------------------------------------------------
       1. Keep --header-h equal to the header's real height.

       The header is position:fixed, so the page needs top padding to sit
       below it. A hard-coded 125px breaks as soon as the nav wraps onto a
       second line or the user bumps up their font size. Measuring it means
       the gap is always right, on any screen.
       ---------------------------------------------------------------------- */
    var header = document.querySelector("header");

    function syncHeaderHeight() {
        if (!header) return;
        document.documentElement.style.setProperty(
            "--header-h",
            header.offsetHeight + "px"
        );
    }

    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    window.addEventListener("orientationchange", syncHeaderHeight);
    window.addEventListener("load", syncHeaderHeight); // after webfonts land

    if (typeof ResizeObserver === "function" && header) {
        new ResizeObserver(syncHeaderHeight).observe(header);
    }

    /* ----------------------------------------------------------------------
       2. Mobile menu.

       Toggles a class rather than an inline style. Inline display:block used
       to survive a rotate or resize and leave the menu stuck open (or stuck
       closed) on desktop; a class plus a media query cannot do that.
       ---------------------------------------------------------------------- */
    var links = document.getElementById("myLinks");
    // Falls back to the old <a class="icon"> markup on pages not yet updated.
    var toggle =
        document.querySelector(".nav-toggle") ||
        document.querySelector(".topnav .icon");

    var MOBILE = window.matchMedia("(max-width: 640px)");

    function setMenu(open) {
        if (!links) return;
        links.classList.toggle("is-open", open);
        if (toggle) toggle.setAttribute("aria-expanded", String(open));
        syncHeaderHeight();
    }

    function isOpen() {
        return !!links && links.classList.contains("is-open");
    }

    if (toggle && links) {
        // Clear any leftover inline display from the old script.
        links.style.display = "";

        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            setMenu(!isOpen());
        });

        // Escape closes the menu and returns focus to the button.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && isOpen()) {
                setMenu(false);
                toggle.focus();
            }
        });

        // Tapping a link or anywhere outside closes it.
        links.addEventListener("click", function (event) {
            if (event.target.closest("a")) setMenu(false);
        });

        document.addEventListener("click", function (event) {
            if (!isOpen()) return;
            if (!links.contains(event.target) && !toggle.contains(event.target)) {
                setMenu(false);
            }
        });

        // Rotating to a wide screen resets to the desktop layout.
        var onBreakpoint = function (event) {
            if (!event.matches) setMenu(false);
        };
        if (typeof MOBILE.addEventListener === "function") {
            MOBILE.addEventListener("change", onBreakpoint);
        } else if (typeof MOBILE.addListener === "function") {
            MOBILE.addListener(onBreakpoint); // older iOS Safari
        }
    }

    // Kept so any inline onclick="mainFunction()" left on other pages still works.
    window.mainFunction = function () {
        setMenu(!isOpen());
    };

    /* ----------------------------------------------------------------------
       3. "Click me" button in the JavaScript skill entry.
       ---------------------------------------------------------------------- */
    var styleButton = document.getElementById("style-button");
    if (styleButton) {
        styleButton.addEventListener("click", function () {
            styleButton.textContent = "Thank you";
            styleButton.setAttribute("aria-disabled", "true");
        });
    }

    /* ----------------------------------------------------------------------
       4. Footer metadata.

       The old script looked for getElementById('footer'), which does not
       exist on this page, so it threw and stopped. This checks first.
       ---------------------------------------------------------------------- */
    var pageMeta = document.getElementById("page-meta");
    if (pageMeta && document.lastModified) {
        pageMeta.textContent = "This page last modified " + document.lastModified;
    }
})();
