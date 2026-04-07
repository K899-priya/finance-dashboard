import { motion as _motion } from "framer-motion";
import { FaChartLine, FaWallet, FaShieldAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="text-white">

     
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-b from-[#020617] via-[#0f172a] to-[#020617]">
        <_motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Smart Finance Dashboard
        </_motion.h1>

        <_motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-400 max-w-xl"
        >
          Track expenses, analyze spending, and visualize your financial growth
          with real-time insights.
        </_motion.p>

        <_motion.a
          href="/dashboard"
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-blue-600 rounded-lg shadow-lg"
        >
          Get Started
        </_motion.a>
      </section>

     
      <section className="py-20 px-6">
        <h2 className="text-3xl text-center mb-10 text-green-400">
          Live Market Trends
        </h2>

        <div className="max-w-4xl mx-auto">
          
          
        </div>
      </section>

     
      <section className="py-20 bg-white/5 backdrop-blur-lg">
        <h2 className="text-3xl text-center mb-10">Features</h2>

        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {[
            {
              icon: <FaChartLine />,
              title: "Analytics",
              desc: "Visualize spending trends with charts",
            },
            {
              icon: <FaWallet />,
              title: "Transactions",
              desc: "Manage and track your finances easily",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure",
              desc: "Safe and reliable local data storage",
            },
          ].map((item, i) => (
            <_motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-xl text-center shadow"
            >
              <div className="text-2xl text-blue-400 mb-2">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </_motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-400">
          We aim to simplify personal finance management by providing
          intuitive dashboards, real-time insights, and seamless user
          experience. This platform helps users make smarter financial decisions.
        </p>
      </section>

    
      <section className="py-20 text-center bg-blue-600/10">
        <h2 className="text-3xl mb-4">Start Managing Your Finance Today</h2>
        <a
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 rounded-lg"
        >
          Go to Dashboard
        </a>
      </section>

    
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2026 Finance Dashboard | @kumari_priya
      </footer>
    </div>
  );
}