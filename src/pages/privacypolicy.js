import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { posterSmall } from "@/img";
export default function Privacy() {
  return (
    <>
      <Head>
        <title>WrenchWorks - Privacy Policy</title>
        <meta name="description" content="WrenchWorks - Privacy Policy" />
      </Head>
      <div className=" p-5">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] background-design" />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row justify-center items-center w-full h-16">
            <Link href="/">
              <Image alt="poster" src={posterSmall} width={200} height={100} />
            </Link>
          </div>
        </div>
        <h1 className="text-3xl pspan">Privacy Policy for WrenchWorks</h1>
        <div className="flex flex-col justify-between">
          <span className="text-xl">
            <Link href="/">wrenchworks.tech </Link>
            is committed to protecting your privacy.
          </span>
          <span className="text-xl">
            Please read this Privacy Policy carefully to understand our
            practices regarding your personal data.
          </span>
          <div className="flex flex-col justify-center ">
            <span className="text-xl pspan">
              Collection of Personal Information:
            </span>
            We may collect personal information from you when you visit our
            website, interact with our content, or fill out forms on our site.
            The types of personal information we may collect include:
            <ul className="list-disc list-inside ml-3">
              <li className="flex flex-col justify-center">
                <span className="text-lg pspan">
                  Information provided by you:
                </span>
                This includes your name, email address, and any other
                information you voluntarily provide when submitting forms or
                communicating with us.
              </li>
              <li className="flex flex-col justify-center">
                <span className="text-lg pspan">Log data:</span>
                Like many other websites, we collect information that your
                browser sends whenever you visit our site. This may include your
                IP address, browser type and version, pages you visit, time and
                date of your visit, and other statistics.This information helps
                us analyze website performance and improve user experience.
              </li>
            </ul>
            <div className="flex flex-col justify-center">
              <span className="text-xl pspan">Legal Basis for Processing </span>
              We process personal information based on the following legal
              grounds:
              <ul className="list-disc list-inside ml-3">
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Consent:</span>
                  We may collect and process personal information based on user
                  consent, which is obtained through clear affirmative actions
                  such as checkbox opt-ins or consent forms.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Contractual Necessity:</span>
                  When personal information is necessary to fulfill a contract
                  with users, such as providing requested services or products,
                  we process the data accordingly.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Legitimate Interests:</span>
                  We may process personal information based on our legitimate
                  interests, provided they are not overridden by the rights and
                  freedoms of users.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">
                Use of Personal Information:
              </span>
              We may use the personal information we collect for the following
              purposes:
              <ul className="list-disc list-inside ml-3">
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">
                    To personalize your experience:
                  </span>
                  We may use your information to understand your preferences and
                  provide personalized content, services, and advertisements.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">To improve our website:</span>
                  We strive to continually improve our website based on the
                  feedback and information we receive from you.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">
                    To send periodic emails:
                  </span>
                  If you have provided your email address, we may use it to send
                  you information, updates, and promotional materials related to
                  our website. You can always opt-out of receiving these emails
                  by following the unsubscribe instructions provided in each
                  email.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">
                Disclosure of Personal Information:
              </span>
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties without your consent. However, we
              may share your information with trusted third parties who assist
              us in operating our website, conducting our business, or servicing
              you, as long as they agree to keep your information confidential.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Google AdSense:</span>
              We have implemented Google AdSense on our website to display
              advertisements. Google AdSense uses cookies to serve ads based on
              your visit to our website and other sites on the Internet. These
              cookies enable Google and its partners to provide you with more
              relevant ads based on your browsing history and interests. To
              learn more about how Google uses and protects your information,
              please review the Google Privacy Policy.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Third-Party Websites:</span>
              Our website may contain links to third-party websites. These
              websites have their own privacy policies, and we have no
              responsibility or liability for their content or activities. We
              encourage you to review the privacy policies of those websites
              before providing any personal information.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Legal Requirements:</span>
              We may disclose personal information if required to comply with
              applicable laws, regulations, legal processes, or enforceable
              governmental requests.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Business Transfers:</span>
              In the event of a merger, acquisition, or sale of assets, personal
              information may be transferred to the acquiring entity or
              successor.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Data Subject Rights </span>
              In accordance with GDPR and CPRA, users have the following rights:
              <ul className="list-disc list-inside ml-3">
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Access:</span>
                  Users can request access to their personal information held by
                  us.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan"> Rectification:</span>
                  Users can request correction of any inaccurate or incomplete
                  personal information.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Erasure:</span>
                  Users can request the deletion of their personal information
                  under certain circumstances.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Restriction:</span>
                  Users can request the restriction of processing of their
                  personal information in certain situations.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Data Portability:</span>
                  Users can request a copy of their personal information in a
                  structured, commonly used, and machine-readable format.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">Objection: </span>
                  Users can object to the processing of their personal
                  information based on legitimate interests.
                </li>
                <li className="flex flex-col justify-center">
                  <span className="text-lg pspan">
                    Automated Decision-Making:
                  </span>
                  Users have the right not to be subject to decisions based
                  solely on automated processing, including profiling, which
                  produce legal effects or similarly significantly affect them.
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Data Security:</span>
              We implement appropriate security measures to protect against
              unauthorized access, alteration, disclosure, or destruction of
              your personal information. However, please note that no method of
              transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">
                Cookies and Tracking Technologies
              </span>
              Our website uses cookies and similar tracking technologies to
              enhance user experience, analyze website usage, and provide
              personalized content. Users can manage their cookie preferences
              through their browser settings.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Data Transfers</span>
              If personal information is transferred to countries outside the
              European Economic Area (EEA) or California, we ensure adequate
              safeguards are in place to protect the data, such as Standard
              Contractual Clauses or approved certification mechanisms.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">Children&apos;s Privacy</span>
              Our website is not directed to individuals under the age of 16. We
              do not knowingly collect personal information from children. If we
              become aware of any personal information collected from a child,
              we will promptly take steps to delete it.
            </div>
            <div className="flex flex-col justify-center ">
              <span className="text-xl pspan">
                Changes to the Privacy Policy:
              </span>
              We reserve the right to modify or update this Privacy Policy at
              any time. Any changes to the Privacy Policy will be posted on this
              page with a revised &quot;Last Updated&quot; date.
            </div>
            <div className="">
              <span className="text-xl pspan">Contact Us: </span>
              If you have any questions or concerns regarding this Privacy
              Policy, please contact us at
              <Link href="/contactus">wrenchworks.tech</Link>
            </div>
            <div className="flex flex-col justify-center ">
              By using our website, you consent to the terms of this Privacy
              Policy and agree to its conditions.
            </div>
            <div className="flex flex-col justify-center ">
              Last Updated: 15th July, 2023
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
