import { useState, useEffect } from 'react';
import { Link, Spinner, Signup } from 'components';
import { destinationService, alertService, userService } from 'services';
import { Inspireme } from 'components';
import Head from 'next/head';
import { NavLink } from 'components';
import { useRouter } from 'next/router';
import generateDynamicLink from 'components/utils/generateLink';
import Image from "next/image";

export default Index;

function Index() {

  let regionWiseUrl = '/uk';
  if (typeof window !== 'undefined') {
      if (window && window.site_region) {
          regionWiseUrl = '/' + window.site_region;
          // setMyVariable(window.site_region);
      }
  }

  useEffect(() => {
      const newUrl = regionWiseUrl + `/destinations/africa/africa-countries`;
      window.history.pushState(null, null, newUrl);

  }, []);

    return (
        <>
        </>
    );
}
