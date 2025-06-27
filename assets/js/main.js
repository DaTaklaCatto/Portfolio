gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin, TextPlugin, CustomEase);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.set(".nav", { display: "none" });

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
  ease: "main",
  duration: 0.7,
});

function initMenu() {
  let navWrap = document.querySelector(".nav");
  let state = navWrap.getAttribute("data-nav");
  let overlay = navWrap.querySelector(".overlay");
  let menu = navWrap.querySelector(".menu");
  let bgPanels = navWrap.querySelectorAll(".bg-panel");
  let menuToggles = document.querySelectorAll("[data-menu-toggle]");
  let menuLinks = navWrap.querySelectorAll(".menu-link");
  let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]");
  let menuButton = document.querySelector(".menu-button");
  let menuButtonTexts = menuButton.querySelectorAll("p");
  let menuButtonIcon = menuButton.querySelector(".menu-button-icon");
  let navLogo = document.querySelector(".nav-logo");
  let tl = gsap.timeline();

  const openNav = () => {
    navWrap.setAttribute("data-nav", "open");

    tl.clear()
      .set(navWrap, { display: "block" })
      .set(menu, { xPercent: 0 }, "<")
      .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
      .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
      .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
      .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
      .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
  };

  const closeNav = () => {
    navWrap.setAttribute("data-nav", "closed");

    tl.clear()
      .to(overlay, { autoAlpha: 0 })
      .to(menu, { xPercent: 120 }, "<")
      .to(menuButtonTexts, { yPercent: 0 }, "<")
      .to(menuButtonIcon, { rotate: 0 }, "<")
      .set(navWrap, { display: "none" });
  };

  // Toggle menu open / close depending on its current state
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      state = navWrap.getAttribute("data-nav");
      if (state === "open") {
        closeNav();
      } else {
        openNav();
      }
    });
  });

  // If menu is open, you can close it using the "escape" key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
      closeNav();
    }
  });
}

function initScrollTrigger() {
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "90% top",
    onEnter: () => {
      gsap.to(".nav-logo", { color: "black", fill: "black" });
    },
    onLeaveBack: () => {
      gsap.to(".nav-logo", { color: "white", fill: "white" });
    },
  });

  gsap.to(".logo-path", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "90% top",
      scrub: true,
      onUpdate: (self) => {
        if (self.progress >= 0.9) {
          gsap.to(".logo-path", {
            fill: "#000000", // Change to whatever color you want
            duration: 0.3,
          });
        } else {
          gsap.to(".logo-path", {
            fill: "#FAFAFA",
            duration: 0.3,
          });
        }
      },
    },
  });

  gsap.to([".menu-text", ".close-text", ".menu-stroke"], {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "90% top",
      scrub: true,
      onUpdate: (self) => {
        if (self.progress >= 0.9) {
          gsap.to(".menu-text, .close-text", {
            color: "#000000",
            duration: 0.3,
          });
          gsap.to(".menu-stroke", {
            stroke: "#000000",
            duration: 0.3,
          });
        } else {
          gsap.to(".menu-text, .close-text", {
            color: "#FAFAFA",
            duration: 0.3,
          });
          gsap.to(".menu-stroke", {
            stroke: "#FAFAFA",
            duration: 0.3,
          });
        }
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    let now = new Date(new Date().getTime() + 6 * 3600000);
    let h = now.getUTCHours() % 12 || 12;
    let m = now.getUTCMinutes().toString().padStart(2, "0");
    let ampm = now.getUTCHours() >= 12 ? "PM" : "AM";
    document.getElementById("clock").innerText = `${h}:${m} ${ampm}`;
  }, 1000);
  initMenu();
  initScrollTrigger();
});
