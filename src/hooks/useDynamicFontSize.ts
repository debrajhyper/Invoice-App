import { useEffect, useState } from "react";

/**
 * Calculates the font size for a given text to fit within a given container width and height.
 *
 * @param {string} text The text to fit within the container.
 * @param {number} containerWidth The width of the container.
 * @param {number} containerHeight The height of the container.
 * @returns {number} The font size that will fit the text within the container.
 */
export const useDynamicFontSize = (text: string, containerWidth: number, containerHeight: number) => {
    const [fontSize, setFontSize] = useState(100);

    /**
     * Calculates the font size for a given text to fit within a given container width and height.
     */
    const calculateFontSize = () => {
        let testFontSize = 100;
        const tempElement = document.createElement('span');

        // Make the element invisible and position it absolutely so it doesn't affect the layout.
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';

        // Set the white space to nowrap so the text doesn't wrap to the next line.
        tempElement.style.whiteSpace = 'nowrap';

        // Add the element to the body so we can measure its size.
        document.body.appendChild(tempElement);

        /**
         * Recursively reduces the font size until the text fits within the container.
         */
        const fitText = () => {
            // Set the font size and text content of the temporary element.
            tempElement.style.fontSize = `${testFontSize}px`;
            tempElement.textContent = text;

            // If the text is too wide or too tall, reduce the font size and try again.
            if (tempElement.offsetWidth > containerWidth || tempElement.offsetHeight > containerHeight) {
                testFontSize--;
                fitText();
            }
        };

        // Start the recursive process.
        fitText();

        // Remove the temporary element from the body.
        document.body.removeChild(tempElement);

        // Set the state with the calculated font size.
        setFontSize(testFontSize);
    };

    // Run the calculation on mount and when the text or container size changes.
    useEffect(() => {
        calculateFontSize();
    }, [text, containerWidth, containerHeight]);

    return fontSize;
};
