import React from 'react';
import ReactDOM from 'react-dom';
import HeaderContentComponent from './components/HeaderContentComponent';
import FooterContentComponent from './components/FooterContentComponent';
import HeaderCSSComponent from './components/HeaderCSSComponent';
import FooterCSSComponent from './components/FooterCSSComponent';

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

        // Render React components with scraped data
        ReactDOM.render(
            <div>
                <HeaderContentComponent headerContent={headerContent} />
                <HeaderCSSComponent headerCSS={headerCSS} />
                <FooterContentComponent footerContent={footerContent} />
                <FooterCSSComponent footerCSS={footerCSS} />
            </div>,
            document.getElementById('root')
        );

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
}

// Call the function with the URL you want to scrape
scrapeHeaderAndFooterCSS('https://en.wikipedia.org/wiki/Main_Page');
