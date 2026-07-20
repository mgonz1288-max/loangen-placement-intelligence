'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, Building2, Check, ChevronRight, CircleDollarSign, Clock3, Copy, FileCheck2, FileText, Gauge, LayoutDashboard, Network, RefreshCw, Search, ShieldCheck, Sparkles, Target, TrendingUp, UsersRound } from 'lucide-react';

const analysisSteps = [
  ['Reading application', 'Business, ownership, and funding request'],
  ['Reading bank statements', 'Cash flow, deposits, and existing obligations'],
  ['Building business profile', 'Industry, strength, risk, and relationship signals'],
  ['Comparing 187 lending programs', 'Eligibility and lender criteria'],
  ['Evaluating underwriting criteria', 'Capacity and approval probability'],
  ['Building lender strategy', 'Recommended lender submission sequence'],
];

const lenders = [
  { rank: 1, name: 'Apex Medical Finance', type: 'Healthcare equipment specialist', probability: 94, time: '2–4 days', reason: 'Best fit for diagnostic imaging equipment. Strongest match on industry, asset type, requested amount, and guarantor profile.', action: 'Submit first' },
  { rank: 2, name: 'Northview Capital', type: 'General equipment lender', probability: 87, time: '3–5 days', reason: 'Strong secondary option with competitive 60-month terms. Submit if Apex declines or returns terms outside the target range.', action: 'Submit second' },
  { rank: 3, name: 'Harbor Federal', type: 'SBA preferred lender', probability: 79, time: '21–35 days', reason: 'Best alternative when the borrower prioritizes a lower monthly payment and can accept a longer closing process.', action: 'Alternative' },
];

const opportunities = [
  ['30 days', 'Business line of credit', 'Working-capital buffer for insurance reimbursement cycles', 'High fit'],
  ['90 days', 'Cash management', 'Payment and collection services for $2.8M in annual deposits', 'High fit'],
  ['180 days', 'Commercial cards', 'Consolidate approximately $31,000 in monthly vendor spending', 'Medium fit'],
  ['365 days', 'Real estate financing', 'Prepare for a possible property purchase before the lease expires', 'Future fit'],
];

