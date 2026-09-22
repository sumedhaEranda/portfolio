// =========================================================
// PROJECT GALLERIES DATA
// =========================================================

const projectGalleries = {
    co2: [
        "images/COMonitoringSystem/DataFlow.gif",
        "images/COMonitoringSystem/Picture1.png",
        "images/COMonitoringSystem/Picture2.png",
        "images/COMonitoringSystem/Picture3.png",
        "images/COMonitoringSystem/Picture4.png",
        "images/COMonitoringSystem/Picture5.png",
        "images/COMonitoringSystem/Picture6.png",
        "images/COMonitoringSystem/Picture7.png",
        "images/COMonitoringSystem/Picture8.png",
        "images/COMonitoringSystem/Picture9.jpg",
        "images/COMonitoringSystem/Picture10.jpg"
    ],
    ticketsys: [
        "images/OnlineSupportTicketSystem/Picture1.jpg",
        "images/OnlineSupportTicketSystem/Picture2.jpg",
        "images/OnlineSupportTicketSystem/Picture3.png",
        "images/OnlineSupportTicketSystem/Picture4.jpg",
        "images/OnlineSupportTicketSystem/Picture5.jpg",
        "images/OnlineSupportTicketSystem/Picture6.jpg",
        "images/OnlineSupportTicketSystem/Picture7.jpg",
        "images/OnlineSupportTicketSystem/Picture8.jpg",
        "images/OnlineSupportTicketSystem/Picture9.jpg",
        "images/OnlineSupportTicketSystem/Picture10.jpg"
    ],
    PosSystem: [
        "images/PosSystem/Picture1.png",
        "images/PosSystem/Picture2.png",
        "images/PosSystem/Picture3.png",
        "images/PosSystem/Picture4.png",
        "images/PosSystem/Picture5.jpg",
        "images/PosSystem/Picture6.png",
        "images/PosSystem/Picture7.png"
    ],
    flood: [
        "images/floodApp/Picture1.jpg",
        "images/floodApp/Picture2.jpg",
        "images/floodApp/Picture3.jpg",
        "images/floodApp/Picture4.jpg",
        "images/floodApp/Picture5.jpg"
    ]
};

// =========================================================
// GALLERY MODAL LOGIC (Global Scope Fix)
// =========================================================

let galleryImages = [];
let currentImageIndex = 0;

function openGallery(images, index) {
    if (!images || !images.length) return;
    
    galleryImages = images;
    currentImageIndex = index;
    
    const modal = document.getElementById("galleryModal");
    const image = document.getElementById("galleryImage");

    if (!modal || !image) return;

    modal.style.display = "flex";
    
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    image.src = galleryImages[currentImageIndex];
    image.style.opacity = "1";
    image.style.transform = "scale(1)";

    document.body.classList.add("gallery-open");
}

function changeImage(direction) {
    if (!galleryImages.length) return;

    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    const image = document.getElementById("galleryImage");
    if (!image) return;

    /* Fade Out */
    image.style.opacity = "0";
    image.style.transform = "scale(0.95)";

    setTimeout(() => {
        image.src = galleryImages[currentImageIndex];
        
        /* Fade In */
        image.style.opacity = "1";
        image.style.transform = "scale(1)";
    }, 180);
}

function closeGallery() {
    const modal = document.getElementById("galleryModal");
    if (!modal) return;

    modal.classList.remove("show");
    document.body.classList.remove("gallery-open");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Make functions available globally for HTML inline onclick
window.openGallery = openGallery;
window.changeImage = changeImage;
window.closeGallery = closeGallery;

// Close when clicking outside image
window.addEventListener("click", function (event) {
    const modal = document.getElementById("galleryModal");
    if (modal && event.target === modal) {
        closeGallery();
    }
});

// Keyboard navigation
document.addEventListener("keydown", function (event) {
    const modal = document.getElementById("galleryModal");
    if (!modal || modal.style.display !== "flex") return;

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        changeImage(-1);
    }
    if (event.key === "ArrowRight") {
        event.preventDefault();
        changeImage(1);
    }
    if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
    }
});

// =========================================================
// CREATE GALLERY
// =========================================================

function createGallery(elementId, images) {
    const container = document.getElementById(elementId);

    if (!container || !Array.isArray(images) || images.length === 0) {
        return;
    }

    const gallery = document.createElement("div");
    gallery.className = "project-gallery";

    images.forEach(function (src, index) {
        const image = document.createElement("img");
        
        image.src = src;
        image.alt = "Project Image " + (index + 1);
        image.loading = "lazy";
        image.decoding = "async";
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "Open project image " + (index + 1));

        image.addEventListener("click", () => {
            openGallery(images, index);
        });

        // Keyboard support
        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGallery(images, index);
            }
        });

        gallery.appendChild(image);
    });

    container.replaceChildren(gallery);
}

// =========================================================
// LOAD ALL GALLERIES
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    createGallery("co2-gallery", projectGalleries.co2);
    createGallery("ticketsys-gallery", projectGalleries.ticketsys);
    createGallery("PosSystem-gallery", projectGalleries.PosSystem);
    createGallery("flood-gallery", projectGalleries.flood);
});