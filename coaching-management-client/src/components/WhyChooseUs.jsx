import {
  FaUniversity,
  FaChalkboardTeacher,
  FaBullseye,
  FaBell,
  FaCalendarAlt,
  FaChartLine,
  FaNetworkWired,
  FaRegClock,
} from 'react-icons/fa';
import { MdOutlineAssessment } from 'react-icons/md';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUniversity className="text-4xl text-primary" />,
      title: '64+ Branches',
      subtitle: 'In All District',
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
      title: '50+ Teachers',
      subtitle: 'Qualified & Experienced Faculty',
    },
    {
      icon: <FaBullseye className="text-4xl text-primary" />,
      title: '500+ Successes',
      subtitle: 'University Admissions Achieved',
    },
    {
      icon: (
        <div className="flex gap-2 justify-center text-primary text-3xl">
          <FaCalendarAlt />
          <FaBell />
        </div>
      ),
      title: 'Routine & Alerts',
      subtitle: 'Web Based Routine & Instant Notices',
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: 'Performance',
      subtitle: 'Tracking & Analytics Dashboard',
    },
    {
      icon: <FaNetworkWired className="text-4xl text-primary" />,
      title: 'Digital Platform',
      subtitle: 'All-in-One System for Coaching',
    },
    {
      icon: <FaRegClock className="text-4xl text-primary" />,
      title: 'Live Attendance',
      subtitle: 'Real-Time Class Attendance System',
    },
    {
      icon: <MdOutlineAssessment className="text-4xl text-primary" />,
      title: 'Academic Reports',
      subtitle: 'Smart Reporting for Students',
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-primary">Why Choose Us</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Discover how our smart coaching platform brings modern solutions to traditional challenges—backed by real results and reliable features.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-md p-6 rounded-xl text-center hover:shadow-xl hover:scale-[1.02] transition duration-300"
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;