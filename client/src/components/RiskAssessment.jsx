import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Compact Pentagon Component for side-by-side display
const CompactPentagon = ({ metrics, defaultMetrics }) => {
  const stats = [
    { key: "riskScore", label: "Risk Score", icon: "⚠️" },
    { key: "documentComplexity", label: "Doc Complexity", icon: "📄" },
    { key: "complianceDifficulty", label: "Compliance", icon: "⚙️" },
    { key: "timeToCompliance", label: "Time Required", icon: "⏱️" },
    { key: "costImpact", label: "Cost Impact", icon: "💰" },
  ];

  const getStatColor = (key, value) => {
    if (key === "riskScore") {
      if (value <= 35) return { bar: "#10b981", light: "rgba(16,185,129,0.15)", text: "#6ee7b7" };
      if (value <= 70) return { bar: "#f59e0b", light: "rgba(245,158,11,0.15)", text: "#fcd34d" };
      return { bar: "#ef4444", light: "rgba(239,68,68,0.15)", text: "#fca5a5" };
    }
    // Blue/Cyan color scheme for metrics
    if (value <= 33) return { bar: "#22d3ee", light: "rgba(34,211,238,0.15)", text: "#67e8f9" };
    if (value <= 66) return { bar: "#06b6d4", light: "rgba(6,182,212,0.15)", text: "#67e8f9" };
    return { bar: "#0891b2", light: "rgba(8,145,178,0.15)", text: "#67e8f9" };
  };

  const centerX = 130;
  const centerY = 130;
  const size = 260;

  return (
    <motion.div
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="compactPentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.12" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pentagon outline - more prominent */}
        <polygon
          points={`${centerX},30 ${centerX + 100},75 ${centerX + 65},180 ${centerX - 65},180 ${centerX - 100},75`}
          fill="url(#compactPentagonGradient)"
          stroke="#06b6d4"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Inner pentagon grid */}
        <polygon
          points={`${centerX},60 ${centerX + 75},100 ${centerX + 50},160 ${centerX - 50},160 ${centerX - 75},100`}
          fill="none"
          stroke="rgba(6,182,212,0.15)"
          strokeWidth="1"
          strokeDasharray="2,4"
        />

        {/* Lines from center to each metric */}
        {stats.map((stat, index) => {
          const angle = (index * 360) / 5 - 90;
          const radius = 95;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          const value = metrics[stat.key] || 0;
          const colors = getStatColor(stat.key, value);

          return (
            <line
              key={`line-${index}`}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={colors.bar}
              strokeWidth="1.5"
              opacity="0.5"
            />
          );
        })}

        {/* Center circle with icon */}
        <circle
          cx={centerX}
          cy={centerY}
          r="32"
          fill={
            defaultMetrics.riskScore <= 35
              ? "rgba(16,185,129,0.12)"
              : defaultMetrics.riskScore <= 70
              ? "rgba(245,158,11,0.12)"
              : "rgba(239,68,68,0.12)"
          }
          stroke={
            defaultMetrics.riskScore <= 35
              ? "#10b981"
              : defaultMetrics.riskScore <= 70
              ? "#f59e0b"
              : "#ef4444"
          }
          strokeWidth="2.5"
        />
        
        {/* Warning icon in center */}
        <text x={centerX} y={centerY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="18" fill={
          defaultMetrics.riskScore <= 35
              ? "#10b981"
              : defaultMetrics.riskScore <= 70
              ? "#f59e0b"
              : "#ef4444"
        }>
          ⚠️
        </text>
      </svg>

      {/* Center risk text */}
      <div style={{ position: "absolute", zIndex: 5, textAlign: "center", top: "50%", left: "50%", transform: "translate(-50%, calc(-50% + 28px))" }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color:
              defaultMetrics.riskScore <= 35
                ? "#6ee7b7"
                : defaultMetrics.riskScore <= 70
                ? "#fcd34d"
                : "#fca5a5",
            fontFamily: "var(--font-mono)",
            letterSpacing: "-0.02em",
          }}
        >
          {metrics.riskScore || 0}%
        </div>
      </div>

      {/* 5 Stat Points at pentagon corners */}
      {stats.map((stat, index) => {
        const angle = (index * 360) / 5 - 90;
        const radius = 95;
        const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
        const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
        const value = metrics[stat.key] || 0;
        const colors = getStatColor(stat.key, value);

        return (
          <motion.div
            key={stat.key}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
          >
            {/* Stat Box */}
            <motion.div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "10px",
                background: colors.light,
                border: `1.5px solid ${colors.bar}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                boxShadow: `0 0 16px ${colors.bar}40, inset 0 0 12px ${colors.bar}15`,
              }}
              whileHover={{ boxShadow: `0 0 24px ${colors.bar}60` }}
            >
              <span style={{ fontSize: "1.3rem", lineHeight: "1" }}>{stat.icon}</span>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: colors.text,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1",
                }}
              >
                {value}
              </span>
            </motion.div>
            {/* Label below box */}
            <div
              style={{
                marginTop: "6px",
                textAlign: "center",
                fontSize: "9px",
                fontWeight: 700,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                maxWidth: "60px",
                lineHeight: "1.2",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const RiskAssessment = ({ riskMetrics, compact = false }) => {
  const [displayMetrics, setDisplayMetrics] = useState({});

  // Default metrics structure
  const defaultMetrics = {
    riskScore: riskMetrics?.riskScore || 0,
    documentComplexity: riskMetrics?.documentComplexity || 0,
    complianceDifficulty: riskMetrics?.complianceDifficulty || 0,
    timeToCompliance: riskMetrics?.timeToCompliance || 0,
    costImpact: riskMetrics?.costImpact || 0,
  };

  // Animate metrics on mount
  useEffect(() => {
    const metricNames = Object.keys(defaultMetrics);
    metricNames.forEach((metric, index) => {
      const targetValue = defaultMetrics[metric];
      let current = 0;
      const interval = setInterval(() => {
        if (current < targetValue) {
          current += 1;
          setDisplayMetrics(prev => ({
            ...prev,
            [metric]: current,
          }));
        } else {
          clearInterval(interval);
        }
      }, Math.max(10, 1500 / (targetValue || 1)));
    });
  }, []);

  // If compact mode, return simplified pentagon with lines from center
  if (compact) {
    return <CompactPentagon metrics={displayMetrics} defaultMetrics={defaultMetrics} />;
  }

  // Pentagon stat labels
  const stats = [
    { key: "riskScore", label: "Risk Score", icon: "⚠️" },
    { key: "documentComplexity", label: "Doc. Complexity", icon: "📄" },
    { key: "complianceDifficulty", label: "Compliance Difficulty", icon: "⚙️" },
    { key: "timeToCompliance", label: "Time Required", icon: "⏱️" },
    { key: "costImpact", label: "Cost Impact", icon: "💰" },
  ];

  const getStatColor = (key, value) => {
    if (key === "riskScore") {
      if (value <= 35) return { bg: "rgba(16,185,129,0.1)", bar: "#10b981", text: "#6ee7b7" };
      if (value <= 70) return { bg: "rgba(245,158,11,0.1)", bar: "#f59e0b", text: "#fcd34d" };
      return { bg: "rgba(239,68,68,0.1)", bar: "#ef4444", text: "#fca5a5" };
    }
    // For other metrics, use a gradient color scheme
    if (value <= 33) return { bg: "rgba(34,211,238,0.1)", bar: "#22d3ee", text: "#67e8f9" };
    if (value <= 66) return { bg: "rgba(245,158,11,0.1)", bar: "#f59e0b", text: "#fcd34d" };
    return { bg: "rgba(249,115,22,0.1)", bar: "#f97316", text: "#fed7aa" };
  };

  const getStatDescription = (value) => {
    if (value <= 20) return "Very Low";
    if (value <= 40) return "Low";
    if (value <= 60) return "Moderate";
    if (value <= 80) return "High";
    return "Very High";
  };

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        gap: "24px",
        background: "transparent",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
    >
      {/* Pentagon-like Grid Layout (5 stats in a circular arrangement) */}
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* SVG Background Pentagon */}
        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
          viewBox="0 0 300 300"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="pentagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Pentagon outline */}
          <polygon
            points="150,30 280,110 230,260 70,260 20,110"
            fill="url(#pentagonGradient)"
            stroke="rgba(99,102,241,0.3)"
            strokeWidth="1.5"
          />
          {/* Inner pentagon */}
          <polygon
            points="150,80 240,130 210,215 90,215 60,130"
            fill="none"
            stroke="rgba(99,102,241,0.15)"
            strokeWidth="1"
          />
        </svg>

        {/* 5 Stat Points arranged in pentagon */}
        {stats.map((stat, index) => {
          const angle = (index * 360) / 5 - 90; // Start from top
          const radius = 110;
          const x = 150 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 150 + radius * Math.sin((angle * Math.PI) / 180);
          const value = displayMetrics[stat.key] || 0;
          const colors = getStatColor(stat.key, value);

          return (
            <motion.div
              key={stat.key}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <motion.div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "12px",
                  background: colors.bg,
                  border: `2px solid ${colors.bar}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  boxShadow: `0 0 20px ${colors.bar}40`,
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ fontSize: "1.8rem" }}>{stat.icon}</span>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: colors.text,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {value}
                </span>
              </motion.div>
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  maxWidth: "90px",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          );
        })}

        {/* Center Circle with main risk indicator */}
        <motion.div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: defaultMetrics.riskScore <= 35
              ? "rgba(16,185,129,0.1)"
              : defaultMetrics.riskScore <= 70
              ? "rgba(245,158,11,0.1)"
              : "rgba(239,68,68,0.1)",
            border: `2px solid ${
              defaultMetrics.riskScore <= 35
                ? "#10b981"
                : defaultMetrics.riskScore <= 70
                ? "#f59e0b"
                : "#ef4444"
            }`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            boxShadow: `0 0 30px ${
              defaultMetrics.riskScore <= 35
                ? "#10b98140"
                : defaultMetrics.riskScore <= 70
                ? "#f59e0b40"
                : "#ef444440"
            }`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: defaultMetrics.riskScore <= 35
                ? "#6ee7b7"
                : defaultMetrics.riskScore <= 70
                ? "#fcd34d"
                : "#fca5a5",
              fontFamily: "var(--font-mono)",
              letterSpacing: "-0.02em",
            }}
          >
            {displayMetrics.riskScore || 0}%
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#94a3b8",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            RISK
          </span>
        </motion.div>
      </div>

      {/* Legend / Description Section */}
      <motion.div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "12px",
          marginTop: "16px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {stats.map((stat) => {
          const value = displayMetrics[stat.key] || 0;
          const description = getStatDescription(value);
          const colors = getStatColor(stat.key, value);
          return (
            <div
              key={stat.key}
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: colors.bg,
                border: `1px solid ${colors.bar}40`,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 600, color: colors.text }}>
                {stat.icon} {stat.label}
              </span>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{description}</span>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default RiskAssessment;
