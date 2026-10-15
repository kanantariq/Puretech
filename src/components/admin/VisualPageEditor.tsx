'use client';

import { useMemo, useState, type ChangeEvent } from 'react';
import { ChevronDown, ImagePlus, LoaderCircle, Plus, Trash2, Video } from 'lucide-react';
import { savePage } from '../../app/admin/actions';

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const LABELS: Record<string, string> = {
  hero: 'Hero section', caseStudies: 'Projects & case studies', capabilities: 'Capabilities',
  corePillars: 'Core pillars', processSteps: 'Process steps', manifestoPillars: 'About pillars',
  concepts: 'Innovation concepts', testimonials: 'Testimonials', clientLogos: 'Client logos',
  companyFacts: 'Company & contact details', faqs: 'Frequently asked questions', journeys: 'Customer journeys',
  criteria: 'Partner criteria', description: 'Description', heroImage: 'Hero image', galleryImages: 'Gallery images',
  videoUrl: 'Video', youtubeId: 'YouTube video ID', liveUrl: 'Live website URL', accentColor: 'Accent color',
  primaryCta: 'Primary button label', secondaryCta: 'Secondary button label', trustOne: 'First trust message',
  trustTwo: 'Second trust message', lead: 'Headline opening', highlight: 'Highlighted headline',
  deliveryHubs: 'Office locations', stats: 'Company statistics', subServices: 'Services', technologies: 'Technologies',
};

const SYSTEM_KEYS = new Set(['slug', 'id']);
const MEDIA_PATTERN = /(image|video|mockup|logo|avatar|photo|thumbnail)/i;
const LONG_PATTERN = /(description|quote|challenge|solution|hypothesis|feasibility|potential|question|answer|tagline|statement|detail)/i;

function labelFor(key: string) {
  return LABELS[key] || key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]/g, ' ').replace(/^./, c => c.toUpperCase());
}

function cloneValue<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
function blankLike(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, SYSTEM_KEYS.has(key) ? `${key}-${Date.now()}` : blankLike(item)]));
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return 0;
  return '';
}

function setAtPath(root: JsonObject, path: (string | number)[], value: JsonValue): JsonObject {
  const next = cloneValue(root);
  let cursor: JsonValue = next;
  path.slice(0, -1).forEach(part => { cursor = (cursor as JsonObject)[String(part)]; });
  (cursor as JsonObject)[String(path[path.length - 1])] = value;
  return next;
}

