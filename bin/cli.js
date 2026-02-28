#!/usr/bin/env node

const path = require('path');
const { listSkills, getSkillNames } = require('../src/registry');
const { installSkill } = require('../src/install');
const { updateSkills } = require('../src/update');

const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

const args = process.argv.slice(2);
const command = args[0];
const targetDir = process.cwd();

function printBanner() {
  console.log();
  console.log(`${BOLD}  Phase AI Skills${RESET}`);
  console.log(`${DIM}  https://github.com/phasehq/ai${RESET}`);
  console.log();
}

function printUsage() {
  printBanner();
  console.log(`${BOLD}  Usage:${RESET}`);
  console.log(`    npx @phasehq/ai install <skill> [skill2 ...]`);
  console.log(`    npx @phasehq/ai list`);
  console.log(`    npx @phasehq/ai update`);
  console.log();
  console.log(`${BOLD}  Commands:${RESET}`);
  console.log(`    install   Install one or more skills into .claude/skills/`);
  console.log(`    list      Show all available skills`);
  console.log(`    update    Update all installed skills to the latest version`);
  console.log();
  console.log(`${BOLD}  Examples:${RESET}`);
  console.log(`    npx @phasehq/ai install docker-compose`);
  console.log(`    npx @phasehq/ai install k8s eks`);
  console.log();
}

function handleInstall() {
  const skillNames = args.slice(1);

  if (skillNames.length === 0) {
    console.error(`${RED}  Error: specify at least one skill to install${RESET}`);
    console.log(`  Available: ${getSkillNames().join(', ')}`);
    console.log();
    process.exit(1);
  }

  printBanner();

  for (const name of skillNames) {
    const skill = installSkill(name, targetDir);
    console.log(`${GREEN}  ✓${RESET} Installed ${BOLD}${skill.name}${RESET}`);
    console.log(`${DIM}    → .claude/skills/${skill.name}/${RESET}`);
    console.log(`${DIM}    Ask your AI agent: "${skill.triggerPhrase}"${RESET}`);
    console.log();
  }
}

function handleList() {
  printBanner();
  const skills = listSkills();

  console.log(`${BOLD}  Available skills:${RESET}`);
  console.log();

  for (const skill of skills) {
    console.log(`  ${CYAN}${skill.name}${RESET}`);
    console.log(`${DIM}    ${skill.description}${RESET}`);
    console.log(`${DIM}    Trigger: "${skill.triggerPhrase}"${RESET}`);
    console.log();
  }
}

function handleUpdate() {
  printBanner();

  const updated = updateSkills(targetDir);

  if (updated.length > 0) {
    for (const name of updated) {
      console.log(`${GREEN}  ✓${RESET} Updated ${BOLD}${name}${RESET}`);
    }
    console.log();
    console.log(`${DIM}  ${updated.length} skill(s) updated to v${require('../package.json').version}${RESET}`);
    console.log();
  }
}

switch (command) {
  case 'install':
  case 'i':
    handleInstall();
    break;
  case 'list':
  case 'ls':
    handleList();
    break;
  case 'update':
  case 'up':
    handleUpdate();
    break;
  case '--help':
  case '-h':
  case undefined:
    printUsage();
    break;
  case '--version':
  case '-v':
    console.log(require('../package.json').version);
    break;
  default:
    console.error(`${RED}  Unknown command: ${command}${RESET}`);
    printUsage();
    process.exit(1);
}
