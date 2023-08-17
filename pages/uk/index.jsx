import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Index() {

    const router = useRouter();

    // Redirect to the index page
    const redirectToIndex = () => {
        // router.push('/');
        window.open('/', '_blank'); // Opens the index page in a new tab
    };


    useEffect(() => {

    }, []);

    return (
        <>
        </>
    );
}