function MediaInput({ value, onChange, kind }: { value: string; onChange: (value: string) => void; kind: 'image' | 'video' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true); setError('');
    const data = new FormData(); data.set('file', file);
    try {
      const response = await fetch('/api/admin/media', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed');
      onChange(result.url);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Upload failed'); }
    finally { setUploading(false); event.target.value = ''; }
  }
  return <div className="cms-media-field">
    <div className="cms-media-preview">{kind === 'image' && value ? <img src={value} alt="Selected media preview" /> : kind === 'video' && value ? <video src={value} muted controls preload="metadata" /> : <span>{kind === 'image' ? <ImagePlus /> : <Video />} No {kind} selected</span>}</div>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={`${kind} URL`} />
    <label className="cms-upload-button">{uploading ? <LoaderCircle className="cms-spin" size={16} /> : kind === 'image' ? <ImagePlus size={16} /> : <Video size={16} />}{uploading ? 'Uploading…' : `Upload ${kind}`}<input type="file" accept={kind === 'image' ? 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml' : 'video/mp4,video/webm'} onChange={upload} disabled={uploading} /></label>
    {error && <small className="cms-field-error">{error}</small>}
  </div>;
}

function FieldEditor({ fieldKey, value, path, update }: { fieldKey: string; value: JsonValue; path: (string | number)[]; update: (path: (string | number)[], value: JsonValue) => void }) {
  if (Array.isArray(value)) return <ArrayEditor fieldKey={fieldKey} value={value} path={path} update={update} />;
  if (value && typeof value === 'object') return <ObjectEditor value={value} path={path} update={update} />;
  if (typeof value === 'boolean') return <label className="cms-toggle"><input type="checkbox" checked={value} onChange={e => update(path, e.target.checked)} /><span /> Enabled</label>;
  if (typeof value === 'number') return <input type="number" value={value} onChange={e => update(path, Number(e.target.value))} />;
  const text = value == null ? '' : String(value);
  if (MEDIA_PATTERN.test(fieldKey) && (fieldKey.toLowerCase().includes('image') || fieldKey.toLowerCase().includes('mockup') || fieldKey.toLowerCase().includes('logo') || fieldKey.toLowerCase().includes('photo'))) return <MediaInput kind="image" value={text} onChange={next => update(path, next)} />;
  if (MEDIA_PATTERN.test(fieldKey) && fieldKey.toLowerCase().includes('video')) return <MediaInput kind="video" value={text} onChange={next => update(path, next)} />;
  if (LONG_PATTERN.test(fieldKey) || text.length > 110) return <textarea rows={4} value={text} onChange={e => update(path, e.target.value)} />;
  return <input value={text} onChange={e => update(path, e.target.value)} readOnly={SYSTEM_KEYS.has(fieldKey)} />;
}

function ObjectEditor({ value, path, update }: { value: JsonObject; path: (string | number)[]; update: (path: (string | number)[], value: JsonValue) => void }) {
  return <div className="cms-object-fields">{Object.entries(value).map(([key, item]) => <label key={key} className={Array.isArray(item) || (item && typeof item === 'object') ? 'cms-wide-field' : ''}><span>{labelFor(key)}{SYSTEM_KEYS.has(key) && <small>System field</small>}</span><FieldEditor fieldKey={key} value={item} path={[...path, key]} update={update} /></label>)}</div>;
}

function ArrayEditor({ fieldKey, value, path, update }: { fieldKey: string; value: JsonValue[]; path: (string | number)[]; update: (path: (string | number)[], value: JsonValue) => void }) {
  const objectItems = value.some(item => item && typeof item === 'object' && !Array.isArray(item));
  if (!objectItems) return <div className="cms-list-editor">{value.map((item, index) => <div key={index}><FieldEditor fieldKey={fieldKey} value={item} path={[...path, index]} update={update} /><button type="button" aria-label="Remove item" onClick={() => update(path, value.filter((_, i) => i !== index))}><Trash2 size={15} /></button></div>)}<button type="button" className="cms-add-small" onClick={() => update(path, [...value, ''])}><Plus size={15} /> Add item</button></div>;
  return <div className="cms-repeater">{value.map((item, index) => <details key={index}><summary><span>{labelFor(fieldKey)} {index + 1}{item && typeof item === 'object' && 'title' in item ? ` — ${String((item as JsonObject).title || '')}` : ''}</span><ChevronDown size={17} /></summary><div className="cms-repeater-body"><ObjectEditor value={item as JsonObject} path={[...path, index]} update={update} /><button type="button" className="cms-remove" onClick={() => update(path, value.filter((_, i) => i !== index))}><Trash2 size={15} /> Remove</button></div></details>)}<button type="button" className="cms-add" onClick={() => update(path, [...value, value[0] ? blankLike(value[0]) : {}])}><Plus size={16} /> Add {labelFor(fieldKey).replace(/s$/, '')}</button></div>;
}

export function VisualPageEditor({ page, saved, error }: { page: { id: string; title: string; status: string; content: JsonObject }; saved?: string; error?: string }) {
  const [content, setContent] = useState<JsonObject>(() => cloneValue(page.content));
  const [filter, setFilter] = useState('');
  const sections = useMemo(() => Object.entries(content).filter(([key]) => !['slug', 'title', 'description'].includes(key) && labelFor(key).toLowerCase().includes(filter.toLowerCase())), [content, filter]);
  const update = (path: (string | number)[], value: JsonValue) => setContent(current => setAtPath(current, path, value));
  return <>
    {saved && <div className="cms-success">Page saved and published content refreshed.</div>}{error && <div className="cms-alert">{error}</div>}
    <form action={savePage} className="cms-form cms-visual-form">
      <input type="hidden" name="id" value={page.id} /><input type="hidden" name="content" value={JSON.stringify(content)} />
      <div className="cms-editor-basics"><label>Page title<input name="title" defaultValue={page.title} required /></label><label>Publishing status<select name="status" defaultValue={page.status}><option value="draft">Draft</option><option value="published">Published</option></select></label></div>
      {'description' in content && <label>SEO description<textarea rows={3} value={String(content.description || '')} onChange={e => update(['description'], e.target.value)} /></label>}
      <div className="cms-editor-toolbar"><div><h2>Page sections</h2><p>Open a section and edit its fields. No code changes are required.</p></div><input type="search" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Find a section…" /></div>
      <div className="cms-section-editor">{sections.map(([key, value], index) => <details key={key} open={index === 0}><summary><span>{labelFor(key)}</span><ChevronDown size={19} /></summary><div className="cms-section-body"><FieldEditor fieldKey={key} value={value} path={[key]} update={update} /></div></details>)}</div>
      <div className="cms-save-bar"><span>Review your changes, then save.</span><button type="submit">Save page</button></div>
    </form>
  </>;
}
