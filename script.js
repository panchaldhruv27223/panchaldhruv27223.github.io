// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        // 3D Background with Three.js - Optimized for performance
        let animationId = null;
        let isTabVisible = !document.hidden;
        let threeScene = null;
        let threeRenderer = null;
        let threeShapes = [];
        let basePositions = [];
        let time = 0;
        
        // Function to initialize Three.js scene
        const initThreeJS = () => {
            if (typeof THREE === 'undefined') {
                return false;
            }
            
            const canvas = document.getElementById('three-bg');
            if (!canvas) {
                return false;
            }
            
            try {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                
                // Optimize renderer settings for performance
                const renderer = new THREE.WebGLRenderer({ 
                    canvas: canvas, 
                    alpha: true,
                    antialias: false, // Disable antialiasing for better performance
                    powerPreference: "high-performance"
                });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
                camera.position.z = 5;

                // Detect mobile device for smaller objects
                const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                // Adjust object sizes based on device - smaller on mobile
                const sizeMultiplier = isMobile ? 0.5 : 1;
                
                // Create multiple geometric shapes for a more dynamic background
                const geometry1 = new THREE.DodecahedronGeometry(2 * sizeMultiplier, 0); // Lower detail on mobile
                const geometry2 = new THREE.OctahedronGeometry(1.5 * sizeMultiplier, 0);
                const geometry3 = new THREE.TetrahedronGeometry(1 * sizeMultiplier, 0);
                
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
                
                // Store base positions for floating animation
                basePositions = [
                    { x: 0, y: 0, z: 0 },
                    { x: 3 * positionMultiplier, y: 2 * positionMultiplier, z: 0 },
                    { x: -3 * positionMultiplier, y: -2 * positionMultiplier, z: 0 }
                ];
                
                scene.add(shape1);
                scene.add(shape2);
                scene.add(shape3);
                
                threeScene = { scene, camera, renderer };
                threeShapes = [shape1, shape2, shape3];
                
                // Mark canvas as initialized
                canvas.dataset.initialized = 'true';
                
                return true;
            } catch (error) {
                console.error('Error initializing Three.js:', error);
                return false;
            }
        };
        
        // Function to animate - Enhanced with smooth floating and scaling
        const animate3D = () => {
            if (!isTabVisible || !threeScene) return;
            
            const { scene, camera, renderer } = threeScene;
            time += 0.016; // Smooth time increment (60fps)
            
            // Enhanced rotation with varying speeds for more dynamic feel
            threeShapes[0].rotation.x += 0.008;
            threeShapes[0].rotation.y += 0.012;
            threeShapes[0].rotation.z += 0.005;
            
            threeShapes[1].rotation.x -= 0.01;
            threeShapes[1].rotation.y += 0.006;
            threeShapes[1].rotation.z += 0.009;
            
            threeShapes[2].rotation.x += 0.007;
            threeShapes[2].rotation.y += 0.011;
            threeShapes[2].rotation.z -= 0.008;
            
            // Add smooth floating motion to each shape
            threeShapes[0].position.y = basePositions[0].y + Math.sin(time * 0.8) * 0.8;
            threeShapes[0].position.x = basePositions[0].x + Math.cos(time * 0.6) * 0.6;
            threeShapes[0].position.z = basePositions[0].z + Math.sin(time * 0.5) * 0.4;
            
            threeShapes[1].position.y = basePositions[1].y + Math.sin(time * 0.7 + 1) * 0.7;
            threeShapes[1].position.x = basePositions[1].x + Math.cos(time * 0.5 + 1) * 0.5;
            threeShapes[1].position.z = basePositions[1].z + Math.sin(time * 0.6 + 1) * 0.3;
            
            threeShapes[2].position.y = basePositions[2].y + Math.sin(time * 0.9 + 2) * 0.9;
            threeShapes[2].position.x = basePositions[2].x + Math.cos(time * 0.7 + 2) * 0.7;
            threeShapes[2].position.z = basePositions[2].z + Math.sin(time * 0.4 + 2) * 0.5;
            
            // Add subtle scaling animation (breathing effect)
            const scale1 = 1 + Math.sin(time * 0.5) * 0.05;
            const scale2 = 1 + Math.sin(time * 0.6 + 1) * 0.05;
            const scale3 = 1 + Math.sin(time * 0.4 + 2) * 0.05;
            
            threeShapes[0].scale.set(scale1, scale1, scale1);
            threeShapes[1].scale.set(scale2, scale2, scale2);
            threeShapes[2].scale.set(scale3, scale3, scale3);
            
            // Subtle camera movement for depth
            camera.position.x = Math.sin(time * 0.2) * 0.3;
            camera.position.y = Math.cos(time * 0.15) * 0.3;
            camera.lookAt(0, 0, 0);
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate3D);
        };
        
        // Pause animation when tab is hidden
        document.addEventListener('visibilitychange', () => {
            isTabVisible = !document.hidden;
            if (!isTabVisible && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            } else if (isTabVisible && threeScene && !animationId) {
                animate3D();
            }
        });
        
        // Try to initialize Three.js
        if (typeof THREE !== 'undefined') {
            if (initThreeJS()) {
                // Start animation only if tab is visible
                if (isTabVisible) {
                    animate3D();
                }
                
                // Debounced resize handler for better performance
                const handleResize = debounce(() => {
                    if (threeScene && threeScene.camera && threeScene.renderer) {
                        threeScene.camera.aspect = window.innerWidth / window.innerHeight;
                        threeScene.camera.updateProjectionMatrix();
                        threeScene.renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                }, 150);
                
                window.addEventListener('resize', handleResize);
            }
        } else {
            // Wait for Three.js to load if it's deferred
            const checkThreeJS = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkThreeJS);
                    if (initThreeJS() && isTabVisible) {
                        animate3D();
                    }
                }
            }, 100);
            
            // Stop checking after 5 seconds
            setTimeout(() => clearInterval(checkThreeJS), 5000);
        }
        
        // Continue with rest of the code regardless of Three.js status

        // Typewriter cursor removal after animation completes (desktop only)
        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            const checkMobile = () => window.innerWidth <= 1024;
            const isMobile = checkMobile();
            
            if (!isMobile) {
                // Only add cursor removal on desktop where animation plays
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (typewriterElement) {
                            typewriterElement.classList.add('no-cursor');
                        }
                    }, 4200); // Slightly longer than animation duration (4s) to ensure completion
                });
            } else {
                // On mobile, ensure cursor is hidden immediately
                typewriterElement.classList.add('no-cursor');
            }
            
            // Handle window resize for typewriter (debounced)
            const handleTypewriterResize = debounce(() => {
                if (typewriterElement && checkMobile()) {
                    typewriterElement.classList.add('no-cursor');
                }
            }, 150);
            
            window.addEventListener('resize', handleTypewriterResize);
        }

        // Scroll reveal animation - Optimized with IntersectionObserver
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        // Unobserve after revealing to improve performance
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Use requestIdleCallback if available for better performance
            const observeElements = () => {
                document.querySelectorAll('.scroll-reveal').forEach(el => {
                    observer.observe(el);
                });
            };
            
            if ('requestIdleCallback' in window) {
                requestIdleCallback(observeElements, { timeout: 2000 });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(observeElements, 100);
            }
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

        // Update active nav on scroll - Throttled for performance
        const updateActiveNav = throttle(() => {
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
        }, 100); // Throttle to every 100ms
        
        window.addEventListener('scroll', updateActiveNav, { passive: true });

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
