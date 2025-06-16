// // document.addEventListener('DOMContentLoaded', () => {
// //     try {
// //         /* Three.js 3D Background */
// //         const canvas = document.getElementById('three-bg');
// //         if (!canvas) {
// //             console.error('Canvas with ID "three-bg" not found.');
// //             return;
// //         }

// //         const scene = new THREE.Scene();
// //         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //         const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
// //         renderer.setSize(window.innerWidth, window.innerHeight);
// //         camera.position.z = 5;

// //         const geometry = new THREE.TorusGeometry(2, 0.4, 16, 100);
// //         const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
// //         const torus = new THREE.Mesh(geometry, material);
// //         scene.add(torus);

// //         function animate3D() {
// //             requestAnimationFrame(animate3D);
// //             torus.rotation.x += 0.01;
// //             torus.rotation.y += 0.01;
// //             renderer.render(scene, camera);
// //         }
// //         animate3D();

// //         // Resize handler
// //         window.addEventListener('resize', () => {
// //             camera.aspect = window.innerWidth / window.innerHeight;
// //             camera.updateProjectionMatrix();
// //             renderer.setSize(window.innerWidth, window.innerHeight);
// //         });

// //         /* Theme Toggle */
// //         const themeToggle = document.getElementById('theme-toggle');
// //         if (themeToggle) {
// //             themeToggle.addEventListener('click', () => {
// //                 document.body.classList.toggle('dark-theme');
// //                 localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
// //             });
// //         } else {
// //             console.error('Theme toggle button not found.');
// //         }

// //         if (localStorage.getItem('theme') === 'dark') {
// //             document.body.classList.add('dark-theme');
// //         }

// //         /* Scroll Reveal with GSAP */
// //         if (typeof gsap !== 'undefined') {
// //             const scrollSections = document.querySelectorAll('.scroll-reveal');
// //             const observer = new IntersectionObserver((entries) => {
// //                 entries.forEach(entry => {
// //                     if (entry.isIntersecting) {
// //                         gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
// //                         observer.unobserve(entry.target);
// //                     }
// //                 });
// //             }, { threshold: 0.2 });
// //             scrollSections.forEach(section => observer.observe(section));
// //         } else {
// //             console.error('GSAP library not loaded.');
// //         }

// //         /* Project Card Expansion */
// //         const projectCards = document.querySelectorAll('.project-card');
// //         projectCards.forEach(card => {
// //             card.addEventListener('click', () => {
// //                 const details = card.querySelector('.details') || document.createElement('div');
// //                 details.classList.add('details');
// //                 details.textContent = card.dataset.details;
// //                 if (!card.contains(details)) {
// //                     card.appendChild(details);
// //                 }
// //                 card.classList.toggle('expanded');
// //             });
// //         });

// //         /* Active Nav Highlighting */
// //         const navLinks = document.querySelectorAll('.nav-link');
// //         navLinks.forEach(link => {
// //             link.addEventListener('click', () => {
// //                 navLinks.forEach(l => l.classList.remove('active'));
// //                 link.classList.add('active');
// //             });
// //         });

// //     } catch (error) {
// //         console.error('Error in script.js:', error);
// //     }
// // });







// // document.addEventListener('DOMContentLoaded', () => {
// //     try {
// //         /* Three.js 3D Background */
// //         const canvas = document.getElementById('three-bg');
// //         if (!canvas) {
// //             console.error('Canvas with ID "three-bg" not found.');
// //             return;
// //         }

// //         const scene = new THREE.Scene();
// //         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //         const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
// //         renderer.setSize(window.innerWidth, window.innerHeight);
// //         camera.position.z = 5;

// //         // Changed from TorusGeometry to BoxGeometry for a cube
// //         const geometry = new THREE.BoxGeometry(4, 4, 4);
// //         const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
// //         const cube = new THREE.Mesh(geometry, material);
// //         scene.add(cube);

// //         function animate3D() {
// //             requestAnimationFrame(animate3D);
// //             cube.rotation.x += 0.01;
// //             cube.rotation.y += 0.01;
// //             renderer.render(scene, camera);
// //         }
// //         animate3D();

// //         // Resize handler
// //         window.addEventListener('resize', () => {
// //             camera.aspect = window.innerWidth / window.innerHeight;
// //             camera.updateProjectionMatrix();
// //             renderer.setSize(window.innerWidth, window.innerHeight);
// //         });

// //         /* Theme Toggle */
// //         const themeToggle = document.getElementById('theme-toggle');
// //         if (themeToggle) {
// //             themeToggle.addEventListener('click', () => {
// //                 document.body.classList.toggle('dark-theme');
// //                 localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
// //             });
// //         } else {
// //             console.error('Theme toggle button not found.');
// //         }

// //         if (localStorage.getItem('theme') === 'dark') {
// //             document.body.classList.add('dark-theme');
// //         }

