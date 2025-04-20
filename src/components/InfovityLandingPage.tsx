import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Award,
  BookOpen,
  Users,
  ArrowRight,
  Moon,
  Sun,
  Globe,
  UserCheck,
  Lightbulb,
  BarChart,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface FormData {
  name: string;
  email: string;
  phone: string;
  topic: string;
}

interface Topic {
  id: string;
  name: string;
  date: string;
  time: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface WebinarDetails {
  title: string;
  date: string;
  time: string;
}

export default function InfovityLandingPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    topic: "uk-education",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [webinarDetails, setWebinarDetails] = useState<WebinarDetails | null>(
    null
  );

  useEffect(() => {
    // Apply dark mode to document when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Call our Express API endpoint
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          consentGiven: true, // Based on the checkbox in the form
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      console.log("Registration successful:", result);

      // Store webinar details for the thank you page
      setWebinarDetails(result.webinarInfo);

      // Show success message
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      // Safe type casting for the error
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An error occurred during registration";
      setErrorMessage(errorMsg);
    }
  };

  const topics: Topic[] = [
    {
      id: "uk-education",
      name: "Education in the UK",
      date: "May 3, 2025",
      time: "7:00 PM IST",
    },
    {
      id: "finance",
      name: "Financial Planning for International Education",
      date: "May 10, 2025",
      time: "7:00 PM IST",
    },
    {
      id: "salesforce",
      name: "Salesforce Careers: Skills & Opportunities",
      date: "May 17, 2025",
      time: "7:00 PM IST",
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: (
        <BookOpen
          className={`h-6 w-6 ${
            darkMode ? "text-indigo-400" : "text-indigo-500"
          }`}
        />
      ),
      title: "Expert Knowledge",
      description: "Learn from industry specialists with years of experience",
    },
    {
      icon: (
        <Users
          className={`h-6 w-6 ${
            darkMode ? "text-indigo-400" : "text-indigo-500"
          }`}
        />
      ),
      title: "Interactive Sessions",
      description: "Ask questions and get personalized advice",
    },
    {
      icon: (
        <Award
          className={`h-6 w-6 ${
            darkMode ? "text-indigo-400" : "text-indigo-500"
          }`}
        />
      ),
      title: "Exclusive Resources",
      description: "Get access to guides and tools not available elsewhere",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Priya Shah",
      role: "Parent",
      text: "The webinar provided exactly the information we needed for our daughter's UK university applications.",
    },
    {
      name: "Raj Mehta",
      role: "Student",
      text: "I learned more in one hour than in weeks of researching online. The mock tests were especially helpful.",
    },
  ];

