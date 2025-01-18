/**
 * Equal Height Setter.
 * Adjusts the height of all slides with [dd-same-height="slide"] to match the tallest slide.
 */
export const setEqualHeight = () => {
    const selector = '[dd-same-height="slide"]';

    const adjustHeights = () => {
        const slides = document.querySelectorAll<HTMLElement>(selector);
        let maxHeight = 0;

        // Reset all slides to their natural height before calculating the tallest slide
        slides.forEach(slide => {
            slide.style.height = '';
            if (slide.offsetHeight > maxHeight) {
                maxHeight = slide.offsetHeight;
            }
        });

        // Set all slides to the height of the tallest slide
        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });

        console.log(`Adjusted slide heights to ${maxHeight}px`);
    };

    adjustHeights();
    window.addEventListener('resize', adjustHeights);
};

// Wait for the fs-cmsslider-element list to become empty before executing setEqualHeight
const targetSelector = '[fs-cmsslider-element="list"]';
const targetNode = document.querySelector(targetSelector);

if (targetNode) {
    // Configure the observer to watch for changes in the children of the target element
    const config = { childList: true };

    const observerCallback = (mutationsList, observer) => {
        // Check if the target element is empty
        if (targetNode.children.length === 0) {
            console.log(`${targetSelector} is empty. Executing setEqualHeight.`);
            setEqualHeight();
            observer.disconnect(); // Stop observing once condition is met
        }
    };

    // Create and start the observer
    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);
} else {
    console.warn(`Element with selector ${targetSelector} not found.`);
}
