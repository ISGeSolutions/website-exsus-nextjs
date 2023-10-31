// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="container m-5 text-white">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1 className="display-5">404 - Page Not Found</h1>
                    <p className="lead m-5">The page you are looking for does not exist.</p>
                    <Link href="/">
                        <a className="btn btn-success">Go back to the homepage</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Custom404;
