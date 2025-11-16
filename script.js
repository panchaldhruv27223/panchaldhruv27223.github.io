document.addEventListener('DOMContentLoaded', () => {
    try {
        // 3D Background with Three.js
        if (typeof THREE === 'undefined') {
            console.warn('Three.js library not loaded. Skipping 3D background animation.');
        } else {
            const canvas = document.getElementById('three-bg');
            if (!canvas) {
                console.error('Canvas with ID "three-bg" not found.');
            } else {
                try {
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    camera.position.z = 5;

                    // Detect mobile device for smaller objects
                    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    
                    // Adjust object sizes based on device - smaller on mobile
                    const sizeMultiplier = isMobile ? 0.5 : 1; // 50% smaller on mobile
                    
                    // Create multiple geometric shapes for a more dynamic background
                    const geometry1 = new THREE.DodecahedronGeometry(2 * sizeMultiplier);
                    const geometry2 = new THREE.OctahedronGeometry(1.5 * sizeMultiplier);
                    const geometry3 = new THREE.TetrahedronGeometry(1 * sizeMultiplier);
                    
                    const material1 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
                    const material2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true });
                    const material3 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
                    
                    const shape1 = new THREE.Mesh(geometry1, material1);
                    const shape2 = new THREE.Mesh(geometry2, material2);
                    const shape3 = new THREE.Mesh(geometry3, material3);
                    
                    // Adjust positions for mobile - closer together and smaller spread
                    const positionMultiplier = isMobile ? 0.6 : 1;
                    shape2.position.set(3 * positionMultiplier, 2 * positionMultiplier, 0);
                    shape3.position.set(-3 * positionMultiplier, -2 * positionMultiplier, 0);
                    
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

                    // Debounced resize handler for better performance
                    let resizeTimeout;
                    window.addEventListener('resize', () => {
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(() => {
                            if (camera && renderer) {
                                camera.aspect = window.innerWidth / window.innerHeight;
                                camera.updateProjectionMatrix();
                                renderer.setSize(window.innerWidth, window.innerHeight);
                            }
                        }, 150); // Debounce resize events
                    });
                } catch (threeError) {
                    console.error('Error initializing Three.js:', threeError);
                }
            }
        }

        // Continue with rest of the code regardless of Three.js status

        // Typewriter cursor removal after animation completes (desktop only)
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                // Only add cursor removal on desktop where animation plays
                setTimeout(() => {
                    typewriterElement.classList.add('no-cursor');
                }, 4000); // 4 seconds matches the typing animation duration
            }
        }

        // Scroll reveal animation
        if ('IntersectionObserver' in window) {
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
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            document.querySelectorAll('.scroll-reveal').forEach(el => {
                el.classList.add('revealed');
            });
        }

        // Project card toggle with enhanced animation
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Get all links in the card
            const links = card.querySelectorAll('a');
            
            // Add click handler to each link to stop event bubbling
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Stop the event from bubbling up to the card
                    e.stopPropagation();
                    // Let the browser handle the link navigation normally
                    // Don't prevent default - allow navigation to happen
                }, false);
            });
            
            // Card click handler for expanding/collapsing details
            card.addEventListener('click', function(e) {
                // Don't do anything if the click is on a link
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // Don't toggle if clicking on the details section itself
                if (e.target.closest('.details')) {
                    return;
                }
                
                // Expand/collapse details
                const details = card.querySelector('.details');
                if (details) {
                    // If details exist, remove them and collapse
                    details.remove();
                    card.classList.remove('expanded');
                } else {
                    // Create new details element
                    const newDetails = document.createElement('div');
                    newDetails.classList.add('details');
                    newDetails.innerHTML = `
                        <div class="mt-4 p-4 bg-white bg-opacity-90 rounded-lg border-l-4 border-blue-500">
                            <p class="text-sm text-gray-700">${card.dataset.details}</p>
                        </div>
                    `;
                    card.appendChild(newDetails);
                    card.classList.add('expanded');
                }
            }, false);
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

        // Mobile menu toggle functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent document click listener from firing
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    // Show menu
                    mobileMenu.classList.remove('hidden');
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                } else {
                    // Hide menu
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });

            // Close mobile menu when clicking on a link and scroll smoothly
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    // Close menu
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                    
                    // Scroll to target
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update active nav
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                }
            });
        }

    } catch (error) {
        console.error('Error in script.js:', error);
    }
});
