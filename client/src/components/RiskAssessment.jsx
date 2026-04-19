import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RiskAssessment = ({ riskMetrics }) => {
  const [displayMetrics, setDisplayMetrics] = useState({});

  const stats = [
    { key: "riskScore", label: "Risk", icon: "⚠️" },
    { key: "documentComplexity", label: "Doc", icon: "📄" },
    { key: "complianceDifficulty", label: "Comp", icon: "⚙️" },
    { key: "timeToCompliance", label: "Time", icon: "⏱️" },
    { key: "costImpact", label: "Cost", icon: "💰" },
  ];

  const defaultMetrics = {
    riskScore: riskMetrics?.riskScore || 0,
    documentComplexity: riskMetrics?.documentComplexity || 0,
    complianceDifficulty: riskMetrics?.complianceDifficulty || 0,
    timeToCompliance: riskMetrics?.timeToCompliance || 0,
    costImpact: riskMetrics?.costImpact || 0,
  };

  // Animate values
  useEffect(() => {
    const metricNames = Object.keys(defaultMetrics);

    metricNames.forEach((metric) => {
      const target = defaultMetrics[metric];
      let current = 0;

      const interval = setInterval(() => {
        if (current < target) {
          current += 1;
          setDisplayMetrics((prev) => ({
            ...prev,
            [metric]: current,
          }));
        } else {
          clearInterval(interval);
        }
      }, Math.max(10, 1200 / (target || 1)));
    });
  }, []);

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 100;

  // 🔥 Radar polygon (MAIN FIX)
  const polygonPoints = stats
    .map((stat, index) => {
      const angle = (index * 360) / 5 - 90;
      const value = displayMetrics[stat.key] || 0;

      const radius = (value / 100) * maxRadius;

      const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "20px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
        }}
      >
        <svg width="300" height="300">
          {/* Grid Levels */}
          {[20, 40, 60, 80, 100].map((level, i) => {
            const r = (level / 100) * maxRadius;

            const points = stats
              .map((_, index) => {
                const angle = (index * 360) / 5 - 90;
                const x = centerX + r * Math.cos((angle * Math.PI) / 180);
                const y = centerY + r * Math.sin((angle * Math.PI) / 180);
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <polygon
                key={i}
                points={points}
                fill="none"
                stroke="rgba(148,163,184,0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis lines */}
          {stats.map((_, index) => {
            const angle = (index * 360) / 5 - 90;
            const x = centerX + maxRadius * Math.cos((angle * Math.PI) / 180);
            const y = centerY + maxRadius * Math.sin((angle * Math.PI) / 180);

            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(148,163,184,0.3)"
              />
            );
          })}

          {/* 🔥 Filled Radar Shape */}
          <polygon
            points={polygonPoints}
            fill="rgba(99,102,241,0.35)"
            stroke="#6366f1"
            strokeWidth="2"
            style={{
              transition: "all 0.3s ease",
              filter: "drop-shadow(0 0 10px rgba(99,102,241,0.5))",
            }}
          />
        </svg>

        {/* Labels + Values */}
        {stats.map((stat, index) => {
          const angle = (index * 360) / 5 - 90;
          const labelRadius = 120;

          const x = centerX + labelRadius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + labelRadius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={stat.key}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#cbd5f5",
                fontSize: "12px",
              }}
            >
              <div style={{ fontSize: "18px" }}>{stat.icon}</div>
              <div>{displayMetrics[stat.key] || 0}</div>
              <div style={{ fontSize: "10px", opacity: 0.7 }}>
                {stat.label}
              </div>
            </div>
          );
        })}

        {/* Center Score */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#a5b4fc",
            }}
          >
            {displayMetrics.riskScore || 0}%
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>RISK</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskAssessment;