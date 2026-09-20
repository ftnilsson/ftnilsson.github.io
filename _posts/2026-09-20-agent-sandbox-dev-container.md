---
layout: post
title: Giving AI Agents a Sandbox They Can't Escape
tags: [ai, agents, devcontainers, security, tooling]
last_updated: 2026-09-20
---

I run AI coding agents every day now. Claude Code, GitHub Copilot. And it is far too easy to just... let them loose. Full internet access, click allow on everything, the works. Then I started wondering — what exactly *is* stopping an agent from doing something I didn't ask for? The honest answer was: nothing but the model's own judgment. That didn't feel like enough.

At the same time, I find approval fatigue very real — constantly clicking through permission prompts trains you to stop reading them, and before long you're hitting "approve all" without thinking. So I wanted a setup where I *can* run agents in YOLO mode — auto-approving their actions — but where the network itself enforces what they can and can't reach. That's what this sandbox gives me.

---

## The Core Idea: Deny by Default

The whole setup lives in [this repo](https://github.com/ftnilsson/dev-containers) and it comes down to one principle: **deny by default, allow by exception**.

The workspace container — where the agent actually runs — has no direct route to the internet at all. Zero. Every outbound request goes through a `proxy` sidecar running [Squid](https://www.squid-cache.org/), which only allows connections to a domain allowlist I control. If a tool ignores `HTTP_PROXY`/`HTTPS_PROXY`, or tries a raw socket, it simply has nowhere to send packets. It fails closed, not silently open.

That last part is what makes this **agent-agnostic**. It doesn't matter which AI tool is running inside the container — nothing here depends on Claude Code or Copilot cooperating with the restriction. The network enforces it.

The architecture is two containers on a Podman Compose network:

| Container | Role |
|-----------|------|
| `workspace` | Where you (and the agent) work. No direct internet route. |
| `proxy` | Squid sidecar. The only container with a route out. Tunnels HTTPS to the allowlist without decrypting it — no CA cert to install anywhere. |

---

## Why Podman Instead of Docker?

Mainly because rootless containers genuinely matter when you're handing the keys to an AI agent. Rootless Podman means the agent inside the container can't escalate to root on your host machine even if something goes wrong. Docker Desktop can do rootless too, but Podman makes it the default rather than the exception. Docker Desktop also carries a licensing cost in corporate environments, which rules it out for a lot of us.

The trade-off is a bit more setup — VS Code's Dev Containers extension defaults to Docker, so you need to point it at Podman explicitly:

```json
{
  "dev.containers.dockerPath": "podman",
  "dev.containers.dockerComposePath": "podman-compose"
}
```

The README also walks through a small wrapper script trick to make `podman compose` (two words) resolve as a single `podman-compose` command that VS Code can find on `PATH`. It sounds fiddly, and it is slightly fiddly — but it's a one-time thing per machine.

There's also a known `netavark` bug worth calling out: Podman's `internal: true` network (what isolates `workspace` from the internet) has a firewall gap where `workspace` and `proxy` silently can't reach each other even though the external isolation works correctly. The repo includes a small host-level watcher script that patches it automatically on every container start — you provision it once per Podman VM and forget about it.

---

## The Isolation Boundary

Here's the part that took the most thought: how do you give the agent enough access to do its job without handing over the keys to everything?

The answer is two-layer isolation:

1. **The `.devcontainer/` folder itself is never mounted into the container.** The agent can only see `workspace/` — the project it's supposed to work on. The Squid config, the allowlist, the Compose file, none of it is reachable from inside. The agent can't edit its own sandbox rules.

2. **The GitHub App private key never enters `workspace`.** Instead, it's bind-mounted read-only into `proxy` only. A daemon there mints a short-lived (~1h) installation token and writes just the token to a small shared volume. The agent reads the token, never the signing key. The token expires on its own.

This means even if an agent went rogue and started doing things I didn't ask for, it couldn't silently expand its own permissions or persist access after the session ends.

---

## Authentication Without Long-Lived Secrets

A dedicated **GitHub App** handles repo access. Not a personal access token, not `GITHUB_TOKEN` — a proper App with its own identity (`your-agent[bot]` in commits and PR history), scoped to only the repos and permissions you grant. Tokens expire in roughly an hour; a background daemon refreshes them automatically, including a watcher that handles laptops that went to sleep mid-token.

For Claude Code, you can either use your Claude.ai account (OAuth, one login per named volume) or a dedicated API key if you want a fully headless identity.

Copilot is the one that can't be fully de-identified — it's tied to a seat on your human GitHub account. That's just how Copilot works today. VS Code's extension and the standalone `copilot` CLI each have their own auth store, so they don't conflict with the GitHub App token used for actual repo operations.

---

## Is It Worth the Setup?

YES. Genuinely.

The initial setup is maybe an hour or two if you've never touched Podman before. After that, it's `Ctrl+Shift+P` → "Reopen in Container" and everything is reproduced from scratch — toolchain, allowlist, auth daemons, the lot. I have a `verify-egress.sh` script baked into the image that I run after every rebuild to confirm the network isolation is actually working before I trust the sandbox with anything sensitive.

More than the security win, it's forced me to be explicit about what my agents *actually need* to do their job. What domains? What repos? What permissions? And once that's all locked down at the network layer, approval fatigue stops being a problem — you're not relying on yourself to catch every risky action at click-time. The sandbox catches it for you.

---

## Conclusion

Letting an AI agent run with unrestricted access is a bit like handing a new contractor a keycard for every door in the building on day one. Probably fine. But "probably fine" isn't a security model.

The setup I've described isn't paranoid over-engineering — it's the same least-privilege thinking we'd apply to any service in production. The agent gets exactly what it needs and nothing more, enforced at the network layer, not at the honour system layer.

If you're running AI agents in your local dev environment today, I'd challenge you to ask: what *exactly* is stopping them from doing something you didn't intend? If the answer is "I assume they won't", it's time to build a proper sandbox.

[Repo here](https://github.com/ftnilsson/dev-containers) — clone it, read the README in order, and run `verify-egress.sh` after your first build. You'll know it's working when a plain `curl https://example.com` from inside the container gets blocked.
