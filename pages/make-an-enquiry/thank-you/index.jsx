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
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6 offset-md-3 text-center text-white">
            <h1 class="display-4">Thank You!</h1>
            <p class="lead mt-3">Your submission has been received.</p>
            <a href="/" class="btn btn-success btn-md m-3">Back to Home</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
