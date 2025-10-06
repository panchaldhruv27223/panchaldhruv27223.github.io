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

        // Create multiple geometric shapes for a more dynamic background
        const geometry1 = new THREE.DodecahedronGeometry(2);
        const geometry2 = new THREE.OctahedronGeometry(1.5);
        const geometry3 = new THREE.TetrahedronGeometry(1);
        
        const material1 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
        const material2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true });
        const material3 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
        
        const shape1 = new THREE.Mesh(geometry1, material1);
        const shape2 = new THREE.Mesh(geometry2, material2);
        const shape3 = new THREE.Mesh(geometry3, material3);
        
        shape2.position.set(3, 2, 0);
        shape3.position.set(-3, -2, 0);
        
        scene.add(shape1);
        scene.add(shape2);
        scene.add(shape3);

        function animate3D() {
            requestAnimationFrame(animate3D);
            shape1.rotation.x += 0.01;
            shape1.rotation.y += 0.01;
            shape2.rotation.x -= 0.008;
            shape2.rotation.z += 0.012;
            shape3.rotation.y += 0.015;
            shape3.rotation.z -= 0.01;
            renderer.render(scene, camera);
        }
        animate3D();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Project card toggle with enhanced animation
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.details');
                if (details) {
                    card.classList.toggle('expanded');
                    return;
                }
                
                const newDetails = document.createElement('div');
                newDetails.classList.add('details');
                newDetails.innerHTML = `
                    <div class="mt-4 p-4 bg-white bg-opacity-90 rounded-lg border-l-4 border-blue-500">
                        <p class="text-sm text-gray-700">${card.dataset.details}</p>
                    </div>
                `;
                card.appendChild(newDetails);
                card.classList.add('expanded');
            });
        });

        // Active nav highlight with smooth scrolling
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Add typing effect to the hero subtitle
        // const typewriterElement = document.querySelector('.typewriter');
        // if (typewriterElement) {
        //     const text = typewriterElement.textContent;
        //     typewriterElement.textContent = '';
        //     typewriterElement.style.borderRight = '0.15em solid white';
            
        //     let i = 0;
        //     const typeWriter = () => {
        //         if (i < text.length) {
        //             typewriterElement.textContent += text.charAt(i);
        //             i++;
        //             setTimeout(typeWriter, 100);
        //         } else {
        //             setTimeout(() => {
        //                 typewriterElement.style.borderRight = 'none';
        //             }, 1000);
        //         }
        //     };
            
        //     setTimeout(typeWriter, 1000);
        // }

    } catch (error) {
        console.error('Error in script.js:', error);
    }
});

