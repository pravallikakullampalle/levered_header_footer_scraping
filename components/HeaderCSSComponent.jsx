// HeaderCSSComponent.jsx
import React from 'react';

const HeaderCSSComponent = ({ headerCSS }) => {
    // Parse header CSS into an object
    const parsedHeaderCSS = parseCSS(headerCSS);

    // Apply parsed CSS styles to a div
    const headerStyle = {
        ...parsedHeaderCSS,
        border: '1px solid black', // Add extra styling if needed
    };

    return (
        <div>
            <h2>Header CSS:</h2>
            <div style={headerStyle}>Header CSS will be applied here</div>
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

export default HeaderCSSComponent;
