  import { useRef, useState } from "react";
  import { useNavigate } from "react-router";
  import { motion, useScroll, useTransform } from "motion/react";
  import {
    ArrowRight,
    Check,
    Github,
    Mail,
    Layers,
    GitBranch,
    Brain,
    Layout,
  } from "lucide-react";
  
  // ─── Logo ─────────────────────────────────────────────────────────────────────
  function InsightsLogo({ size = 20 }: { size?: number }) {
    return (
      <div
        className="rounded-md bg-[#111] flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 14 14"
          width={size * 0.68}
          height={size * 0.68}
          fill="none"
        >
          <circle cx="3.5" cy="3.5" r="1.8" fill="white" />
          <circle cx="10.5" cy="7" r="1.8" fill="white" />
          <circle cx="3.5" cy="10.5" r="1.8" fill="white" />
          <line
            x1="5"
            y1="4.2"
            x2="9"
            y2="6.4"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="5"
            y1="9.8"
            x2="9"
            y2="7.6"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  }
  
  // ─── Dock ─────────────────────────────────────────────────────────────────────
  function Dock({ onGetStarted }: { onGetStarted: () => void }) {
    const [active, setActive] = useState("Product");
    const links = [
      { label: "Product", href: "#product" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ];
    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-0.5 px-2 py-1.5 rounded-2xl border border-[#E5E7EB] bg-white/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 mr-1.5"
            onClick={() => setActive("Product")}
          >
            <InsightsLogo size={20} />
            <span className="text-xs font-semibold text-[#111] tracking-tight">
              Insights
            </span>
          </a>
          <div className="w-px h-4 bg-[#EAEAEA] mx-1" />
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                active === item.label
                  ? "bg-[#1E3A8A] text-white"
                  : "text-[#666] hover:text-[#111] hover:bg-[#F5F5F5]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="w-px h-4 bg-[#EAEAEA] mx-1" />
          <button
            onClick={onGetStarted}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111] text-white text-xs font-medium hover:bg-[#1E3A8A] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started <ArrowRight size={11} />
          </button>
        </nav>
      </div>
    );
  }
  
  // ─── Demo Canvas ──────────────────────────────────────────────────────────────
  function DemoCanvas() {
    return (
      <div
        className="relative rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden"
        style={{ height: 480 }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0 opacity-40 pointer-events-none"
        >
          <defs>
            <pattern
              id="demogrid"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#D1D5DB" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#demogrid)"
          />
        </svg>
  
        <svg
          viewBox="0 0 900 480"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="arr"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill="#CACAD4" />
            </marker>
            <marker
              id="arr-g"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill="#22C55E" />
            </marker>
            <filter id="cshadow">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="5"
                floodColor="#00000008"
              />
            </filter>
          </defs>
          <line
            x1="175"
            y1="95"
            x2="330"
            y2="95"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
          <line
            x1="175"
            y1="112"
            x2="100"
            y2="195"
            stroke="#22C55E"
            strokeWidth="1.2"
            markerEnd="url(#arr-g)"
            strokeDasharray="4 3"
          />
          <line
            x1="408"
            y1="112"
            x2="408"
            y2="190"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
          <line
            x1="486"
            y1="112"
            x2="572"
            y2="190"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
          <line
            x1="486"
            y1="258"
            x2="486"
            y2="322"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
          <line
            x1="408"
            y1="328"
            x2="510"
            y2="366"
            stroke="#22C55E"
            strokeWidth="1.2"
            markerEnd="url(#arr-g)"
            strokeDasharray="4 3"
          />
          <line
            x1="630"
            y1="258"
            x2="672"
            y2="322"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
          <line
            x1="796"
            y1="100"
            x2="796"
            y2="172"
            stroke="#CACAD4"
            strokeWidth="1.2"
            markerEnd="url(#arr)"
          />
  
          <g filter="url(#cshadow)">
            <rect
              x="55"
              y="62"
              width="170"
              height="66"
              rx="12"
              fill="white"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            <rect
              x="55"
              y="62"
              width="5"
              height="66"
              rx="2.5"
              fill="#22C55E"
            />
            <text
              x="74"
              y="88"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#22C55E"
            >
              Product Vision
            </text>
            <text
              x="74"
              y="106"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              Q3 2024 · Active
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="330"
              y="62"
              width="158"
              height="66"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="349"
              y="88"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Feature Planning
            </text>
            <text
              x="349"
              y="106"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              8 items mapped
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="36"
              y="195"
              width="148"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="54"
              y="219"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Research Notes
            </text>
            <text
              x="54"
              y="237"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              User interviews · 12
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="330"
              y="195"
              width="148"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="349"
              y="219"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Key Insights
            </text>
            <text
              x="349"
              y="237"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              7 patterns found
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="542"
              y="195"
              width="148"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="561"
              y="219"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Competitive Intel
            </text>
            <text
              x="561"
              y="237"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              14 competitors
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="408"
              y="322"
              width="156"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="426"
              y="346"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Sprint Backlog
            </text>
            <rect
              x="426"
              y="356"
              width="96"
              height="3"
              rx="1.5"
              fill="#EAEAEA"
            />
            <rect
              x="426"
              y="356"
              width="62"
              height="3"
              rx="1.5"
              fill="#22C55E"
            />
            <text
              x="426"
              y="375"
              fontFamily="Inter"
              fontSize="9"
              fill="#999"
            >
              65% · 12 tasks
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="652"
              y="322"
              width="148"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="671"
              y="346"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Go-to-Market
            </text>
            <text
              x="671"
              y="364"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              Launch · Aug 2024
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="514"
              y="394"
              width="148"
              height="60"
              rx="12"
              fill="#111"
            />
            <text
              x="532"
              y="418"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="white"
            >
              Growth Strategy
            </text>
            <text
              x="532"
              y="437"
              fontFamily="Inter"
              fontSize="9.5"
              fill="rgba(255,255,255,0.5)"
            >
              3 channels · Active
            </text>
          </g>
          <g filter="url(#cshadow)">
            <rect
              x="718"
              y="172"
              width="156"
              height="62"
              rx="12"
              fill="white"
              stroke="#EAEAEA"
            />
            <text
              x="736"
              y="196"
              fontFamily="Inter"
              fontSize="11"
              fontWeight="600"
              fill="#111"
            >
              Architecture
            </text>
            <text
              x="736"
              y="214"
              fontFamily="Inter"
              fontSize="9.5"
              fill="#999"
            >
              System design map
            </text>
          </g>
          <g>
            <rect
              x="364"
              y="438"
              width="172"
              height="30"
              rx="9"
              fill="white"
              stroke="#EAEAEA"
              strokeWidth="1"
            />
            <text
              x="396"
              y="457"
              fontFamily="Inter"
              fontSize="9"
              fill="#999"
            >
              100%
            </text>
            <text
              x="432"
              y="457"
              fontFamily="Inter"
              fontSize="10"
              fill="#CACAD4"
            >
              ∞
            </text>
          </g>
          <g>
            <rect
              x="774"
              y="432"
              width="112"
              height="32"
              rx="16"
              fill="#111"
            />
            <circle cx="793" cy="448" r="5" fill="#22C55E" />
            <text
              x="804"
              y="452"
              fontFamily="Inter"
              fontSize="10"
              fontWeight="500"
              fill="white"
            >
              AI Summary
            </text>
          </g>
        </svg>
  
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/90 border border-[#EAEAEA] backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center shrink-0">
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
          </div>
          <span className="text-xs font-medium text-[#111]">
            Watch 2-min demo
          </span>
          <ArrowRight size={11} className="text-[#666]" />
        </div>
      </div>
    );
  }
  
  // ─── Pricing ──────────────────────────────────────────────────────────────────
  function Pricing({
    onGetStarted,
  }: {
    onGetStarted: () => void;
  }) {
    const [annual, setAnnual] = useState(true);
    const plans = [
      {
        name: "Free",
        price: { monthly: 0, annual: 0 },
        desc: "For individuals getting started",
        cta: "Get Started",
        isPrimary: false,
        features: [
          "Up to 5 canvases",
          "100 nodes per canvas",
          "Basic connections",
          "Export to PDF",
        ],
      },
      {
        name: "Pro",
        price: { monthly: 18, annual: 12 },
        desc: "For serious thinkers and makers",
        cta: "Start Free Trial",
        isPrimary: true,
        badge: "Most Popular",
        features: [
          "Unlimited canvases",
          "Unlimited nodes",
          "AI connections",
          "Version history",
          "Priority support",
          "Advanced export",
        ],
      },
      {
        name: "Team",
        price: { monthly: 32, annual: 22 },
        desc: "For collaborative teams",
        cta: "Contact Sales",
        isPrimary: false,
        features: [
          "Everything in Pro",
          "Unlimited members",
          "Real-time collaboration",
          "SSO / SAML",
          "Audit logs",
          "Dedicated CSM",
        ],
      },
    ];
  
    return (
      <section
        id="pricing"
        className="max-w-5xl mx-auto px-6 py-28"
      >
        <div className="text-center mb-14">
          <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-5">
            Pricing
          </div>
          <h2 className="text-4xl font-semibold text-[#111] tracking-tight mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-[#666] text-base">
            Start free. Upgrade when you need to.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`text-sm font-medium ${!annual ? "text-[#111]" : "text-[#999]"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative rounded-full transition-colors duration-200"
            style={{
              background: annual ? "#111" : "#EAEAEA",
              height: "22px",
              width: "40px",
            }}
            aria-label="Toggle billing"
          >
            <div
              className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{
                width: "18px",
                height: "18px",
                transform: annual
                  ? "translateX(20px)"
                  : "translateX(2px)",
              }}
            />
          </button>
          <span
            className={`text-sm font-medium ${annual ? "text-[#111]" : "text-[#999]"}`}
          >
            Annual{" "}
            <span className="text-[#22C55E] text-xs font-semibold">
              –33%
            </span>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-colors duration-200 ${
                plan.badge
                  ? "border-[#111] shadow-[0_0_0_1px_#111]"
                  : "border-[#EAEAEA] hover:border-[#ccc]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                  {plan.badge}
                </div>
              )}
              <div className="mb-7">
                <div className="text-xs font-semibold text-[#999] mb-2 tracking-widest uppercase">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-semibold text-[#111] tracking-tight">
                    {plan.price[annual ? "annual" : "monthly"] ===
                    0
                      ? "Free"
                      : `$${plan.price[annual ? "annual" : "monthly"]}`}
                  </span>
                  {plan.price[annual ? "annual" : "monthly"] !==
                    0 && (
                    <span className="text-[#999] text-sm">
                      /mo
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#666]">{plan.desc}</p>
              </div>
              <button
                onClick={onGetStarted}
                className={`w-full mb-8 inline-flex items-center justify-center gap-2 text-sm font-medium rounded-xl px-5 py-2.5 transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.isPrimary
                    ? "bg-[#111] text-white hover:bg-[#1E3A8A]"
                    : "border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A]"
                }`}
              >
                {plan.cta}
              </button>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-[#444]"
                  >
                    <Check
                      size={13}
                      className="mt-0.5 shrink-0 text-[#22C55E]"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  // ─── Landing Page ─────────────────────────────────────────────────────────────
  export default function Landing() {
    const navigate = useNavigate();
    const handleGetStarted = () => navigate("/auth");
  
    // ── Scroll track ref ────────────────────────────────────────────────────
    const scrollTrackRef = useRef<HTMLDivElement>(null);
  
    const { scrollYProgress } = useScroll({
      target: scrollTrackRef,
      offset: ["start start", "end end"],
    });
  
    // ── Interpolated motion values ──────────────────────────────────────────
    // Hero canvas: scale 1 → 0.92, borderRadius 0 → 24px
    const heroScale = useTransform(
      scrollYProgress,
      [0, 1],
      [1, 0.92],
    );
    const heroBorderRadius = useTransform(
      scrollYProgress,
      [0, 1],
      [0, 24],
    );
    // Typography: fade out by 50% scroll, translate -60px over full scroll
    const textOpacity = useTransform(
      scrollYProgress,
      [0, 0.5],
      [1, 0],
    );
    const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
    const features = [
      {
        icon: <Layers size={16} />,
        title: "Infinite Canvas",
        desc: "No boundaries. Build knowledge structures at any scale without losing context.",
      },
      {
        icon: <GitBranch size={16} />,
        title: "Relationship Mapping",
        desc: "Draw connections between nodes. Surface hidden patterns across your graph.",
      },
      {
        icon: <Layout size={16} />,
        title: "Project Planning",
        desc: "Strategy, roadmaps, and task tracking in one unified visual space.",
      },
      {
        icon: <Brain size={16} />,
        title: "AI-Powered Insights",
        desc: "Summarize canvases and generate structured plans from unstructured thinking.",
        soon: true,
      },
    ];
  
    return (
      <div
        className="bg-white text-[#111] antialiased"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Dock onGetStarted={handleGetStarted} />
  
        {/* ══════════════════════════════════════════════════════════════════
            200vh SCROLL TRACK — hero locks sticky, then releases
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={scrollTrackRef}
          id="product"
          style={{ height: "200vh", position: "relative" }}
        >
          {/* Sticky hero canvas — locked to viewport for the full 200vh scroll */}
          <motion.div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              scale: heroScale,
              borderRadius: heroBorderRadius,
              willChange: "transform",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Faint green radial wash — no shapes, pure color field */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 48% at 50% 42%, rgba(34,197,94,0.04) 0%, transparent 65%)",
              }}
            />
  
            {/* Typography — fades out at 50% scroll, drifts upward */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
                willChange: "transform",
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              <h1
                className="tracking-tight mb-8 text-balance"
                style={{ lineHeight: 1.04 }}
              >
                <span
                  className="block text-[clamp(2.6rem,6.5vw,5.25rem)] text-[#111]"
                  style={{ fontWeight: 900 }}
                >
                  Transform raw thoughts
                </span>
                <span
                  className="block"
                  style={{ lineHeight: 1.14 }}
                >
                  <span
                    className="text-[clamp(2.6rem,6.5vw,5.25rem)] text-[#111]"
                    style={{ fontWeight: 900 }}
                  >
                    into{" "}
                  </span>
                  <span
                    className="text-[clamp(2.8rem,7vw,5.6rem)]"
                    style={{
                      fontFamily: "'Satisfy', cursive",
                      color: "#22C55E",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    plans.
                  </span>
                </span>
              </h1>
  
              <p className="text-lg md:text-xl text-[#666] leading-relaxed max-w-xl mx-auto mb-12 font-light text-balance">
                Visualize ideas, map relationships, organize
                projects, and build clarity on an infinite canvas.
              </p>
  
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 text-base font-medium rounded-xl px-7 py-3.5 bg-[#111] text-white hover:bg-[#1E3A8A] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
                <a
                  href="#canvas-preview"
                  className="inline-flex items-center gap-2 text-base font-medium rounded-xl px-7 py-3.5 border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-white ml-0.5" />
                  </div>
                  Watch Demo
                </a>
              </div>
  
              <p className="text-xs text-[#CACAD4] mt-8">
                No credit card required. Free forever on the Free
                plan.
              </p>
            </motion.div>
          </motion.div>
        </div>
        {/* ═════════════════════════ END SCROLL TRACK ═════════════════════════ */}
  
        {/* ══════════════════════════════════════════════════════════════════
            REVEAL SECTION — slides up from under the scaled-down hero card
            -mt-[50vh] makes it overlap the bottom half of the track space
        ══════════════════════════════════════════════════════════════════ */}
        <div
          id="canvas-preview"
          className="relative"
          style={{ marginTop: "-50vh", zIndex: 20 }}
        >
          <div
            className="bg-white rounded-t-[32px]"
            style={{
              boxShadow:
                "0 -32px 80px rgba(0,0,0,0.07), 0 -1px 0 rgba(0,0,0,0.04)",
            }}
          >
            {/* ── Asymmetric product highlight grid ──────────────────────── */}
            <div
              id="product-highlight"
              className="max-w-6xl mx-auto px-6 pt-20 pb-16"
            >
              <div className="mb-12">
                <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-5">
                  Canvas Preview
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <h2 className="text-4xl font-semibold text-[#111] tracking-tight text-balance">
                    Your ideas, finally connected.
                  </h2>
                  <p className="text-[#666] text-base max-w-xs leading-relaxed lg:text-right">
                    An infinite canvas where nodes, relationships,
                    and structure emerge naturally from your
                    thinking.
                  </p>
                </div>
              </div>
  
              {/* Asymmetric grid: 3fr canvas | 2fr feature stack */}
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-start">
                {/* Left: large canvas preview */}
                <DemoCanvas />
  
                {/* Right: feature highlight cards */}
                <div className="flex flex-col gap-4">
                  {features.map((f) => (
                    <div
                      key={f.title}
                      className={`rounded-2xl border bg-white p-5 flex items-start gap-4 ${
                        "soon" in f && f.soon
                          ? "border-[#EAEAEA] opacity-65"
                          : "border-[#EAEAEA] hover:border-[#22C55E]/40 hover:shadow-sm transition-colors duration-200"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          "soon" in f && f.soon
                            ? "bg-[#F5F5F5] text-[#CCC]"
                            : "bg-[#F5F5F5] text-[#666]"
                        }`}
                      >
                        {f.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-sm font-semibold text-[#111]">
                            {f.title}
                          </h3>
                          {"soon" in f && f.soon && (
                            <span className="text-[9px] font-semibold text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#666] leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
  
                  {/* CTA card */}
                  {/* <div className="rounded-2xl bg-[#111] p-5 flex flex-col gap-4 mt-auto">
                    <div className="text-sm font-semibold text-white">
                      Ready to think visually?
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Join thousands building clarity from
                      complexity on Insights.
                    </p>
                    <button
                      onClick={handleGetStarted}
                      className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium rounded-xl px-5 py-2.5 bg-[#22C55E] text-white hover:bg-[#16A34A] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Get Started Free <ArrowRight size={14} />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
  
            {/* ── Features ──────────────────────────────────────────────── */}
            <section
              id="features"
              className="bg-[#FAFAFA] border-y border-[#EAEAEA]"
              style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div className="max-w-6xl mx-auto px-6 w-full py-20">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-[#999] uppercase mb-4">Features</div>
                    <h2 className="text-4xl font-semibold text-[#111] tracking-tight text-balance max-w-sm">
                      Built for how you actually think.
                    </h2>
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed max-w-xs lg:text-right">
                    Every tool you need to externalize, connect, and act on your thinking — in one place.
                  </p>
                </div>
  
                {/* 4-col primary grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {[
                    {
                      icon: <Layers size={16} />,
                      title: "Infinite Canvas",
                      desc: "No boundaries, no page limits. Pan and zoom across a boundless workspace without losing context or performance.",
                      tag: null,
                    },
                    {
                      icon: <GitBranch size={16} />,
                      title: "Relationship Mapping",
                      desc: "Draw typed connections between any two nodes and surface hidden patterns across your entire knowledge graph.",
                      tag: null,
                    },
                    {
                      icon: <Layout size={16} />,
                      title: "Project Planning",
                      desc: "From raw idea to executed sprint — strategy, roadmaps, and task tracking in one unified visual space.",
                      tag: null,
                    },
                    {
                      icon: <Brain size={16} />,
                      title: "AI-Powered Insights",
                      desc: "Summarize canvases, find missing connections, and generate structured plans from unstructured thinking.",
                      tag: "Soon",
                    },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className={`group rounded-2xl border bg-white p-6 flex flex-col gap-4 ${f.tag ? "border-[#EAEAEA] opacity-65" : "border-[#EAEAEA] hover:border-[#22C55E]/40 hover:shadow-sm transition-colors duration-200"}`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.tag ? "bg-[#F5F5F5] text-[#CCC]" : "bg-[#F5F5F5] text-[#666] group-hover:bg-[#F0FDF4] group-hover:text-[#22C55E] transition-colors"}`}>
                        {f.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-sm font-semibold text-[#111]">{f.title}</h3>
                          {f.tag && <span className="text-[9px] font-semibold text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded-full uppercase tracking-wider">{f.tag}</span>}
                        </div>
                        <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
  
                {/* 4-col secondary grid — more sample features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                          <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                        </svg>
                      ),
                      title: "Multi-board Workspaces",
                      desc: "Organize canvases into shared workspaces. Keep personal projects separate from team work without context switching.",
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      ),
                      title: "Version History",
                      desc: "Every change is recorded. Rewind to any previous state of your canvas with a single click — no data is ever lost.",
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                          <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                      title: "Smart Export",
                      desc: "Export your canvases as PDF, PNG, or structured markdown. Share a live read-only link or embed in Notion.",
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                          <circle cx="5" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                          <circle cx="11" cy="4" r="2" stroke="currentColor" strokeWidth="1.4"/>
                          <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M7 7l2.5-2M7 9l2.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      ),
                      title: "Real-time Collaboration",
                      desc: "See teammates' cursors live. Edit together without conflicts, leave comments on any node, and resolve inline.",
                    },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="group rounded-2xl border border-[#EAEAEA] bg-white p-6 flex flex-col gap-4 hover:border-[#22C55E]/40 hover:shadow-sm transition-colors duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] text-[#666] group-hover:bg-[#F0FDF4] group-hover:text-[#22C55E] transition-colors flex items-center justify-center">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#111] mb-2">{f.title}</h3>
                        <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
  
            {/* ── Pricing ───────────────────────────────────────────────── */}
            <Pricing onGetStarted={handleGetStarted} />
  
            {/* ── Contact ───────────────────────────────────────────────── */}
            <section
              id="contact"
              className="border-t border-[#EAEAEA] py-28"
            >
              <div className="max-w-2xl mx-auto px-6 text-center">
                <h2 className="text-5xl md:text-6xl font-semibold text-[#111] tracking-tight leading-tight mb-6 text-balance">
                  Start building with{" "}
                  <span
                    style={{
                      fontFamily: "'Satisfy', cursive",
                      color: "#22C55E",
                      fontWeight: 400,
                    }}
                  >
                    clarity.
                  </span>
                </h2>
                <p className="text-[#666] text-lg mb-12 max-w-md mx-auto leading-relaxed">
                  Join thousands of thinkers and teams using
                  Insights to turn scattered ideas into structured
                  action.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                  <button
                    onClick={handleGetStarted}
                    className="inline-flex items-center gap-2 text-base font-medium rounded-xl px-8 py-3.5 bg-[#111] text-white hover:bg-[#1E3A8A] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started Free <ArrowRight size={16} />
                  </button>
                  <a
                    href="mailto:hello@insights.app"
                    className="inline-flex items-center gap-2 text-base font-medium rounded-xl px-8 py-3.5 border border-[#EAEAEA] text-[#111] hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] transition-colors duration-200 hover:scale-[1.02]"
                  >
                    <Mail size={16} /> Contact Us
                  </a>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors"
                  >
                    <Github size={16} /> Open Source
                  </a>
                  <div className="w-px h-4 bg-[#EAEAEA]" />
                  <a
                    href="mailto:hello@insights.app"
                    className="flex items-center gap-2 text-sm text-[#999] hover:text-[#111] transition-colors"
                  >
                    <Mail size={16} /> hello@insights.app
                  </a>
                </div>
              </div>
            </section>
  
            {/* ── Footer ────────────────────────────────────────────────── */}
            <footer className="border-t border-[#EAEAEA]">
              <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <InsightsLogo size={20} />
                  <span className="text-xs font-semibold text-[#111]">
                    Insights
                  </span>
                  <span className="text-xs text-[#CACAD4] ml-2">
                    © 2024 Insights Inc.
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  {["Privacy", "Terms", "Status", "Docs"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-xs text-[#CACAD4] hover:text-[#666] transition-colors"
                      >
                        {item}
                      </a>
                    ),
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }