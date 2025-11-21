/**
 * ============================================================================
 * LUMINA AESTHETIC - Main JavaScript
 * ============================================================================
 * @fileoverview Main JavaScript file for Lumina Aesthetic website
 * @author Lumina Aesthetic
 * @version 1.0.0
 *
 * Modules:
 * - Navigation (Mobile menu, smooth scroll, active states)
 * - Header (Scroll effects)
 * - Testimonials Slider
 * - Contact Form (Validation & Submission)
 * - Scroll Animations
 * - Utilities
 * ============================================================================
 */

'use strict';

/**
 * Main Application Module
 * Uses IIFE pattern for encapsulation
 */
const LuminaApp = (function() {

    // ========================================================================
    // CONFIGURATION
    // ========================================================================

    /**
     * Application configuration object
     * @type {Object}
     */
    const CONFIG = {
        scrollThreshold: 50,
        animationThreshold: 0.15,
        sliderAutoplayDelay: 5000,
        formSubmitDelay: 2000
    };

    /**
     * DOM element selectors
     * @type {Object}
     */
    const SELECTORS = {
        header: '#header',
        nav: '#nav',
        navToggle: '#nav-toggle',
        navLinks: '.nav__link',
        testimonialSlider: '#testimonials-slider',
        testimonialTrack: '.testimonials__track',
        testimonialCards: '.testimonial-card',
        testimonialPrev: '#testimonials-prev',
        testimonialNext: '#testimonials-next',
        testimonialDots: '.testimonials__dot',
        contactForm: '#contact-form',
        formSuccess: '#form-success',
        animatedElements: '[data-animate]',
        currentYear: '#current-year'
    };

    // ========================================================================
    // UTILITIES MODULE
    // ========================================================================

    /**
     * Utility functions module
     * @namespace Utils
     */
    const Utils = {
        /**
         * Debounce function to limit execution rate
         * @param {Function} func - Function to debounce
         * @param {number} wait - Wait time in milliseconds
         * @returns {Function} Debounced function
         */
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Throttle function to limit execution frequency
         * @param {Function} func - Function to throttle
         * @param {number} limit - Limit in milliseconds
         * @returns {Function} Throttled function
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Check if element is in viewport
         * @param {HTMLElement} element - Element to check
         * @param {number} threshold - Visibility threshold (0-1)
         * @returns {boolean} Whether element is visible
         */
        isInViewport(element, threshold = 0) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= windowHeight * (1 - threshold);
        },

        /**
         * Get all elements matching a selector
         * @param {string} selector - CSS selector
         * @param {HTMLElement} [context=document] - Context element
         * @returns {HTMLElement[]} Array of elements
         */
        getElements(selector, context = document) {
            return Array.from(context.querySelectorAll(selector));
        },

        /**
         * Get single element matching a selector
         * @param {string} selector - CSS selector
         * @param {HTMLElement} [context=document] - Context element
         * @returns {HTMLElement|null} Element or null
         */
        getElement(selector, context = document) {
            return context.querySelector(selector);
        },

        /**
         * Validate email format
         * @param {string} email - Email to validate
         * @returns {boolean} Whether email is valid
         */
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    };

    // ========================================================================
    // HEADER MODULE
    // ========================================================================

    /**
     * Header functionality module
     * @namespace Header
     */
    const Header = {
        /** @type {HTMLElement} */
        element: null,

        /**
         * Initialize header module
         */
        init() {
            this.element = Utils.getElement(SELECTORS.header);
            if (!this.element) return;

            this.bindEvents();
            this.checkScroll();
        },

        /**
         * Bind scroll event
         */
        bindEvents() {
            window.addEventListener('scroll', Utils.throttle(() => {
                this.checkScroll();
            }, 100));
        },

        /**
         * Check scroll position and update header state
         */
        checkScroll() {
            if (window.scrollY > CONFIG.scrollThreshold) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }
        }
    };

    // ========================================================================
    // NAVIGATION MODULE
    // ========================================================================

    /**
     * Navigation functionality module
     * @namespace Navigation
     */
    const Navigation = {
        /** @type {HTMLElement} */
        nav: null,
        /** @type {HTMLElement} */
        toggle: null,
        /** @type {HTMLElement[]} */
        links: [],
        /** @type {boolean} */
        isOpen: false,

        /**
         * Initialize navigation module
         */
        init() {
            this.nav = Utils.getElement(SELECTORS.nav);
            this.toggle = Utils.getElement(SELECTORS.navToggle);
            this.links = Utils.getElements(SELECTORS.navLinks);

            if (!this.nav || !this.toggle) return;

            this.bindEvents();
        },

        /**
         * Bind navigation events
         */
        bindEvents() {
            // Mobile toggle
            this.toggle.addEventListener('click', () => this.toggleMenu());

            // Nav links (smooth scroll & close mobile menu)
            this.links.forEach(link => {
                link.addEventListener('click', (e) => this.handleLinkClick(e, link));
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });

            // Update active link on scroll
            window.addEventListener('scroll', Utils.throttle(() => {
                this.updateActiveLink();
            }, 100));
        },

        /**
         * Toggle mobile menu open/closed
         */
        toggleMenu() {
            this.isOpen = !this.isOpen;
            this.nav.classList.toggle('open', this.isOpen);
            this.toggle.setAttribute('aria-expanded', this.isOpen.toString());
            this.toggle.setAttribute('aria-label', this.isOpen ? 'Cerrar menú' : 'Abrir menú');

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isOpen ? 'hidden' : '';
        },

        /**
         * Close mobile menu
         */
        closeMenu() {
            this.isOpen = false;
            this.nav.classList.remove('open');
            this.toggle.setAttribute('aria-expanded', 'false');
            this.toggle.setAttribute('aria-label', 'Abrir menú');
            document.body.style.overflow = '';
        },

        /**
         * Handle navigation link click
         * @param {Event} e - Click event
         * @param {HTMLElement} link - Clicked link
         */
        handleLinkClick(e, link) {
            const href = link.getAttribute('href');

            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = Utils.getElement(href);

                if (target) {
                    // Close mobile menu if open
                    if (this.isOpen) {
                        this.closeMenu();
                    }

                    // Smooth scroll to target
                    const headerHeight = Header.element ? Header.element.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without jumping
                    history.pushState(null, '', href);
                }
            }
        },

        /**
         * Update active navigation link based on scroll position
         */
        updateActiveLink() {
            const sections = Utils.getElements('section[id]');
            const headerHeight = Header.element ? Header.element.offsetHeight : 0;
            const scrollPosition = window.scrollY + headerHeight + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.links.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    };

    // ========================================================================
    // TESTIMONIALS SLIDER MODULE
    // ========================================================================

    /**
     * Testimonials slider functionality
     * @namespace TestimonialsSlider
     */
    const TestimonialsSlider = {
        /** @type {HTMLElement} */
        slider: null,
        /** @type {HTMLElement} */
        track: null,
        /** @type {HTMLElement[]} */
        cards: [],
        /** @type {HTMLElement[]} */
        dots: [],
        /** @type {HTMLElement} */
        prevBtn: null,
        /** @type {HTMLElement} */
        nextBtn: null,
        /** @type {number} */
        currentIndex: 0,
        /** @type {number} */
        totalSlides: 0,
        /** @type {number} */
        visibleSlides: 1,
        /** @type {number|null} */
        autoplayInterval: null,

        /**
         * Initialize slider module
         */
        init() {
            this.slider = Utils.getElement(SELECTORS.testimonialSlider);
            if (!this.slider) return;

            this.track = Utils.getElement(SELECTORS.testimonialTrack, this.slider);
            this.cards = Utils.getElements(SELECTORS.testimonialCards, this.slider);
            this.dots = Utils.getElements(SELECTORS.testimonialDots, this.slider);
            this.prevBtn = Utils.getElement(SELECTORS.testimonialPrev);
            this.nextBtn = Utils.getElement(SELECTORS.testimonialNext);

            this.totalSlides = this.cards.length;

            if (this.totalSlides === 0) return;

            this.updateVisibleSlides();
            this.bindEvents();
            this.startAutoplay();
        },

        /**
         * Bind slider events
         */
        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            // Pause on hover
            this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
            this.slider.addEventListener('mouseleave', () => this.startAutoplay());

            // Touch support
            let touchStartX = 0;
            let touchEndX = 0;

            this.slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });

            // Update visible slides on resize
            window.addEventListener('resize', Utils.debounce(() => {
                this.updateVisibleSlides();
                this.updateSlider();
            }, 250));
        },

        /**
         * Handle touch swipe gesture
         * @param {number} startX - Start X position
         * @param {number} endX - End X position
         */
        handleSwipe(startX, endX) {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        },

        /**
         * Update number of visible slides based on viewport
         */
        updateVisibleSlides() {
            const width = window.innerWidth;
            if (width >= 1024) {
                this.visibleSlides = 3;
            } else if (width >= 768) {
                this.visibleSlides = 2;
            } else {
                this.visibleSlides = 1;
            }
        },

        /**
         * Go to next slide
         */
        next() {
            const maxIndex = this.totalSlides - this.visibleSlides;
            this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
            this.updateSlider();
        },

        /**
         * Go to previous slide
         */
        prev() {
            const maxIndex = this.totalSlides - this.visibleSlides;
            this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
            this.updateSlider();
        },

        /**
         * Go to specific slide
         * @param {number} index - Slide index
         */
        goToSlide(index) {
            this.currentIndex = index;
            this.updateSlider();
        },

        /**
         * Update slider position and indicators
         */
        updateSlider() {
            if (!this.track) return;

            const slideWidth = this.cards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(this.track).gap) || 0;
            const offset = this.currentIndex * (slideWidth + gap);

            this.track.style.transform = `translateX(-${offset}px)`;

            // Update dots
            this.dots.forEach((dot, index) => {
                const isActive = index === this.currentIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive.toString());
            });
        },

        /**
         * Start autoplay
         */
        startAutoplay() {
            if (this.autoplayInterval) return;

            this.autoplayInterval = setInterval(() => {
                this.next();
            }, CONFIG.sliderAutoplayDelay);
        },

        /**
         * Stop autoplay
         */
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }
    };

    // ========================================================================
    // CONTACT FORM MODULE
    // ========================================================================

    /**
     * Contact form functionality
     * @namespace ContactForm
     */
    const ContactForm = {
        /** @type {HTMLFormElement} */
        form: null,
        /** @type {HTMLElement} */
        successMessage: null,
        /** @type {Object} */
        fields: {},
        /** @type {boolean} */
        isSubmitting: false,

        /**
         * Initialize form module
         */
        init() {
            this.form = Utils.getElement(SELECTORS.contactForm);
            this.successMessage = Utils.getElement(SELECTORS.formSuccess);

            if (!this.form) return;

            this.fields = {
                name: this.form.querySelector('#contact-name'),
                email: this.form.querySelector('#contact-email'),
                phone: this.form.querySelector('#contact-phone'),
                service: this.form.querySelector('#contact-service'),
                message: this.form.querySelector('#contact-message')
            };

            this.bindEvents();
        },

        /**
         * Bind form events
         */
        bindEvents() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Real-time validation
            Object.entries(this.fields).forEach(([name, field]) => {
                if (field) {
                    field.addEventListener('blur', () => this.validateField(name, field));
                    field.addEventListener('input', () => this.clearError(name));
                }
            });
        },

        /**
         * Handle form submission
         * @param {Event} e - Submit event
         */
        async handleSubmit(e) {
            e.preventDefault();

            if (this.isSubmitting) return;

            // Validate all fields
            const isValid = this.validateAll();
            if (!isValid) return;

            // Show loading state
            this.isSubmitting = true;
            const submitBtn = this.form.querySelector('.contact-form__submit');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await this.simulateSubmit();

                // Show success message
                this.showSuccess();
                this.form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                this.showError('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            } finally {
                this.isSubmitting = false;
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        },

        /**
         * Simulate form submission (demo purposes)
         * @returns {Promise} Resolves after delay
         */
        simulateSubmit() {
            return new Promise((resolve) => {
                setTimeout(resolve, CONFIG.formSubmitDelay);
            });
        },

        /**
         * Validate all form fields
         * @returns {boolean} Whether all fields are valid
         */
        validateAll() {
            let isValid = true;

            // Required fields
            const requiredFields = ['name', 'email', 'service'];

            requiredFields.forEach(name => {
                if (!this.validateField(name, this.fields[name])) {
                    isValid = false;
                }
            });

            return isValid;
        },

        /**
         * Validate single field
         * @param {string} name - Field name
         * @param {HTMLElement} field - Field element
         * @returns {boolean} Whether field is valid
         */
        validateField(name, field) {
            if (!field) return true;

            const value = field.value.trim();
            let error = '';

            switch (name) {
                case 'name':
                    if (!value) {
                        error = 'Por favor, ingresa tu nombre';
                    } else if (value.length < 2) {
                        error = 'El nombre debe tener al menos 2 caracteres';
                    }
                    break;

                case 'email':
                    if (!value) {
                        error = 'Por favor, ingresa tu correo electrónico';
                    } else if (!Utils.isValidEmail(value)) {
                        error = 'Por favor, ingresa un correo electrónico válido';
                    }
                    break;

                case 'service':
                    if (!value) {
                        error = 'Por favor, selecciona un servicio';
                    }
                    break;
            }

            if (error) {
                this.showFieldError(name, error);
                return false;
            }

            this.clearError(name);
            return true;
        },

        /**
         * Show field error message
         * @param {string} name - Field name
         * @param {string} message - Error message
         */
        showFieldError(name, message) {
            const errorEl = this.form.querySelector(`#${name}-error`);
            const field = this.fields[name];

            if (errorEl) {
                errorEl.textContent = message;
            }

            if (field) {
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
            }
        },

        /**
         * Clear field error
         * @param {string} name - Field name
         */
        clearError(name) {
            const errorEl = this.form.querySelector(`#${name}-error`);
            const field = this.fields[name];

            if (errorEl) {
                errorEl.textContent = '';
            }

            if (field) {
                field.classList.remove('error');
                field.removeAttribute('aria-invalid');
            }
        },

        /**
         * Show success message
         */
        showSuccess() {
            if (this.successMessage) {
                this.form.hidden = true;
                this.successMessage.hidden = false;
            }
        },

        /**
         * Show general error message
         * @param {string} message - Error message
         */
        showError(message) {
            // Could be enhanced to show a toast notification
            alert(message);
        }
    };

    // ========================================================================
    // SCROLL ANIMATIONS MODULE
    // ========================================================================

    /**
     * Scroll-triggered animations
     * @namespace ScrollAnimations
     */
    const ScrollAnimations = {
        /** @type {HTMLElement[]} */
        elements: [],
        /** @type {IntersectionObserver} */
        observer: null,

        /**
         * Initialize scroll animations
         */
        init() {
            this.elements = Utils.getElements(SELECTORS.animatedElements);

            if (this.elements.length === 0) return;

            // Use Intersection Observer for performance
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(
                    (entries) => this.handleIntersection(entries),
                    {
                        threshold: CONFIG.animationThreshold,
                        rootMargin: '0px 0px -50px 0px'
                    }
                );

                this.elements.forEach(el => this.observer.observe(el));
            } else {
                // Fallback: show all elements
                this.elements.forEach(el => el.classList.add('visible'));
            }
        },

        /**
         * Handle intersection observer callback
         * @param {IntersectionObserverEntry[]} entries - Observed entries
         */
        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally stop observing after animation
                    this.observer.unobserve(entry.target);
                }
            });
        }
    };

    // ========================================================================
    // UTILITY INITIALIZATIONS
    // ========================================================================

    /**
     * Initialize utility features
     * @namespace UtilityInit
     */
    const UtilityInit = {
        /**
         * Initialize all utility features
         */
        init() {
            this.setCurrentYear();
            this.setupSmoothScroll();
        },

        /**
         * Set current year in footer
         */
        setCurrentYear() {
            const yearElement = Utils.getElement(SELECTORS.currentYear);
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear().toString();
            }
        },

        /**
         * Setup smooth scroll for anchor links
         */
        setupSmoothScroll() {
            // Already handled by Navigation module
            // This is a fallback for any additional anchor links
            document.querySelectorAll('a[href^="#"]:not(.nav__link)').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href !== '#') {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            const headerHeight = Header.element ? Header.element.offsetHeight : 0;
                            window.scrollTo({
                                top: target.offsetTop - headerHeight,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }
    };

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    /**
     * Initialize all modules
     */
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initModules);
        } else {
            initModules();
        }
    }

    /**
     * Initialize all modules
     */
    function initModules() {
        Header.init();
        Navigation.init();
        TestimonialsSlider.init();
        ContactForm.init();
        ScrollAnimations.init();
        UtilityInit.init();

        // Log initialization (remove in production)
        console.log('Lumina Aesthetic - Website Initialized');
    }

    // Return public API
    return {
        init,
        // Expose modules for debugging/testing
        modules: {
            Header,
            Navigation,
            TestimonialsSlider,
            ContactForm,
            ScrollAnimations
        }
    };

})();

// ============================================================================
// INITIALIZE APPLICATION
// ============================================================================

LuminaApp.init();
