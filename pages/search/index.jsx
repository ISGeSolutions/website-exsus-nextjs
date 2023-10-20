import { useState, useEffect } from "react";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));
  }, []);

  return (
    <Layout>
      <section className="card_blk_row">
        <div className="container">
          <div className="bookmark_row">
            <h3>Search Page</h3>
          </div>
        </div>
      </section>
    </Layout>
  );
}
