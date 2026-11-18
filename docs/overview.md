# Pridie: product overview

> Status: draft. The feature list is not final. Open questions are at the end.

## What Pridie is

Pridie is a SaaS that helps companies onboard new employees.

The first target is tech teams. Their onboarding has a technical part, for example getting access to the code repositories or setting up a local environment. It also has the usual parts that every onboarding has. Pridie covers both.

Pridie also gives the new hire an AI assistant. The new hire asks it questions, and it answers from the company's knowledge. We plan the assistant as the main difference between Pridie and other onboarding tools.

## Who uses it

Pridie has two types of users:

- **The admin** is the person at the company who prepares and follows the onboarding.
- **The new hire** is the person who joins the company and follows the onboarding.

## Planned features

### Onboarding checklist

The new hire gets a checklist of tasks to complete. The checklist tells them what to do and what the company expects from them. The new hire checks each task when it is done.

### Account setup

Pridie creates the new hire's accounts on the company's tools, through each tool's API. The admin connects each tool to Pridie once. For each new hire, the admin selects the tools they need, and Pridie creates the accounts. The new hire has access to their tools without asking for each one.

This decision has two consequences:

- Pridie needs one integration per tool. The list of supported tools defines what the product can do at launch.
- Pridie stores credentials with admin rights on the company's tools. Security is a requirement from the first version.

#### First supported tools

The first version supports Google Workspace, Slack and Linear.

Pridie creates the Google Workspace account first. The new hire's company email comes from Google Workspace, and Slack and Linear use this email.

