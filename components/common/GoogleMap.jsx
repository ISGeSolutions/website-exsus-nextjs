import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js for dynamic imports


// Use dynamic import for GoogleMapReact to avoid server-side rendering issues
const DynamicGoogleMapReact = dynamic(() => import('google-map-react'), { ssr: false });

const GoogleMap = ({ children, ...props }) => (
    // <Wrapper>
    <DynamicGoogleMapReact
        bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_REACT_APP_MAP_KEY, // Use NEXT_PUBLIC_ for environment variables in Next.js
        }}
        {...props}
    >
        {children}
    </DynamicGoogleMapReact>
    // </Wrapper>
);

GoogleMap.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
};

GoogleMap.defaultProps = {
    children: null,
};

export default GoogleMap;
