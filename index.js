import React, { useState, useEffect } from 'react';
const puppeteer = require('puppeteer');

async function scrapeHeaderAndFooterCSS(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the URL
        await page.goto(url);

        // Wait for header and footer elements to appear
        await page.waitForSelector('header');
        await page.waitForSelector('footer');

        // Extract header and footer content
        const headerContent = await page.evaluate(() => {
            const headerElement = document.querySelector('header');
            return headerElement ? headerElement.innerHTML : null;
        });

        const footerContent = await page.evaluate(() => {
            const footerElement = document.querySelector('footer');
            return footerElement ? footerElement.innerHTML : null;
        });

        // Extract header and footer CSS
        const headerCSS = await page.evaluate(() => {
            const headerElement = document.querySelector('header');
            if (!headerElement) return null;
            const computedStyles = window.getComputedStyle(headerElement);
            return Array.from(computedStyles).map(property => `${property}: ${computedStyles.getPropertyValue(property)}`).join('\n');
        });

        const footerCSS = await page.evaluate(() => {
            const footerElement = document.querySelector('footer');
            if (!footerElement) return null;
            const computedStyles = window.getComputedStyle(footerElement);
            return Array.from(computedStyles).map(property => `${property}: ${computedStyles.getPropertyValue(property)}`).join('\n');
        });

        console.log('Header:', headerContent);
        console.log('Header CSS:', headerCSS);
        console.log('Footer:', footerContent);
        console.log('Footer CSS:', footerCSS);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
}


import React, { useState, useEffect } from 'react';

const HeaderComponent = () => {
    const [headerContent, setHeaderContent] = useState('');
    const [headerCSS, setHeaderCSS] = useState('');

    useEffect(() => {
        // Simulate fetching header data (content and CSS) from an API
        fetchHeaderData();
    }, []);

    const fetchHeaderData = async () => {
        try {
            // Example URL for fetching header content and CSS
            const response = await fetch('https://example.com/header-data');
            const data = await response.json();

            // Set header content and CSS
            setHeaderContent(data.headerContent);
            setHeaderCSS(data.headerCSS);
        } catch (error) {
            console.error('Error fetching header data:', error);
        }
    };

    return (
        <div>
            <div style={parseCSS(headerCSS)}>
                <h2>Header Content:</h2>
                <div dangerouslySetInnerHTML={{ __html: headerContent }} />
            </div>
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

export default HeaderComponent;

import React, { useState, useEffect } from 'react';

const FooterComponent = () => {
    const [footerContent, setFooterContent] = useState('');
    const [footerCSS, setFooterCSS] = useState('');

    useEffect(() => {
        // Simulate fetching footer data (content and CSS) from an API
        fetchFooterData();
    }, []);

    const fetchFooterData = async () => {
        try {
            // Example URL for fetching footer content and CSS
            const response = await fetch('https://example.com/footer-data');
            const data = await response.json();

            // Set footer content and CSS
            setFooterContent(data.footerContent);
            setFooterCSS(data.footerCSS);
        } catch (error) {
            console.error('Error fetching footer data:', error);
        }
    };

    return (
        <div>
            <div style={parseCSS(footerCSS)}>
                <h2>Footer Content:</h2>
                <div dangerouslySetInnerHTML={{ __html: footerContent }} />
            </div>
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

export default FooterComponent;

// Call the function with the URL you want to scrape
