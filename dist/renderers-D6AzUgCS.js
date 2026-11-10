import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { n, r } from "./userDirectory-CyWbVxFq.js";
import { d as i } from "./Button-DQoeE5dN.js";
import { n as a, t as o } from "./safeHref-CSAycLWi.js";
import { t as s } from "./useEventCallback-Cwx9QVSi.js";
import { t as c } from "./Input-DiOEvL5h.js";
import { t as l } from "./Select-CDxAVVnW.js";
import { t as u } from "./NumberInput-pHxC7Spt.js";
import { t as d } from "./Checkbox-DgSkOMOT.js";
import { t as f } from "./TiptapEditor-Blmu8WT6.js";
import { useCallback as p, useEffect as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/components/doc-types/cookbooks/index.ts
var b = [
	"General",
	"Engineering",
	"Operations",
	"Product",
	"People",
	"Sales & CRM",
	"Finance",
	"Legal"
];
function x(e, t, n = {}) {
	return {
		id: crypto.randomUUID(),
		name: e,
		sectionType: t,
		required: n.required ?? !1,
		defaultCollapsed: n.defaultCollapsed ?? !1,
		placeholder: n.placeholder ?? "",
		hiddenInModes: n.hiddenInModes ?? [],
		rendererOverrides: {}
	};
}
function S() {
	return {
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		fields: [
			x("Title", "text", { required: !0 }),
			x("Severity", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "Open / In Progress / Resolved / Won't Fix"
			}),
			x("Reported By", "text", { required: !0 }),
			x("Reported Date", "date", { required: !0 }),
			x("Assigned To", "text"),
			x("Environment", "text", { placeholder: "Production / Staging / Development / Local" }),
			x("Steps to Reproduce", "rich-text", {
				required: !0,
				placeholder: "Detailed steps to reproduce the issue..."
			}),
			x("Expected Behavior", "rich-text", {
				required: !0,
				placeholder: "What should happen..."
			}),
			x("Actual Behavior", "rich-text", {
				required: !0,
				placeholder: "What actually happens..."
			}),
			x("Screenshots / Evidence", "rich-text", { placeholder: "Paste screenshots or supporting evidence..." }),
			x("Root Cause", "rich-text", {
				placeholder: "What caused the issue...",
				defaultCollapsed: !0
			}),
			x("Resolution Notes", "rich-text", {
				placeholder: "How the issue was resolved...",
				defaultCollapsed: !0
			})
		]
	};
}
function C() {
	return {
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		fields: [
			x("Employee Name", "text", { required: !0 }),
			x("Start Date", "date", { required: !0 }),
			x("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance"
			}),
			x("Manager", "text", { required: !0 }),
			x("Role Title", "text", { required: !0 }),
			x("Equipment Issued", "boolean"),
			x("Accounts Created", "boolean"),
			x("Orientation Complete", "boolean"),
			x("First Week Goals", "rich-text", { placeholder: "Goals for the first week..." }),
			x("30-Day Milestones", "rich-text", { placeholder: "What should be accomplished by day 30..." }),
			x("60-Day Milestones", "rich-text", {
				placeholder: "What should be accomplished by day 60...",
				defaultCollapsed: !0
			}),
			x("90-Day Review Date", "date"),
			x("Mentor Assigned", "text"),
			x("Notes", "rich-text")
		]
	};
}
function w() {
	return {
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		fields: [
			x("Invoice Number", "text", {
				required: !0,
				placeholder: "INV-0001"
			}),
			x("Issue Date", "date", { required: !0 }),
			x("Due Date", "date", { required: !0 }),
			x("Status", "text", {
				required: !0,
				placeholder: "Draft / Sent / Paid / Overdue / Void"
			}),
			x("Client Name", "text", { required: !0 }),
			x("Client Email", "text"),
			x("Line Items", "rich-text", {
				required: !0,
				placeholder: "Description of goods or services..."
			}),
			x("Subtotal", "number", { required: !0 }),
			x("Tax Rate (%)", "number"),
			x("Tax Amount", "number"),
			x("Total Amount", "number", { required: !0 }),
			x("Currency", "text", {
				required: !0,
				placeholder: "USD / EUR / GBP / CAD / AUD"
			}),
			x("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Due on Receipt" }),
			x("Payment Method", "text", { placeholder: "Wire / ACH / Check / Credit Card" }),
			x("Notes", "rich-text"),
			x("Paid Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function T() {
	return {
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		fields: [
			x("Meeting Title", "text", { required: !0 }),
			x("Date", "date", { required: !0 }),
			x("Meeting Type", "text", {
				required: !0,
				placeholder: "Standup / Sprint Planning / Retro / 1:1 / All Hands / Design Review / Ad Hoc"
			}),
			x("Attendees", "text", { placeholder: "Comma-separated names" }),
			x("Facilitator", "text"),
			x("Agenda", "rich-text", { placeholder: "Topics to cover..." }),
			x("Discussion Notes", "rich-text", {
				required: !0,
				placeholder: "Key discussion points..."
			}),
			x("Action Items", "rich-text", { placeholder: "Who does what by when..." }),
			x("Decisions Made", "rich-text", { placeholder: "Decisions reached during the meeting..." }),
			x("Follow-Up Date", "date"),
			x("Recording Link", "text", { placeholder: "URL to meeting recording" })
		]
	};
}
function E() {
	return {
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		fields: [
			x("Contact Name", "text", { required: !0 }),
			x("Company", "text", { required: !0 }),
			x("Email", "text", {
				required: !0,
				placeholder: "email@example.com"
			}),
			x("Phone", "text"),
			x("Lead Source", "text", {
				required: !0,
				placeholder: "Inbound / Outbound / Referral / Event / Website / Cold Call"
			}),
			x("Stage", "text", {
				required: !0,
				placeholder: "New / Contacted / Qualified / Proposal / Negotiation / Closed Won / Closed Lost"
			}),
			x("Deal Value", "number"),
			x("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			x("Expected Close Date", "date"),
			x("Last Contact Date", "date"),
			x("Next Follow-Up", "date"),
			x("Owner", "text"),
			x("Notes", "rich-text"),
			x("Lost Reason", "text", {
				placeholder: "Price / Competitor / Timing / No Budget / No Response / Other",
				defaultCollapsed: !0
			})
		]
	};
}
function D() {
	return {
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		fields: [
			x("Incident Title", "text", { required: !0 }),
			x("Severity", "text", {
				required: !0,
				placeholder: "SEV1 / SEV2 / SEV3 / SEV4"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "Investigating / Identified / Monitoring / Resolved / Postmortem"
			}),
			x("Detected At", "date", { required: !0 }),
			x("Resolved At", "date", { defaultCollapsed: !0 }),
			x("Duration", "text", {
				defaultCollapsed: !0,
				placeholder: "e.g. 2h 15m"
			}),
			x("Incident Commander", "text", { required: !0 }),
			x("Services Affected", "text", { placeholder: "Comma-separated service names" }),
			x("Customer Impact", "rich-text", {
				required: !0,
				placeholder: "Describe the user-facing impact..."
			}),
			x("Timeline", "rich-text", {
				required: !0,
				placeholder: "Chronological sequence of events..."
			}),
			x("Root Cause", "rich-text", {
				placeholder: "What caused the incident...",
				defaultCollapsed: !0
			}),
			x("Remediation Steps", "rich-text", { placeholder: "Steps taken to resolve..." }),
			x("Action Items", "rich-text", {
				placeholder: "Follow-up tasks to prevent recurrence...",
				defaultCollapsed: !0
			}),
			x("Lessons Learned", "rich-text", {
				placeholder: "What we can do better next time...",
				defaultCollapsed: !0
			}),
			x("Related Incidents", "text", { placeholder: "Links to related incident reports" })
		]
	};
}
function ee() {
	return {
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		fields: [
			x("RFC Title", "text", { required: !0 }),
			x("Author", "text", { required: !0 }),
			x("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Accepted / Rejected / Superseded"
			}),
			x("Created Date", "date", { required: !0 }),
			x("Decision Date", "date", { defaultCollapsed: !0 }),
			x("Reviewers", "text", { placeholder: "Comma-separated reviewer names" }),
			x("Problem Statement", "rich-text", {
				required: !0,
				placeholder: "What problem are we solving?"
			}),
			x("Proposed Solution", "rich-text", {
				required: !0,
				placeholder: "Detailed proposal..."
			}),
			x("Alternatives Considered", "rich-text", { placeholder: "Other approaches evaluated..." }),
			x("Technical Design", "rich-text", { placeholder: "Architecture, data flow, API changes..." }),
			x("Migration Plan", "rich-text", {
				placeholder: "How to roll out the change...",
				defaultCollapsed: !0
			}),
			x("Risks", "rich-text", { placeholder: "Known risks and mitigations..." }),
			x("Open Questions", "rich-text", { placeholder: "Unresolved questions for discussion..." }),
			x("Decision", "rich-text", {
				placeholder: "Final decision and rationale...",
				defaultCollapsed: !0
			}),
			x("Superseded By", "text", {
				placeholder: "Link to successor RFC",
				defaultCollapsed: !0
			})
		]
	};
}
function te() {
	return {
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		fields: [
			x("Feature Title", "text", { required: !0 }),
			x("Requested By", "text", { required: !0 }),
			x("Priority", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low / Nice to Have"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "New / Under Review / Planned / In Progress / Shipped / Declined"
			}),
			x("Category", "text", { placeholder: "UX / Performance / Integration / New Capability / Infrastructure" }),
			x("Target Release", "text"),
			x("User Story", "rich-text", {
				required: !0,
				placeholder: "As a [user], I want [goal] so that [benefit]"
			}),
			x("Problem Description", "rich-text", {
				required: !0,
				placeholder: "What problem does this solve?"
			}),
			x("Proposed Solution", "rich-text", { placeholder: "How should this work?" }),
			x("Success Metrics", "rich-text", { placeholder: "How will we measure success?" }),
			x("Effort Estimate", "text", { placeholder: "XS / S / M / L / XL" }),
			x("Business Value", "text", { placeholder: "Revenue / Retention / Adoption / Compliance / Internal Efficiency" }),
			x("Dependencies", "rich-text", { defaultCollapsed: !0 }),
			x("Decline Reason", "rich-text", {
				placeholder: "Why was this declined?",
				defaultCollapsed: !0
			}),
			x("Ship Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function O() {
	return {
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		fields: [
			x("Contract Title", "text", { required: !0 }),
			x("Contract Type", "text", {
				required: !0,
				placeholder: "NDA / MSA / SOW / SLA / Employment / Vendor / Licensing / Other"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Pending Signature / Active / Expired / Terminated"
			}),
			x("Counterparty", "text", { required: !0 }),
			x("Effective Date", "date", { required: !0 }),
			x("Expiration Date", "date"),
			x("Auto-Renew", "boolean"),
			x("Renewal Term", "text", {
				placeholder: "Monthly / Quarterly / Annual / Biennial",
				defaultCollapsed: !0
			}),
			x("Contract Value", "number"),
			x("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			x("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Upfront" }),
			x("Internal Owner", "text", { required: !0 }),
			x("Key Terms", "rich-text", { placeholder: "Important clauses and obligations..." }),
			x("Termination Clause", "rich-text", { defaultCollapsed: !0 }),
			x("Notes", "rich-text"),
			x("Termination Date", "date", { defaultCollapsed: !0 }),
			x("Termination Reason", "rich-text", {
				placeholder: "Why was this terminated?",
				defaultCollapsed: !0
			})
		]
	};
}
function ne() {
	return {
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		fields: [
			x("Sprint Name", "text", { required: !0 }),
			x("Sprint Dates", "text", {
				required: !0,
				placeholder: "Jan 6 – Jan 17"
			}),
			x("Facilitator", "text"),
			x("Team", "text", { required: !0 }),
			x("Velocity", "number"),
			x("Planned Points", "number"),
			x("Completed Points", "number"),
			x("What Went Well", "rich-text", {
				required: !0,
				placeholder: "Celebrate wins..."
			}),
			x("What Didn't Go Well", "rich-text", {
				required: !0,
				placeholder: "Identify pain points..."
			}),
			x("Start Doing", "rich-text", { placeholder: "New practices to adopt..." }),
			x("Stop Doing", "rich-text", { placeholder: "Practices to drop..." }),
			x("Continue Doing", "rich-text", { placeholder: "Practices to keep..." }),
			x("Action Items", "rich-text", {
				required: !0,
				placeholder: "Specific follow-up tasks..."
			}),
			x("Action Item Owners", "text", { placeholder: "Comma-separated names" }),
			x("Follow-Up Date", "date"),
			x("Overall Sentiment", "text", {
				required: !0,
				placeholder: "Great / Good / Mixed / Rough"
			})
		]
	};
}
function k() {
	return {
		name: "Job Posting",
		description: "Job listings with requirements, compensation, and hiring status.",
		icon: "📋",
		fields: [
			x("Job Title", "text", { required: !0 }),
			x("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance / Legal"
			}),
			x("Location", "text", {
				required: !0,
				placeholder: "Remote / Hybrid / On-site"
			}),
			x("Office Location", "text", { defaultCollapsed: !0 }),
			x("Employment Type", "text", {
				required: !0,
				placeholder: "Full-time / Part-time / Contract / Intern"
			}),
			x("Level", "text", {
				required: !0,
				placeholder: "Junior / Mid / Senior / Staff / Principal / Director / VP"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "Draft / Open / On Hold / Filled / Closed"
			}),
			x("Hiring Manager", "text", { required: !0 }),
			x("Salary Range Min", "number"),
			x("Salary Range Max", "number"),
			x("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			x("Job Description", "rich-text", {
				required: !0,
				placeholder: "Role overview and responsibilities..."
			}),
			x("Requirements", "rich-text", {
				required: !0,
				placeholder: "Must-have qualifications..."
			}),
			x("Nice to Have", "rich-text", { placeholder: "Preferred but not required..." }),
			x("Benefits", "rich-text", { placeholder: "Compensation and perks..." }),
			x("Posted Date", "date"),
			x("Closing Date", "date"),
			x("Filled By", "text", { defaultCollapsed: !0 }),
			x("Filled Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function A() {
	return {
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		fields: [
			x("Vendor Name", "text", { required: !0 }),
			x("Category", "text", {
				required: !0,
				placeholder: "SaaS / Infrastructure / Consulting / Hardware / Staffing / Other"
			}),
			x("Evaluation Status", "text", {
				required: !0,
				placeholder: "Researching / In Trial / Evaluating / Approved / Rejected / Active Vendor"
			}),
			x("Evaluator", "text", { required: !0 }),
			x("Evaluation Date", "date", { required: !0 }),
			x("Website", "text"),
			x("Primary Contact", "text"),
			x("Annual Cost", "number"),
			x("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			x("Contract Length", "text", { placeholder: "Monthly / Annual / Multi-Year" }),
			x("Security Review Complete", "boolean"),
			x("SOC2 Compliant", "boolean"),
			x("GDPR Compliant", "boolean"),
			x("Strengths", "rich-text", { placeholder: "Key advantages..." }),
			x("Weaknesses", "rich-text", { placeholder: "Gaps and concerns..." }),
			x("Integration Requirements", "rich-text", { placeholder: "Technical integration needs..." }),
			x("Score (1–10)", "number"),
			x("Recommendation", "rich-text", { placeholder: "Final recommendation..." }),
			x("Rejection Reason", "rich-text", {
				placeholder: "Why was this vendor rejected?",
				defaultCollapsed: !0
			})
		]
	};
}
function re() {
	return {
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		fields: [
			x("Project Name", "text", { required: !0 }),
			x("Reporting Period", "text", {
				required: !0,
				placeholder: "Week of Jan 6, 2025"
			}),
			x("Project Lead", "text", { required: !0 }),
			x("Overall Status", "text", {
				required: !0,
				placeholder: "On Track / At Risk / Blocked / Complete"
			}),
			x("Health: Scope", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			x("Health: Timeline", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			x("Health: Budget", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			x("Percent Complete", "number"),
			x("Summary", "rich-text", {
				required: !0,
				placeholder: "High-level status overview..."
			}),
			x("Accomplishments This Period", "rich-text", {
				required: !0,
				placeholder: "What was delivered..."
			}),
			x("Planned Next Period", "rich-text", {
				required: !0,
				placeholder: "What's coming up..."
			}),
			x("Risks & Issues", "rich-text", { placeholder: "Active risks and open issues..." }),
			x("Blockers", "rich-text", {
				placeholder: "Blocking items requiring escalation...",
				defaultCollapsed: !0
			}),
			x("Decisions Needed", "rich-text", { placeholder: "Pending decisions from stakeholders..." }),
			x("Budget Spent", "number"),
			x("Budget Remaining", "number"),
			x("Target Completion Date", "date"),
			x("Stakeholder Notes", "rich-text", { defaultCollapsed: !0 })
		]
	};
}
function ie() {
	return {
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		fields: [
			x("Change Title", "text", { required: !0 }),
			x("Change ID", "text", {
				required: !0,
				placeholder: "CR-0001"
			}),
			x("Requester", "text", { required: !0 }),
			x("Request Date", "date", { required: !0 }),
			x("Priority", "text", {
				required: !0,
				placeholder: "Emergency / High / Medium / Low"
			}),
			x("Status", "text", {
				required: !0,
				placeholder: "Submitted / Under Review / Approved / Scheduled / In Progress / Completed / Rolled Back / Rejected"
			}),
			x("Change Type", "text", {
				required: !0,
				placeholder: "Standard / Normal / Emergency"
			}),
			x("Systems Affected", "text", { placeholder: "Comma-separated system names" }),
			x("Description of Change", "rich-text", {
				required: !0,
				placeholder: "What is being changed and why..."
			}),
			x("Business Justification", "rich-text", {
				required: !0,
				placeholder: "Why this change is needed..."
			}),
			x("Risk Assessment", "text", {
				required: !0,
				placeholder: "Low / Medium / High / Critical"
			}),
			x("Risk Mitigation", "rich-text", {
				placeholder: "Steps to reduce risk...",
				defaultCollapsed: !0
			}),
			x("Rollback Plan", "rich-text", {
				required: !0,
				placeholder: "How to revert if something goes wrong..."
			}),
			x("Scheduled Date", "date", { defaultCollapsed: !0 }),
			x("Implementation Notes", "rich-text", {
				placeholder: "Notes from the change window...",
				defaultCollapsed: !0
			}),
			x("Approver", "text"),
			x("Approval Date", "date", { defaultCollapsed: !0 }),
			x("Post-Implementation Review", "rich-text", {
				placeholder: "Review after the change is complete...",
				defaultCollapsed: !0
			})
		]
	};
}
var j = [
	{
		id: "meeting-notes",
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		category: "General",
		tags: [
			"meetings",
			"notes",
			"action items",
			"decisions"
		],
		build: T
	},
	{
		id: "bug-report",
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		category: "Engineering",
		tags: [
			"bugs",
			"qa",
			"testing",
			"defects"
		],
		build: S
	},
	{
		id: "rfc",
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		category: "Engineering",
		tags: [
			"rfc",
			"proposal",
			"architecture",
			"design"
		],
		build: ee
	},
	{
		id: "sprint-retro",
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		category: "Engineering",
		tags: [
			"agile",
			"sprint",
			"retro",
			"retrospective"
		],
		build: ne
	},
	{
		id: "incident-report",
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		category: "Operations",
		tags: [
			"incidents",
			"postmortem",
			"sev",
			"outage"
		],
		build: D
	},
	{
		id: "vendor-evaluation",
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		category: "Operations",
		tags: [
			"vendors",
			"procurement",
			"evaluation",
			"compliance"
		],
		build: A
	},
	{
		id: "change-request",
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		category: "Operations",
		tags: [
			"change",
			"itil",
			"rollback",
			"risk"
		],
		build: ie
	},
	{
		id: "feature-request",
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		category: "Product",
		tags: [
			"features",
			"product",
			"backlog",
			"user stories"
		],
		build: te
	},
	{
		id: "status-report",
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		category: "Product",
		tags: [
			"status",
			"project",
			"reporting",
			"weekly"
		],
		build: re
	},
	{
		id: "onboarding",
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		category: "People",
		tags: [
			"onboarding",
			"hr",
			"new hire",
			"checklist"
		],
		build: C
	},
	{
		id: "job-posting",
		name: "Job Posting",
		description: "Job listings with requirements, compensation, and hiring status.",
		icon: "📋",
		category: "People",
		tags: [
			"hiring",
			"recruiting",
			"jobs",
			"positions"
		],
		build: k
	},
	{
		id: "sales-lead",
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		category: "Sales & CRM",
		tags: [
			"sales",
			"crm",
			"leads",
			"pipeline",
			"deals"
		],
		build: E
	},
	{
		id: "invoice",
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		category: "Finance",
		tags: [
			"invoices",
			"billing",
			"payments",
			"accounting"
		],
		build: w
	},
	{
		id: "contract",
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		category: "Legal",
		tags: [
			"contracts",
			"legal",
			"agreements",
			"nda",
			"sow"
		],
		build: O
	}
];
function ae(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.category.toLowerCase().includes(n) || e.tags.some((e) => e.toLowerCase().includes(n));
}
function oe(e, t = "All") {
	return j.filter((n) => (t === "All" || n.category === t) && ae(n, e));
}
//#endregion
//#region src/renderers/tasks/definition.ts
var se = {
	type: "tasks",
	label: "Task List",
	icon: "✅",
	description: "Assignable action items with status tracking",
	rendererKeys: {
		editor: ["tasks:editor"],
		ack: ["tasks:ack"],
		reader: ["tasks:reader"]
	},
	rendererLabels: {
		"tasks:editor": "Task Editor",
		"tasks:ack": "Task Review",
		"tasks:reader": "Task Reader"
	}
}, ce = {
	type: "rich-text",
	label: "Rich Text",
	icon: "📝",
	description: "Formatted content with headings and lists",
	rendererKeys: {
		editor: ["rich-text:editor"],
		ack: ["rich-text:ack"],
		reader: ["rich-text:reader"]
	},
	rendererLabels: {
		"rich-text:editor": "Rich Text Editor",
		"rich-text:ack": "Rich Text Viewer",
		"rich-text:reader": "Rich Text Viewer"
	}
}, le = {
	type: "decisions",
	label: "Decisions",
	icon: "🎯",
	description: "Decision log with rationale and context",
	rendererKeys: {
		editor: ["decisions:editor"],
		ack: ["decisions:ack"],
		reader: ["decisions:reader"]
	},
	rendererLabels: {
		"decisions:editor": "Decisions Editor",
		"decisions:ack": "Decisions Viewer",
		"decisions:reader": "Decisions Viewer"
	}
}, ue = {
	type: "checklist",
	label: "Checklist",
	icon: "☑️",
	description: "Simple yes/no checklist items",
	rendererKeys: {
		editor: ["checklist:editor"],
		ack: ["checklist:ack"],
		reader: ["checklist:reader"]
	},
	rendererLabels: {
		"checklist:editor": "Checklist Editor",
		"checklist:ack": "Checklist Viewer",
		"checklist:reader": "Checklist Viewer"
	}
}, de = {
	type: "file-upload",
	label: "File Upload",
	icon: "📎",
	description: "Upload a file at edit time; download link in viewer",
	rendererKeys: {
		editor: ["file-upload:editor"],
		ack: ["file-upload:ack"],
		reader: ["file-upload:reader"]
	},
	rendererLabels: {
		"file-upload:editor": "File Upload Editor",
		"file-upload:ack": "File Upload Viewer",
		"file-upload:reader": "File Upload Viewer"
	}
}, fe = {
	type: "diagram",
	label: "Diagram",
	icon: "▦",
	description: "Embedded image or SVG (placeholder until upload pipeline lands)",
	rendererKeys: {
		editor: ["diagram:editor"],
		ack: ["diagram:ack"],
		reader: ["diagram:reader"]
	},
	rendererLabels: {
		"diagram:editor": "Diagram Editor",
		"diagram:ack": "Diagram Viewer",
		"diagram:reader": "Diagram Viewer"
	}
}, pe = {
	type: "link-block",
	label: "Link Block",
	icon: "🔗",
	description: "List of external links (label + url pairs)",
	rendererKeys: {
		editor: ["link-block:editor"],
		ack: ["link-block:ack"],
		reader: ["link-block:reader"]
	},
	rendererLabels: {
		"link-block:editor": "Link Block Editor",
		"link-block:ack": "Link Block Viewer",
		"link-block:reader": "Link Block Viewer"
	}
}, me = {
	type: "text",
	label: "Text",
	icon: "🔤",
	description: "Single-line plain text — a name, a status, a reference",
	rendererKeys: {
		editor: ["text:editor"],
		ack: ["text:ack"],
		reader: ["text:reader"]
	},
	rendererLabels: {
		"text:editor": "Text Field",
		"text:ack": "Text Value",
		"text:reader": "Text Value"
	}
}, he = {
	type: "date",
	label: "Date",
	icon: "📅",
	description: "A single calendar date (due date, start date, target date)",
	rendererKeys: {
		editor: ["date:editor"],
		ack: ["date:ack"],
		reader: ["date:reader"]
	},
	rendererLabels: {
		"date:editor": "Date Picker",
		"date:ack": "Date Value",
		"date:reader": "Date Value"
	}
}, ge = {
	type: "number",
	label: "Number",
	icon: "🔢",
	description: "A numeric value (amount, score, points, percentage)",
	rendererKeys: {
		editor: ["number:editor"],
		ack: ["number:ack"],
		reader: ["number:reader"]
	},
	rendererLabels: {
		"number:editor": "Number Field",
		"number:ack": "Number Value",
		"number:reader": "Number Value"
	}
}, _e = {
	type: "boolean",
	label: "Yes / No",
	icon: "✅",
	description: "A yes/no answer that can also be left unanswered",
	rendererKeys: {
		editor: ["boolean:editor"],
		ack: ["boolean:ack"],
		reader: ["boolean:reader"]
	},
	rendererLabels: {
		"boolean:editor": "Yes / No Toggle",
		"boolean:ack": "Yes / No Value",
		"boolean:reader": "Yes / No Value"
	}
}, ve = /^(\d{4})-(\d{2})-(\d{2})$/;
function M(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	if (t === "") return null;
	let n = ve.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]), r = Number(n[3]);
		if (t < 1 || t > 12 || r < 1 || r > 31) return null;
		let i = new Date(e, t - 1, r);
		return i.setFullYear(e, t - 1, r), i.getMonth() !== t - 1 || i.getDate() !== r ? null : i;
	}
	let r = new Date(t);
	return Number.isNaN(r.getTime()) ? null : r;
}
function ye(e = /* @__PURE__ */ new Date()) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function be(e, t = /* @__PURE__ */ new Date()) {
	let n = M(e);
	return n ? ye(n).getTime() < ye(t).getTime() : !1;
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var xe = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, Se = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, Ce = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function we(e) {
	let t = M(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function Te(e) {
	return be(e);
}
function Ee(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function De({ item: e, editable: t, onUpdate: a, onRemove: o, autoFocusText: s, onDidAutoFocus: u }) {
	let [f, b] = g(!1), [x, S] = g(""), [C, w] = g(0), T = h(null), E = h(null), D = h(null), ee = () => {
		a({ status: e.status === "done" ? "pending" : "done" });
	}, te = e.assignee ? n.find((t) => t.displayName === e.assignee) : void 0, O = x.trim() ? r(x) : n, ne = p(() => {
		t && (S(""), w(0), b(!0));
	}, [t]), k = p(() => {
		b(!1), S(""), w(0);
	}, []), A = p((e) => {
		a({ assignee: e.displayName }), k();
	}, [a, k]), re = p(() => {
		a({ assignee: "" }), k();
	}, [a, k]);
	m(() => {
		if (!f) return;
		let e = (e) => {
			T.current && !T.current.contains(e.target) && k();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [f, k]), m(() => {
		f && E.current && E.current.focus();
	}, [f]), m(() => {
		w(0);
	}, [x]), m(() => {
		s && D.current && (D.current.focus(), u?.());
	}, [s, u]);
	let ie = (e) => {
		e.key === "Escape" ? k() : e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, O.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), O[C] && A(O[C]));
	}, j = e.dueDate && e.status !== "done" ? Te(e.dueDate) : !1;
	return /* @__PURE__ */ y("div", {
		className: i("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ v("span", {
				title: `Priority: ${e.priority}`,
				className: i("w-2 h-2 rounded-full shrink-0"),
				style: { background: Se[e.priority] }
			}),
			/* @__PURE__ */ v(d, {
				checked: e.status === "done",
				onChange: ee,
				disabled: !t,
				className: i("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ v(c, {
				ref: D,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => a({ text: e.target.value }),
				readOnly: !t,
				className: i("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ y("span", {
				title: e.dueDate,
				className: i("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", j ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					j ? "⚠ " : "",
					"Due: ",
					we(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ v("span", {
				className: i("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: Ce[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ y("div", {
				ref: T,
				className: i("relative"),
				children: [/* @__PURE__ */ v("button", {
					"data-ui-part": "",
					type: "button",
					onClick: ne,
					title: e.assignee || "Unassigned",
					className: i("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-surface text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("span", {
						className: i("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: te?.color ?? "var(--color-text-tertiary)" },
						children: Ee(e.assignee)
					}), /* @__PURE__ */ v("span", {
						className: i("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), f && /* @__PURE__ */ y("div", {
					className: i("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ v("div", {
							className: i("px-2 py-1"),
							children: /* @__PURE__ */ v(c, {
								ref: E,
								size: "sm",
								value: x,
								onChange: (e) => S(e.target.value),
								onKeyDown: ie,
								placeholder: "Search users...",
								className: i("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ y("button", {
							"data-ui-part": "",
							type: "button",
							onClick: re,
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ v("span", {
								className: i("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ v("span", {
								className: i("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						O.map((e, t) => /* @__PURE__ */ y("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => A(e),
							onMouseEnter: () => w(t),
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === C ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ v("span", {
								className: i("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: Ee(e.displayName)
							}), /* @__PURE__ */ v("span", { children: e.displayName })]
						}, e.userId)),
						O.length === 0 && /* @__PURE__ */ v("div", {
							className: i("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ v(l, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => a({ priority: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: Se[e.priority] },
				title: `Priority: ${e.priority}`,
				options: [
					{
						value: "low",
						label: "low"
					},
					{
						value: "medium",
						label: "medium"
					},
					{
						value: "high",
						label: "high"
					}
				]
			}),
			/* @__PURE__ */ v(l, {
				value: e.status,
				disabled: !t,
				onChange: (e) => a({ status: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: xe[e.status] },
				title: `Status: ${e.status}`,
				options: [
					{
						value: "pending",
						label: "pending"
					},
					{
						value: "acked",
						label: "acked"
					},
					{
						value: "done",
						label: "done"
					},
					{
						value: "rejected",
						label: "rejected"
					}
				]
			}),
			t && /* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				onClick: o,
				title: "Remove task",
				className: i("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
				children: "x"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TaskList.tsx
function N({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: a }) {
	if (e.length === 0) return /* @__PURE__ */ v("div", {
		className: i("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let o = a?.current ?? !1;
	return /* @__PURE__ */ v("div", {
		className: i("py-2"),
		children: e.map((i, s) => /* @__PURE__ */ v(De, {
			item: i,
			editable: t,
			onUpdate: (e) => n(i.id, e),
			onRemove: () => r(i.id),
			autoFocusText: o && s === e.length - 1,
			onDidAutoFocus: o && s === e.length - 1 ? () => {
				a && (a.current = !1);
			} : void 0
		}, i.id))
	});
}
//#endregion
//#region src/renderers/sectionItems.ts
function P(e) {
	let t = e.items;
	return Array.isArray(t) ? t.filter((e) => e != null) : [];
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function Oe({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l, extensions: u, editorComponent: d }) {
	let p = d ?? f, m = P(e), g = h(!1);
	return /* @__PURE__ */ y("div", { children: [
		t && n && /* @__PURE__ */ v(p, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? `Write ${e.type} content...`,
			sectionId: e.id,
			onUpdateCursorInfo: l,
			extensions: u
		}),
		(m.length > 0 || a) && /* @__PURE__ */ v(N, {
			items: m,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: g
		}),
		a && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => {
				o?.({
					text: "",
					status: "pending",
					assignee: "",
					ackedBy: "",
					ackedAt: "",
					priority: "medium",
					notes: ""
				}), g.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/rich-text/RichTextEditorRenderer.tsx
function ke({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o, extensions: s, editorComponent: c }) {
	return !t || !n ? /* @__PURE__ */ v("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ v(c ?? f, {
		fragment: t,
		ydoc: n,
		provider: r ?? null,
		user: i ?? {
			name: "Anonymous",
			color: "#6b7280"
		},
		editable: a,
		placeholder: e.placeholder ?? "Write content...",
		sectionId: e.id,
		onUpdateCursorInfo: o,
		extensions: s
	});
}
//#endregion
//#region src/renderers/rich-text/RichTextReaderRenderer.tsx
function F({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i, extensions: a, editorComponent: o }) {
	return /* @__PURE__ */ y("div", { children: [t && n ? /* @__PURE__ */ v("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ v(o ?? f, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: {
				name: "",
				color: "#6b7280"
			},
			editable: !1,
			sectionId: e.id,
			extensions: a
		})
	}) : /* @__PURE__ */ v("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ v("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function Ae({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = P(e), o = h(!1);
	return /* @__PURE__ */ y("div", {
		className: "py-1",
		children: [
			a.length > 0 || t ? /* @__PURE__ */ v(N, {
				items: a,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: o
			}) : null,
			a.length === 0 && !t && /* @__PURE__ */ v("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => {
					n?.({
						text: "",
						status: "pending",
						assignee: "",
						ackedBy: "",
						ackedAt: "",
						priority: "medium",
						notes: ""
					}), o.current = !0;
				},
				className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer",
				children: "+ Add item"
			})
		]
	});
}
//#endregion
//#region src/renderers/tasks/TasksReaderRenderer.tsx
var je = {
	pending: {
		label: "Pending",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Acked",
		color: "var(--color-info-fg)",
		bg: "var(--color-info-bg)"
	},
	done: {
		label: "Done",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Rejected",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
}, Me = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function Ne(e) {
	return be(e);
}
function Pe(e) {
	let t = M(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function Fe(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function I({ item: e, onUpdateItem: t }) {
	let [n, r] = g(!1), [a, o] = g(!1), s = n || a, c = je[e.status] ?? je.pending, l = Me[e.priority] ?? Me.medium, u = e.dueDate && e.status === "pending" ? Ne(e.dueDate) : !1, d = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ y("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		onFocus: () => o(!0),
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || o(!1);
		},
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: d ? .65 : 1 },
		children: [
			/* @__PURE__ */ v("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: l,
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				title: `Status: ${e.status}${t ? " — click to toggle done" : ""}`,
				onClick: () => {
					if (!t) return;
					let n = e.status === "done" ? "pending" : "done";
					t(e.id, { status: n });
				},
				style: {
					width: 18,
					height: 18,
					borderRadius: "50%",
					border: `2px solid ${c.color}`,
					background: d ? c.color : "transparent",
					cursor: t ? "pointer" : "default",
					flexShrink: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 0
				},
				children: d && /* @__PURE__ */ v("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ v("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ v("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", d ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ v("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ v("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: Fe(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ y("span", {
				style: {
					fontSize: 10,
					fontWeight: 600,
					padding: "1px 6px",
					borderRadius: 10,
					background: u ? "var(--color-danger-bg)" : "var(--color-info-bg)",
					color: u ? "var(--color-danger)" : "var(--color-neutral)",
					border: u ? "1px solid var(--color-danger-border)" : "1px solid var(--color-info-border)",
					whiteSpace: "nowrap",
					flexShrink: 0
				},
				children: [u ? "⚠ " : "", Pe(e.dueDate)]
			}),
			t && s && /* @__PURE__ */ y("select", {
				"data-ui-part": "",
				"aria-label": `Set status for ${e.text || "untitled item"}`,
				value: e.status,
				onChange: (n) => t(e.id, { status: n.target.value }),
				onClick: (e) => e.stopPropagation(),
				style: {
					fontSize: 10,
					padding: "1px 4px",
					borderRadius: 6,
					border: `1px solid ${c.color}`,
					background: c.bg,
					color: c.color,
					fontWeight: 600,
					cursor: "pointer",
					outline: "none",
					fontFamily: "inherit",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ v("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ v("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ v("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ v("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function L({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = P(e);
	if (r.length === 0) return /* @__PURE__ */ v("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "done" || e.status === "acked"), a = r.filter((e) => e.status === "rejected"), o = r.filter((e) => !i.includes(e) && !a.includes(e));
	return /* @__PURE__ */ y("div", { children: [
		o.length > 0 && /* @__PURE__ */ v("div", {
			className: "mb-1",
			children: o.map((e) => /* @__PURE__ */ v(I, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		i.length > 0 && /* @__PURE__ */ v("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ v(I, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ v("div", { children: a.map((e) => /* @__PURE__ */ v(I, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function Ie({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: a, onRemove: o }) {
	let c = h(null), l = e.status === "done", u = s(r);
	return m(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ y("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ v("input", {
				"data-ui-part": "",
				type: "checkbox",
				checked: l,
				onChange: () => a({ status: l ? "pending" : "done" }),
				disabled: !t,
				className: i("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ v("input", {
				"data-ui-part": "",
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => a({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: i("flex-1 border-none outline-none text-sm bg-transparent px-1 py-0.5", l ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				onClick: o,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function Le({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l, extensions: u, editorComponent: d }) {
	let p = d ?? f, m = P(e), g = h(null), _ = () => {
		o && (g.current = m.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, b = g.current, x = b !== null && m.length > b, S = m.length, C = m.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ y("div", { children: [
		t && n && /* @__PURE__ */ v(p, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? "Add notes or context...",
			sectionId: e.id,
			onUpdateCursorInfo: l,
			extensions: u
		}),
		S > 0 && /* @__PURE__ */ y("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				C,
				" / ",
				S,
				" done"
			]
		}),
		/* @__PURE__ */ v("div", { children: m.map((e, t) => {
			let n = t === m.length - 1, r = x && n;
			return /* @__PURE__ */ v(Ie, {
				item: e,
				editable: a,
				autoFocus: r,
				onDidAutoFocus: r ? () => {
					g.current = null;
				} : void 0,
				onUpdate: (t) => s?.(e.id, t),
				onRemove: () => c?.(e.id)
			}, e.id);
		}) }),
		a && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: _,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function R({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: a, onNavigateToEditor: o, extensions: s, editorComponent: c }) {
	let l = c ?? f, u = P(e), d = u.length, p = u.filter((e) => e.status === "done").length, m = d > 0 ? Math.round(p / d * 100) : 0;
	return /* @__PURE__ */ y("div", { children: [
		t && n && /* @__PURE__ */ v("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ v(l, {
				fragment: t,
				ydoc: n,
				provider: r ?? null,
				user: {
					name: "",
					color: "#6b7280"
				},
				editable: !1,
				sectionId: e.id,
				extensions: s
			})
		}),
		d > 0 && /* @__PURE__ */ y("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ y("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ y("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						p,
						" / ",
						d,
						" done"
					]
				}), /* @__PURE__ */ y("span", {
					className: i("text-[11px] font-semibold", m === 100 ? "text-success-fg" : "text-neutral"),
					children: [m, "%"]
				})]
			}), /* @__PURE__ */ v("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ v("div", {
					className: i("h-full rounded-sm transition-[width] duration-300", m === 100 ? "bg-success" : "bg-info"),
					style: { width: `${m}%` }
				})
			})]
		}),
		d === 0 ? /* @__PURE__ */ v("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ v("div", { children: u.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ y("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ v("input", {
					"data-ui-part": "",
					type: "checkbox",
					checked: t,
					onChange: () => a?.(e.id, { status: t ? "pending" : "done" }),
					className: i("w-3.5 h-3.5 accent-success shrink-0", a ? "cursor-pointer" : "cursor-default"),
					readOnly: !a
				}), /* @__PURE__ */ v("span", {
					className: i("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ v("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		o && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => o(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var Re = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
}, ze = ["VITE_PLATFORM_API_URL", "VITE_SOCIAL_API_URL"], z = null;
function Be(e) {
	z = e;
}
function Ve() {
	let e = {
		BASE_URL: "/",
		DEV: !1,
		MODE: "production",
		PROD: !0,
		SSR: !1
	};
	for (let t of ze) {
		let n = e[t];
		if (n) return n;
	}
	return "";
}
function He() {
	if (z != null) {
		let e = typeof z == "function" ? z() : z;
		if (e) return e;
	}
	return Ve();
}
function Ue() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function We(e) {
	return Re[e] ?? null;
}
async function Ge(e) {
	let t = e.documentId ?? Ue();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = e.baseUrl ?? He(), i = await fetch(`${r}/api/approvals`, {
			method: "POST",
			headers: n,
			body: JSON.stringify({
				documentId: t,
				sectionId: e.sectionId,
				decision: e.decision,
				...e.reviewerName ? { reviewerName: e.reviewerName } : {},
				...e.comment ? { comment: e.comment } : {}
			})
		});
		return i.ok ? { ok: !0 } : {
			ok: !1,
			error: `POST failed: ${i.status}`
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/renderers/decisions/DecisionsEditorRenderer.tsx
var Ke = {
	pending: {
		label: "Open",
		icon: "○",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	done: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Vetoed",
		icon: "✕",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
};
function qe({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: a, onRemove: o }) {
	let c = h(null), l = Ke[e.status] ?? Ke.pending, u = s(r);
	return m(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ y("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ v("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: l.bg,
					color: l.color
				},
				children: l.icon
			}),
			/* @__PURE__ */ v("input", {
				"data-ui-part": "",
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => a({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: i("flex-1 border-none outline-none text-sm bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ y("select", {
				"data-ui-part": "",
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => a({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none shrink-0 appearance-none",
				style: {
					border: `1px solid ${l.color}`,
					background: l.bg,
					color: l.color
				},
				children: [
					/* @__PURE__ */ v("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ v("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ v("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				onClick: o,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function Je({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l, extensions: u, editorComponent: d }) {
	let p = d ?? f, m = P(e), g = h(null), _ = () => {
		o && (g.current = m.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, b = g.current, x = b !== null && m.length > b;
	return /* @__PURE__ */ y("div", { children: [
		t && n && /* @__PURE__ */ v(p, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? "Add context or background...",
			sectionId: e.id,
			onUpdateCursorInfo: l,
			extensions: u
		}),
		m.length === 0 && !a && /* @__PURE__ */ v("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ v("div", { children: m.map((t, n) => {
			let r = n === m.length - 1, o = x && r;
			return /* @__PURE__ */ v(qe, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					g.current = null;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = We(n.status);
						t && Ge({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: _,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var B = {
	pending: {
		label: "Open",
		icon: "○",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	done: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Vetoed",
		icon: "✕",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
};
function Ye({ item: e }) {
	let t = B[e.status] ?? B.pending;
	return /* @__PURE__ */ y("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ v("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ v("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ v("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ v("span", {
				className: "text-[10px] font-semibold px-2 py-0.5 rounded-[10px] whitespace-nowrap shrink-0",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.label
			})
		]
	});
}
function V({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ y("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ v("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ v(Ye, { item: e }, e.id))]
	});
}
function H({ section: e, onNavigateToEditor: t }) {
	let n = P(e);
	if (n.length === 0) return /* @__PURE__ */ v("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "acked" || e.status === "done"), i = n.filter((e) => e.status === "rejected"), a = n.filter((e) => !r.includes(e) && !i.includes(e));
	return /* @__PURE__ */ y("div", { children: [
		a.length > 0 && /* @__PURE__ */ v(V, {
			label: "Open",
			color: B.pending.color,
			items: a
		}),
		r.length > 0 && /* @__PURE__ */ v(V, {
			label: "Decided",
			color: B.acked.color,
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ v(V, {
			label: "Vetoed",
			color: B.rejected.color,
			items: i
		}),
		t && /* @__PURE__ */ v("button", {
			"data-ui-part": "",
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function Xe(e) {
	return e.metadata ?? {};
}
function Ze({ section: e, editable: t, onUpdateSection: n }) {
	let r = Xe(e), [a, o] = g(!1), s = (t) => {
		o(!0);
		let r = new FileReader();
		r.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				fileName: t.name,
				fileDataUrl: typeof r.result == "string" ? r.result : "",
				fileSize: t.size
			} }), o(!1);
		}, r.onerror = () => o(!1), r.readAsDataURL(t);
	};
	return /* @__PURE__ */ v("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ y("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ v("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ v("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ y("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ v("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `file-upload-remove-${e.id}`,
					onClick: () => {
						n?.({ metadata: {
							...e.metadata ?? {},
							fileName: void 0,
							fileDataUrl: void 0,
							fileSize: void 0
						} });
					},
					className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
					children: "×"
				})
			]
		}) : /* @__PURE__ */ y("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ v("input", {
				"data-ui-part": "",
				type: "file",
				"data-testid": `file-upload-input-${e.id}`,
				disabled: !t,
				className: "hidden",
				onChange: (e) => {
					let t = e.target.files?.[0];
					t && s(t);
				}
			})]
		})
	});
}
//#endregion
//#region src/renderers/file-upload/FileUploadReaderRenderer.tsx
function U({ section: e }) {
	let t = e.metadata ?? {};
	if (!t.fileName) return /* @__PURE__ */ v("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
	let n = o(t.fileDataUrl);
	return /* @__PURE__ */ y("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ v("span", {
				className: "text-base",
				children: "📎"
			}),
			n ? /* @__PURE__ */ y("a", {
				href: n,
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}) : /* @__PURE__ */ v("span", {
				"data-testid": `file-upload-name-${e.id}`,
				className: "text-text-secondary font-medium",
				children: t.fileName
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ y("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function Qe({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [a, o] = g(!1), s = (t) => {
		o(!0);
		let i = new FileReader();
		i.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				imageDataUrl: typeof i.result == "string" ? i.result : "",
				alt: r.alt ?? t.name
			} }), o(!1);
		}, i.onerror = () => o(!1), i.readAsDataURL(t);
	}, c = (t) => {
		n?.({ metadata: {
			...e.metadata ?? {},
			alt: t
		} });
	};
	return /* @__PURE__ */ v("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ y("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ v("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ y("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ v("input", {
					"data-ui-part": "",
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ v("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `diagram-remove-${e.id}`,
					onClick: () => {
						n?.({ metadata: {
							...e.metadata ?? {},
							imageDataUrl: void 0,
							alt: void 0
						} });
					},
					className: "bg-transparent border-none text-danger-fg cursor-pointer text-[13px]",
					children: "Remove"
				})]
			})]
		}) : /* @__PURE__ */ y("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ v("input", {
				"data-ui-part": "",
				type: "file",
				accept: "image/*",
				"data-testid": `diagram-input-${e.id}`,
				disabled: !t,
				className: "hidden",
				onChange: (e) => {
					let t = e.target.files?.[0];
					t && s(t);
				}
			})]
		})
	});
}
//#endregion
//#region src/renderers/diagram/DiagramReaderRenderer.tsx
function W({ section: e }) {
	let t = e.metadata ?? {};
	return t.imageDataUrl ? /* @__PURE__ */ y("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ v("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ v("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ v("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function $e(e) {
	return typeof e == "object" && !!e;
}
function et(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links.filter($e).map((e) => ({
		label: typeof e.label == "string" ? e.label : "",
		url: typeof e.url == "string" ? e.url : ""
	})) : [];
}
function tt({ section: e, editable: t, onUpdateSection: n }) {
	let r = et(e), i = (t) => {
		n?.({ metadata: {
			...e.metadata ?? {},
			links: t
		} });
	}, a = () => i([...r, {
		label: "",
		url: ""
	}]), o = (e, t) => {
		i(r.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}, s = (e) => {
		i(r.filter((t, n) => n !== e));
	};
	return /* @__PURE__ */ y("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ v("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ y("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ v("input", {
						"data-ui-part": "",
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ v("input", {
						"data-ui-part": "",
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ v("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ v("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `link-block-add-${e.id}`,
				onClick: a,
				className: "self-start mt-1 px-3 py-1 text-xs bg-transparent border border-dashed border-border-emphasis text-primary rounded-md cursor-pointer",
				children: "+ Add link"
			})
		]
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockReaderRenderer.tsx
function nt(e) {
	return typeof e == "object" && !!e && typeof e.url == "string";
}
function G({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => nt(e) && e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ v("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ v("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => {
			let n = a(e.url);
			return /* @__PURE__ */ v("li", {
				className: "text-[13px]",
				children: n ? /* @__PURE__ */ v("a", {
					href: n,
					target: "_blank",
					rel: "noreferrer noopener",
					className: "text-primary font-medium no-underline",
					children: e.label || e.url
				}) : /* @__PURE__ */ v("span", {
					className: "text-text-secondary font-medium",
					children: e.label || e.url
				})
			}, t);
		})
	});
}
//#endregion
//#region src/renderers/scalarValue.ts
var K = "value";
function rt(e) {
	return e.metadata ?? {};
}
function q(e) {
	return rt(e)[K];
}
function it(e) {
	let t = q(e);
	return typeof t == "string" ? t : "";
}
function at(e) {
	let t = q(e);
	if (typeof t == "number") return Number.isFinite(t) ? t : void 0;
	if (typeof t == "string" && t.trim() !== "") {
		let e = Number(t);
		if (Number.isFinite(e)) return e;
	}
}
function ot(e) {
	let t = q(e);
	return typeof t == "boolean" ? t : void 0;
}
var st = /^(\d{4}-\d{2}-\d{2})/;
function ct(e) {
	let t = q(e);
	if (typeof t != "string") return "";
	let n = st.exec(t.trim());
	return n ? n[1] : "";
}
function J(e, t) {
	let n = { ...rt(e) };
	return t === void 0 ? delete n[K] : n[K] = t, { metadata: n };
}
function lt(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function ut(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function dt(e) {
	if (!e) return "";
	try {
		return e.toString().replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
	} catch {
		return "";
	}
}
//#endregion
//#region src/renderers/LegacyProseNote.tsx
function Y({ sectionId: e, fragment: t }) {
	let n = dt(t);
	return n ? /* @__PURE__ */ y("div", {
		"data-testid": `scalar-legacy-note-${e}`,
		className: "mt-1.5 text-[12px] text-text-tertiary break-words",
		children: [
			/* @__PURE__ */ v("span", {
				className: "font-medium",
				children: "Earlier draft:"
			}),
			" ",
			n
		]
	}) : null;
}
//#endregion
//#region src/renderers/text/TextReaderRenderer.tsx
function X({ section: e, fragment: t }) {
	let n = it(e);
	return n.trim() === "" ? /* @__PURE__ */ y("div", { children: [/* @__PURE__ */ v("div", {
		"data-testid": `text-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "Not set."
	}), /* @__PURE__ */ v(Y, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ v("div", {
		"data-testid": `text-field-reader-${e.id}`,
		className: "text-[13px] text-text-primary leading-[1.5] break-words",
		children: n
	});
}
//#endregion
//#region src/renderers/text/TextEditorRenderer.tsx
function ft(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ v(X, { ...e });
	let a = it(t);
	return /* @__PURE__ */ y("div", {
		"data-testid": `text-field-editor-${t.id}`,
		children: [/* @__PURE__ */ v(c, {
			"data-testid": `text-field-input-${t.id}`,
			value: a,
			"aria-label": t.title,
			placeholder: t.placeholder || "Enter text…",
			onChange: (e) => i?.(J(t, e.target.value || void 0))
		}), a === "" && /* @__PURE__ */ v(Y, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/date/DateReaderRenderer.tsx
function Z({ section: e, fragment: t }) {
	let n = ct(e);
	return n ? /* @__PURE__ */ v("time", {
		"data-testid": `date-field-reader-${e.id}`,
		dateTime: n,
		className: "text-[13px] text-text-primary font-medium tabular-nums",
		children: lt(n)
	}) : /* @__PURE__ */ y("div", { children: [/* @__PURE__ */ v("div", {
		"data-testid": `date-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "No date set."
	}), /* @__PURE__ */ v(Y, {
		sectionId: e.id,
		fragment: t
	})] });
}
//#endregion
//#region src/renderers/date/DateEditorRenderer.tsx
function pt(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ v(Z, { ...e });
	let a = ct(t);
	return /* @__PURE__ */ y("div", {
		"data-testid": `date-field-editor-${t.id}`,
		children: [/* @__PURE__ */ y("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ v("div", {
					className: "max-w-xs",
					children: /* @__PURE__ */ v(c, {
						type: "date",
						"data-testid": `date-field-input-${t.id}`,
						value: a,
						"aria-label": t.title,
						onChange: (e) => i?.(J(t, e.target.value || void 0))
					})
				}),
				a ? /* @__PURE__ */ v("span", {
					"data-testid": `date-field-formatted-${t.id}`,
					className: "text-[12px] text-text-tertiary tabular-nums",
					children: lt(a)
				}) : /* @__PURE__ */ v("span", {
					"data-testid": `date-field-hint-${t.id}`,
					className: "text-[12px] text-text-tertiary italic",
					children: t.placeholder || "No date set"
				}),
				a && /* @__PURE__ */ v("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `date-field-clear-${t.id}`,
					onClick: () => i?.(J(t, void 0)),
					className: "bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0",
					children: "Clear"
				})
			]
		}), !a && /* @__PURE__ */ v(Y, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/number/NumberReaderRenderer.tsx
function Q({ section: e, fragment: t }) {
	let n = at(e);
	return n === void 0 ? /* @__PURE__ */ y("div", { children: [/* @__PURE__ */ v("div", {
		"data-testid": `number-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "No value."
	}), /* @__PURE__ */ v(Y, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ v("div", {
		"data-testid": `number-field-reader-${e.id}`,
		className: "text-[13px] text-text-primary font-medium tabular-nums",
		children: ut(n)
	});
}
//#endregion
//#region src/renderers/number/NumberEditorRenderer.tsx
function mt(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ v(Q, { ...e });
	let a = at(t);
	return /* @__PURE__ */ y("div", {
		"data-testid": `number-field-editor-${t.id}`,
		children: [/* @__PURE__ */ v("div", {
			className: "max-w-xs",
			children: /* @__PURE__ */ v(u, {
				"data-testid": `number-field-input-${t.id}`,
				value: a,
				"aria-label": t.title,
				placeholder: t.placeholder || "Enter a number…",
				onChange: (e) => i?.(J(t, e)),
				onClear: () => i?.(J(t, void 0))
			})
		}), a === void 0 && /* @__PURE__ */ v(Y, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/boolean/BooleanReaderRenderer.tsx
function $({ section: e, fragment: t }) {
	let n = ot(e);
	return n === void 0 ? /* @__PURE__ */ y("div", { children: [/* @__PURE__ */ v("div", {
		"data-testid": `boolean-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "Not answered."
	}), /* @__PURE__ */ v(Y, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ v("div", {
		"data-testid": `boolean-field-reader-${e.id}`,
		className: i("text-[13px] font-medium", n ? "text-success-fg" : "text-text-secondary"),
		children: n ? "✓ Yes" : "✗ No"
	});
}
//#endregion
//#region src/renderers/boolean/BooleanEditorRenderer.tsx
function ht(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: a } = e;
	if (!n) return /* @__PURE__ */ v($, { ...e });
	let o = ot(t);
	return /* @__PURE__ */ y("div", {
		"data-testid": `boolean-field-editor-${t.id}`,
		children: [/* @__PURE__ */ y("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ v(d, {
					"data-testid": `boolean-field-input-${t.id}`,
					checked: o === !0,
					indeterminate: o === void 0,
					"aria-label": t.title,
					onChange: (e) => a?.(J(t, e))
				}),
				/* @__PURE__ */ v("span", {
					"data-testid": `boolean-field-status-${t.id}`,
					className: i("text-[13px]", o === void 0 ? "text-text-tertiary italic" : o ? "text-success-fg font-medium" : "text-text-secondary font-medium"),
					children: o === void 0 ? t.placeholder || "Not answered" : o ? "Yes" : "No"
				}),
				o !== void 0 && /* @__PURE__ */ v("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `boolean-field-clear-${t.id}`,
					onClick: () => a?.(J(t, void 0)),
					className: "bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0",
					children: "Clear"
				})
			]
		}), o === void 0 && /* @__PURE__ */ v(Y, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
e(se), e(ce), e(le), e(ue), e(de), e(fe), e(pe), e(me), e(he), e(ge), e(_e), t("*", "*", Oe), t("rich-text", "editor", ke), t("rich-text", "ack", F), t("rich-text", "reader", F), t("tasks", "editor", Ae), t("tasks", "ack", L), t("tasks", "reader", L), t("checklist", "editor", Le), t("checklist", "ack", R), t("checklist", "reader", R), t("decisions", "editor", Je), t("decisions", "ack", H), t("decisions", "reader", H), t("file-upload", "editor", Ze), t("file-upload", "ack", U), t("file-upload", "reader", U), t("diagram", "editor", Qe), t("diagram", "ack", W), t("diagram", "reader", W), t("link-block", "editor", tt), t("link-block", "ack", G), t("link-block", "reader", G), t("text", "editor", ft), t("text", "ack", X), t("text", "reader", X), t("date", "editor", pt), t("date", "ack", Z), t("date", "reader", Z), t("number", "editor", mt), t("number", "ack", Q), t("number", "reader", Q), t("boolean", "editor", ht), t("boolean", "ack", $), t("boolean", "reader", $), t("checkbox", "editor", ht), t("checkbox", "ack", $), t("checkbox", "reader", $);
//#endregion
export { De as A, ce as B, Le as C, ke as D, F as E, pe as F, ae as G, b as H, fe as I, de as L, ge as M, he as N, Oe as O, me as P, ue as R, R as S, Ae as T, j as U, se as V, oe as W, He as _, pt as a, Ue as b, X as c, W as d, Qe as f, Je as g, H as h, Q as i, _e as j, N as k, G as l, Ze as m, $ as n, Z as o, U as p, mt as r, ft as s, ht as t, tt as u, We as v, L as w, Be as x, Ge as y, le as z };
