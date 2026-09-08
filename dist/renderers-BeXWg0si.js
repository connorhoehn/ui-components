import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { n, r } from "./userDirectory-CyWbVxFq.js";
import { t as i } from "./cn-DhjIN-s0.js";
import { t as a } from "./useEventCallback-Cwx9QVSi.js";
import { t as o } from "./Input-DLknWXri.js";
import { t as s } from "./Select-CqVokE2v.js";
import { t as c } from "./NumberInput-PlADgrip.js";
import { t as l } from "./Checkbox-DqN9RkXK.js";
import { t as u } from "./TiptapEditor-Dn9rUdZx.js";
import { useCallback as d, useEffect as f, useRef as p, useState as m } from "react";
import { Fragment as h, jsx as g, jsxs as _ } from "react/jsx-runtime";
//#region src/components/doc-types/cookbooks/index.ts
var v = [
	"General",
	"Engineering",
	"Operations",
	"Product",
	"People",
	"Sales & CRM",
	"Finance",
	"Legal"
];
function y(e, t, n = {}) {
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
function b() {
	return {
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		fields: [
			y("Title", "text", { required: !0 }),
			y("Severity", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "Open / In Progress / Resolved / Won't Fix"
			}),
			y("Reported By", "text", { required: !0 }),
			y("Reported Date", "date", { required: !0 }),
			y("Assigned To", "text"),
			y("Environment", "text", { placeholder: "Production / Staging / Development / Local" }),
			y("Steps to Reproduce", "rich-text", {
				required: !0,
				placeholder: "Detailed steps to reproduce the issue..."
			}),
			y("Expected Behavior", "rich-text", {
				required: !0,
				placeholder: "What should happen..."
			}),
			y("Actual Behavior", "rich-text", {
				required: !0,
				placeholder: "What actually happens..."
			}),
			y("Screenshots / Evidence", "rich-text", { placeholder: "Paste screenshots or supporting evidence..." }),
			y("Root Cause", "rich-text", {
				placeholder: "What caused the issue...",
				defaultCollapsed: !0
			}),
			y("Resolution Notes", "rich-text", {
				placeholder: "How the issue was resolved...",
				defaultCollapsed: !0
			})
		]
	};
}
function x() {
	return {
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		fields: [
			y("Employee Name", "text", { required: !0 }),
			y("Start Date", "date", { required: !0 }),
			y("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance"
			}),
			y("Manager", "text", { required: !0 }),
			y("Role Title", "text", { required: !0 }),
			y("Equipment Issued", "boolean"),
			y("Accounts Created", "boolean"),
			y("Orientation Complete", "boolean"),
			y("First Week Goals", "rich-text", { placeholder: "Goals for the first week..." }),
			y("30-Day Milestones", "rich-text", { placeholder: "What should be accomplished by day 30..." }),
			y("60-Day Milestones", "rich-text", {
				placeholder: "What should be accomplished by day 60...",
				defaultCollapsed: !0
			}),
			y("90-Day Review Date", "date"),
			y("Mentor Assigned", "text"),
			y("Notes", "rich-text")
		]
	};
}
function S() {
	return {
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		fields: [
			y("Invoice Number", "text", {
				required: !0,
				placeholder: "INV-0001"
			}),
			y("Issue Date", "date", { required: !0 }),
			y("Due Date", "date", { required: !0 }),
			y("Status", "text", {
				required: !0,
				placeholder: "Draft / Sent / Paid / Overdue / Void"
			}),
			y("Client Name", "text", { required: !0 }),
			y("Client Email", "text"),
			y("Line Items", "rich-text", {
				required: !0,
				placeholder: "Description of goods or services..."
			}),
			y("Subtotal", "number", { required: !0 }),
			y("Tax Rate (%)", "number"),
			y("Tax Amount", "number"),
			y("Total Amount", "number", { required: !0 }),
			y("Currency", "text", {
				required: !0,
				placeholder: "USD / EUR / GBP / CAD / AUD"
			}),
			y("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Due on Receipt" }),
			y("Payment Method", "text", { placeholder: "Wire / ACH / Check / Credit Card" }),
			y("Notes", "rich-text"),
			y("Paid Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function C() {
	return {
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		fields: [
			y("Meeting Title", "text", { required: !0 }),
			y("Date", "date", { required: !0 }),
			y("Meeting Type", "text", {
				required: !0,
				placeholder: "Standup / Sprint Planning / Retro / 1:1 / All Hands / Design Review / Ad Hoc"
			}),
			y("Attendees", "text", { placeholder: "Comma-separated names" }),
			y("Facilitator", "text"),
			y("Agenda", "rich-text", { placeholder: "Topics to cover..." }),
			y("Discussion Notes", "rich-text", {
				required: !0,
				placeholder: "Key discussion points..."
			}),
			y("Action Items", "rich-text", { placeholder: "Who does what by when..." }),
			y("Decisions Made", "rich-text", { placeholder: "Decisions reached during the meeting..." }),
			y("Follow-Up Date", "date"),
			y("Recording Link", "text", { placeholder: "URL to meeting recording" })
		]
	};
}
function w() {
	return {
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		fields: [
			y("Contact Name", "text", { required: !0 }),
			y("Company", "text", { required: !0 }),
			y("Email", "text", {
				required: !0,
				placeholder: "email@example.com"
			}),
			y("Phone", "text"),
			y("Lead Source", "text", {
				required: !0,
				placeholder: "Inbound / Outbound / Referral / Event / Website / Cold Call"
			}),
			y("Stage", "text", {
				required: !0,
				placeholder: "New / Contacted / Qualified / Proposal / Negotiation / Closed Won / Closed Lost"
			}),
			y("Deal Value", "number"),
			y("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			y("Expected Close Date", "date"),
			y("Last Contact Date", "date"),
			y("Next Follow-Up", "date"),
			y("Owner", "text"),
			y("Notes", "rich-text"),
			y("Lost Reason", "text", {
				placeholder: "Price / Competitor / Timing / No Budget / No Response / Other",
				defaultCollapsed: !0
			})
		]
	};
}
function T() {
	return {
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		fields: [
			y("Incident Title", "text", { required: !0 }),
			y("Severity", "text", {
				required: !0,
				placeholder: "SEV1 / SEV2 / SEV3 / SEV4"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "Investigating / Identified / Monitoring / Resolved / Postmortem"
			}),
			y("Detected At", "date", { required: !0 }),
			y("Resolved At", "date", { defaultCollapsed: !0 }),
			y("Duration", "text", {
				defaultCollapsed: !0,
				placeholder: "e.g. 2h 15m"
			}),
			y("Incident Commander", "text", { required: !0 }),
			y("Services Affected", "text", { placeholder: "Comma-separated service names" }),
			y("Customer Impact", "rich-text", {
				required: !0,
				placeholder: "Describe the user-facing impact..."
			}),
			y("Timeline", "rich-text", {
				required: !0,
				placeholder: "Chronological sequence of events..."
			}),
			y("Root Cause", "rich-text", {
				placeholder: "What caused the incident...",
				defaultCollapsed: !0
			}),
			y("Remediation Steps", "rich-text", { placeholder: "Steps taken to resolve..." }),
			y("Action Items", "rich-text", {
				placeholder: "Follow-up tasks to prevent recurrence...",
				defaultCollapsed: !0
			}),
			y("Lessons Learned", "rich-text", {
				placeholder: "What we can do better next time...",
				defaultCollapsed: !0
			}),
			y("Related Incidents", "text", { placeholder: "Links to related incident reports" })
		]
	};
}
function E() {
	return {
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		fields: [
			y("RFC Title", "text", { required: !0 }),
			y("Author", "text", { required: !0 }),
			y("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Accepted / Rejected / Superseded"
			}),
			y("Created Date", "date", { required: !0 }),
			y("Decision Date", "date", { defaultCollapsed: !0 }),
			y("Reviewers", "text", { placeholder: "Comma-separated reviewer names" }),
			y("Problem Statement", "rich-text", {
				required: !0,
				placeholder: "What problem are we solving?"
			}),
			y("Proposed Solution", "rich-text", {
				required: !0,
				placeholder: "Detailed proposal..."
			}),
			y("Alternatives Considered", "rich-text", { placeholder: "Other approaches evaluated..." }),
			y("Technical Design", "rich-text", { placeholder: "Architecture, data flow, API changes..." }),
			y("Migration Plan", "rich-text", {
				placeholder: "How to roll out the change...",
				defaultCollapsed: !0
			}),
			y("Risks", "rich-text", { placeholder: "Known risks and mitigations..." }),
			y("Open Questions", "rich-text", { placeholder: "Unresolved questions for discussion..." }),
			y("Decision", "rich-text", {
				placeholder: "Final decision and rationale...",
				defaultCollapsed: !0
			}),
			y("Superseded By", "text", {
				placeholder: "Link to successor RFC",
				defaultCollapsed: !0
			})
		]
	};
}
function D() {
	return {
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		fields: [
			y("Feature Title", "text", { required: !0 }),
			y("Requested By", "text", { required: !0 }),
			y("Priority", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low / Nice to Have"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "New / Under Review / Planned / In Progress / Shipped / Declined"
			}),
			y("Category", "text", { placeholder: "UX / Performance / Integration / New Capability / Infrastructure" }),
			y("Target Release", "text"),
			y("User Story", "rich-text", {
				required: !0,
				placeholder: "As a [user], I want [goal] so that [benefit]"
			}),
			y("Problem Description", "rich-text", {
				required: !0,
				placeholder: "What problem does this solve?"
			}),
			y("Proposed Solution", "rich-text", { placeholder: "How should this work?" }),
			y("Success Metrics", "rich-text", { placeholder: "How will we measure success?" }),
			y("Effort Estimate", "text", { placeholder: "XS / S / M / L / XL" }),
			y("Business Value", "text", { placeholder: "Revenue / Retention / Adoption / Compliance / Internal Efficiency" }),
			y("Dependencies", "rich-text", { defaultCollapsed: !0 }),
			y("Decline Reason", "rich-text", {
				placeholder: "Why was this declined?",
				defaultCollapsed: !0
			}),
			y("Ship Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function ee() {
	return {
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		fields: [
			y("Contract Title", "text", { required: !0 }),
			y("Contract Type", "text", {
				required: !0,
				placeholder: "NDA / MSA / SOW / SLA / Employment / Vendor / Licensing / Other"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Pending Signature / Active / Expired / Terminated"
			}),
			y("Counterparty", "text", { required: !0 }),
			y("Effective Date", "date", { required: !0 }),
			y("Expiration Date", "date"),
			y("Auto-Renew", "boolean"),
			y("Renewal Term", "text", {
				placeholder: "Monthly / Quarterly / Annual / Biennial",
				defaultCollapsed: !0
			}),
			y("Contract Value", "number"),
			y("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			y("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Upfront" }),
			y("Internal Owner", "text", { required: !0 }),
			y("Key Terms", "rich-text", { placeholder: "Important clauses and obligations..." }),
			y("Termination Clause", "rich-text", { defaultCollapsed: !0 }),
			y("Notes", "rich-text"),
			y("Termination Date", "date", { defaultCollapsed: !0 }),
			y("Termination Reason", "rich-text", {
				placeholder: "Why was this terminated?",
				defaultCollapsed: !0
			})
		]
	};
}
function te() {
	return {
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		fields: [
			y("Sprint Name", "text", { required: !0 }),
			y("Sprint Dates", "text", {
				required: !0,
				placeholder: "Jan 6 – Jan 17"
			}),
			y("Facilitator", "text"),
			y("Team", "text", { required: !0 }),
			y("Velocity", "number"),
			y("Planned Points", "number"),
			y("Completed Points", "number"),
			y("What Went Well", "rich-text", {
				required: !0,
				placeholder: "Celebrate wins..."
			}),
			y("What Didn't Go Well", "rich-text", {
				required: !0,
				placeholder: "Identify pain points..."
			}),
			y("Start Doing", "rich-text", { placeholder: "New practices to adopt..." }),
			y("Stop Doing", "rich-text", { placeholder: "Practices to drop..." }),
			y("Continue Doing", "rich-text", { placeholder: "Practices to keep..." }),
			y("Action Items", "rich-text", {
				required: !0,
				placeholder: "Specific follow-up tasks..."
			}),
			y("Action Item Owners", "text", { placeholder: "Comma-separated names" }),
			y("Follow-Up Date", "date"),
			y("Overall Sentiment", "text", {
				required: !0,
				placeholder: "Great / Good / Mixed / Rough"
			})
		]
	};
}
function O() {
	return {
		name: "Job Posting",
		description: "Job listings with requirements, compensation, and hiring status.",
		icon: "📋",
		fields: [
			y("Job Title", "text", { required: !0 }),
			y("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance / Legal"
			}),
			y("Location", "text", {
				required: !0,
				placeholder: "Remote / Hybrid / On-site"
			}),
			y("Office Location", "text", { defaultCollapsed: !0 }),
			y("Employment Type", "text", {
				required: !0,
				placeholder: "Full-time / Part-time / Contract / Intern"
			}),
			y("Level", "text", {
				required: !0,
				placeholder: "Junior / Mid / Senior / Staff / Principal / Director / VP"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "Draft / Open / On Hold / Filled / Closed"
			}),
			y("Hiring Manager", "text", { required: !0 }),
			y("Salary Range Min", "number"),
			y("Salary Range Max", "number"),
			y("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			y("Job Description", "rich-text", {
				required: !0,
				placeholder: "Role overview and responsibilities..."
			}),
			y("Requirements", "rich-text", {
				required: !0,
				placeholder: "Must-have qualifications..."
			}),
			y("Nice to Have", "rich-text", { placeholder: "Preferred but not required..." }),
			y("Benefits", "rich-text", { placeholder: "Compensation and perks..." }),
			y("Posted Date", "date"),
			y("Closing Date", "date"),
			y("Filled By", "text", { defaultCollapsed: !0 }),
			y("Filled Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function ne() {
	return {
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		fields: [
			y("Vendor Name", "text", { required: !0 }),
			y("Category", "text", {
				required: !0,
				placeholder: "SaaS / Infrastructure / Consulting / Hardware / Staffing / Other"
			}),
			y("Evaluation Status", "text", {
				required: !0,
				placeholder: "Researching / In Trial / Evaluating / Approved / Rejected / Active Vendor"
			}),
			y("Evaluator", "text", { required: !0 }),
			y("Evaluation Date", "date", { required: !0 }),
			y("Website", "text"),
			y("Primary Contact", "text"),
			y("Annual Cost", "number"),
			y("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			y("Contract Length", "text", { placeholder: "Monthly / Annual / Multi-Year" }),
			y("Security Review Complete", "boolean"),
			y("SOC2 Compliant", "boolean"),
			y("GDPR Compliant", "boolean"),
			y("Strengths", "rich-text", { placeholder: "Key advantages..." }),
			y("Weaknesses", "rich-text", { placeholder: "Gaps and concerns..." }),
			y("Integration Requirements", "rich-text", { placeholder: "Technical integration needs..." }),
			y("Score (1–10)", "number"),
			y("Recommendation", "rich-text", { placeholder: "Final recommendation..." }),
			y("Rejection Reason", "rich-text", {
				placeholder: "Why was this vendor rejected?",
				defaultCollapsed: !0
			})
		]
	};
}
function k() {
	return {
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		fields: [
			y("Project Name", "text", { required: !0 }),
			y("Reporting Period", "text", {
				required: !0,
				placeholder: "Week of Jan 6, 2025"
			}),
			y("Project Lead", "text", { required: !0 }),
			y("Overall Status", "text", {
				required: !0,
				placeholder: "On Track / At Risk / Blocked / Complete"
			}),
			y("Health: Scope", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			y("Health: Timeline", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			y("Health: Budget", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			y("Percent Complete", "number"),
			y("Summary", "rich-text", {
				required: !0,
				placeholder: "High-level status overview..."
			}),
			y("Accomplishments This Period", "rich-text", {
				required: !0,
				placeholder: "What was delivered..."
			}),
			y("Planned Next Period", "rich-text", {
				required: !0,
				placeholder: "What's coming up..."
			}),
			y("Risks & Issues", "rich-text", { placeholder: "Active risks and open issues..." }),
			y("Blockers", "rich-text", {
				placeholder: "Blocking items requiring escalation...",
				defaultCollapsed: !0
			}),
			y("Decisions Needed", "rich-text", { placeholder: "Pending decisions from stakeholders..." }),
			y("Budget Spent", "number"),
			y("Budget Remaining", "number"),
			y("Target Completion Date", "date"),
			y("Stakeholder Notes", "rich-text", { defaultCollapsed: !0 })
		]
	};
}
function A() {
	return {
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		fields: [
			y("Change Title", "text", { required: !0 }),
			y("Change ID", "text", {
				required: !0,
				placeholder: "CR-0001"
			}),
			y("Requester", "text", { required: !0 }),
			y("Request Date", "date", { required: !0 }),
			y("Priority", "text", {
				required: !0,
				placeholder: "Emergency / High / Medium / Low"
			}),
			y("Status", "text", {
				required: !0,
				placeholder: "Submitted / Under Review / Approved / Scheduled / In Progress / Completed / Rolled Back / Rejected"
			}),
			y("Change Type", "text", {
				required: !0,
				placeholder: "Standard / Normal / Emergency"
			}),
			y("Systems Affected", "text", { placeholder: "Comma-separated system names" }),
			y("Description of Change", "rich-text", {
				required: !0,
				placeholder: "What is being changed and why..."
			}),
			y("Business Justification", "rich-text", {
				required: !0,
				placeholder: "Why this change is needed..."
			}),
			y("Risk Assessment", "text", {
				required: !0,
				placeholder: "Low / Medium / High / Critical"
			}),
			y("Risk Mitigation", "rich-text", {
				placeholder: "Steps to reduce risk...",
				defaultCollapsed: !0
			}),
			y("Rollback Plan", "rich-text", {
				required: !0,
				placeholder: "How to revert if something goes wrong..."
			}),
			y("Scheduled Date", "date", { defaultCollapsed: !0 }),
			y("Implementation Notes", "rich-text", {
				placeholder: "Notes from the change window...",
				defaultCollapsed: !0
			}),
			y("Approver", "text"),
			y("Approval Date", "date", { defaultCollapsed: !0 }),
			y("Post-Implementation Review", "rich-text", {
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
		build: C
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
		build: b
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
		build: E
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
		build: te
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
		build: T
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
		build: ne
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
		build: A
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
		build: D
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
		build: k
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
		build: x
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
		build: O
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
		build: w
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
		build: S
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
		build: ee
	}
];
function M(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.category.toLowerCase().includes(n) || e.tags.some((e) => e.toLowerCase().includes(n));
}
function N(e, t = "All") {
	return j.filter((n) => (t === "All" || n.category === t) && M(n, e));
}
//#endregion
//#region src/renderers/tasks/definition.ts
var re = {
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
}, ie = {
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
}, ae = {
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
}, oe = {
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
}, se = {
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
}, ce = {
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
}, le = {
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
}, ue = {
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
}, de = {
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
}, fe = {
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
}, pe = {
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
}, me = /^(\d{4})-(\d{2})-(\d{2})$/;
function P(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	if (t === "") return null;
	let n = me.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]), r = Number(n[3]);
		if (t < 1 || t > 12 || r < 1 || r > 31) return null;
		let i = new Date(e, t - 1, r);
		return i.setFullYear(e, t - 1, r), i.getMonth() !== t - 1 || i.getDate() !== r ? null : i;
	}
	let r = new Date(t);
	return Number.isNaN(r.getTime()) ? null : r;
}
function he(e = /* @__PURE__ */ new Date()) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function F(e, t = /* @__PURE__ */ new Date()) {
	let n = P(e);
	return n ? he(n).getTime() < he(t).getTime() : !1;
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var ge = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, I = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, _e = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function ve(e) {
	let t = P(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function ye(e) {
	return F(e);
}
function L(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function R({ item: e, editable: t, onUpdate: a, onRemove: c, autoFocusText: u, onDidAutoFocus: v }) {
	let [y, b] = m(!1), [x, S] = m(""), [C, w] = m(0), T = p(null), E = p(null), D = p(null), ee = () => {
		a({ status: e.status === "done" ? "pending" : "done" });
	}, te = e.assignee ? n.find((t) => t.displayName === e.assignee) : void 0, O = x.trim() ? r(x) : n, ne = d(() => {
		t && (S(""), w(0), b(!0));
	}, [t]), k = d(() => {
		b(!1), S(""), w(0);
	}, []), A = d((e) => {
		a({ assignee: e.displayName }), k();
	}, [a, k]), j = d(() => {
		a({ assignee: "" }), k();
	}, [a, k]);
	f(() => {
		if (!y) return;
		let e = (e) => {
			T.current && !T.current.contains(e.target) && k();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [y, k]), f(() => {
		y && E.current && E.current.focus();
	}, [y]), f(() => {
		w(0);
	}, [x]), f(() => {
		u && D.current && (D.current.focus(), v?.());
	}, [u, v]);
	let M = (e) => {
		e.key === "Escape" ? k() : e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, O.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), O[C] && A(O[C]));
	}, N = e.dueDate && e.status !== "done" ? ye(e.dueDate) : !1;
	return /* @__PURE__ */ _("div", {
		className: i("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ g("span", {
				title: `Priority: ${e.priority}`,
				className: i("w-2 h-2 rounded-full shrink-0"),
				style: { background: I[e.priority] }
			}),
			/* @__PURE__ */ g(l, {
				checked: e.status === "done",
				onChange: ee,
				disabled: !t,
				className: i("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ g(o, {
				ref: D,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => a({ text: e.target.value }),
				readOnly: !t,
				className: i("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ _("span", {
				title: e.dueDate,
				className: i("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", N ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					N ? "⚠ " : "",
					"Due: ",
					ve(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ g("span", {
				className: i("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: _e[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ _("div", {
				ref: T,
				className: i("relative"),
				children: [/* @__PURE__ */ g("button", {
					type: "button",
					onClick: ne,
					title: e.assignee || "Unassigned",
					className: i("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-surface text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ _(h, { children: [/* @__PURE__ */ g("span", {
						className: i("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: te?.color ?? "var(--color-text-tertiary)" },
						children: L(e.assignee)
					}), /* @__PURE__ */ g("span", {
						className: i("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), y && /* @__PURE__ */ _("div", {
					className: i("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ g("div", {
							className: i("px-2 py-1"),
							children: /* @__PURE__ */ g(o, {
								ref: E,
								size: "sm",
								value: x,
								onChange: (e) => S(e.target.value),
								onKeyDown: M,
								placeholder: "Search users...",
								className: i("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ _("button", {
							type: "button",
							onClick: j,
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ g("span", {
								className: i("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ g("span", {
								className: i("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						O.map((e, t) => /* @__PURE__ */ _("button", {
							type: "button",
							onClick: () => A(e),
							onMouseEnter: () => w(t),
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === C ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ g("span", {
								className: i("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: L(e.displayName)
							}), /* @__PURE__ */ g("span", { children: e.displayName })]
						}, e.userId)),
						O.length === 0 && /* @__PURE__ */ g("div", {
							className: i("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ g(s, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => a({ priority: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: I[e.priority] },
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
			/* @__PURE__ */ g(s, {
				value: e.status,
				disabled: !t,
				onChange: (e) => a({ status: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: ge[e.status] },
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
			t && /* @__PURE__ */ g("button", {
				type: "button",
				onClick: c,
				title: "Remove task",
				className: i("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
				children: "x"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TaskList.tsx
function z({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: a }) {
	if (e.length === 0) return /* @__PURE__ */ g("div", {
		className: i("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let o = a?.current ?? !1;
	return /* @__PURE__ */ g("div", {
		className: i("py-2"),
		children: e.map((i, s) => /* @__PURE__ */ g(R, {
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
function B(e) {
	let t = e.items;
	return Array.isArray(t) ? t.filter((e) => e != null) : [];
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function be({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let d = B(e), f = p(!1);
	return /* @__PURE__ */ _("div", { children: [
		t && n && /* @__PURE__ */ g(u, {
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
			onUpdateCursorInfo: l
		}),
		(d.length > 0 || a) && /* @__PURE__ */ g(z, {
			items: d,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: f
		}),
		a && /* @__PURE__ */ g("button", {
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
				}), f.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/rich-text/RichTextEditorRenderer.tsx
function xe({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o }) {
	return !t || !n ? /* @__PURE__ */ g("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ g(u, {
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
		onUpdateCursorInfo: o
	});
}
//#endregion
//#region src/renderers/rich-text/RichTextReaderRenderer.tsx
function Se({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i }) {
	return /* @__PURE__ */ _("div", { children: [t && n ? /* @__PURE__ */ g("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ g(u, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: {
				name: "",
				color: "#6b7280"
			},
			editable: !1,
			sectionId: e.id
		})
	}) : /* @__PURE__ */ g("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ g("button", {
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function Ce({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = B(e), o = p(!1);
	return /* @__PURE__ */ _("div", {
		className: "py-1",
		children: [
			a.length > 0 || t ? /* @__PURE__ */ g(z, {
				items: a,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: o
			}) : null,
			a.length === 0 && !t && /* @__PURE__ */ g("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ g("button", {
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
				className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
				children: "+ Add item"
			})
		]
	});
}
//#endregion
//#region src/renderers/tasks/TasksReaderRenderer.tsx
var we = {
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
}, Te = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function Ee(e) {
	return F(e);
}
function De(e) {
	let t = P(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function Oe(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function V({ item: e, onUpdateItem: t }) {
	let [n, r] = m(!1), [a, o] = m(!1), s = n || a, c = we[e.status] ?? we.pending, l = Te[e.priority] ?? Te.medium, u = e.dueDate && e.status === "pending" ? Ee(e.dueDate) : !1, d = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ _("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		onFocus: () => o(!0),
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || o(!1);
		},
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: d ? .65 : 1 },
		children: [
			/* @__PURE__ */ g("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: l,
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ g("button", {
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
				children: d && /* @__PURE__ */ g("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ g("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ g("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", d ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ g("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ g("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: Oe(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ _("span", {
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
				children: [u ? "⚠ " : "", De(e.dueDate)]
			}),
			t && s && /* @__PURE__ */ _("select", {
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
					/* @__PURE__ */ g("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ g("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ g("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ g("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function ke({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = B(e);
	if (r.length === 0) return /* @__PURE__ */ g("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "done" || e.status === "acked"), a = r.filter((e) => e.status === "rejected"), o = r.filter((e) => !i.includes(e) && !a.includes(e));
	return /* @__PURE__ */ _("div", { children: [
		o.length > 0 && /* @__PURE__ */ g("div", {
			className: "mb-1",
			children: o.map((e) => /* @__PURE__ */ g(V, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		i.length > 0 && /* @__PURE__ */ g("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ g(V, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ g("div", { children: a.map((e) => /* @__PURE__ */ g(V, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ g("button", {
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function Ae({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: o, onRemove: s }) {
	let c = p(null), l = e.status === "done", u = a(r);
	return f(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ _("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ g("input", {
				type: "checkbox",
				checked: l,
				onChange: () => o({ status: l ? "pending" : "done" }),
				disabled: !t,
				className: i("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ g("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => o({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: i("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", l ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ g("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function je({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let d = B(e), f = p(null), m = () => {
		o && (f.current = d.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, h = f.current, v = h !== null && d.length > h, y = d.length, b = d.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ _("div", { children: [
		t && n && /* @__PURE__ */ g(u, {
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
			onUpdateCursorInfo: l
		}),
		y > 0 && /* @__PURE__ */ _("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				b,
				" / ",
				y,
				" done"
			]
		}),
		/* @__PURE__ */ g("div", { children: d.map((e, t) => {
			let n = t === d.length - 1, r = v && n;
			return /* @__PURE__ */ g(Ae, {
				item: e,
				editable: a,
				autoFocus: r,
				onDidAutoFocus: r ? () => {
					f.current = null;
				} : void 0,
				onUpdate: (t) => s?.(e.id, t),
				onRemove: () => c?.(e.id)
			}, e.id);
		}) }),
		a && /* @__PURE__ */ g("button", {
			type: "button",
			onClick: m,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function Me({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: a, onNavigateToEditor: o }) {
	let s = B(e), c = s.length, l = s.filter((e) => e.status === "done").length, d = c > 0 ? Math.round(l / c * 100) : 0;
	return /* @__PURE__ */ _("div", { children: [
		t && n && /* @__PURE__ */ g("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ g(u, {
				fragment: t,
				ydoc: n,
				provider: r ?? null,
				user: {
					name: "",
					color: "#6b7280"
				},
				editable: !1,
				sectionId: e.id
			})
		}),
		c > 0 && /* @__PURE__ */ _("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ _("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ _("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						l,
						" / ",
						c,
						" done"
					]
				}), /* @__PURE__ */ _("span", {
					className: i("text-[11px] font-semibold", d === 100 ? "text-success-fg" : "text-neutral"),
					children: [d, "%"]
				})]
			}), /* @__PURE__ */ g("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ g("div", {
					className: i("h-full rounded-sm transition-[width] duration-300", d === 100 ? "bg-success" : "bg-info"),
					style: { width: `${d}%` }
				})
			})]
		}),
		c === 0 ? /* @__PURE__ */ g("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ g("div", { children: s.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ _("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ g("input", {
					type: "checkbox",
					checked: t,
					onChange: () => a?.(e.id, { status: t ? "pending" : "done" }),
					className: i("w-3.5 h-3.5 accent-success shrink-0", a ? "cursor-pointer" : "cursor-default"),
					readOnly: !a
				}), /* @__PURE__ */ g("span", {
					className: i("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ g("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		o && /* @__PURE__ */ g("button", {
			type: "button",
			onClick: () => o(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var Ne = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
};
function Pe() {
	return "";
}
function Fe() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function Ie(e) {
	return Ne[e] ?? null;
}
async function Le(e) {
	let t = e.documentId ?? Fe();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = await fetch(`${Pe()}/api/approvals`, {
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
		return r.ok ? { ok: !0 } : {
			ok: !1,
			error: `POST failed: ${r.status}`
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
var Re = {
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
function ze({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: o, onRemove: s }) {
	let c = p(null), l = Re[e.status] ?? Re.pending, u = a(r);
	return f(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ _("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ g("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: l.bg,
					color: l.color
				},
				children: l.icon
			}),
			/* @__PURE__ */ g("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => o({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: i("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ _("select", {
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => o({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
				style: {
					border: `1px solid ${l.color}`,
					background: l.bg,
					color: l.color
				},
				children: [
					/* @__PURE__ */ g("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ g("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ g("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ g("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function Be({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let d = B(e), f = p(null), m = () => {
		o && (f.current = d.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, h = f.current, v = h !== null && d.length > h;
	return /* @__PURE__ */ _("div", { children: [
		t && n && /* @__PURE__ */ g(u, {
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
			onUpdateCursorInfo: l
		}),
		d.length === 0 && !a && /* @__PURE__ */ g("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ g("div", { children: d.map((t, n) => {
			let r = n === d.length - 1, o = v && r;
			return /* @__PURE__ */ g(ze, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					f.current = null;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = Ie(n.status);
						t && Le({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ g("button", {
			type: "button",
			onClick: m,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var H = {
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
function Ve({ item: e }) {
	let t = H[e.status] ?? H.pending;
	return /* @__PURE__ */ _("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ g("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ g("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ g("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ g("span", {
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
function U({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ _("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ g("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ g(Ve, { item: e }, e.id))]
	});
}
function He({ section: e, onNavigateToEditor: t }) {
	let n = B(e);
	if (n.length === 0) return /* @__PURE__ */ g("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "acked" || e.status === "done"), i = n.filter((e) => e.status === "rejected"), a = n.filter((e) => !r.includes(e) && !i.includes(e));
	return /* @__PURE__ */ _("div", { children: [
		a.length > 0 && /* @__PURE__ */ g(U, {
			label: "Open",
			color: H.pending.color,
			items: a
		}),
		r.length > 0 && /* @__PURE__ */ g(U, {
			label: "Decided",
			color: H.acked.color,
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ g(U, {
			label: "Vetoed",
			color: H.rejected.color,
			items: i
		}),
		t && /* @__PURE__ */ g("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function Ue(e) {
	return e.metadata ?? {};
}
function We({ section: e, editable: t, onUpdateSection: n }) {
	let r = Ue(e), [a, o] = m(!1), s = (t) => {
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
	return /* @__PURE__ */ g("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ _("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ g("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ g("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ _("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ g("button", {
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
		}) : /* @__PURE__ */ _("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ g("input", {
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
function Ge({ section: e }) {
	let t = e.metadata ?? {};
	return t.fileName ? /* @__PURE__ */ _("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ g("span", {
				className: "text-base",
				children: "📎"
			}),
			/* @__PURE__ */ _("a", {
				href: t.fileDataUrl ?? "#",
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ _("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	}) : /* @__PURE__ */ g("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function Ke({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [a, o] = m(!1), s = (t) => {
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
	return /* @__PURE__ */ g("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ _("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ g("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ _("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ g("input", {
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ g("button", {
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
		}) : /* @__PURE__ */ _("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ g("input", {
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
function qe({ section: e }) {
	let t = e.metadata ?? {};
	return t.imageDataUrl ? /* @__PURE__ */ _("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ g("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ g("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ g("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function Je(e) {
	return typeof e == "object" && !!e;
}
function Ye(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links.filter(Je).map((e) => ({
		label: typeof e.label == "string" ? e.label : "",
		url: typeof e.url == "string" ? e.url : ""
	})) : [];
}
function Xe({ section: e, editable: t, onUpdateSection: n }) {
	let r = Ye(e), i = (t) => {
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
	return /* @__PURE__ */ _("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ g("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ _("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ g("input", {
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ g("input", {
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ g("button", {
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ g("button", {
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
function Ze(e) {
	return typeof e == "object" && !!e && typeof e.url == "string";
}
function Qe({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => Ze(e) && e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ g("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ g("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => /* @__PURE__ */ g("li", {
			className: "text-[13px]",
			children: /* @__PURE__ */ g("a", {
				href: e.url,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "text-primary font-medium no-underline",
				children: e.label || e.url
			})
		}, t))
	});
}
//#endregion
//#region src/renderers/scalarValue.ts
var W = "value";
function $e(e) {
	return e.metadata ?? {};
}
function G(e) {
	return $e(e)[W];
}
function et(e) {
	let t = G(e);
	return typeof t == "string" ? t : "";
}
function tt(e) {
	let t = G(e);
	if (typeof t == "number") return Number.isFinite(t) ? t : void 0;
	if (typeof t == "string" && t.trim() !== "") {
		let e = Number(t);
		if (Number.isFinite(e)) return e;
	}
}
function K(e) {
	let t = G(e);
	return typeof t == "boolean" ? t : void 0;
}
var nt = /^(\d{4}-\d{2}-\d{2})/;
function rt(e) {
	let t = G(e);
	if (typeof t != "string") return "";
	let n = nt.exec(t.trim());
	return n ? n[1] : "";
}
function q(e, t) {
	let n = { ...$e(e) };
	return t === void 0 ? delete n[W] : n[W] = t, { metadata: n };
}
function it(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function at(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function ot(e) {
	if (!e) return "";
	try {
		return e.toString().replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
	} catch {
		return "";
	}
}
//#endregion
//#region src/renderers/LegacyProseNote.tsx
function J({ sectionId: e, fragment: t }) {
	let n = ot(t);
	return n ? /* @__PURE__ */ _("div", {
		"data-testid": `scalar-legacy-note-${e}`,
		className: "mt-1.5 text-[12px] text-text-tertiary break-words",
		children: [
			/* @__PURE__ */ g("span", {
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
function Y({ section: e, fragment: t }) {
	let n = et(e);
	return n.trim() === "" ? /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("div", {
		"data-testid": `text-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "Not set."
	}), /* @__PURE__ */ g(J, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ g("div", {
		"data-testid": `text-field-reader-${e.id}`,
		className: "text-[13px] text-text-primary leading-[1.5] break-words",
		children: n
	});
}
//#endregion
//#region src/renderers/text/TextEditorRenderer.tsx
function st(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ g(Y, { ...e });
	let a = et(t);
	return /* @__PURE__ */ _("div", {
		"data-testid": `text-field-editor-${t.id}`,
		children: [/* @__PURE__ */ g(o, {
			"data-testid": `text-field-input-${t.id}`,
			value: a,
			"aria-label": t.title,
			placeholder: t.placeholder || "Enter text…",
			onChange: (e) => i?.(q(t, e.target.value || void 0))
		}), a === "" && /* @__PURE__ */ g(J, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/date/DateReaderRenderer.tsx
function X({ section: e, fragment: t }) {
	let n = rt(e);
	return n ? /* @__PURE__ */ g("time", {
		"data-testid": `date-field-reader-${e.id}`,
		dateTime: n,
		className: "text-[13px] text-text-primary font-medium tabular-nums",
		children: it(n)
	}) : /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("div", {
		"data-testid": `date-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "No date set."
	}), /* @__PURE__ */ g(J, {
		sectionId: e.id,
		fragment: t
	})] });
}
//#endregion
//#region src/renderers/date/DateEditorRenderer.tsx
function ct(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ g(X, { ...e });
	let a = rt(t);
	return /* @__PURE__ */ _("div", {
		"data-testid": `date-field-editor-${t.id}`,
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ g("div", {
					className: "max-w-xs",
					children: /* @__PURE__ */ g(o, {
						type: "date",
						"data-testid": `date-field-input-${t.id}`,
						value: a,
						"aria-label": t.title,
						onChange: (e) => i?.(q(t, e.target.value || void 0))
					})
				}),
				a ? /* @__PURE__ */ g("span", {
					"data-testid": `date-field-formatted-${t.id}`,
					className: "text-[12px] text-text-tertiary tabular-nums",
					children: it(a)
				}) : /* @__PURE__ */ g("span", {
					"data-testid": `date-field-hint-${t.id}`,
					className: "text-[12px] text-text-tertiary italic",
					children: t.placeholder || "No date set"
				}),
				a && /* @__PURE__ */ g("button", {
					type: "button",
					"data-testid": `date-field-clear-${t.id}`,
					onClick: () => i?.(q(t, void 0)),
					className: "bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0 font-inherit",
					children: "Clear"
				})
			]
		}), !a && /* @__PURE__ */ g(J, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/number/NumberReaderRenderer.tsx
function Z({ section: e, fragment: t }) {
	let n = tt(e);
	return n === void 0 ? /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("div", {
		"data-testid": `number-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "No value."
	}), /* @__PURE__ */ g(J, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ g("div", {
		"data-testid": `number-field-reader-${e.id}`,
		className: "text-[13px] text-text-primary font-medium tabular-nums",
		children: at(n)
	});
}
//#endregion
//#region src/renderers/number/NumberEditorRenderer.tsx
function lt(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: i } = e;
	if (!n) return /* @__PURE__ */ g(Z, { ...e });
	let a = tt(t);
	return /* @__PURE__ */ _("div", {
		"data-testid": `number-field-editor-${t.id}`,
		children: [/* @__PURE__ */ g("div", {
			className: "max-w-xs",
			children: /* @__PURE__ */ g(c, {
				"data-testid": `number-field-input-${t.id}`,
				value: a,
				"aria-label": t.title,
				placeholder: t.placeholder || "Enter a number…",
				onChange: (e) => i?.(q(t, e)),
				onClear: () => i?.(q(t, void 0))
			})
		}), a === void 0 && /* @__PURE__ */ g(J, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
//#endregion
//#region src/renderers/boolean/BooleanReaderRenderer.tsx
function Q({ section: e, fragment: t }) {
	let n = K(e);
	return n === void 0 ? /* @__PURE__ */ _("div", { children: [/* @__PURE__ */ g("div", {
		"data-testid": `boolean-field-empty-${e.id}`,
		className: "text-text-tertiary italic text-[13px]",
		children: "Not answered."
	}), /* @__PURE__ */ g(J, {
		sectionId: e.id,
		fragment: t
	})] }) : /* @__PURE__ */ g("div", {
		"data-testid": `boolean-field-reader-${e.id}`,
		className: i("text-[13px] font-medium", n ? "text-success-fg" : "text-text-secondary"),
		children: n ? "✓ Yes" : "✗ No"
	});
}
//#endregion
//#region src/renderers/boolean/BooleanEditorRenderer.tsx
function $(e) {
	let { section: t, editable: n, fragment: r, onUpdateSection: a } = e;
	if (!n) return /* @__PURE__ */ g(Q, { ...e });
	let o = K(t);
	return /* @__PURE__ */ _("div", {
		"data-testid": `boolean-field-editor-${t.id}`,
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ g(l, {
					"data-testid": `boolean-field-input-${t.id}`,
					checked: o === !0,
					indeterminate: o === void 0,
					"aria-label": t.title,
					onChange: (e) => a?.(q(t, e))
				}),
				/* @__PURE__ */ g("span", {
					"data-testid": `boolean-field-status-${t.id}`,
					className: i("text-[13px]", o === void 0 ? "text-text-tertiary italic" : o ? "text-success-fg font-medium" : "text-text-secondary font-medium"),
					children: o === void 0 ? t.placeholder || "Not answered" : o ? "Yes" : "No"
				}),
				o !== void 0 && /* @__PURE__ */ g("button", {
					type: "button",
					"data-testid": `boolean-field-clear-${t.id}`,
					onClick: () => a?.(q(t, void 0)),
					className: "bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0 font-inherit",
					children: "Clear"
				})
			]
		}), o === void 0 && /* @__PURE__ */ g(J, {
			sectionId: t.id,
			fragment: r
		})]
	});
}
e(re), e(ie), e(ae), e(oe), e(se), e(ce), e(le), e(ue), e(de), e(fe), e(pe), t("*", "*", be), t("rich-text", "editor", xe), t("rich-text", "ack", Se), t("rich-text", "reader", Se), t("tasks", "editor", Ce), t("tasks", "ack", ke), t("tasks", "reader", ke), t("checklist", "editor", je), t("checklist", "ack", Me), t("checklist", "reader", Me), t("decisions", "editor", Be), t("decisions", "ack", He), t("decisions", "reader", He), t("file-upload", "editor", We), t("file-upload", "ack", Ge), t("file-upload", "reader", Ge), t("diagram", "editor", Ke), t("diagram", "ack", qe), t("diagram", "reader", qe), t("link-block", "editor", Xe), t("link-block", "ack", Qe), t("link-block", "reader", Qe), t("text", "editor", st), t("text", "ack", Y), t("text", "reader", Y), t("date", "editor", ct), t("date", "ack", X), t("date", "reader", X), t("number", "editor", lt), t("number", "ack", Z), t("number", "reader", Z), t("boolean", "editor", $), t("boolean", "ack", Q), t("boolean", "reader", Q), t("checkbox", "editor", $), t("checkbox", "ack", Q), t("checkbox", "reader", Q);
//#endregion
export { ct as a, Y as c, R as d, v as f, M as h, Z as i, be as l, N as m, Q as n, X as o, j as p, lt as r, st as s, $ as t, z as u };
