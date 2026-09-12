const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuButton.querySelector("i");

    if (navLinks.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close menu after navigation */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* Active navigation */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


/* Gallery lightbox */
const closeAllLightboxes = () => {
    document.querySelectorAll(".lightbox").forEach(lightbox => lightbox.remove());
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
};

const openLightbox = image => {
    closeAllLightboxes();

    const overlay = document.createElement("div");
    overlay.className = "lightbox";

    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close image view">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <img
            src="${image.src}"
            alt="${image.alt}"
        >
    `;

    document.body.appendChild(overlay);
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");

    const close = () => {
        overlay.remove();

        if (!document.querySelector(".lightbox")) {
            document.body.classList.remove("modal-open");
            document.documentElement.classList.remove("modal-open");
        }
    };

    overlay.querySelector(".lightbox-close").addEventListener("click", close);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            close();
        }
    });
};

document.querySelectorAll(".gallery-item img").forEach(image => {
    image.addEventListener("click", () => {
        openLightbox(image);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAllLightboxes();
    }
});