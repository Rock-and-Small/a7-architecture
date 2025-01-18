/**
 * Equal Height Setter.
 * 
 * Adjusts the height of all slides with [dd-equal="height"] to match the tallest slide.
 */
export const setEqualHeight = () => {
    const selector = '[dd-equal="height"]';

    const adjustHeights = () => {
        const slides = document.querySelectorAll<HTMLElement>(selector);
        console.log(`Found ${slides.length} slides using selector "${selector}"`);

        let maxHeight = 0;

        // Reset all slides to their natural height before calculating the tallest slide
        slides.forEach(slide => {
            slide.style.height = '';
            const slideHeight = slide.offsetHeight;
            console.log(`Slide height: ${slideHeight}px`);
            if (slideHeight > maxHeight) {
                maxHeight = slideHeight;
            }
        });

        console.log(`Tallest slide height determined: ${maxHeight}px`);

        // Set all slides to the height of the tallest slide
        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
            console.log(`Setting slide height to ${maxHeight}px`);
        });

        console.log(`Adjusted slide heights to ${maxHeight}px`);
    };

    adjustHeights();
    window.addEventListener('resize', adjustHeights);
};

// Observer logic to wait for the list to become empty before executing setEqualHeight
const targetSelector = '[fs-cmsslider-element="list"]';
const targetNode = document.querySelector(targetSelector);

if (targetNode) {
    const config = { childList: true };
    let hasExecuted = false; // Ensure setEqualHeight runs only once

    const observerCallback = (mutationsList, observer) => {
        // If not executed yet and the target element is empty
        if (!hasExecuted && targetNode.children.length === 0) {
            console.log(`${targetSelector} is empty. Executing setEqualHeight now.`);
            setEqualHeight();

            // Mark as executed and disconnect observer to prevent further calls
            hasExecuted = true;
            observer.disconnect();
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);
} else {
    console.warn(`Element with selector ${targetSelector} not found.`);
}
