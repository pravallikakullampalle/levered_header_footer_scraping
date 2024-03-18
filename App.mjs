import React from 'react';
import HeaderContentComponent from './HeaderContentComponent';
import FooterContentComponent from './FooterContentComponent';
import HeaderCSSComponent from './HeaderCSSComponent';
import FooterCSSComponent from './FooterCSSComponent';

const App = ({ headerContent, footerContent, headerCSS, footerCSS }) => {
    return (
        <div>
            <HeaderContentComponent headerContent={headerContent} />
            <HeaderCSSComponent headerCSS={headerCSS} />
            <FooterContentComponent footerContent={footerContent} />
            <FooterCSSComponent footerCSS={footerCSS} />
        </div>
    );
};

export default App;
