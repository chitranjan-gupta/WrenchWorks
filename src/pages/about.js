import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { posterSmall } from "@/img";
export default function About() {
  return (
    <>
      <Head>
        <title>WrenchWorks - About Us</title>
        <meta name="description" content="WrenchWorks - About Us" />
      </Head>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="absolute flex flex-col items-start justify-between w-full h-full p-5">
        <div className="w-full">
          <h1 className="text-4xl underline text-center">About us</h1>
        </div>
        <div className="flex flex-row justify-between items-center w-full h-full">
          <div className="relative w-1/2 h-60">
            <Image
              priority={true}
              src={posterSmall}
              alt="WrenchWorks's Poster"
              fill={true}
            />
          </div>
          <div className="flex flex-row justify-center items-center h-full">
            <Link href="/">
              <strong>WrenchWorks</strong>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-evenly items-start">
            <div>
              <h2>
                <strong>Introduction</strong>
              </h2>
              <p>
                Welcome to WrenchWorks, your one-stop destination for
                comprehensive car information and reliable servicing details. We
                are passionate about cars and committed to providing you with
                the most accurate and up-to-date information, helping you make
                informed decisions about your automotive needs.
              </p>
            </div>
            <div>
              <h2>
                <strong>Our Mission</strong>
              </h2>
              <p>
                At WrenchWorks, our mission is to empower car owners and
                enthusiasts with valuable resources to enhance their driving
                experience. We aim to be the go-to platform for all things
                related to cars, from researching the latest models to finding
                reputable service centers for maintenance and repairs.
              </p>
            </div>
            <div>
              <h2>
                <strong>Who We Are</strong>
              </h2>
              <p>
                We are a dedicated team of automotive enthusiasts, industry
                experts, and tech-savvy individuals who share a common love for
                cars. Our combined knowledge and passion drive us to deliver
                reliable and trustworthy content for every car owner.
              </p>
            </div>
            <div>
              <h2>
                <strong>What We Offer</strong>
              </h2>
              <div>
                <li>
                  <strong>Extensive Car Information:</strong>
                  <span>
                    Our website provides in-depth details about a wide range of
                    car makes and models. From technical specifications to
                    performance reviews, we cover it all, making it easier for
                    you to choose the perfect car that suits your lifestyle.
                  </span>
                </li>
                <li>
                  <strong>Maintenance Tips:</strong>
                  <span>
                    Keeping your car in top-notch condition is essential for a
                    smooth and safe driving experience. We offer practical
                    maintenance tips and advice to help you take care of your
                    vehicle and extend its lifespan.
                  </span>
                </li>
                <li>
                  <strong>Service Center Directory:</strong>
                  <span>
                    Finding a reliable service center for your car is crucial.
                    Our service center directory connects you with reputable and
                    authorized centers, ensuring that your car receives the best
                    care and attention it deserves.
                  </span>
                </li>
                <li>
                  <strong>User Reviews:</strong>
                  <span>
                    We encourage our community of car owners to share their
                    experiences with specific car models and service centers.
                    User reviews provide valuable insights and help others make
                    informed decisions.
                  </span>
                </li>
              </div>
            </div>
            <div>
              <h2>
                <strong>Our Commitment to Quality</strong>
              </h2>
              <p>
                At WrenchWorks, we are committed to maintaining the highest
                standards of quality and accuracy in the information we provide.
                Our team meticulously researches and verifies all content to
                ensure that you receive reliable and up-to-date data.
              </p>
            </div>
            <div>
              <h2>
                <strong>Get in Touch</strong>
              </h2>
              <p>
                We love hearing from our users and value your feedback. Whether
                you have a suggestion, query, or just want to say hello, feel
                free to get in touch with us through our
                <Link href="/contactus"> contact page</Link>. Your feedback
                helps us improve and serve you better.
              </p>
            </div>
            <div>
              <h2>
                <strong>Join Our Community</strong>
              </h2>
              <p>
                Become a part of our growing community of car enthusiasts.
                Follow us on social media platforms and subscribe to our
                newsletter to receive the latest car news, updates, and
                exclusive offers. Thank you for choosing Wrench Works. We look
                forward to assisting you on your journey to car ownership and
                ensuring your driving experiences are exceptional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