| Tool | How Pridie creates the account | Constraint |
|---|---|---|
| Google Workspace | [Directory API](https://developers.google.com/admin-sdk/directory/v1/guides/manage-users) (`users.insert`) creates the user and their company email. | On a flexible Google plan, each new user adds a charge to the company's bill. |
| Slack | [SCIM API](https://docs.slack.dev/admins/scim-api) creates the member. | The SCIM API is available only on Business+ and Enterprise Grid plans. We found no official API to create members on Free and Pro plans. |
| Linear | GraphQL API sends an invitation to the new hire's company email. | An invitation is not an account: the new hire must accept it. [SCIM](https://linear.app/docs/scim) is available only on the Enterprise plan. Plan requirements for the invitation API are not verified. |

### Onboarding assistant

The new hire can chat with an AI assistant in Pridie. The assistant answers their questions from the company's knowledge, for example the engineering handbook or the setup documentation. The admin connects each knowledge source to Pridie once.

#### What the assistant knows

The assistant uses two types of context:

- **The company's knowledge.** The documents and pages in the knowledge sources that the admin connects.
- **The new hire's onboarding.** Their role, their checklist, and the task they are on.

The onboarding context is what a general AI assistant does not have. For example, Sam is on the task "Set up the local environment" and asks "Where do I get the API keys?". The assistant knows that Sam is a backend engineer at the setup step. It answers from the local setup page for backend engineers, and not from a page for another team.

#### How the assistant answers

Each answer shows its sources. The new hire can open a source to check the answer.

The assistant must not give an answer without a source. When it finds no answer in the company's knowledge, it says so. Then it tells the new hire who to ask, for example their manager.

#### Consequences

This decision has four consequences:

- Pridie needs one integration per knowledge source, as for account setup. The list of supported sources defines which questions the assistant can answer at launch.
- Some documents are not open to every employee. The assistant must not give a new hire an answer from a document that they cannot open.
- The quality of the answers depends on the quality of the documentation. If a page is out of date, the answer is also out of date.
- The assistant sends parts of company documents to an AI model. Security is a requirement from the first version, as for account setup.

### Onboarding analytics

The company sees where new hires spend the most time and where they struggle. The company can use this to improve the onboarding for the next new hires.

The company also sees the topics where the assistant found no answer. These topics show where the documentation is missing.

## Example

This example shows how the four features work together. The values are illustrative.

1. Sam joins as a backend engineer on Monday.
2. Before Monday, the admin selects Google Workspace, Slack and Linear for Sam in Pridie. Pridie creates Sam's Google account and company email. Then Pridie creates Sam's Slack account and sends a Linear invitation to the new email.
3. On Monday, Sam opens Pridie and sees their checklist: "Accept your Linear invitation", "Read the engineering handbook", "Set up the local environment", "Ship a first small fix", "Meet your manager".
4. During "Set up the local environment", Sam asks the assistant: "Where do I get the API keys for my local environment?" The assistant answers from the local setup page of the engineering handbook, and shows a link to the page.
5. Sam asks: "Can I work from home on Fridays?" The assistant finds no answer in the company's knowledge. It tells Sam to ask their manager.
6. Sam checks each task when it is done.
7. After a few onboardings, the admin sees that "Set up the local environment" takes two days on average, and that most new hires get blocked at the same step. Many new hires also ask the assistant the same question about the API keys. The team fixes the setup script.

## Open questions

These points are not decided. Each one changes what we build.

**Who is the admin?** HR, IT and the team lead each own a different part of onboarding. Is it one role, or several roles with different permissions?

**What do we do for Slack workspaces on Free or Pro plans?** Pridie cannot create Slack accounts on these plans through an official API. If many of our target teams use these plans (not verified), the Slack integration does not work for them. Two options:

- Pridie adds a manual task for the admin: "Invite Sam to Slack".
- The company allows anyone with a company email to join the Slack workspace. The new hire joins with their Google account, from a checklist task. Check which Slack plans allow this.

**What happens with a tool that Pridie does not support?** One option: Pridie adds a manual task to the admin's list, and the admin creates the account by hand.

**How does the admin connect a tool?** Options are OAuth, an API key, or SCIM (a standard for account management). Slack offers SCIM only on Business+ and above, and Linear only on Enterprise, so SCIM cannot be the only option.

**Who approves paid seats?** On a paid tool, a new account can add a seat to the company's bill. For example, Google Workspace on a flexible plan charges for each new user. Does the admin approve each account, or does Pridie create it without approval?

**Does Pridie also remove accounts when someone leaves?** Offboarding uses the same integrations. Is it in scope, a later feature, or out of scope?

**Who writes the checklist?** Does the company write it from scratch, start from templates, or both? Is there one checklist per role (backend, frontend, sales)?

**How do we measure time and struggle?** Options include time between "task opened" and "task done", a "blocked" status the new hire sets, or a feedback question after each task. Tracking new hires also raises privacy questions that we must answer before we build this.

**What does "usual onboarding" include?** For example: administrative paperwork, company culture, introductions to the team, equipment. We need the list to scope the non-technical part.

**How is Pridie different from existing tools?** Some HR tools already include onboarding checklists and app provisioning (for example Rippling). We need a clear answer to why a team would choose Pridie.

Our proposed answer is the onboarding assistant. But AI assistants that answer from company knowledge already exist, for example Glean, Notion AI and Slack AI. So the assistant alone is not the difference. The difference must come from the onboarding context: the assistant knows the new hire's role and current task, and the company sees which questions the documentation does not answer. We have not done a full competitor review. Check if onboarding tools already offer an assistant with this context.

**Which knowledge sources does the assistant read at launch?** Options include Notion, Confluence, Google Drive, GitHub (README files and wikis) and Slack. Pridie already connects to Google Workspace and Slack for account setup. Reading documents and messages needs other permissions. Check which ones.

**How does the assistant respect access rights?** Some documents are restricted, for example HR or finance pages. If the assistant reads a source with the admin's access, a new hire can get an answer from a document they cannot open. Two options:

- The assistant reads only the sources that the admin marks as open to new hires.
- The assistant checks the new hire's own access for each document.

**What happens to the company's data?** The assistant sends parts of company documents to an AI model. Customers will ask which provider we use, where the data goes, and if the provider trains its models on it. We need these answers before the first customer connects a knowledge source.

**Who sees the new hire's questions?** The questions help the company find missing documentation. They can also feel like surveillance to the new hire. Options include showing the company only the topics, or showing the questions without the new hire's name. This question is linked to the privacy question for analytics.

**Where does the new hire chat with the assistant?** In Pridie only, or also in Slack, where the new hire already works?

**How do we measure the quality of the answers?** A wrong answer during onboarding can block the new hire or teach them a wrong practice. Options include a rating on each answer by the new hire, or a review of a sample of answers by the admin.
