import Link from "next/link";

export default function Privacy() {
    return <div className="flex flex-col justify-center items-center">
        <h1 className=" text-2xl">Privacy Policy for WrenchWorks</h1>
        <div className="flex flex-col justify-center items-center">WrenchWorks is committed to protecting your privacy. Please read this Privacy Policy carefully to understand our practices regarding your personal data.
            <div className="flex flex-col justify-center items-center">
                <span>Collection of Personal Information:</span>
                We may collect personal information from you when you visit our website, interact with our content, or fill out forms on our site. The types of personal information we may collect include:

                1. Information provided by you: This includes your name, email address, and any other information you voluntarily provide when submitting forms or communicating with us.

                2. Log data: Like many other websites, we collect information that your browser sends whenever you visit our site. This may include your IP address, browser type and version, pages you visit, time and date of your visit, and other statistics.
                <div className="flex flex-col justify-center items-center">
                    Use of Personal Information:
                    We may use the personal information we collect for the following purposes:

                    1. To personalize your experience: We may use your information to understand your preferences and provide personalized content, services, and advertisements.

                    2. To improve our website: We strive to continually improve our website based on the feedback and information we receive from you.

                    3. To send periodic emails: If you have provided your email address, we may use it to send you information, updates, and promotional materials related to our website. You can always opt-out of receiving these emails by following the unsubscribe instructions provided in each email.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Disclosure of Personal Information:
                    We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent. However, we may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as they agree to keep your information confidential.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Google AdSense:
                    We have implemented Google AdSense on our website to display advertisements. Google AdSense uses cookies to serve ads based on your visit to our website and other sites on the Internet. These cookies enable Google and its partners to provide you with more relevant ads based on your browsing history and interests. To learn more about how Google uses and protects your information, please review the Google Privacy Policy.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Third-Party Websites:
                    Our website may contain links to third-party websites. These websites have their own privacy policies, and we have no responsibility or liability for their content or activities. We encourage you to review the privacy policies of those websites before providing any personal information.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Data Security:
                    We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Changes to the Privacy Policy:
                    We reserve the right to modify or update this Privacy Policy at any time. Any changes to the Privacy Policy will be posted on this page with a revised &quot;Last Updated&quot; date.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Contact Us:
                    If you have any questions or concerns regarding this Privacy Policy, please contact us at <Link href="/contact_us">website</Link>.
                </div>
                <div className="flex flex-col justify-center items-center">
                    By using our website, you consent to the terms of this Privacy Policy and agree to its conditions.
                </div>
                <div className="flex flex-col justify-center items-center">
                    Last Updated: 9th July, 2023
                </div>
            </div>
        </div>
    </div>
}