import React from 'react';

const HeaderContentComponent = ({ headerContent }) => {
    return (
        <div>
            <h2>Header Content:</h2>
            <div dangerouslySetInnerHTML={{ __html: headerContent }} />
        </div>
    );
};

export default HeaderContentComponent;