function Stat({ label, value, detail }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

export default function PlacementIntelligence() {
  const [screen, setScreen] = useState('ready');
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (screen !== 'analyzing') return;
    if (activeStep >= analysisSteps.length) {
      const done = setTimeout(() => setScreen('report'), 650);
      return () => clearTimeout(done);
    }
    const timer = setTimeout(() => setActiveStep((step) => step + 1), 720);
    return () => clearTimeout(timer);
  }, [screen, activeStep]);

  const startAnalysis = () => { setActiveStep(0); setScreen('analyzing'); window.scrollTo(0, 0); };
  const copySummary = async () => {
    await navigator.clipboard?.writeText(document.querySelector('.underwriter-copy')?.innerText || '');
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span>lG</span><b>loanGen</b></div>
      <div className="workspace-label">ADVISOR WORKSPACE</div>
      <nav>
        <button><LayoutDashboard size={17}/>Home</button>
        <button><FileText size={17}/>Applications <em>12</em></button>
        <button className="active"><Sparkles size={17}/>Placement Intelligence</button>
        <button><Building2 size={17}/>Lending Partners</button>
        <button><Gauge size={17}/>Reports</button>
      </nav>
      <div className="sidebar-foot">
        <div className="prototype"><i/>Internal prototype</div>
        <div className="advisor"><span>MC</span><div><b>Michael Chen</b><small>Senior Advisor</small></div></div>
      </div>
    </aside>

    <main>
      <header className="topbar">
        <div><span>Applications</span><ChevronRight size={13}/><span>LG-2847</span><ChevronRight size={13}/><b>Placement Intelligence</b></div>
        <button><Search size={16}/>Search</button>
      </header>

      <section className="application-bar">
        <div className="company-mark">NR</div>
        <div className="company"><div><h1>Northstar Radiology Group</h1><span><i/>Application received</span></div><p>Healthcare · Diagnostic imaging · Tampa, Florida</p></div>
        <div className="application-stats"><Stat label="REQUEST" value="$385,000"/><Stat label="ANNUAL REVENUE" value="$2.84M"/><Stat label="TIME IN BUSINESS" value="6.8 years"/><Stat label="APPLICATION" value="LG-2847"/></div>
      </section>

      {screen === 'ready' &&
        <section className="ready-screen">
          <div className="ai-mark"><Sparkles size={28}/></div>
          <span className="kicker">PLACEMENT INTELLIGENCE</span>
          <h2>Build the right placement strategy<br/><em>before the first submission.</em></h2>
          <p>Analyze this completed application against lender criteria, historical outcomes, and the current partner network.</p>
          <button className="primary" onClick={startAnalysis}><Sparkles size={16}/>Generate placement intelligence<ArrowRight size={16}/></button>
          <div className="ready-data"><BadgeCheck size={20}/><div><b>Application data is ready</b><small>Application, bank statements, and identity documents verified</small></div></div>
        </section>
      }

      {screen === 'analyzing' &&
        <section className="analyzing-screen">
          <div className="analysis-panel">
            <div className="analysis-head"><div className="scan-icon"><Sparkles size={21}/><i/></div><div><span className="kicker">GENERATING PLACEMENT STRATEGY</span><h2>{activeStep >= analysisSteps.length ? 'Analysis complete' : analysisSteps[activeStep]?.[0]}</h2><p>{activeStep >= analysisSteps.length ? 'The placement report is ready for advisor review.' : analysisSteps[activeStep]?.[1]}</p></div></div>
            <div className="progress"><i style={{width: `${Math.min(100, activeStep / analysisSteps.length * 100)}%`}}/></div>
            <div className="progress-label"><span>{Math.min(activeStep + 1, 6)} of 6</span><b>{Math.round(Math.min(100, activeStep / 6 * 100))}%</b></div>
            <div className="steps">{analysisSteps.map(([title], i) => <div className={i < activeStep ? 'done' : i === activeStep ? 'current' : ''} key={title}><span>{i < activeStep ? <Check size={12}/> : i + 1}</span><b>{title}</b>{i === activeStep && <small>In progress</small>}</div>)}</div>
          </div>
        </section>
      }

      {screen === 'report' &&
        <section className="report">
          <div className="report-title"><div><span className="kicker">PLACEMENT REPORT</span><h2>Northstar Radiology Group</h2><p>Application LG-2847 · Generated for advisor review</p></div><button className="secondary" onClick={startAnalysis}><RefreshCw size={14}/>Regenerate</button></div>

          <div className="executive-grid">
            <div className="profile-card card"><div className="card-title"><div><Building2 size={18}/><h3>Business overview</h3></div><span className="verified"><ShieldCheck size={13}/>High data confidence</span></div><p className="lead">Established outpatient imaging practice seeking equipment financing to add a second MRI system and expand patient capacity.</p><div className="details"><Stat label="FUNDING PURPOSE" value="MRI equipment purchase"/><Stat label="INDUSTRY" value="Diagnostic imaging"/><Stat label="OWNER" value="Dr. Maya Patel"/><Stat label="LOCATION" value="Tampa, Florida"/></div></div>
            <div className="confidence-card card"><span>FUNDING CONFIDENCE</span><div><strong>91</strong><small>/100</small></div><div className="meter"><i/></div><b>Strong candidate</b><p>Cash flow and applicant profile align with the recommended program.</p></div>
          </div>

          <div className="signal-row"><div className="card signal"><TrendingUp/><span><small>BUSINESS STRENGTH</small><b>Strong</b><p>Stable revenue and consistent deposits</p></span></div><div className="card signal"><ShieldCheck/><span><small>RISK PROFILE</small><b>Low to moderate</b><p>Existing equipment debt is manageable</p></span></div><div className="card signal"><CircleDollarSign/><span><small>CASH FLOW COVERAGE</small><b>1.42 times</b><p>Above the program requirement</p></span></div></div>

          <div className="section-heading"><div><Target size={19}/><span><small>RECOMMENDED STRATEGY</small><h3>Product structure</h3></span></div></div>
          <div className="product-card card"><div className="product-rank">01</div><div><div className="product-top"><span><small>PRIMARY PRODUCT</small><h3>Equipment Finance Agreement</h3></span><b>96% match</b></div><p>Preserves working capital, aligns the repayment term with the life of the MRI system, and avoids a blanket lien on the operating business.</p><div className="product-stats"><Stat label="ESTIMATED APPROVAL" value="$385,000"/><Stat label="RATE RANGE" value="8.2–9.6%"/><Stat label="TERM" value="60–72 months"/><Stat label="FUNDING TIME" value="2–4 days"/></div></div></div>

          <div className="section-heading"><div><Building2 size={19}/><span><small>LENDER PLACEMENT</small><h3>Recommended lender submission order</h3></span></div><p>Submit this application to lenders in this sequence</p></div>
          <div className="lender-table card">
            <div className="table-head"><span>ORDER / LENDER</span><span>WHY SUBMIT HERE</span><span>APPROVAL CHANCE</span><span>EXPECTED TIME</span><span>PLAN</span></div>
            {lenders.map((lender) => <div className="lender-row" key={lender.name}><div className="lender-name"><b>{lender.rank}</b><span>{lender.name.slice(0,2).toUpperCase()}</span><div><strong>{lender.name}</strong><small>{lender.type}</small></div></div><p>{lender.reason}</p><strong className="probability">{lender.probability}%</strong><span className="fund-time"><Clock3 size={13}/>{lender.time}</span><b className={lender.rank === 1 ? 'plan first' : 'plan'}>{lender.action}</b></div>)}
          </div>

          <div className="report-columns">
            <div><div className="section-heading"><div><FileCheck2 size={19}/><span><small>SUBMISSION SUPPORT</small><h3>AI underwriter summary</h3></span></div><button className="secondary" onClick={copySummary}><Copy size={13}/>{copied ? 'Copied' : 'Copy'}</button></div><div className="underwriter card"><div className="memo-label"><span>SUBMISSION MEMO</span><b>Ready for review</b></div><div className="underwriter-copy"><p><strong>Northstar Radiology Group</strong> is a six-year-old outpatient imaging practice generating $2.84 million in annual revenue. The business is requesting $385,000 to acquire a new MRI system and expand daily scan capacity.</p><p>Average monthly deposits are $238,000, with no negative-balance days across the six statements reviewed. Cash flow after the proposed payment is estimated at 1.42 times required debt payments. The guarantor has a 742 credit score and clean repayment history.</p><p><strong>Recommendation:</strong> Submit first to Apex Medical Finance under a 60 to 72 month equipment finance structure.</p></div></div></div>
            <div><div className="section-heading"><div><FileText size={19}/><span><small>DOCUMENT FORECAST</small><h3>Predicted stipulations</h3></span></div></div><div className="stipulations card">{[['Driver license','Received'],['Six months of bank statements','Received'],['Voided business check','Needed'],['Final equipment invoice','Needed'],['2025 business tax return','Predicted']].map(([name,status]) => <div key={name}><span className={status === 'Received' ? 'received' : ''}>{status === 'Received' ? <Check size={12}/> : <FileText size={12}/>}</span><b>{name}</b><small>{status}</small></div>)}</div></div>
          </div>

          <div className="section-heading"><div><UsersRound size={19}/><span><small>RELATIONSHIP INTELLIGENCE</small><h3>Future relationship opportunities</h3></span></div><p>Estimated three-year relationship value: <b>$186,400</b></p></div>
          <div className="relationship card"><div className="relationship-score"><span>RELATIONSHIP POTENTIAL</span><strong>9.4<small>/10</small></strong><b>Exceptional potential</b></div><div className="opportunities">{opportunities.map(([date,title,detail,fit]) => <div key={title}><span>{date}</span><div><b>{title}</b><p>{detail}</p></div><small>{fit}</small></div>)}</div></div>

          <div className="section-heading"><div><Network size={19}/><span><small>NETWORK INTELLIGENCE</small><h3>Lender network coverage</h3></span></div></div>
          <div className="network-card card"><div className="coverage"><strong>92%</strong><span>NETWORK COVERAGE</span></div><div className="network-copy"><span>NETWORK GAP DETECTED</span><h3>Healthcare equipment finance above $500,000</h3><p>The current network lacks a dedicated lender for diagnostic imaging and other essential-use medical equipment above $500,000.</p><div><small>SUGGESTED PARTNER PROFILE</small><b>Specialized Healthcare Equipment Finance</b><p>National coverage · $250,000–$5 million transactions · Vendor programs · Terms up to 84 months</p></div></div><div className="impact"><span>ESTIMATED ADDITIONAL<br/>ANNUAL VOLUME</span><strong>$43M</strong><b>High confidence</b></div></div>

          <div className="learning card"><div><Sparkles size={24}/><span><small>LEARNING INTELLIGENCE</small><h3>Informed by 1,872 similar businesses</h3><p>Healthcare services · $1–5 million revenue · Equipment financing · Five or more years in business</p></span></div><div className="learning-stats"><Stat label="HISTORICAL APPROVAL RATE" value="94%"/><Stat label="AVERAGE FUNDING" value="$143,000"/><Stat label="AVERAGE TIME TO FUND" value="2.4 days"/></div></div>
          <div className="final-line"><Sparkles size={22}/><h2>Every completed application makes loanGen smarter.</h2></div>
        </section>
      }
    </main>
  </div>;
}
