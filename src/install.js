const fs = require('fs');
const path = require('path');
const { getSkill, getSkillNames } = require('./registry');

function installSkill(skillName, targetDir) {
  const skill = getSkill(skillName);
  if (!skill) {
    console.error(`  Unknown skill: "${skillName}"`);
    console.error(`  Available skills: ${getSkillNames().join(', ')}`);
    process.exit(1);
  }

  const skillSrcDir = path.join(__dirname, '..', 'skills', skillName);
  const skillDestDir = path.join(targetDir, '.claude', 'skills', skillName);
  const refsDestDir = path.join(skillDestDir, 'refs');

  // Create directories
  fs.mkdirSync(refsDestDir, { recursive: true });

  // Copy SKILL.md
  const skillMdSrc = path.join(skillSrcDir, 'SKILL.md');
  const skillMdDest = path.join(skillDestDir, 'SKILL.md');
  fs.copyFileSync(skillMdSrc, skillMdDest);

  // Copy ref files
  const refsSrcDir = path.join(skillSrcDir, 'refs');
  if (fs.existsSync(refsSrcDir)) {
    const refFiles = fs.readdirSync(refsSrcDir);
    for (const refFile of refFiles) {
      fs.copyFileSync(
        path.join(refsSrcDir, refFile),
        path.join(refsDestDir, refFile)
      );
    }
  }

  return skill;
}

module.exports = { installSkill };