// //         /* Scroll Reveal with GSAP */
// //         if (typeof gsap !== 'undefined') {
// //             const scrollSections = document.querySelectorAll('.scroll-reveal');
// //             const observer = new IntersectionObserver((entries) => {
// //                 entries.forEach(entry => {
// //                     if (entry.isIntersecting) {
// //                         gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
// //                         observer.unobserve(entry.target);
// //                     }
// //                 });
// //             }, { threshold: 0.2 });
// //             scrollSections.forEach(section => observer.observe(section));
// //         } else {
// //             console.error('GSAP library not loaded.');
// //         }

// //         /* Project Card Expansion */
// //         const projectCards = document.querySelectorAll('.project-card');
// //         projectCards.forEach(card => {
// //             card.addEventListener('click', () => {
// //                 const details = card.querySelector('.details') || document.createElement('div');
// //                 details.classList.add('details');
// //                 details.textContent = card.dataset.details;
// //                 if (!card.contains(details)) {
// //                     card.appendChild(details);
// //                 }
// //                 card.classList.toggle('expanded');
// //             });
// //         });

// //         /* Active Nav Highlighting */
// //         const navLinks = document.querySelectorAll('.nav-link');
// //         navLinks.forEach(link => {
// //             link.addEventListener('click', () => {
// //                 navLinks.forEach(l => l.classList.remove('active'));
// //                 link.classList.add('active');
// //             });
// //         });

// //     } catch (error) {
// //         console.error('Error in script.js:', error);
// //     }
// // });






// document.addEventListener('DOMContentLoaded', () => {
//     try {
//         /* Three.js 3D Background */
//         const canvas = document.getElementById('three-bg');
//         if (!canvas) {
//             console.error('Canvas with ID "three-bg" not found.');
//             return;
//         }

//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         camera.position.z = 5;

//         // Changed to DodecahedronGeometry for an amazing structure
//         const geometry = new THREE.DodecahedronGeometry(3);
//         const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
//         const dodecahedron = new THREE.Mesh(geometry, material);
//         scene.add(dodecahedron);

//         function animate3D() {
//             requestAnimationFrame(animate3D);
//             dodecahedron.rotation.x += 0.01;
//             dodecahedron.rotation.y += 0.01;
//             renderer.render(scene, camera);
//         }
//         animate3D();

//         // Resize handler
//         window.addEventListener('resize', () => {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         });

//         /* Theme Toggle */
//         const themeToggle = document.getElementById('theme-toggle');
//         if (themeToggle) {
//             themeToggle.addEventListener('click', () => {
//                 document.body.classList.toggle('dark-theme');
//                 localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
//             });
//         } else {
//             console.error('Theme toggle button not found.');
//         }

//         if (localStorage.getItem('theme') === 'dark') {
//             document.body.classList.add('dark-theme');
//         }

//         /* Scroll Reveal with GSAP */
//         if (typeof gsap !== 'undefined') {
//             const scrollSections = document.querySelectorAll('.scroll-reveal');
//             const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
//                         observer.unobserve(entry.target);
//                     }
//                 });
//             }, { threshold: 0.2 });
//             scrollSections.forEach(section => observer.observe(section));
//         } else {
//             console.error('GSAP library not loaded.');
//         }

//         /* Project Card Expansion */
//         const projectCards = document.querySelectorAll('.project-card');
//         projectCards.forEach(card => {
//             card.addEventListener('click', () => {
//                 const details = card.querySelector('.details') || document.createElement('div');
//                 details.classList.add('details');
//                 details.textContent = card.dataset.details;
//                 if (!card.contains(details)) {
//                     card.appendChild(details);
//                 }
//                 card.classList.toggle('expanded');
//             });
//         });

//         /* Active Nav Highlighting */
//         const navLinks = document.querySelectorAll('.nav-link');
//         navLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 navLinks.forEach(l => l.classList.remove('active'));
//                 link.classList.add('active');
//             });
//         });

//     } catch (error) {
//         console.error('Error in script.js:', error);
//     }
// });











document.addEventListener('DOMContentLoaded', () => {
    try {
        // 3D Background with Three.js
        const canvas = document.getElementById('three-bg');
        if (!canvas) {
            console.error('Canvas with ID "three-bg" not found.');
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        const geometry = new THREE.DodecahedronGeometry(3);
        const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
        const dodecahedron = new THREE.Mesh(geometry, material);
        scene.add(dodecahedron);

        function animate3D() {
            requestAnimationFrame(animate3D);
            dodecahedron.rotation.x += 0.01;
            dodecahedron.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate3D();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Project card toggle
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.details') || document.createElement('div');
                details.classList.add('details');
                details.textContent = card.dataset.details;
                if (!card.contains(details)) {
                    card.appendChild(details);
                }
                card.classList.toggle('expanded');
            });
        });

        // Active nav highlight
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

    } catch (error) {
        console.error('Error in script.js:', error);
    }
});

