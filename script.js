// Navbar background on scroll
        const mainNav = document.getElementById("mainNav");
        const backTop = document.getElementById("backTop");
        // ================= DARK / LIGHT MODE =================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeIcon.className = "bi bi-moon-fill";
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.className = "bi bi-sun-fill";
        localStorage.setItem("theme", "dark");
    }

});

// Remember selected theme after refresh

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.className = "bi bi-moon-fill";
}

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                mainNav.classList.add("scrolled");
                backTop.classList.add("show");
            } else {
                mainNav.classList.remove("scrolled");
                backTop.classList.remove("show");
            }
        });

        // Close Bootstrap mobile menu after clicking a link
        document.querySelectorAll("#navMenu .nav-link").forEach(link => {
            link.addEventListener("click", () => {
                const menu = document.getElementById("navMenu");
                const collapse = bootstrap.Collapse.getInstance(menu);
                if (collapse) collapse.hide();
            });
        });

        // Active navbar link
        const sections = document.querySelectorAll("header[id], section[id]");
        const navLinks = document.querySelectorAll(".nav-link");

        window.addEventListener("scroll", () => {
            let current = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 160;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });
        });

        // Project filter
        const filterButtons = document.querySelectorAll(".filter-btn");
        const projectItems = document.querySelectorAll(".project-item");

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filter = button.dataset.filter;

                projectItems.forEach(item => {
                    if (filter === "all" || item.dataset.category === filter) {
                        item.style.display = "";
                        setTimeout(() => item.classList.add("show"), 10);
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll(".reveal");

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(el => revealObserver.observe(el));

        // Contact form validation + Bootstrap toast
        const contactForm = document.getElementById("contactForm");
        const toastElement = document.getElementById("liveToast");
        const toastMessage = document.getElementById("toastMessage");
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });

        function showToast(message, success = true) {
            toastMessage.textContent = message;
            toastElement.classList.toggle("toast-success", success);
            toastElement.classList.toggle("toast-error", !success);
            toast.show();
        }

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const messageError = document.getElementById("messageError");

            nameError.classList.add("d-none");
            emailError.classList.add("d-none");
            messageError.classList.add("d-none");

            let valid = true;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === "") {
                nameError.classList.remove("d-none");
                valid = false;
            }

            if (!emailPattern.test(email)) {
                emailError.classList.remove("d-none");
                valid = false;
            }

            if (message === "") {
                messageError.classList.remove("d-none");
                valid = false;
            }

            if (!valid) {
                showToast("Please fix the errors in the form.", false);
                return;
            }

            showToast("Message sent successfully!", true);
            contactForm.reset();
        });

        // Back to top
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });