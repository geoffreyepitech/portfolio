        // Gestion du thème
        function toggleTheme() {
            const body = document.body;
            const isDark = body.getAttribute("data-theme") === "dark";
            body.setAttribute("data-theme", isDark ? "light" : "dark");
            document.querySelector(".theme-toggle").textContent = isDark ? "🌙 Mode sombre" : "☀️ Mode clair";
            localStorage.setItem("theme", isDark ? "light" : "dark");
        }

        (function() {
            const savedTheme = localStorage.getItem("theme") || "light";
            document.body.setAttribute("data-theme", savedTheme);
            document.querySelector(".theme-toggle").textContent = savedTheme === "dark" ? "☀️ Mode clair" : "🌙 Mode sombre";
        })();

        // Gestion du menu déroulant
        function toggleMenu() {
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        }

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', (e) => {
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });

        // Gestion du modal et du jeu Puissance 4
        let game;

        function openModal() {
            console.log("openModal called");
            document.getElementById("game-modal").style.display = "block";
            if (typeof Puissance4 === "undefined") {
                console.error("Puissance4 class is not defined. Check if puissance4.js is loaded correctly.");
                return;
            }
            if (!game) {
                game = new Puissance4({
                    width: 7,
                    height: 6,
                    player1Color: '#ff0000',
                    player2Color: '#ffff00'
                });
                game.init();
            }
        }

        function closeModal() {
            console.log("closeModal called");
            document.getElementById("game-modal").style.display = "none";
        }

        window.onclick = function(event) {
            const modal = document.getElementById("game-modal");
            if (event.target == modal) {
                console.log("Clicked outside modal");
                modal.style.display = "none";
            }
        }