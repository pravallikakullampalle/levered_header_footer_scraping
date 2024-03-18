// FooterCSSComponent.jsx
import React from 'react';

const FooterCSSComponent = ({ footerCSS }) => {
    // Parse footer CSS into an object
    const parsedFooterCSS = parseCSS(footerCSS);

    // Apply parsed CSS styles to a div
    const footerStyle = {
        ...parsedFooterCSS,
        border: '1px solid black', // Add extra styling if needed
    };

    return (
        <div>
            <h2>Footer CSS:</h2>
            <div style={footerStyle}>Footer CSS will be applied here</div>
        </div>
    );
};

// Helper function to parse CSS styles into an object
const parseCSS = (cssString) => {
    if (!cssString) return {};
    return cssString.split(';').reduce((acc, style) => {
        const [property, value] = style.split(':');
        if (property && value) {
            acc[property.trim()] = value.trim();
        }
        return acc;
    }, {});
};

export default FooterCSSComponent;