  const selectedTopic = topics.find((topic) => topic.id === formData.topic);

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-white to-blue-50"
      }`}>
      {/* Header */}
      <header className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div
            className={`font-bold text-2xl ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}>
            Infovity
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-100 text-gray-700"
              }`}
              aria-label="Toggle dark mode">
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <a
              href="#register"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                darkMode
                  ? "bg-indigo-700 hover:bg-indigo-800"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}>
              Register Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div
            className={`absolute -top-16 -right-16 w-64 h-64 rounded-full ${
              darkMode ? "bg-indigo-900/20" : "bg-indigo-100"
            }`}></div>
          <div
            className={`absolute top-32 -left-16 w-80 h-80 rounded-full ${
              darkMode ? "bg-blue-900/20" : "bg-blue-50"
            }`}></div>
          <div
            className={`absolute bottom-0 right-0 w-72 h-72 rounded-full ${
              darkMode ? "bg-purple-900/20" : "bg-purple-50"
            }`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:flex items-center justify-between">
            <div className="md:w-1/2 md:text-left mb-8 md:mb-0">
              <h1
                className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                <span className="block">Transform Your Future with</span>
                <span
                  className={`block ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}>
                  Expert-Led Webinars
                </span>
              </h1>
              <p
                className={`mt-6 max-w-xl mx-auto md:mx-0 text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                Join our exclusive online sessions on UK Education, Finance, and
                Career Development
              </p>
              <div className="mt-8 flex md:justify-start justify-center">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="#register"
                    className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                      darkMode
                        ? "bg-indigo-700 hover:bg-indigo-800"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}>
                    Secure Your Spot
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hero image illustration */}
            <div className="md:w-1/2 flex justify-center">
              <div
                className={`rounded-lg overflow-hidden shadow-xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } p-6 flex items-center justify-center w-full max-w-md`}>
                <div className="relative w-full aspect-video">
                  {/* Virtual classroom illustration */}
                  <div
                    className={`absolute inset-0 rounded-md ${
                      darkMode ? "bg-gray-700" : "bg-blue-50"
                    } flex items-center justify-center`}>
                    <div className="grid grid-cols-3 gap-3 p-4 w-full max-w-xs">
                      {/* Instructor */}
                      <div
                        className={`col-span-3 h-16 rounded-lg ${
                          darkMode ? "bg-indigo-900" : "bg-indigo-100"
                        } flex items-center justify-center`}>
                        <Users
                          className={`h-8 w-8 ${
                            darkMode ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                      </div>

                      {/* Students */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-12 rounded-lg ${
                            darkMode ? "bg-gray-600" : "bg-white"
                          } flex items-center justify-center shadow-sm`}>
                          <UserCheck
                            className={`h-6 w-6 ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                        </div>
                      ))}

                      {/* Statistics */}
                      <div
                        className={`col-span-3 h-12 rounded-lg ${
                          darkMode ? "bg-gray-600" : "bg-white"
                        } flex items-center justify-around shadow-sm mt-2`}>
                        <Globe
                          className={`h-5 w-5 ${
                            darkMode ? "text-green-400" : "text-green-600"
                          }`}
                        />
                        <BarChart
                          className={`h-5 w-5 ${
                            darkMode ? "text-yellow-400" : "text-yellow-600"
                          }`}
                        />
                        <Lightbulb
                          className={`h-5 w-5 ${
                            darkMode ? "text-red-400" : "text-red-600"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-extrabold text-center ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-12`}>
            Upcoming Webinars
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } rounded-lg shadow-md overflow-hidden border ${
                  darkMode ? "border-gray-600" : "border-gray-100"
                } transition-all hover:shadow-lg`}>
                <div className="p-6">
                  {/* Topic header with icon illustration */}
                  <div className="mb-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                        topic.id === "uk-education"
                          ? darkMode
                            ? "bg-blue-900/30 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                          : topic.id === "finance"
                          ? darkMode
                            ? "bg-green-900/30 text-green-400"
                            : "bg-green-100 text-green-600"
                          : darkMode
                          ? "bg-purple-900/30 text-purple-400"
                          : "bg-purple-100 text-purple-600"
                      }`}>
                      {topic.id === "uk-education" ? (
                        <Globe className="h-8 w-8" />
                      ) : topic.id === "finance" ? (
                        <BarChart className="h-8 w-8" />
                      ) : (
                        <Lightbulb className="h-8 w-8" />
                      )}
                    </div>
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      } mb-2`}>
                      {topic.name}
                    </h3>
                  </div>
                  <div
                    className={`flex items-center ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    } mb-4`}>
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {topic.date} • {topic.time}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Expert-led presentation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Q&A session
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Exclusive resources
                      </span>
                    </li>
                  </ul>
                  <div
                    className={`pt-4 border-t ${
                      darkMode ? "border-gray-600" : "border-gray-100"
                    }`}>
                    <a
                      href="#register"
                      onClick={() =>
                        setFormData({ ...formData, topic: topic.id })
                      }
                      className={`block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                        darkMode
                          ? "text-indigo-400 bg-indigo-900/30 hover:bg-indigo-900/50"
                          : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                      }`}>
                      Register for this Webinar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-12 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-extrabold text-center ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-12`}>
            Why Attend Our Webinars
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow p-6 relative overflow-hidden`}>
                {/* Background decoration */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-bl-3xl ${
                    index === 0
                      ? darkMode
                        ? "bg-blue-900/10"
                        : "bg-blue-50"
                      : index === 1
                      ? darkMode
                        ? "bg-purple-900/10"
                        : "bg-purple-50"
                      : darkMode
                      ? "bg-indigo-900/10"
                      : "bg-indigo-50"
                  }`}></div>

                <div className="relative z-10">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-2`}>
                    {benefit.title}
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-extrabold text-center ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-12`}>
            What Our Attendees Say
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } rounded-lg p-6 relative`}>
                {/* Quotation mark decoration */}
                <div
                  className={`absolute top-4 right-4 text-6xl leading-none ${
                    darkMode ? "text-gray-600" : "text-gray-200"
                  } font-serif`}>
                  "
                </div>

                <div className="relative">
                  {/* Avatar placeholder */}
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full mr-4 flex items-center justify-center ${
                        darkMode ? "bg-gray-600" : "bg-white"
                      }`}>
                      <span
                        className={`text-xl font-bold ${
                          darkMode ? "text-gray-300" : "text-gray-500"
                        }`}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div
                        className={`font-medium ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                        {testimonial.name}
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } italic mb-4`}>
                    "{testimonial.text}"
                  </p>
                  {/* Star rating visualization */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="register"
        className={`py-16 ${
          darkMode ? "bg-indigo-900/20" : "bg-indigo-50"
        } relative overflow-hidden`}>
        {/* Visual elements for the form section */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-64 h-64 rounded-br-full ${
              darkMode ? "bg-indigo-800/20" : "bg-indigo-100"
            }`}></div>
          <div
            className={`absolute bottom-0 right-0 w-64 h-64 rounded-tl-full ${
              darkMode ? "bg-blue-800/20" : "bg-blue-100"
            }`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2
              className={`text-3xl font-extrabold text-center ${
                darkMode ? "text-white" : "text-gray-900"
              } mb-6`}>
              Register for Our Webinar
            </h2>
            <p
              className={`text-center ${
                darkMode ? "text-gray-300" : "text-gray-600"
              } mb-8`}>
              Secure your spot for our upcoming session on {selectedTopic?.name}
            </p>

            {isSubmitted ? (
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md rounded-lg p-8`}>
                {/* Success icon and heading */}
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 ${
                      darkMode ? "bg-green-900/20" : "bg-green-100"
                    } rounded-full mb-6`}>
                    <CheckCircle
                      className={`h-10 w-10 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-2`}>
                    Registration Successful!
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } text-lg`}>
                    Thank you for registering, {formData.name}.
                  </p>
                </div>

                {/* Webinar details */}
                <div
                  className={`mb-8 p-6 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}>
                  <h4
                    className={`text-lg font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-4`}>
                    Your Webinar Details
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar
                        className={`h-5 w-5 ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        } mt-0.5 mr-3 flex-shrink-0`}
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {webinarDetails?.title || selectedTopic?.name}
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                          {webinarDetails?.date || selectedTopic?.date} at{" "}
                          {webinarDetails?.time || selectedTopic?.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users
                        className={`h-5 w-5 ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        } mt-0.5 mr-3 flex-shrink-0`}
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          Hosted by Infovity Experts
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                          Join 15 minutes early for technical setup
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Globe
                        className={`h-5 w-5 ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        } mt-0.5 mr-3 flex-shrink-0`}
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          Online Zoom Webinar
                        </p>
                        <p
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                          Access link has been sent to {formData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next steps */}
                <div className="mb-8">
                  <h4
                    className={`text-lg font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-3`}>
                    What's Next?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          darkMode ? "text-green-400" : "text-green-600"
                        } mr-2 mt-0.5`}
                      />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Check your email for webinar access details
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          darkMode ? "text-green-400" : "text-green-600"
                        } mr-2 mt-0.5`}
                      />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Add the event to your calendar
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          darkMode ? "text-green-400" : "text-green-600"
                        } mr-2 mt-0.5`}
                      />
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                        Prepare any questions you'd like to ask during the Q&A
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        topic: "uk-education",
                      });
                      setWebinarDetails(null);
                    }}
                    className={`px-4 py-2 border text-sm font-medium rounded-md ${
                      darkMode
                        ? "text-indigo-400 bg-gray-700 hover:bg-gray-600 border-gray-600"
                        : "text-indigo-600 bg-white hover:bg-indigo-50 border-indigo-200"
                    } flex-1 sm:flex-none`}>
                    Register for Another Webinar
                  </button>

                  <a
                    href={`mailto:?subject=Join%20me%20for%20${encodeURIComponent(
                      selectedTopic?.name || "an Infovity webinar"
                    )}&body=I've%20registered%20for%20this%20webinar%20and%20thought%20you%20might%20be%20interested%20too!%0A%0AWebinar:%20${encodeURIComponent(
                      selectedTopic?.name || ""
                    )}`}
                    className={`px-4 py-2 border text-sm font-medium rounded-md ${
                      darkMode
                        ? "border-gray-600 text-white bg-indigo-700 hover:bg-indigo-800"
                        : "border-transparent text-white bg-indigo-600 hover:bg-indigo-700"
                    } flex-1 sm:flex-none text-center`}>
                    Invite a Friend
                  </a>
                </div>
              </div>
            ) : (
              <div
                className={`${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-md rounded-lg p-8`}>
                {/* Error message display */}
                {errorMessage && (
                  <div
                    className={`mb-6 p-4 rounded-md ${
                      darkMode
                        ? "bg-red-900/30 text-red-300"
                        : "bg-red-50 text-red-700"
                    }`}>
                    <p>{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Rest of your form remains the same */}
                  <div className="mb-6">
                    <label
                      htmlFor="topic"
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}>
                      Select Webinar
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                      required>
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name} - {topic.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } mb-1`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                      required
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      className={`h-4 w-4 focus:ring-indigo-500 rounded ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-indigo-500"
                          : "border-gray-300 text-indigo-600"
                      }`}
                      required
                    />
                    <label
                      htmlFor="privacy"
                      className={`ml-2 block text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                      I agree to receive emails about Infovity webinars and
                      services
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      darkMode
                        ? "bg-indigo-700 hover:bg-indigo-800"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75`}>
                    {isSubmitting ? "Processing..." : "Secure Your Spot"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-800"} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-300 text-sm">
            <p className="mb-2">© 2025 Infovity. All rights reserved.</p>
            <p>
              Contact us: info@infovity.com | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
