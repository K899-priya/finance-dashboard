import { motion as _motion } from "framer-motion";
import { FaChartLine, FaWallet, FaShieldAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div className="text-white overflow-hidden">
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-b from-[#020617] via-[#0f172a] to-[#020617]">
        {/*  Glow background */}
        <div className="absolute w-125 h-125 bg-blue-500/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2"></div>

        <_motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold z-10"
        >
          Smart Finance Dashboard
        </_motion.h1>

        <_motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-400 max-w-xl z-10"
        >
          Track, analyze, and grow your finances with powerful insights.
        </_motion.p>

      </section>

      {/* MARKET SECTION */}
      <section className="py-15 px-6 text-center">
        <_motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl mb-10 text-green-400"
        >
          Live Market Trends
        </_motion.h2>

        <_motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-40 max-w-4xl mx-auto bg-linear-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl"
        />
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white/5 backdrop-blur-lg">
        <_motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-3xl text-center mb-12"
        >
          Features
        </_motion.h2>

        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto pt-2">
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
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-xl text-center shadow hover:shadow-blue-500/20 transition"
            >
              <div className="text-2xl text-blue-400 mb-2">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </_motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <_motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="p-10 space-y-6"
      >
        <h2 className="text-center md:text-center font-bold">About Us</h2>

        <p className="text-gray-400 max-w-center mx-auto leading-relaxed">
          We simplify personal finance with intuitive dashboards, real-time
          insights, and powerful analytics to help you make smarter financial
          decisions.
        </p>
      </_motion.div>

      {/* TRUST POINTS */}
      <div className="p-5 grid md:grid-cols-3 gap-6">
        {[
          { title: "Fast", desc: "Real-time insights" },
          { title: "Secure", desc: "Safe local storage" },
          { title: "Smart", desc: "AI-like analysis" },
        ].map((item, i) => (
          <_motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </_motion.div>
        ))}
      </div>

      <_motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="p-15 bg-linear-to-r from-blue-600/20 to-indigo-500/20 border border-white/10 rounded-2xl shadow-xl backdrop-blur-lg"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Start Managing Your Finance Today
        </h2>

        <p className="text-gray-400 pb-3">
          Gain full control over your money with smart tracking.
        </p>

        <_motion.a
          href="/dashboard"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-5 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </_motion.a>
      </_motion.div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2026 Finance Dashboard | @kumari_priya
      </footer>
    </div>
  );
}
