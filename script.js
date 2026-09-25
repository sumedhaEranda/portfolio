/*
 * Sumeadha Eranda Portfolio
 * Navigation, responsive sidebar, theme toggle,
 * active section, animations and 3D hero computer.
 */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const themeToggle = document.getElementById("themeToggle");
    const sideNavLinks = document.querySelectorAll(".side-nav a");
    const mobileBrand = document.querySelector(".mobile-brand");



    /* =====================================================
       RESPONSIVE SIDEBAR
       ===================================================== */

    function isMobile() {
        return window.matchMedia("(max-width: 760px)").matches;
    }

    function openMobileMenu() {
        if (!sidebar || !isMobile()) {
            return;
        }

        sidebar.classList.add("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("visible");
            sidebarOverlay.setAttribute("aria-hidden", "false");
        }

        document.body.classList.add("menu-open");

        if (mobileMenuButton) {
            mobileMenuButton.setAttribute("aria-expanded", "true");
            mobileMenuButton.setAttribute("aria-label", "Close menu");
            mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
        }
    }

    function closeMobileMenu() {
        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("visible");
            sidebarOverlay.setAttribute("aria-hidden", "true");
        }

        document.body.classList.remove("menu-open");

        if (mobileMenuButton) {
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.setAttribute("aria-label", "Open menu");
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }

    function toggleMobileMenu() {
        if (!isMobile()) {
            return;
        }

        if (sidebar && sidebar.classList.contains("mobile-open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener("click", (event) => {
            event.preventDefault();
            closeMobileMenu();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeMobileMenu);
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    function scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (!target) return;

        const headerOffset = isMobile() ? 58 : 20;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
        });
    }

    sideNavLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            if (isMobile()) {
                closeMobileMenu();
            }

            const headerOffset = isMobile() ? 70 : 20;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: "smooth"
            });
        });
    });

    /* =====================================================
       SIDEBAR BRAND
       ===================================================== */

    if (mobileBrand) {
        mobileBrand.addEventListener("click", (event) => {
            const href = mobileBrand.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            event.preventDefault();
            if (isMobile()) {
                closeMobileMenu();
            }

            if (history.pushState) {
                history.pushState(null, "", href);
            }

            scrollToSection(href);
        });
    }

    /* =====================================================
       VIEWPORT CHANGE
       ===================================================== */

    const mediaQuery = window.matchMedia("(max-width: 760px)");

    function handleViewportChange() {
        if (!mediaQuery.matches) {
            closeMobileMenu();
        }
    }

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleViewportChange);
    } else {
        mediaQuery.addListener(handleViewportChange);
    }

    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            
            const galleryModal = document.getElementById("galleryModal");
            if (galleryModal && galleryModal.classList.contains("show")) {
                if (typeof window.closeGallery === "function") {
                    window.closeGallery();
                }
            }
        }
    });

    /* =====================================================
       THEME TOGGLE
       ===================================================== */

    function applyTheme(theme) {
        const dark = theme === "dark";
        document.body.classList.toggle("dark", dark);

        if (themeToggle) {
            themeToggle.innerHTML = dark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute(
                "aria-label",
                dark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    const savedTheme = localStorage.getItem("portfolio-theme");
    applyTheme(savedTheme === "light" ? "light" : "dark");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("portfolio-theme", nextTheme);
        });
    }

    /* =====================================================
       ACTIVE SIDEBAR SECTION
       ===================================================== */

    const sections = Array.from(document.querySelectorAll("section[id]"));

    function updateActiveNav() {
        if (!sections.length) return;

        const marker = window.scrollY + (isMobile() ? 130 : 180);
        let currentId = sections[0].id;

        for (const section of sections) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (marker >= top && marker < bottom) {
                currentId = section.id;
                break;
            }
            if (marker >= top) {
                currentId = section.id;
            }
        }

        if (window.scrollY < 120) {
            currentId = "home";
        }

        sideNavLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", active);
            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("load", updateActiveNav);
    updateActiveNav();

    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        document.querySelectorAll(
            [
                ".project-card-large",
                ".skill-category",
                ".education-item",
                ".achievement-item"
            ].join(",")
        ).forEach((element) => {
            observer.observe(element);
        });
    }

    /* =====================================================
       3D HERO COMPUTER
       ===================================================== */

    const computer = document.querySelector(".computer-3d");
    const computerImage = document.querySelector(".computer-image");

    if (computer && computerImage) {
        computer.addEventListener("mousemove", (event) => {
            if (isMobile()) return;

            const rect = computer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 8;

            computerImage.style.transform = `
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
            `;
        });

        computer.addEventListener("mouseleave", () => {
            computerImage.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        });

        let ticking = false;

        window.addEventListener("scroll", () => {
            if (isMobile() || ticking) return;
            
            ticking = true;
            requestAnimationFrame(() => {
                const scroll = window.scrollY;
                const movement = Math.min(scroll * 0.04, 18);
                computer.style.setProperty("--computer-scroll", `${movement}px`);
                ticking = false;
            });
        }, { passive: true });
    }

    /* =====================================================
       INITIAL STATE
       ===================================================== */

    document.body.classList.remove("menu-open");

    if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "false");
    }

    console.log("Sumeadha Portfolio: script loaded successfully.");
});