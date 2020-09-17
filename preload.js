// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    const si = require('systeminformation');

// promises style - new since version 3
    si.osInfo()
    .then(data => console.log(data))
    .catch(error => console.error(error));
    si.users()
    .then(data => console.log(data))
    .catch(error => console.error(error));
    replaceText(`${type}-version`, process.versions[type])
  }
})
