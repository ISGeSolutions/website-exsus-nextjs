import { useState, useEffect } from "react";
import { Signup, FriendlyUrl } from "components";
import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { aboutusService } from "services";
import { NavLink } from "components";
import Head from "next/head";

var React = require("react");

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useRouter } from "next/router";

export default Index;

function Index() {





    useEffect(() => {

    }, []);

    return (
        <>

            <Layout>
                <h3>This is contact us page!</h3>
            </Layout>
        </>
    );
}
