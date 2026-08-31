/* =========================================
   KRYSTAL ANGELI PORTFOLIO
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

    const isOpen =
        navLinks.classList.contains("mobile-open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuButton.textContent =
        isOpen ? "✕" : "☰";
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.textContent = "☰";

    });

});

/* =========================================
   K LOGO INTRO
   ========================================= */

window.addEventListener("load", () => {
    const intro = document.getElementById("intro-loader");

    // Keep intro visible for 3 seconds
    setTimeout(() => {
        intro.classList.add("hide");

        // Allow normal scrolling again
        document.body.classList.remove("intro-active");

    }, 3000);
});

/* =========================================
   PAGE NAVIGATION TRANSITION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const transition = document.getElementById("page-transition");
    const transitionNumber =
        document.querySelector(".transition-number");

    const transitionName =
        document.querySelector(".transition-name");


    /* -----------------------------------------
       ALL NAVIGATION LINKS
       ----------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            // Ignore empty links
            if (!href || href === "#") {
                return;
            }

            // Find the destination section
            const target = document.querySelector(href);

            // If there is no matching section, ignore the link
            if (!target) {
                return;
            }

            event.preventDefault();


            /* -----------------------------------------
               GET NAVIGATION NAME
               ----------------------------------------- */

            let name = this.textContent.trim();

            if (!name) {
                name = "NEXT";
            }

            name = name.toUpperCase();


            /* -----------------------------------------
               UPDATE TRANSITION TEXT
               ----------------------------------------- */

            transitionName.textContent = name;


            /* -----------------------------------------
               RESET EVERYTHING
               ----------------------------------------- */

            transition.classList.remove(
                "is-entering",
                "is-leaving"
            );

            /*
               IMPORTANT:
               Reset the inline visibility from
               previous animations.
            */

            transition.style.visibility = "";


            /*
               Force browser to reset the animation.
            */

            void transition.offsetWidth;


            /* -----------------------------------------
               START TRANSITION
               ----------------------------------------- */

            transition.classList.add("is-entering");


            /* -----------------------------------------
               MOVE TO NEW SECTION
               ----------------------------------------- */

            setTimeout(() => {

                target.scrollIntoView({
                    behavior: "instant",
                    block: "start"
                });

            }, 550);


            /* -----------------------------------------
               REVEAL NEW SECTION
               ----------------------------------------- */

            setTimeout(() => {

                transition.classList.remove(
                    "is-entering"
                );

                transition.classList.add(
                    "is-leaving"
                );

            }, 700);


            /* -----------------------------------------
               CLEAN UP
               ----------------------------------------- */

            setTimeout(() => {

                transition.classList.remove(
                    "is-leaving"
                );

                /*
                   DO NOT set visibility:hidden here.
                   CSS handles it.
                */

                transition.style.visibility = "";

            }, 1500);

        });

    });

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a:not(.nav-button)"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.style.opacity = "0.65";

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.style.opacity = "1";

        }

    });

});


/* =========================================
   SUBTLE HERO PARALLAX
========================================= */

const heroArt =
    document.querySelector(".hero-art");


window.addEventListener("scroll", () => {

    if (!heroArt) return;

    const scroll =
        window.scrollY;

    if (scroll < window.innerHeight) {

        heroArt.style.transform =
            `translateY(${scroll * 0.08}px)`;

    }

});


/* =========================================
   BUTTON HOVER EFFECT
========================================= */

const primaryButtons =
    document.querySelectorAll(
        ".primary-button"
    );


primaryButtons.forEach(button => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-4px)";

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================
   PAGE LOADED
========================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);

/* =========================================
   EXPANDABLE EXPERIENCE CARDS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const experienceCards =
        document.querySelectorAll(".experience-card");


    experienceCards.forEach(card => {

        const button =
            card.querySelector(".experience-toggle");

        if (!button) return;


        button.addEventListener("click", (event) => {

            /*
               Prevent the click from triggering
               anything else on the card.
            */

            event.stopPropagation();


            const isOpen =
                card.classList.contains("is-open");


            /* -----------------------------------------
               CLOSE OTHER CARDS
               ----------------------------------------- */

            experienceCards.forEach(otherCard => {

                if (otherCard !== card) {

                    otherCard.classList.remove(
                        "is-open"
                    );

                    const otherButton =
                        otherCard.querySelector(
                            ".experience-toggle span:first-child"
                        );

                    if (otherButton) {
                        otherButton.textContent =
                            "VIEW DETAILS";
                    }

                }

            });


            /* -----------------------------------------
               TOGGLE CURRENT CARD
               ----------------------------------------- */

            card.classList.toggle(
                "is-open",
                !isOpen
            );


            /* Change button text */

            const buttonText =
                button.querySelector("span:first-child");


            if (!isOpen) {

                buttonText.textContent =
                    "CLOSE DETAILS";

            } else {

                buttonText.textContent =
                    "VIEW DETAILS";

            }

        });

    });

});
