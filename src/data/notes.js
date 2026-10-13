// Short notes, first published as LinkedIn posts by Asad in September 2026.

export const notes = [
  {
    slug: "what-is-an-agentic-workflow",
    title: "What makes a workflow agentic",
    date: "September 2026",
    summary: "A normal LLM flow is one prompt and one response. An agentic workflow takes a goal, uses tools and decides what to do next.",
    body: [
      "A lot of people use “agentic workflow” to mean anything with an LLM in it, but it’s more specific than that.",
      "A normal LLM flow is usually one prompt and one response. An agentic workflow is when the system takes a goal, breaks it into steps, uses tools, checks results, and decides what to do next. For example, instead of just answering “why did this deployment fail?”, it can read logs, check the last commit, look at the CI run, and then return a useful summary.",
      "That difference matters because you’re no longer building a chat feature. You’re building a workflow with state, tool calls, and failure paths.",
      "Agentic workflows are less about smarter answers and more about systems that can do structured work across multiple steps. That’s usually where the engineering complexity starts.",
    ],
  },
  {
    slug: "boundaries-before-autonomy",
    title: "Give agents boundaries before autonomy",
    date: "September 2026",
    summary: "Agents are far more useful when they operate inside narrow, explicit guardrails, with a human approving the risky steps.",
    body: [
      "The biggest mistake with agentic workflows is giving them autonomy before giving them boundaries.",
      "That usually happens when teams connect an agent to tools like GitHub, Jira, Slack, or internal dashboards and assume the model will figure out when to act. In practice, the workflow needs clear limits around what it can read, what it can write, and when a human needs to approve the next step. Without that, small mistakes turn into real operational problems.",
      "A common example is release support. An agent can collect failed CI runs from GitHub Actions, summarise the likely issue, notify the right Slack channel, and draft a Jira ticket. That’s useful. But letting the same workflow restart pipelines, change deployment state, or update production configs without approval is where things get risky fast.",
      "Agents are much more useful when they operate inside narrow, explicit guardrails. That’s usually what makes them usable in real engineering teams.",
    ],
  },
  {
    slug: "idempotency-for-agents",
    title: "Idempotency matters as much as prompts",
    date: "September 2026",
    summary: "Once an agent acts on real tools, retries can duplicate its actions. State tracking is where the real engineering begins.",
    body: [
      "The fastest way to lose trust in an agentic workflow is to let it act on production tools without handling retries, state, and duplicate actions first.",
      "Take incident triage. An alert fires for elevated API errors. An agentic workflow picks it up, checks the latest deployment in GitHub Actions, pulls related logs, looks for recent incident chatter in Slack, and opens a Jira ticket with a summary for the on-call engineer.",
      "That sounds useful until one step fails halfway through. If the Slack call times out and the workflow retries the whole sequence, it might post the same update twice and create a second Jira ticket for the same incident. Now the agent hasn’t reduced noise. It’s added more of it.",
      "Once agents start interacting with real tools, idempotency and state tracking matter just as much as prompt quality. That’s usually where the real engineering work begins.",
    ],
  },
  {
    slug: "connect-the-steps",
    title: "Agents should connect the steps people already do",
    date: "September 2026",
    summary: "The practical value of an agent is removing the coordination work between tools, not giving nicer answers.",
    body: [
      "If your AI setup still depends on someone copying data between Slack, Jira, GitHub, and internal docs, it’s probably not saving much time.",
      "That’s where agentic workflows actually help. Not by giving nicer answers, but by connecting the steps people already do manually. Take bug triage: instead of a developer reading a Jira ticket, opening GitHub, checking logs and searching Slack for context, an agentic workflow can do that sequence first and return a structured summary: likely owner, related pull request, recent deploy, and the error pattern in the logs.",
      "The benefit is practical: less tab switching, less repeated investigation, and faster handoff between teams.",
      "What matters is picking workflows that already exist and are repetitive enough to automate. Agents are most useful when they sit between real tools and reduce the coordination work around engineering.",
    ],
  },
];
