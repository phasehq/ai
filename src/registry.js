const skills = {
  'docker-compose': {
    name: 'docker-compose',
    description: 'Deploy Phase Console with Docker Compose and Let\'s Encrypt TLS',
    triggerPhrase: 'deploy Phase with Docker Compose',
    refs: ['docker-compose-deployment', 'troubleshooting'],
  },
  'k8s': {
    name: 'k8s',
    description: 'Deploy Phase Console on any Kubernetes cluster via Helm',
    triggerPhrase: 'deploy Phase on Kubernetes',
    refs: ['k8s-deployment', 'troubleshooting'],
  },
  'eks': {
    name: 'eks',
    description: 'Deploy Phase Console on AWS EKS with Helm and native AWS services',
    triggerPhrase: 'deploy Phase on EKS',
    refs: ['eks-deployment', 'troubleshooting'],
  },
};

function listSkills() {
  return Object.values(skills);
}

function getSkill(name) {
  return skills[name] || null;
}

function getSkillNames() {
  return Object.keys(skills);
}

module.exports = { listSkills, getSkill, getSkillNames };
