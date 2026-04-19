import { motion } from "framer-motion";
import { ExternalLink, FileText, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const SourceCard = ({ source, page_number, score, refUrl, textSnippet, index, delay = 0 }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const relevance = Math.round((score || 0) * 100);
  const getRelevanceColor = (r) => {
    if (r >= 55) return { bar: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)" };
    if (r >= 45) return { bar: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" };
    return { bar: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.25)" };
  };
  const colors = getRelevanceColor(relevance);

  // Clean source name for display
  const displayName = source?.replace(/\.pdf$/i, "").replace(/_/g, " ") || "Unknown";

  // Generate a shareable link with text search
  const generateSectionLink = () => {
    if (!refUrl || !textSnippet) return "#";
    
    // Try to extract a search term from the snippet (first few words)
    const searchTerm = textSnippet.split('\n')[0].substring(0, 50).trim();
    const encodedSearch = encodeURIComponent(searchTerm);
    
    // For PDF viewer with text search support
    const pdfPageParam = page_number ? `#page=${page_number}&search=${encodedSearch}` : `#search=${encodedSearch}`;
    return `${refUrl}${pdfPageParam}`;
  };

  const handleCopyLink = async () => {
    const link = generateSectionLink();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        textDecoration: "none",
        color: "inherit",
        overflow: "hidden",
        transition: "all 0.25s ease",
      }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      whileHover={{ boxShadow: `0 0 25px ${colors.border}` }}
    >
      {/* Main Card Content */}
      <motion.a
        href={refUrl || "#"}
        target={refUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "14px 18px",
          textDecoration: "none",
          color: "inherit",
          cursor: refUrl ? "pointer" : "default",
        }}
      >
        {/* Icon */}
        <div style={{
          width: "40px", height: "40px", borderRadius: "12px",
          background: `linear-gradient(135deg, ${colors.bar}20, ${colors.bar}10)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <FileText style={{ width: "18px", height: "18px", color: colors.bar }} />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: "13px", fontWeight: 600, color: "#e2e8f0",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            margin: 0,
          }}>
            {displayName}
          </p>
          <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0 0" }}>
            Page {page_number || "?"} · {relevance}% match
          </p>
        </div>

        {/* Relevance mini-bar */}
        <div style={{ width: "50px", flexShrink: 0 }}>
          <div style={{
            height: "4px", borderRadius: "4px",
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%", borderRadius: "4px",
                background: colors.bar,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${relevance}%` }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
            />
          </div>
        </div>

        {/* External link icon */}
        {refUrl && (
          <ExternalLink style={{ width: "14px", height: "14px", color: "#475569", flexShrink: 0 }} />
        )}
      </motion.a>

      {/* Text Snippet Preview & Actions */}
      <motion.div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 14px",
          background: "rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: showPreview ? 1 : 0,
          height: showPreview ? "auto" : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Text Snippet Preview */}
        {textSnippet && (
          <div style={{
            fontSize: "11px",
            color: "#cbd5e1",
            lineHeight: 1.5,
            maxHeight: "60px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}>
            {textSnippet.substring(0, 150)}...
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          gap: "6px",
        }}>
          {textSnippet && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCopyLink();
              }}
              style={{
                flex: 1,
                padding: "6px 10px",
                fontSize: "10px",
                fontWeight: 600,
                border: "1px solid rgba(99,102,241,0.3)",
                background: copied ? "rgba(16,185,129,0.1)" : "rgba(99,102,241,0.08)",
                color: copied ? "#6ee7b7" : "#818cf8",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
              title="Copy link to highlight this section in the PDF"
            >
              {copied ? (
                <>
                  <CheckCircle2 style={{ width: "10px", height: "10px" }} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy style={{ width: "10px", height: "10px" }} />
                  Copy Link
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SourceCard;
