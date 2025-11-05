const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'Ecommerce_Project_Report.md');

const condensedSections = `## 10. Deployment Flow

The release process keeps delivery lightweight while retaining the guardrails needed for production use:
- Feature work happens on short-lived branches. Merges into \`main\` require a quick peer review plus lint/test automation via GitHub Actions.
- Render watches the backend folder on \`main\`, installs dependencies, and runs \`npm start\`. Environment variables (MongoDB URI, JWT secret, Razorpay keys) stay in the Render dashboard; secrets never land in git.
- Netlify builds the Vite frontend on each \`main\` update, injects \`REACT_APP_API_URL\`/\`REACT_APP_RAZORPAY_KEY_ID\`, and serves the bundle from its global CDN.
- A smoke checklist (health endpoint, sample sign-in, checkout dry run) is executed immediately after each deploy; issues trigger an instant rollback to the previous Render/Netlify build.

## 11. Technologies Used

| Layer | Stack | Purpose |
| --- | --- | --- |
| Frontend | React 18, Vite, React Router, Redux Toolkit, Material UI | Responsive SPA, stateful cart, authenticated routing |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, Razorpay SDK | REST API, data modeling, auth, payment orchestration |
| Infrastructure | MongoDB Atlas, Render, Netlify, GitHub Actions | Managed database, hosting, CI triggers |
| Tooling | ESLint, Prettier, Postman, Jest, Axios | Code quality, API exploration, automated tests |

These choices balance developer velocity (hot reload, component libraries) with operational stability (managed hosting, familiar monitoring hooks).

## 12. Testing & Quality Assurance

- **Automated suites:** Jest covers controllers, helpers, and Redux reducers; Axios mocks validate error paths. GitHub Actions blocks merges if \`npm test\` or \`npm run lint\` fail.
- **API regression:** A Postman/Newman collection hits auth, product, booking, and review endpoints with both happy-path and failure payloads.
- **Security hardening:** Manual runs confirm rate limiting, sanitisation, and JWT expiry behaviour; OWASP ZAP lite scans backstop obvious misconfigurations.
- **E2E confidence:** Pre-release smoke tests walk through signup → add to cart → Razorpay test payment → booking history across Chrome, Firefox, and a mobile viewport.
- **Visual & accessibility checks:** Responsive breakpoints, keyboard navigation, and colour-contrast spot tests are signed off before go-live.
`;

try {
  const report = fs.readFileSync(reportPath, 'utf8');
  const startMarker = '## 10. Deployment Flow';
  const endMarker = '### 13.2 Practical Applications and Real-World Significance';

  const startIndex = report.indexOf(startMarker);
  const endIndex = report.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error('Could not locate the expected section markers.');
  }

  const segment = report.slice(startIndex, endIndex);
  const referencesMarker = '## 14. References';
  const referencesIndex = segment.indexOf(referencesMarker);
  const referencesBlock = referencesIndex === -1 ? '' : segment.slice(referencesIndex).trim();

  const before = report.slice(0, startIndex);
  const after = report.slice(endIndex);

  const trimmedReferences = referencesBlock.startsWith('---')
    ? referencesBlock.replace(/^---\s*/u, '')
    : referencesBlock;

  const headSeparator = '---\n\n';
  const combined = condensedSections.trim() + '\n\n' + headSeparator + trimmedReferences + '\n';

  const updated = before + combined + after;
  fs.writeFileSync(reportPath, updated, 'utf8');
  console.log('Sections 10-12 condensed successfully.');
} catch (error) {
  console.error('Failed to condense sections 10-12:', error.message);
  process.exitCode = 1;
}
