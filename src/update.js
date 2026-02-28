const fs = require('fs');
const path = require('path');
const { getSkillNames } = require('./registry');
const { installSkill } = require('./install');

function getInstalledSkills(targetDir) {
  const skillsDir = path.join(targetDir, '.claude', 'skills');
  if (!fs.existsSync(skillsDir)) return [];

  const allNames = getSkillNames();
  return allNames.filter((name) => {
    const skillMd = path.join(skillsDir, name, 'SKILL.md');
    return fs.existsSync(skillMd);
  });
}

function updateSkills(targetDir) {
  const installed = getInstalledSkills(targetDir);

  if (installed.length === 0) {
    console.log('  No Phase AI skills installed in this directory.');
    console.log('  Run: npx @phasehq/ai install <skill>');
    return [];
  }

  const updated = [];
  for (const name of installed) {
    installSkill(name, targetDir);
    updated.push(name);
  }
  return updated;
}

module.exports = { updateSkills, getInstalledSkills };
