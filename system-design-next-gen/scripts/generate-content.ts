import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import readingTime from 'reading-time';
import sanitizeHtml from 'sanitize-html';

type Topic = {
  slug: string;
  title: string;
  phase: string;
  source: string;
  htmlPath: string;
  estimatedMinutes: number;
  wordCount: number;
  isCore: boolean;
  pdfs: string[];
};

const appRoot = process.cwd();
const repoRoot = path.resolve(appRoot, '..');
const notesRoot = path.join(repoRoot, 'notes');
const generatedRoot = path.join(appRoot, 'public', 'generated');
const generatedNotesRoot = path.join(generatedRoot, 'notes');

const phaseRules: Array<[string, RegExp]> = [
  ['Fundamentals', /acid|cap|solid|principle|idempot|consistency|stateless|architecture|nfr|spof/i],
  ['Databases & Storage', /db|database|sql|nosql|shard|partition|replic|transaction|storage|cassandra|dynamo|redis|s3|hdfs|index|lock|mvcc|wal|log/i],
  ['Caching & Performance', /cache|latency|throughput|performance|backpressure|hot-|spike|buffer|cpu|memory/i],
  ['Distributed Systems', /distributed|consensus|raft|paxos|leader|event|queue|kafka|saga|cqrs|outbox|crdt|fault|resilien/i],
  ['Networking', /http|tcp|udp|tls|network|load-balancer|proxy|gateway|cdn|dns|grpc|websocket|webhook/i],
  ['Security', /auth|jwt|oauth|encrypt|security|owasp|secret|ddos|brute|threat|crypto/i],
  ['DevOps & Infrastructure', /docker|kubernetes|prometheus|grafana|deploy|k8s|container|monitor|tracing|observ/i],
  ['Architecture Patterns', /micro|monolith|serverless|pattern|api-gateway|rate|fanout|stream/i],
  ['Real-World Designs', /chat|notification|booking|delivery|youtube|twitter|instagram|search|design-problem/i],
];

function slugify(value: string): string {
  return value.toLowerCase().replace(/\.md$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function titleFromMarkdown(markdown: string, filename: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return (heading ?? filename.replace(/\.md$/, '').replace(/[-_]/g, ' '))
    .replace(/[*#_]/g, '')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function phaseFor(filename: string, title: string): string {
  const value = `${filename} ${title}`;
  return phaseRules.find(([, rule]) => rule.test(value))?.[0] ?? 'Reference Library';
}

function rewriteInternalLinks(html: string, slugBySource: Map<string, string>): string {
  return html.replace(/href="([^\"]+\.md(?:#[^\"]+)?)"/gi, (_match, target: string) => {
    const [source, hash] = target.split('#');
    const slug = slugBySource.get(source.toLowerCase()) ?? slugify(path.basename(source));
    return `href="?topic=${slug}${hash ? `#${hash}` : ''}"`;
  });
}

async function main(): Promise<void> {
  await fs.rm(generatedRoot, { recursive: true, force: true });
  await fs.mkdir(generatedNotesRoot, { recursive: true });

  const noteFiles = (await fs.readdir(notesRoot)).filter((file) => file.endsWith('.md')).sort();
  const rootDocs = ['interview-playbook.md', 'must-know-topics.md', 'index.md']
    .filter((file) => true);
  const sources = [
    ...rootDocs.map((file) => ({ file, absolute: path.join(repoRoot, file), source: file })),
    ...noteFiles.map((file) => ({ file, absolute: path.join(notesRoot, file), source: `notes/${file}` })),
  ];
  const slugBySource = new Map(sources.map(({ source }) => [source.toLowerCase(), slugify(source.replace(/^notes\//, ''))]));
  const pdfs = (await fs.readdir(repoRoot)).filter((file) => file.toLowerCase().endsWith('.pdf'));
  const topics: Topic[] = [];

  for (const [order, source] of sources.entries()) {
    const markdown = await fs.readFile(source.absolute, 'utf8');
    const slug = slugBySource.get(source.source.toLowerCase()) ?? slugify(source.file);
    const title = titleFromMarkdown(markdown, source.file);
    const rendered = await marked.parse(markdown, { gfm: true, breaks: false });
    const html = sanitizeHtml(rewriteInternalLinks(rendered, slugBySource), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'details', 'summary']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
      },
    });
    await fs.writeFile(path.join(generatedNotesRoot, `${slug}.html`), html, 'utf8');

    const stats = readingTime(markdown);
    const matchedPdf = pdfs.filter((pdf) => new RegExp(slug.replace(/-/g, '[-_ ]?'), 'i').test(pdf));
    topics.push({
      slug,
      title,
      phase: phaseFor(source.file, title),
      source: source.source,
      htmlPath: `generated/notes/${slug}.html`,
      estimatedMinutes: Math.max(2, Math.ceil(stats.minutes)),
      wordCount: stats.words,
      isCore: order < 3 || /must-know|interview-playbook/i.test(source.file),
      pdfs: matchedPdf.map((pdf) => `../${encodeURIComponent(pdf).replace(/%2F/g, '/')}`),
    });
  }

  await fs.writeFile(path.join(generatedRoot, 'catalog.json'), JSON.stringify({ generatedAt: new Date().toISOString(), topics, pdfs }, null, 2));
  console.log(`Generated ${topics.length} HTML topics and catalog metadata.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
