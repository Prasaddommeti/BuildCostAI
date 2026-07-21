import "./Home.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Calculator, Building2 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <Building2 size={28} />
          <span>BuildCost AI</span>
        </div>

        <button
          className="login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          AI Powered Construction
          <br />
          Cost Estimator
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
        >
          Estimate your building cost in seconds using Artificial Intelligence.
        </motion.p>

        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
          <ArrowRight size={20} />
        </button>

      </section>

      {/* Features */}

      <section className="features">

        <div className="card">

          <Brain size={45} />

          <h3>AI Estimation</h3>

          <p>
            Smart AI predicts your total construction cost.
          </p>

        </div>

        <div className="card">

          <Calculator size={45} />

          <h3>Instant Reports</h3>

          <p>
            Material, labour and total project cost.
          </p>

        </div>

        <div className="card">

          <Building2 size={45} />

          <h3>Smart Planning</h3>

          <p>
            Make better construction decisions before spending.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Home;