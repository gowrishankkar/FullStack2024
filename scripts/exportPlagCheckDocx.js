const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "plag_check.md");
const markdown = fs.readFileSync(sourcePath, "utf8");

const tempDir = path.join(rootDir, "tmp_plag_docx_build");
fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(path.join(tempDir, "_rels"), { recursive: true });
fs.mkdirSync(path.join(tempDir, "docProps"), { recursive: true });
fs.mkdirSync(path.join(tempDir, "word"), { recursive: true });

const nowIso = new Date().toISOString();

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\u2013/g, "-")
    .replace(/\u2014/g, "-");

const paragraphs = markdown
  .replace(/\r\n/g, "\n")
  .split(/\n\s*\n/)
  .map((para) => para.trim())
  .filter((para) => para.length > 0);

const paragraphXml = paragraphs
  .map((para) => {
    const safe = escapeXml(para.replace(/\n/g, " "));
    return `<w:p><w:r><w:t xml:space="preserve">${safe}</w:t></w:r></w:p>`;
  })
  .join("\n");

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphXml}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
      <w:docGrid w:type="lines" w:linePitch="312"/>
    </w:sectPr>
  </w:body>
</w:document>`;

const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
</Types>`;

const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Applied Software Project Report</dc:title>
  <dc:creator>V. Gowri Shankar</dc:creator>
  <cp:lastModifiedBy>GitHub Copilot</cp:lastModifiedBy>
  <dc:description>Converted from plag_check.md with inline citations preserved.</dc:description>
  <cp:keywords>plagiarism, capstone, ecommerce</cp:keywords>
  <dcterms:created xsi:type="dcterms:W3CDTF">${nowIso}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${nowIso}</dcterms:modified>
</cp:coreProperties>`;

const appXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Word</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs>
    <vt:vector size="2" baseType="variant">
      <vt:variant>
        <vt:lpstr>Title</vt:lpstr>
      </vt:variant>
      <vt:variant>
        <vt:i4>1</vt:i4>
      </vt:variant>
    </vt:vector>
  </HeadingPairs>
  <TitlesOfParts>
    <vt:vector size="1" baseType="lpstr">
      <vt:lpstr>Applied Software Project Report</vt:lpstr>
    </vt:vector>
  </TitlesOfParts>
  <Company></Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0000</AppVersion>
</Properties>`;

const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
</w:styles>`;

const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:zoom w:percent="100"/>
  <w:defaultTabStop w:val="720"/>
</w:settings>`;

fs.writeFileSync(path.join(tempDir, "[Content_Types].xml"), contentTypesXml, "utf8");
fs.writeFileSync(path.join(tempDir, "_rels", ".rels"), relsXml, "utf8");
fs.writeFileSync(path.join(tempDir, "docProps", "core.xml"), coreXml, "utf8");
fs.writeFileSync(path.join(tempDir, "docProps", "app.xml"), appXml, "utf8");
fs.writeFileSync(path.join(tempDir, "word", "document.xml"), documentXml, "utf8");
fs.writeFileSync(path.join(tempDir, "word", "styles.xml"), stylesXml, "utf8");
fs.writeFileSync(path.join(tempDir, "word", "settings.xml"), settingsXml, "utf8");

const zipOutputPath = path.join(rootDir, "plag_check_tmp.zip");
const docxOutputPath = path.join(rootDir, "plag_check.docx");

if (fs.existsSync(zipOutputPath)) {
  fs.rmSync(zipOutputPath);
}
if (fs.existsSync(docxOutputPath)) {
  fs.rmSync(docxOutputPath);
}

const psCommand = [
  "-NoProfile",
  "-Command",
  `Compress-Archive -Path '${path.join(tempDir, "*")}' -DestinationPath '${zipOutputPath}' -Force`
];

const result = spawnSync("powershell.exe", psCommand, {
  cwd: rootDir,
  stdio: "inherit",
});

if (result.status !== 0) {
  throw new Error(`Compress-Archive failed with code ${result.status}`);
}

fs.renameSync(zipOutputPath, docxOutputPath);

console.log("DOCX generated at", docxOutputPath);

fs.rmSync(tempDir, { recursive: true, force: true });
