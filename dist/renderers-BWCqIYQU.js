import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { n, r } from "./userDirectory-CyWbVxFq.js";
import { t as i } from "./cn-DhjIN-s0.js";
import { t as a } from "./useEventCallback-Cwx9QVSi.js";
import { t as o } from "./Input-DLknWXri.js";
import { t as s } from "./Select-CqVokE2v.js";
import { t as c } from "./Checkbox-DqN9RkXK.js";
import { t as l } from "./TiptapEditor-Dn9rUdZx.js";
import { useCallback as u, useEffect as d, useRef as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/components/doc-types/cookbooks/index.ts
var _ = [
	"General",
	"Engineering",
	"Operations",
	"Product",
	"People",
	"Sales & CRM",
	"Finance",
	"Legal"
];
function v(e, t, n = {}) {
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
function y() {
	return {
		name: "Bug Report",
		description: "Track bugs with severity, reproduction steps, and resolution notes.",
		icon: "🐛",
		fields: [
			v("Title", "text", { required: !0 }),
			v("Severity", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "Open / In Progress / Resolved / Won't Fix"
			}),
			v("Reported By", "text", { required: !0 }),
			v("Reported Date", "date", { required: !0 }),
			v("Assigned To", "text"),
			v("Environment", "text", { placeholder: "Production / Staging / Development / Local" }),
			v("Steps to Reproduce", "rich-text", {
				required: !0,
				placeholder: "Detailed steps to reproduce the issue..."
			}),
			v("Expected Behavior", "rich-text", {
				required: !0,
				placeholder: "What should happen..."
			}),
			v("Actual Behavior", "rich-text", {
				required: !0,
				placeholder: "What actually happens..."
			}),
			v("Screenshots / Evidence", "rich-text", { placeholder: "Paste screenshots or supporting evidence..." }),
			v("Root Cause", "rich-text", {
				placeholder: "What caused the issue...",
				defaultCollapsed: !0
			}),
			v("Resolution Notes", "rich-text", {
				placeholder: "How the issue was resolved...",
				defaultCollapsed: !0
			})
		]
	};
}
function b() {
	return {
		name: "Employee Onboarding",
		description: "New hire onboarding tasks, milestones, and equipment tracking.",
		icon: "👋",
		fields: [
			v("Employee Name", "text", { required: !0 }),
			v("Start Date", "date", { required: !0 }),
			v("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance"
			}),
			v("Manager", "text", { required: !0 }),
			v("Role Title", "text", { required: !0 }),
			v("Equipment Issued", "boolean"),
			v("Accounts Created", "boolean"),
			v("Orientation Complete", "boolean"),
			v("First Week Goals", "rich-text", { placeholder: "Goals for the first week..." }),
			v("30-Day Milestones", "rich-text", { placeholder: "What should be accomplished by day 30..." }),
			v("60-Day Milestones", "rich-text", {
				placeholder: "What should be accomplished by day 60...",
				defaultCollapsed: !0
			}),
			v("90-Day Review Date", "date"),
			v("Mentor Assigned", "text"),
			v("Notes", "rich-text")
		]
	};
}
function x() {
	return {
		name: "Invoice",
		description: "Track invoices with line items, amounts, and payment status.",
		icon: "💰",
		fields: [
			v("Invoice Number", "text", {
				required: !0,
				placeholder: "INV-0001"
			}),
			v("Issue Date", "date", { required: !0 }),
			v("Due Date", "date", { required: !0 }),
			v("Status", "text", {
				required: !0,
				placeholder: "Draft / Sent / Paid / Overdue / Void"
			}),
			v("Client Name", "text", { required: !0 }),
			v("Client Email", "text"),
			v("Line Items", "rich-text", {
				required: !0,
				placeholder: "Description of goods or services..."
			}),
			v("Subtotal", "number", { required: !0 }),
			v("Tax Rate (%)", "number"),
			v("Tax Amount", "number"),
			v("Total Amount", "number", { required: !0 }),
			v("Currency", "text", {
				required: !0,
				placeholder: "USD / EUR / GBP / CAD / AUD"
			}),
			v("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Due on Receipt" }),
			v("Payment Method", "text", { placeholder: "Wire / ACH / Check / Credit Card" }),
			v("Notes", "rich-text"),
			v("Paid Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function S() {
	return {
		name: "Meeting Notes",
		description: "Capture agendas, discussion points, decisions, and action items.",
		icon: "📝",
		fields: [
			v("Meeting Title", "text", { required: !0 }),
			v("Date", "date", { required: !0 }),
			v("Meeting Type", "text", {
				required: !0,
				placeholder: "Standup / Sprint Planning / Retro / 1:1 / All Hands / Design Review / Ad Hoc"
			}),
			v("Attendees", "text", { placeholder: "Comma-separated names" }),
			v("Facilitator", "text"),
			v("Agenda", "rich-text", { placeholder: "Topics to cover..." }),
			v("Discussion Notes", "rich-text", {
				required: !0,
				placeholder: "Key discussion points..."
			}),
			v("Action Items", "rich-text", { placeholder: "Who does what by when..." }),
			v("Decisions Made", "rich-text", { placeholder: "Decisions reached during the meeting..." }),
			v("Follow-Up Date", "date"),
			v("Recording Link", "text", { placeholder: "URL to meeting recording" })
		]
	};
}
function C() {
	return {
		name: "Sales Lead",
		description: "Track leads through the sales pipeline with deal values and follow-ups.",
		icon: "💼",
		fields: [
			v("Contact Name", "text", { required: !0 }),
			v("Company", "text", { required: !0 }),
			v("Email", "text", {
				required: !0,
				placeholder: "email@example.com"
			}),
			v("Phone", "text"),
			v("Lead Source", "text", {
				required: !0,
				placeholder: "Inbound / Outbound / Referral / Event / Website / Cold Call"
			}),
			v("Stage", "text", {
				required: !0,
				placeholder: "New / Contacted / Qualified / Proposal / Negotiation / Closed Won / Closed Lost"
			}),
			v("Deal Value", "number"),
			v("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			v("Expected Close Date", "date"),
			v("Last Contact Date", "date"),
			v("Next Follow-Up", "date"),
			v("Owner", "text"),
			v("Notes", "rich-text"),
			v("Lost Reason", "text", {
				placeholder: "Price / Competitor / Timing / No Budget / No Response / Other",
				defaultCollapsed: !0
			})
		]
	};
}
function w() {
	return {
		name: "Incident Report",
		description: "Document incidents with severity, timeline, root cause, and remediation.",
		icon: "🚨",
		fields: [
			v("Incident Title", "text", { required: !0 }),
			v("Severity", "text", {
				required: !0,
				placeholder: "SEV1 / SEV2 / SEV3 / SEV4"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "Investigating / Identified / Monitoring / Resolved / Postmortem"
			}),
			v("Detected At", "date", { required: !0 }),
			v("Resolved At", "date", { defaultCollapsed: !0 }),
			v("Duration", "text", {
				defaultCollapsed: !0,
				placeholder: "e.g. 2h 15m"
			}),
			v("Incident Commander", "text", { required: !0 }),
			v("Services Affected", "text", { placeholder: "Comma-separated service names" }),
			v("Customer Impact", "rich-text", {
				required: !0,
				placeholder: "Describe the user-facing impact..."
			}),
			v("Timeline", "rich-text", {
				required: !0,
				placeholder: "Chronological sequence of events..."
			}),
			v("Root Cause", "rich-text", {
				placeholder: "What caused the incident...",
				defaultCollapsed: !0
			}),
			v("Remediation Steps", "rich-text", { placeholder: "Steps taken to resolve..." }),
			v("Action Items", "rich-text", {
				placeholder: "Follow-up tasks to prevent recurrence...",
				defaultCollapsed: !0
			}),
			v("Lessons Learned", "rich-text", {
				placeholder: "What we can do better next time...",
				defaultCollapsed: !0
			}),
			v("Related Incidents", "text", { placeholder: "Links to related incident reports" })
		]
	};
}
function T() {
	return {
		name: "RFC / Technical Proposal",
		description: "Request for comments with problem statement, proposed solution, and alternatives.",
		icon: "📨",
		fields: [
			v("RFC Title", "text", { required: !0 }),
			v("Author", "text", { required: !0 }),
			v("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Accepted / Rejected / Superseded"
			}),
			v("Created Date", "date", { required: !0 }),
			v("Decision Date", "date", { defaultCollapsed: !0 }),
			v("Reviewers", "text", { placeholder: "Comma-separated reviewer names" }),
			v("Problem Statement", "rich-text", {
				required: !0,
				placeholder: "What problem are we solving?"
			}),
			v("Proposed Solution", "rich-text", {
				required: !0,
				placeholder: "Detailed proposal..."
			}),
			v("Alternatives Considered", "rich-text", { placeholder: "Other approaches evaluated..." }),
			v("Technical Design", "rich-text", { placeholder: "Architecture, data flow, API changes..." }),
			v("Migration Plan", "rich-text", {
				placeholder: "How to roll out the change...",
				defaultCollapsed: !0
			}),
			v("Risks", "rich-text", { placeholder: "Known risks and mitigations..." }),
			v("Open Questions", "rich-text", { placeholder: "Unresolved questions for discussion..." }),
			v("Decision", "rich-text", {
				placeholder: "Final decision and rationale...",
				defaultCollapsed: !0
			}),
			v("Superseded By", "text", {
				placeholder: "Link to successor RFC",
				defaultCollapsed: !0
			})
		]
	};
}
function E() {
	return {
		name: "Feature Request",
		description: "Capture feature requests with user stories, priority, and effort estimates.",
		icon: "💡",
		fields: [
			v("Feature Title", "text", { required: !0 }),
			v("Requested By", "text", { required: !0 }),
			v("Priority", "text", {
				required: !0,
				placeholder: "Critical / High / Medium / Low / Nice to Have"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "New / Under Review / Planned / In Progress / Shipped / Declined"
			}),
			v("Category", "text", { placeholder: "UX / Performance / Integration / New Capability / Infrastructure" }),
			v("Target Release", "text"),
			v("User Story", "rich-text", {
				required: !0,
				placeholder: "As a [user], I want [goal] so that [benefit]"
			}),
			v("Problem Description", "rich-text", {
				required: !0,
				placeholder: "What problem does this solve?"
			}),
			v("Proposed Solution", "rich-text", { placeholder: "How should this work?" }),
			v("Success Metrics", "rich-text", { placeholder: "How will we measure success?" }),
			v("Effort Estimate", "text", { placeholder: "XS / S / M / L / XL" }),
			v("Business Value", "text", { placeholder: "Revenue / Retention / Adoption / Compliance / Internal Efficiency" }),
			v("Dependencies", "rich-text", { defaultCollapsed: !0 }),
			v("Decline Reason", "rich-text", {
				placeholder: "Why was this declined?",
				defaultCollapsed: !0
			}),
			v("Ship Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function D() {
	return {
		name: "Contract / Agreement",
		description: "Track contracts with counterparty, terms, renewal dates, and status.",
		icon: "📜",
		fields: [
			v("Contract Title", "text", { required: !0 }),
			v("Contract Type", "text", {
				required: !0,
				placeholder: "NDA / MSA / SOW / SLA / Employment / Vendor / Licensing / Other"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "Draft / In Review / Pending Signature / Active / Expired / Terminated"
			}),
			v("Counterparty", "text", { required: !0 }),
			v("Effective Date", "date", { required: !0 }),
			v("Expiration Date", "date"),
			v("Auto-Renew", "boolean"),
			v("Renewal Term", "text", {
				placeholder: "Monthly / Quarterly / Annual / Biennial",
				defaultCollapsed: !0
			}),
			v("Contract Value", "number"),
			v("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			v("Payment Terms", "text", { placeholder: "Net 15 / Net 30 / Net 60 / Upfront" }),
			v("Internal Owner", "text", { required: !0 }),
			v("Key Terms", "rich-text", { placeholder: "Important clauses and obligations..." }),
			v("Termination Clause", "rich-text", { defaultCollapsed: !0 }),
			v("Notes", "rich-text"),
			v("Termination Date", "date", { defaultCollapsed: !0 }),
			v("Termination Reason", "rich-text", {
				placeholder: "Why was this terminated?",
				defaultCollapsed: !0
			})
		]
	};
}
function O() {
	return {
		name: "Sprint Retrospective",
		description: "Reflect on the sprint with what went well, what didn't, and action items.",
		icon: "🔄",
		fields: [
			v("Sprint Name", "text", { required: !0 }),
			v("Sprint Dates", "text", {
				required: !0,
				placeholder: "Jan 6 – Jan 17"
			}),
			v("Facilitator", "text"),
			v("Team", "text", { required: !0 }),
			v("Velocity", "number"),
			v("Planned Points", "number"),
			v("Completed Points", "number"),
			v("What Went Well", "rich-text", {
				required: !0,
				placeholder: "Celebrate wins..."
			}),
			v("What Didn't Go Well", "rich-text", {
				required: !0,
				placeholder: "Identify pain points..."
			}),
			v("Start Doing", "rich-text", { placeholder: "New practices to adopt..." }),
			v("Stop Doing", "rich-text", { placeholder: "Practices to drop..." }),
			v("Continue Doing", "rich-text", { placeholder: "Practices to keep..." }),
			v("Action Items", "rich-text", {
				required: !0,
				placeholder: "Specific follow-up tasks..."
			}),
			v("Action Item Owners", "text", { placeholder: "Comma-separated names" }),
			v("Follow-Up Date", "date"),
			v("Overall Sentiment", "text", {
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
			v("Job Title", "text", { required: !0 }),
			v("Department", "text", {
				required: !0,
				placeholder: "Engineering / Product / Design / Sales / Marketing / Operations / HR / Finance / Legal"
			}),
			v("Location", "text", {
				required: !0,
				placeholder: "Remote / Hybrid / On-site"
			}),
			v("Office Location", "text", { defaultCollapsed: !0 }),
			v("Employment Type", "text", {
				required: !0,
				placeholder: "Full-time / Part-time / Contract / Intern"
			}),
			v("Level", "text", {
				required: !0,
				placeholder: "Junior / Mid / Senior / Staff / Principal / Director / VP"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "Draft / Open / On Hold / Filled / Closed"
			}),
			v("Hiring Manager", "text", { required: !0 }),
			v("Salary Range Min", "number"),
			v("Salary Range Max", "number"),
			v("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			v("Job Description", "rich-text", {
				required: !0,
				placeholder: "Role overview and responsibilities..."
			}),
			v("Requirements", "rich-text", {
				required: !0,
				placeholder: "Must-have qualifications..."
			}),
			v("Nice to Have", "rich-text", { placeholder: "Preferred but not required..." }),
			v("Benefits", "rich-text", { placeholder: "Compensation and perks..." }),
			v("Posted Date", "date"),
			v("Closing Date", "date"),
			v("Filled By", "text", { defaultCollapsed: !0 }),
			v("Filled Date", "date", { defaultCollapsed: !0 })
		]
	};
}
function A() {
	return {
		name: "Vendor Evaluation",
		description: "Evaluate vendors with scoring, compliance checks, and recommendations.",
		icon: "🔍",
		fields: [
			v("Vendor Name", "text", { required: !0 }),
			v("Category", "text", {
				required: !0,
				placeholder: "SaaS / Infrastructure / Consulting / Hardware / Staffing / Other"
			}),
			v("Evaluation Status", "text", {
				required: !0,
				placeholder: "Researching / In Trial / Evaluating / Approved / Rejected / Active Vendor"
			}),
			v("Evaluator", "text", { required: !0 }),
			v("Evaluation Date", "date", { required: !0 }),
			v("Website", "text"),
			v("Primary Contact", "text"),
			v("Annual Cost", "number"),
			v("Currency", "text", { placeholder: "USD / EUR / GBP / CAD" }),
			v("Contract Length", "text", { placeholder: "Monthly / Annual / Multi-Year" }),
			v("Security Review Complete", "boolean"),
			v("SOC2 Compliant", "boolean"),
			v("GDPR Compliant", "boolean"),
			v("Strengths", "rich-text", { placeholder: "Key advantages..." }),
			v("Weaknesses", "rich-text", { placeholder: "Gaps and concerns..." }),
			v("Integration Requirements", "rich-text", { placeholder: "Technical integration needs..." }),
			v("Score (1–10)", "number"),
			v("Recommendation", "rich-text", { placeholder: "Final recommendation..." }),
			v("Rejection Reason", "rich-text", {
				placeholder: "Why was this vendor rejected?",
				defaultCollapsed: !0
			})
		]
	};
}
function j() {
	return {
		name: "Project Status Report",
		description: "Weekly project status with health indicators, accomplishments, and risks.",
		icon: "📊",
		fields: [
			v("Project Name", "text", { required: !0 }),
			v("Reporting Period", "text", {
				required: !0,
				placeholder: "Week of Jan 6, 2025"
			}),
			v("Project Lead", "text", { required: !0 }),
			v("Overall Status", "text", {
				required: !0,
				placeholder: "On Track / At Risk / Blocked / Complete"
			}),
			v("Health: Scope", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			v("Health: Timeline", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			v("Health: Budget", "text", {
				required: !0,
				placeholder: "Green / Yellow / Red"
			}),
			v("Percent Complete", "number"),
			v("Summary", "rich-text", {
				required: !0,
				placeholder: "High-level status overview..."
			}),
			v("Accomplishments This Period", "rich-text", {
				required: !0,
				placeholder: "What was delivered..."
			}),
			v("Planned Next Period", "rich-text", {
				required: !0,
				placeholder: "What's coming up..."
			}),
			v("Risks & Issues", "rich-text", { placeholder: "Active risks and open issues..." }),
			v("Blockers", "rich-text", {
				placeholder: "Blocking items requiring escalation...",
				defaultCollapsed: !0
			}),
			v("Decisions Needed", "rich-text", { placeholder: "Pending decisions from stakeholders..." }),
			v("Budget Spent", "number"),
			v("Budget Remaining", "number"),
			v("Target Completion Date", "date"),
			v("Stakeholder Notes", "rich-text", { defaultCollapsed: !0 })
		]
	};
}
function M() {
	return {
		name: "Change Request",
		description: "Formalized change management with risk assessment and rollback plans.",
		icon: "🔄",
		fields: [
			v("Change Title", "text", { required: !0 }),
			v("Change ID", "text", {
				required: !0,
				placeholder: "CR-0001"
			}),
			v("Requester", "text", { required: !0 }),
			v("Request Date", "date", { required: !0 }),
			v("Priority", "text", {
				required: !0,
				placeholder: "Emergency / High / Medium / Low"
			}),
			v("Status", "text", {
				required: !0,
				placeholder: "Submitted / Under Review / Approved / Scheduled / In Progress / Completed / Rolled Back / Rejected"
			}),
			v("Change Type", "text", {
				required: !0,
				placeholder: "Standard / Normal / Emergency"
			}),
			v("Systems Affected", "text", { placeholder: "Comma-separated system names" }),
			v("Description of Change", "rich-text", {
				required: !0,
				placeholder: "What is being changed and why..."
			}),
			v("Business Justification", "rich-text", {
				required: !0,
				placeholder: "Why this change is needed..."
			}),
			v("Risk Assessment", "text", {
				required: !0,
				placeholder: "Low / Medium / High / Critical"
			}),
			v("Risk Mitigation", "rich-text", {
				placeholder: "Steps to reduce risk...",
				defaultCollapsed: !0
			}),
			v("Rollback Plan", "rich-text", {
				required: !0,
				placeholder: "How to revert if something goes wrong..."
			}),
			v("Scheduled Date", "date", { defaultCollapsed: !0 }),
			v("Implementation Notes", "rich-text", {
				placeholder: "Notes from the change window...",
				defaultCollapsed: !0
			}),
			v("Approver", "text"),
			v("Approval Date", "date", { defaultCollapsed: !0 }),
			v("Post-Implementation Review", "rich-text", {
				placeholder: "Review after the change is complete...",
				defaultCollapsed: !0
			})
		]
	};
}
var N = [
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
		build: S
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
		build: y
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
		build: T
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
		build: O
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
		build: w
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
		build: M
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
		build: E
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
		build: j
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
		build: b
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
		build: C
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
		build: x
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
		build: D
	}
];
function P(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.category.toLowerCase().includes(n) || e.tags.some((e) => e.toLowerCase().includes(n));
}
function F(e, t = "All") {
	return N.filter((n) => (t === "All" || n.category === t) && P(n, e));
}
//#endregion
//#region src/renderers/tasks/definition.ts
var I = {
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
}, ee = {
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
}, te = {
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
}, ne = {
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
}, re = {
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
}, ie = {
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
}, ae = {
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
}, oe = /^(\d{4})-(\d{2})-(\d{2})$/;
function L(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	if (t === "") return null;
	let n = oe.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]), r = Number(n[3]);
		if (t < 1 || t > 12 || r < 1 || r > 31) return null;
		let i = new Date(e, t - 1, r);
		return i.setFullYear(e, t - 1, r), i.getMonth() !== t - 1 || i.getDate() !== r ? null : i;
	}
	let r = new Date(t);
	return Number.isNaN(r.getTime()) ? null : r;
}
function R(e = /* @__PURE__ */ new Date()) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function z(e, t = /* @__PURE__ */ new Date()) {
	let n = L(e);
	return n ? R(n).getTime() < R(t).getTime() : !1;
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var se = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, B = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, ce = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function le(e) {
	let t = L(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function ue(e) {
	return z(e);
}
function V(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function H({ item: e, editable: t, onUpdate: a, onRemove: l, autoFocusText: _, onDidAutoFocus: v }) {
	let [y, b] = p(!1), [x, S] = p(""), [C, w] = p(0), T = f(null), E = f(null), D = f(null), O = () => {
		a({ status: e.status === "done" ? "pending" : "done" });
	}, k = e.assignee ? n.find((t) => t.displayName === e.assignee) : void 0, A = x.trim() ? r(x) : n, j = u(() => {
		t && (S(""), w(0), b(!0));
	}, [t]), M = u(() => {
		b(!1), S(""), w(0);
	}, []), N = u((e) => {
		a({ assignee: e.displayName }), M();
	}, [a, M]), P = u(() => {
		a({ assignee: "" }), M();
	}, [a, M]);
	d(() => {
		if (!y) return;
		let e = (e) => {
			T.current && !T.current.contains(e.target) && M();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [y, M]), d(() => {
		y && E.current && E.current.focus();
	}, [y]), d(() => {
		w(0);
	}, [x]), d(() => {
		_ && D.current && (D.current.focus(), v?.());
	}, [_, v]);
	let F = (e) => {
		e.key === "Escape" ? M() : e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, A.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), A[C] && N(A[C]));
	}, I = e.dueDate && e.status !== "done" ? ue(e.dueDate) : !1;
	return /* @__PURE__ */ g("div", {
		className: i("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ h("span", {
				title: `Priority: ${e.priority}`,
				className: i("w-2 h-2 rounded-full shrink-0"),
				style: { background: B[e.priority] }
			}),
			/* @__PURE__ */ h(c, {
				checked: e.status === "done",
				onChange: O,
				disabled: !t,
				className: i("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ h(o, {
				ref: D,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => a({ text: e.target.value }),
				readOnly: !t,
				className: i("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ g("span", {
				title: e.dueDate,
				className: i("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", I ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					I ? "⚠ " : "",
					"Due: ",
					le(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ h("span", {
				className: i("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: ce[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ g("div", {
				ref: T,
				className: i("relative"),
				children: [/* @__PURE__ */ h("button", {
					type: "button",
					onClick: j,
					title: e.assignee || "Unassigned",
					className: i("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-surface text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h("span", {
						className: i("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: k?.color ?? "var(--color-text-tertiary)" },
						children: V(e.assignee)
					}), /* @__PURE__ */ h("span", {
						className: i("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), y && /* @__PURE__ */ g("div", {
					className: i("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ h("div", {
							className: i("px-2 py-1"),
							children: /* @__PURE__ */ h(o, {
								ref: E,
								size: "sm",
								value: x,
								onChange: (e) => S(e.target.value),
								onKeyDown: F,
								placeholder: "Search users...",
								className: i("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ g("button", {
							type: "button",
							onClick: P,
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ h("span", {
								className: i("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ h("span", {
								className: i("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						A.map((e, t) => /* @__PURE__ */ g("button", {
							type: "button",
							onClick: () => N(e),
							onMouseEnter: () => w(t),
							className: i("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === C ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ h("span", {
								className: i("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: V(e.displayName)
							}), /* @__PURE__ */ h("span", { children: e.displayName })]
						}, e.userId)),
						A.length === 0 && /* @__PURE__ */ h("div", {
							className: i("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ h(s, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => a({ priority: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: B[e.priority] },
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
			/* @__PURE__ */ h(s, {
				value: e.status,
				disabled: !t,
				onChange: (e) => a({ status: e.target.value }),
				className: i("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: se[e.status] },
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
			t && /* @__PURE__ */ h("button", {
				type: "button",
				onClick: l,
				title: "Remove task",
				className: i("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
				children: "x"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TaskList.tsx
function U({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: a }) {
	if (e.length === 0) return /* @__PURE__ */ h("div", {
		className: i("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let o = a?.current ?? !1;
	return /* @__PURE__ */ h("div", {
		className: i("py-2"),
		children: e.map((i, s) => /* @__PURE__ */ h(H, {
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
function W(e) {
	let t = e.items;
	return Array.isArray(t) ? t.filter((e) => e != null) : [];
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function G({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: u }) {
	let d = W(e), p = f(!1);
	return /* @__PURE__ */ g("div", { children: [
		t && n && /* @__PURE__ */ h(l, {
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
			onUpdateCursorInfo: u
		}),
		(d.length > 0 || a) && /* @__PURE__ */ h(U, {
			items: d,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: p
		}),
		a && /* @__PURE__ */ h("button", {
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
				}), p.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/rich-text/RichTextEditorRenderer.tsx
function de({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o }) {
	return !t || !n ? /* @__PURE__ */ h("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ h(l, {
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
function K({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i }) {
	return /* @__PURE__ */ g("div", { children: [t && n ? /* @__PURE__ */ h("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ h(l, {
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
	}) : /* @__PURE__ */ h("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ h("button", {
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function fe({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = W(e), o = f(!1);
	return /* @__PURE__ */ g("div", {
		className: "py-1",
		children: [
			a.length > 0 || t ? /* @__PURE__ */ h(U, {
				items: a,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: o
			}) : null,
			a.length === 0 && !t && /* @__PURE__ */ h("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ h("button", {
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
var q = {
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
}, J = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function pe(e) {
	return z(e);
}
function me(e) {
	let t = L(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function he(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Y({ item: e, onUpdateItem: t }) {
	let [n, r] = p(!1), [a, o] = p(!1), s = n || a, c = q[e.status] ?? q.pending, l = J[e.priority] ?? J.medium, u = e.dueDate && e.status === "pending" ? pe(e.dueDate) : !1, d = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ g("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		onFocus: () => o(!0),
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || o(!1);
		},
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: d ? .65 : 1 },
		children: [
			/* @__PURE__ */ h("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: l,
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ h("button", {
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
				children: d && /* @__PURE__ */ h("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ h("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ h("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", d ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ h("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ h("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: he(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ g("span", {
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
				children: [u ? "⚠ " : "", me(e.dueDate)]
			}),
			t && s && /* @__PURE__ */ g("select", {
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
					/* @__PURE__ */ h("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ h("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ h("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ h("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function ge({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = W(e);
	if (r.length === 0) return /* @__PURE__ */ h("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "done" || e.status === "acked"), a = r.filter((e) => e.status === "rejected"), o = r.filter((e) => !i.includes(e) && !a.includes(e));
	return /* @__PURE__ */ g("div", { children: [
		o.length > 0 && /* @__PURE__ */ h("div", {
			className: "mb-1",
			children: o.map((e) => /* @__PURE__ */ h(Y, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		i.length > 0 && /* @__PURE__ */ h("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ h(Y, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ h("div", { children: a.map((e) => /* @__PURE__ */ h(Y, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ h("button", {
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function _e({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: o, onRemove: s }) {
	let c = f(null), l = e.status === "done", u = a(r);
	return d(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ g("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ h("input", {
				type: "checkbox",
				checked: l,
				onChange: () => o({ status: l ? "pending" : "done" }),
				disabled: !t,
				className: i("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ h("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => o({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: i("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", l ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ h("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function ve({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: u }) {
	let d = W(e), p = f(null), m = () => {
		o && (p.current = d.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, _ = p.current, v = _ !== null && d.length > _, y = d.length, b = d.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ g("div", { children: [
		t && n && /* @__PURE__ */ h(l, {
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
			onUpdateCursorInfo: u
		}),
		y > 0 && /* @__PURE__ */ g("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				b,
				" / ",
				y,
				" done"
			]
		}),
		/* @__PURE__ */ h("div", { children: d.map((e, t) => {
			let n = t === d.length - 1, r = v && n;
			return /* @__PURE__ */ h(_e, {
				item: e,
				editable: a,
				autoFocus: r,
				onDidAutoFocus: r ? () => {
					p.current = null;
				} : void 0,
				onUpdate: (t) => s?.(e.id, t),
				onRemove: () => c?.(e.id)
			}, e.id);
		}) }),
		a && /* @__PURE__ */ h("button", {
			type: "button",
			onClick: m,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function ye({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: a, onNavigateToEditor: o }) {
	let s = W(e), c = s.length, u = s.filter((e) => e.status === "done").length, d = c > 0 ? Math.round(u / c * 100) : 0;
	return /* @__PURE__ */ g("div", { children: [
		t && n && /* @__PURE__ */ h("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ h(l, {
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
		c > 0 && /* @__PURE__ */ g("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ g("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ g("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						u,
						" / ",
						c,
						" done"
					]
				}), /* @__PURE__ */ g("span", {
					className: i("text-[11px] font-semibold", d === 100 ? "text-success-fg" : "text-neutral"),
					children: [d, "%"]
				})]
			}), /* @__PURE__ */ h("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ h("div", {
					className: i("h-full rounded-sm transition-[width] duration-300", d === 100 ? "bg-success" : "bg-info"),
					style: { width: `${d}%` }
				})
			})]
		}),
		c === 0 ? /* @__PURE__ */ h("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ h("div", { children: s.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ g("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ h("input", {
					type: "checkbox",
					checked: t,
					onChange: () => a?.(e.id, { status: t ? "pending" : "done" }),
					className: i("w-3.5 h-3.5 accent-success shrink-0", a ? "cursor-pointer" : "cursor-default"),
					readOnly: !a
				}), /* @__PURE__ */ h("span", {
					className: i("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ h("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		o && /* @__PURE__ */ h("button", {
			type: "button",
			onClick: () => o(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var be = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
};
function xe() {
	return "";
}
function Se() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function Ce(e) {
	return be[e] ?? null;
}
async function we(e) {
	let t = e.documentId ?? Se();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = await fetch(`${xe()}/api/approvals`, {
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
var Te = {
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
function Ee({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: o, onRemove: s }) {
	let c = f(null), l = Te[e.status] ?? Te.pending, u = a(r);
	return d(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ g("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ h("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: l.bg,
					color: l.color
				},
				children: l.icon
			}),
			/* @__PURE__ */ h("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => o({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: i("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ g("select", {
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => o({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
				style: {
					border: `1px solid ${l.color}`,
					background: l.bg,
					color: l.color
				},
				children: [
					/* @__PURE__ */ h("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ h("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ h("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ h("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function De({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: u }) {
	let d = W(e), p = f(null), m = () => {
		o && (p.current = d.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, _ = p.current, v = _ !== null && d.length > _;
	return /* @__PURE__ */ g("div", { children: [
		t && n && /* @__PURE__ */ h(l, {
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
			onUpdateCursorInfo: u
		}),
		d.length === 0 && !a && /* @__PURE__ */ h("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ h("div", { children: d.map((t, n) => {
			let r = n === d.length - 1, o = v && r;
			return /* @__PURE__ */ h(Ee, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					p.current = null;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = Ce(n.status);
						t && we({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ h("button", {
			type: "button",
			onClick: m,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var X = {
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
function Oe({ item: e }) {
	let t = X[e.status] ?? X.pending;
	return /* @__PURE__ */ g("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ h("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ h("span", {
				className: i("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ h("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ h("span", {
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
function Z({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ g("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ h("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ h(Oe, { item: e }, e.id))]
	});
}
function Q({ section: e, onNavigateToEditor: t }) {
	let n = W(e);
	if (n.length === 0) return /* @__PURE__ */ h("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "acked" || e.status === "done"), i = n.filter((e) => e.status === "rejected"), a = n.filter((e) => !r.includes(e) && !i.includes(e));
	return /* @__PURE__ */ g("div", { children: [
		a.length > 0 && /* @__PURE__ */ h(Z, {
			label: "Open",
			color: X.pending.color,
			items: a
		}),
		r.length > 0 && /* @__PURE__ */ h(Z, {
			label: "Decided",
			color: X.acked.color,
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ h(Z, {
			label: "Vetoed",
			color: X.rejected.color,
			items: i
		}),
		t && /* @__PURE__ */ h("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function ke(e) {
	return e.metadata ?? {};
}
function Ae({ section: e, editable: t, onUpdateSection: n }) {
	let r = ke(e), [a, o] = p(!1), s = (t) => {
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
	return /* @__PURE__ */ h("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ g("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ h("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ h("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ g("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ h("button", {
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
		}) : /* @__PURE__ */ g("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ h("input", {
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
function je({ section: e }) {
	let t = e.metadata ?? {};
	return t.fileName ? /* @__PURE__ */ g("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ h("span", {
				className: "text-base",
				children: "📎"
			}),
			/* @__PURE__ */ g("a", {
				href: t.fileDataUrl ?? "#",
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ g("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	}) : /* @__PURE__ */ h("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function Me({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [a, o] = p(!1), s = (t) => {
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
	return /* @__PURE__ */ h("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ g("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ h("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ g("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ h("input", {
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ h("button", {
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
		}) : /* @__PURE__ */ g("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: i("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [a ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ h("input", {
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
function Ne({ section: e }) {
	let t = e.metadata ?? {};
	return t.imageDataUrl ? /* @__PURE__ */ g("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ h("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ h("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ h("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function Pe(e) {
	return typeof e == "object" && !!e;
}
function Fe(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links.filter(Pe).map((e) => ({
		label: typeof e.label == "string" ? e.label : "",
		url: typeof e.url == "string" ? e.url : ""
	})) : [];
}
function Ie({ section: e, editable: t, onUpdateSection: n }) {
	let r = Fe(e), i = (t) => {
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
	return /* @__PURE__ */ g("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ h("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ g("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ h("input", {
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ h("input", {
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ h("button", {
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ h("button", {
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
function Le(e) {
	return typeof e == "object" && !!e && typeof e.url == "string";
}
function $({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => Le(e) && e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ h("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ h("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => /* @__PURE__ */ h("li", {
			className: "text-[13px]",
			children: /* @__PURE__ */ h("a", {
				href: e.url,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "text-primary font-medium no-underline",
				children: e.label || e.url
			})
		}, t))
	});
}
e(I), e(ee), e(te), e(ne), e(re), e(ie), e(ae), t("*", "*", G), t("rich-text", "editor", de), t("rich-text", "ack", K), t("rich-text", "reader", K), t("tasks", "editor", fe), t("tasks", "ack", ge), t("tasks", "reader", ge), t("checklist", "editor", ve), t("checklist", "ack", ye), t("checklist", "reader", ye), t("decisions", "editor", De), t("decisions", "ack", Q), t("decisions", "reader", Q), t("file-upload", "editor", Ae), t("file-upload", "ack", je), t("file-upload", "reader", je), t("diagram", "editor", Me), t("diagram", "ack", Ne), t("diagram", "reader", Ne), t("link-block", "editor", Ie), t("link-block", "ack", $), t("link-block", "reader", $);
//#endregion
export { N as a, _ as i, U as n, F as o, H as r, P as s, G as t };
