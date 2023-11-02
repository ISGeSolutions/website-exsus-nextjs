import { useState, useEffect } from 'react';
import { Signup } from 'components';
import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { whyusService } from 'services';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
var React = require('react');

export default Index;

function Index() {

    const [exsusReviews, setExsusReviewDetails] = useState(null);

    useEffect(() => {
        whyusService.getExsusReviews().then(x => {
            // console.log('x1', x);
            setExsusReviewDetails(x?.data);
        });
    }, []);

    return (
        <Layout>
            <div className='m-5 text-white'>
                <pre>{JSON.stringify(exsusReviews, null, 2)}</pre>
            </div>
        </Layout>
    );
}
