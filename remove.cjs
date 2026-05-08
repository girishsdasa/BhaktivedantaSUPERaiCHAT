const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove InstallPopup component completely
const installPopupStart = content.indexOf('const InstallPopup = ({');
const nextComponentStart = content.indexOf('const LoadingScreen = ({');
if (installPopupStart !== -1 && nextComponentStart !== -1) {
  content = content.substring(0, installPopupStart) + content.substring(nextComponentStart);
}

// 2. Clear out state and handlers in App
content = content.replace(/const \[showInstallPopup, setShowInstallPopup\] = useState\(false\);\n?\s*/g, '');
content = content.replace(/const \[pendingLink, setPendingLink\] = useState<string \| null>\(null\);\n?\s*/g, '');
content = content.replace(/const \[deferredPrompt, setDeferredPrompt\] = useState<any>\(null\);\n?\s*/g, '');

const useEStart = content.indexOf('useEffect(() => {\n    const isStandalone');
if (useEStart !== -1) {
  const useEEndStr = '  }, []);\n';
  const useEEnd = content.indexOf(useEEndStr, useEStart);
  if (useEEnd !== -1) {
    content = content.substring(0, useEStart) + content.substring(useEEnd + useEEndStr.length);
  }
}

const handleOpenStart = content.indexOf('const handleOpenPortal = (link: string) => {\n');
if (handleOpenStart !== -1) {
  const handleOpenEndStr = '  };\n';
  const handleOpenEnd = content.indexOf(handleOpenEndStr, handleOpenStart);
  if (handleOpenEnd !== -1) {
    const replacement = `const handleOpenPortal = (link: string) => {\n    const newWin = window.open(link, '_blank', 'noopener,noreferrer');\n    if (!newWin) window.location.href = link;\n  };\n`;
    content = content.substring(0, handleOpenStart) + replacement + content.substring(handleOpenEnd + handleOpenEndStr.length);
  }
}

content = content.replace(/const handleProceed = \(\) => {[\s\S]*?};\n\n  /g, '');
content = content.replace(/const handleClose = \(\) => {[\s\S]*?};\n\n  /g, '');

const jsxInstallPopupStart = content.indexOf('<AnimatePresence>\n        {showInstallPopup && (');
if (jsxInstallPopupStart !== -1) {
  const jsxInstallPopupEnd = content.indexOf('</AnimatePresence>', jsxInstallPopupStart);
  if (jsxInstallPopupEnd !== -1) {
    content = content.substring(0, jsxInstallPopupStart) + content.substring(jsxInstallPopupEnd + '</AnimatePresence>\n'.length);
  }
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Transformation completed.");
