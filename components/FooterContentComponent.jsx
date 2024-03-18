import React from 'react';

const FooterContentComponent = ({ footerContent }) => {
    return (
        <div>
            <h2>Footer Content:</h2>
            <div dangerouslySetInnerHTML={{ __html: footerContent }} />
        </div>
    );
};

export default FooterContentComponent;
