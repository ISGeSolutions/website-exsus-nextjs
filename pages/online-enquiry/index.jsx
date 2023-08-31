import { useState, useEffect } from 'react';

import { Link, Spinner } from 'components';
import { Layout } from 'components/users';
import { userService } from 'services';

export default Index;

function Index() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        // userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <Layout>
            <section className="card_blk_row">
                <div className="container-md">
                    <div className="bookmark_row">
                        <p className='font-weight-normal display-7 text-light'>This is a online enquiry page</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
