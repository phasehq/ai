# @phasehq/ai

AI skills for deploying and managing [Phase](https://phase.dev) — the open-source secrets manager.

Install deployment skills into your AI coding agent (Claude Code, Cursor, Windsurf, GitHub Copilot) with a single command.

## Usage

```bash
npx @phasehq/ai install <skill>
```

### Install a skill

```bash
npx @phasehq/ai install docker-compose
```

Then ask your AI agent: **"deploy Phase with Docker Compose"**

### Install multiple skills

```bash
npx @phasehq/ai install k8s eks
```

### List available skills

```bash
npx @phasehq/ai list
```

### Update installed skills

```bash
npx @phasehq/ai update
```

## Available Skills

| Skill | Description | Trigger Phrase |
|-------|-------------|----------------|
| `docker-compose` | Deploy Phase Console with Docker Compose and Let's Encrypt TLS | "deploy Phase with Docker Compose" |
| `k8s` | Deploy Phase Console on any Kubernetes cluster via Helm | "deploy Phase on Kubernetes" |
| `eks` | Deploy Phase Console on AWS EKS with Helm and native AWS services | "deploy Phase on EKS" |

## How it works

Skills are markdown files that teach AI coding agents how to deploy Phase step-by-step. Running `npx @phasehq/ai install <skill>` copies the skill files into `.claude/skills/<skill>/` in your current directory. Your AI agent reads these files and uses them to automate the deployment interactively.

Each skill includes:
- **SKILL.md** — The main instruction file with workflow phases and principles
- **refs/** — Reference files with exact templates, commands, and troubleshooting guides

## Documentation

Full deployment guides: [docs.phase.dev/self-hosting](https://docs.phase.dev/self-hosting)

## License

MIT
