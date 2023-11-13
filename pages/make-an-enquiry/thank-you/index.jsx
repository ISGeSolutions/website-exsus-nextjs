import { useState, useEffect } from "react";
import { Link, Spinner, Alert, Signup } from "components";
import { Layout } from "components/users";
import { contactusService, alertService, thankyouService } from "services";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default Index;

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [thankyouData, setThankYouData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    thankyouService
      .getThankYouPage()
      .then((x) => {
        setThankYouData(x.data[0]);
        const data = x.data[0]?.attributes?.custom_page_contents?.data;
        if (data) {
          data.forEach((element, index) => {
            if (element?.attributes?.content_name == "HeadingTag") {
              setHeadingTag(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Title") {
              setTitle(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "MetaDescription") {
              setMetaDescription(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Long_Text") {
              setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightCorner(element?.attributes?.content_value);
            }
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors here
        setIsLoading(false);
      });
  }, []);

  return (
    <Layout>
      <section class="trvl_info_row">
        <div class="container">
          <div class="bookmark_row">
            <ul>
              <li>
                <a href="homepage.html">Home</a>
              </li>
              <li>
                <a href="contact_us.html">Make an enquiry</a>
              </li>
              <li>Thank you</li>
            </ul>
          </div>

          <div class="trvl_info_cntnt">
            <h2 class="trvl_title">Thank you for enquiring with us</h2>
            <p class="mb-4">
              Exsus is a little different to other travel companies. All of our
              holidays are truly tailor-made, offering you complete choice and
              freedom. One of our experienced destination experts will get back
              to you within 24 hours, or the next working day, should we receive
              your enquiry on a weekend or a public holiday, to start creating
              your perfect trip.
            </p>
            <p class="mb-4">
              In the meantime, please feel free to call us on 020 7337 9010 or
              contact us at <a href="#"> escape@exsus.com.</a>
            </p>
            <p class="mb-4">Thank you once again for getting in touch.</p>
            <p class="mb-4">The Exsus team</p>
            <p>
              Opening hours: Monday to Thursday 08:30am-6pm GMT and 9am-5pm GMT
              on Fridays
            </p>
          </div>
        </div>
      </section>
      {/* <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3 text-center text-white">
            <h1 class="display-4">Thank You!</h1>
            <p class="lead mt-3">Your submission has been received.</p>
            <a href="/" class="btn btn-success btn-md m-3">Back to Home</a>
          </div>
        </div>
      </div> */}
    </Layout>
  );
}
