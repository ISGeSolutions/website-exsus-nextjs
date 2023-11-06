import { useState, useEffect } from "react";
import { Link, Spinner, Signup, FriendlyUrl } from "components";
import { Layout } from "components/users";
import { careeratexsusService } from "services";
import Head from "next/head";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [careerData, setCareerData] = useState(null);
  const [headingTag, setHeadingTag] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDescription, setMetaDescription] = useState(null);
  const [longText, setLongText] = useState(null);
  const [rightHeader, setRightHeader] = useState(null);
  const [rightCornet, setRightContent] = useState(null);

  useEffect(() => {
    // userService.getAll().then(x => setUsers(x));

    careeratexsusService
      .getCareerPage()
      .then((x) => {
        setCareerData(x.data[0]);
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
              console.log(element?.attributes?.content_value);
              setLongText(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Header") {
              setRightHeader(element?.attributes?.content_value);
            } else if (element?.attributes?.content_name == "Right_Corner") {
              setRightContent(element?.attributes?.content_value);
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
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription}></meta>
      </Head>
      <section className="trvl_info_row">
        <div className="container">
          <div className="bookmark_row">
            <FriendlyUrl
              data={"Home / " + careerData?.attributes?.page_friendly_url}
            ></FriendlyUrl>
            {/* <ul>
              <li>
                <a href="homepage.html">Home</a>
              </li>
              <li>
                <a href="about_us.html">About us</a>
              </li>
              <li>Careers</li>
            </ul> */}
          </div>
          <div className="trvl_info_cntnt">
            <h2 className="trvl_title">{headingTag}</h2>
            <p
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: longText }}
            />
          </div>
          <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">
              Sales & Marketing Support (Assistant Level)
            </h2>
            <p className="mb-4">
              Are you passionate about travelling? Keen to work in the travel
              and leisure industry? If so, an exciting job opportunity has
              arisen to join Exsus Travel in Sales and Marketing Support.
            </p>
            <p className="mb-4">
              This is an excellent opportunity to get involved in all aspects of
              the daily running of Exsus Travel.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>On the sales side, duties may include:</p>
                  <ul>
                    <li>Working on the travel booking system</li>
                    <li>Assisting with drafting quotes for clients</li>
                    <li>Sourcing and logging imagery/video footage</li>
                    <li>
                      Checking and editing travel itineraries as necessary
                    </li>
                    <li>
                      Researching and fact-checking practical information, such
                      as for transfers and excursions
                    </li>
                    <li>
                      Preparing, printing, and sending itineraries and travel
                      wallets to our clients
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>On the marketing side, duties may include:</p>
                  <ul>
                    <li>
                      Using the Content Management System to update content and
                      images on the website
                    </li>
                    <li>Copywriting, such as for hotels and itineraries</li>
                    <li>Writing and posting social media content</li>
                    <li>Helping to upload marketing offers to various sites</li>
                    <li>
                      Assisting the Marketing Manager with adhoc duties as
                      required
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              No two days are the same, and there will be a range of other
              miscellaneous tasks to assist with as and when they come up.
            </p>
            <p className="mb-4">
              This position is ideal for someone who has a passion for travel,
              an eye for writing inspiring content, and is a hard-working
              all-rounder. In return, you’ll learn about all aspects of sales
              and marketing.
            </p>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="careers_list_blk">
                  <p>Desired skills & requirements:</p>
                  <ul>
                    <li>
                      Must have excellent copywriting skills and an eye for
                      attention to detail.
                    </li>
                    <li>
                      Must be well-organised and be able to multi-task under
                      pressure.
                    </li>
                    <li>Possess a passion for travel and tourism</li>
                    <li>Be creative minded</li>
                    <li>
                      Have a willingness to learn (we sell over 90 destinations
                      worldwide with lots of travel content to get to grips
                      with!)
                    </li>
                    <li>
                      Some background in copywriting is preferred, though you
                      will be given training as needed
                    </li>
                    <li>
                      Prior experience working in a sales or marketing is
                      preferred but not a pre-requisite
                    </li>
                    <li>
                      Must have excellent copywriting skills and a high
                      attention to detail. You must be well-organised and be
                      able to multi-task under pressure
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">Accounts Assistant</h2>
            <p className="mb-4">
              A great opportunity has arisen to join Exsus Travel as an Accounts
              Assistant. The purpose of this role is to support the Finance
              Director to deliver all financial requirements of the business.
            </p>
            <p className="mb-4">
              This position would suit someone who has either recently graduated
              university with an accounts degree or has some experience working
              in a finance department.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Key Responsibilities:</p>
                  <ul>
                    <li>Posting and reconciliation of all bank transactions</li>
                    <li>
                      Posting of supplier invoices and making payments to
                      suppliers
                    </li>
                    <li>Checking and posting credit card transactions</li>
                    <li>Support with preparing management accounts</li>
                    <li>
                      Support the Finance Director with any ad-hoc activities
                      and admin as necessary
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Key Requirements:</p>
                  <ul>
                    <li>Strong MS Excel skills</li>
                    <li>Highly numerate</li>
                    <li>Must have a good basic knowledge of a Trial Balance</li>
                    <li>
                      Must be a confident communicator, as you will regularly
                      liaise with the sales team and our suppliers
                    </li>
                    <li>
                      Some knowledge of accounting software is preferred, though
                      you will be given training as needed
                    </li>
                    <li>
                      Prior experience working in a finance department is
                      preferred but not a pre-requisite
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              To apply, please send your CV and cover letter to{" "}
              <a href="#">recruitment@exsus.com</a>
            </p>
          </div>
          <div className="trvl_info_cntnt">
            <h2 className="trvl_title_white">
              Travel Sales Specialist (various destinations WORLDWIDE)
            </h2>
            <p className="mb-4">
              We are looking for a travel sales specialist to join our busy
              team, covering various destinations worldwide. If you share our
              passion for travel, have at least two years' travel sales
              experience (ideally in the luxury sector) and love creating
              unique, inspirational trips, we would love to hear from you.
            </p>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>
                    Reporting to the Head of Sales, your key responsibilities
                    will be:
                  </p>
                  <ul>
                    <li>
                      To work closely with high-end, discerning clients to
                      create tailor-made trips using your first-hand knowledge
                      and personal expertise
                    </li>
                    <li>
                      To respond quickly to new enquiries, build rapport with
                      clients and show a good understanding of your clients'
                      needs
                    </li>
                    <li>To design innovative and inspiring itineraries</li>
                    <li>
                      To work closely with our marketing team to provide insight
                      into new product and share ideas about your specialist
                      area/s
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="careers_list_blk">
                  <p>Desired skills and experience:</p>
                  <ul>
                    <li>
                      At least two years' previous sales experience within the
                      travel industry, preferably the luxury sector
                    </li>
                    <li>
                      To be target motivated whilst delivering a high level of
                      customer service
                    </li>
                    <li>
                      To have a proven track record of achieving monthly and
                      quarterly sales targets
                    </li>
                    <li>To have a high level of commercial acumen</li>
                    <li>To have the ability to work well under pressure</li>
                    <li>
                      To possess excellent communication skills – both written
                      and verbal
                    </li>
                    <li>
                      To be passionate about travel, with a curiosity to learn
                      about new regions and develop your expertise
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-4">
              To apply, please send your CV and cover letter, stating clearly
              which area/s you specialise in, to{" "}
              <a href="#">recruitment@exsus.com </a>
            </p>
          </div>
        </div>
      </section>

      <section className="make_enqury_row">
        <div className="container">
          <h3>YOUR JOURNEY STARTS HERE</h3>
          <p>call us on 020 7337 9010 to start planning your perfect trip</p>
          <button
            className="btn prmry_btn make_enqury_btn"
            onClick="window.open('contact_us.html')"
          >
            Make an enquiry
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 267 512.43"
            >
              <path
                fillRule="nonzero"
                d="M3.22 18.9c-4.28-4.3-4.3-11.31-.04-15.64s11.2-4.35 15.48-.04l245.12 245.16c4.28 4.3 4.3 11.31.04 15.64L18.66 509.22a10.874 10.874 0 0 1-15.48-.05c-4.26-4.33-4.24-11.33.04-15.63L240.5 256.22 3.22 18.9z"
              />
            </svg>
          </button>
        </div>
      </section>

      <section aria-label="Sign up for newsletter" className="newslettr_row">
        <div className="container">
          <h4>Sign up for our newsletter</h4>
          <h5>Receive our latest news and special offers</h5>
          <Signup />
        </div>
      </section>
    </Layout>
  );
}
