export const setEqualHeight = () => {
    const slideSelector = '[dd-equal-height="true"]';
    const listSelector = '[fs-cmsslider-element="list"]';
    const targetNode = document.querySelector(listSelector);

    // Debounce utility to limit how often a function can fire
    const debounce = (func, wait) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        };
    };

    // Function to adjust heights of all selected slides to the tallest slide
    const adjustHeights = () => {
        const slides = document.querySelectorAll(slideSelector);
        console.log(`Adjusting heights for ${slides.length} slides.`);

        let maxHeight = 0;

        // Reset heights and determine the maximum height among the slides
        slides.forEach((slide) => {
            slide.style.height = '';
            const height = slide.offsetHeight;
            console.log(`Measured slide height: ${height}px`);
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        console.log(`Tallest slide height determined: ${maxHeight}px`);

        // If tallest height is 0 (slides not fully rendered), retry after a short delay
        if (maxHeight === 0 && slides.length > 0) {
            console.warn('Tallest height is 0; retrying adjustment after a delay.');
            setTimeout(adjustHeights, 100);
            return;
        }

        // Apply the maximum height to all slides
        slides.forEach((slide) => {
            slide.style.height = `${maxHeight}px`;
            console.log(`Set slide height to ${maxHeight}px`);
        });

        console.log(`Adjusted slide heights to ${maxHeight}px`);
    };

    // Function to set up a MutationObserver to detect when slides appear
    const observeForSlides = () => {
        if (!targetNode) {
            console.warn(`Element with selector ${listSelector} not found.`);
            return;
        }

        const observerConfig = { childList: true, subtree: true };

        const observerCallback = (mutations, observer) => {
            const slides = targetNode.querySelectorAll(slideSelector);
            if (slides.length > 0) {
                console.log(`Detected ${slides.length} slide(s) with dd-equal-height="true". Adjusting heights.`);
                adjustHeights();
                observer.disconnect(); // Stop observing once slides are found and heights adjusted
            }
        };

        const observer = new MutationObserver(observerCallback);
        observer.observe(targetNode, observerConfig);
        console.log(`Started observing ${listSelector} for slides with dd-equal-height="true".`);
    };

    if (!targetNode) {
        console.warn(`Element with selector ${listSelector} not found.`);
        return;
    }

    // Check if slides already exist and adjust immediately if so
    const initialSlides = targetNode.querySelectorAll(slideSelector);
    if (initialSlides.length > 0) {
        console.log(`Slides found initially (${initialSlides.length}). Adjusting heights immediately.`);
        adjustHeights();
    } else {
        // Otherwise, start observing for slides to appear
        observeForSlides();
    }

    // Add a debounced resize event listener to adjust heights on window resize
    window.addEventListener('resize', debounce(adjustHeights, 200));
};
