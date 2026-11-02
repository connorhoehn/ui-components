import { useState, type ReactNode } from 'react';
import { Card } from '../ui/Card';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, PlayCircleIcon } from '../ui/Icons';
export interface MediaCollectionPreview { id: string; image?: string; label: string; duration?: string; }
export interface MediaCollectionCardProps {
  title: string;
  /** Match the host document outline; visual title styling stays compact. */
  headingAs?: 'h2' | 'h3' | 'h4';
  status?: ReactNode;
  previews: readonly MediaCollectionPreview[];
  onOpen: () => void;
  onPlay: (preview: MediaCollectionPreview) => void;
}
/** One episode/collection, with its real preview versions inside a bounded
 * carousel. Hosts supply duration/provenance, never inferred by the card. */
export function MediaCollectionCard({title,headingAs:Heading='h3',status,previews,onOpen,onPlay}:MediaCollectionCardProps) {
 const [selected,setSelected]=useState(0);
 const index=Math.min(selected,Math.max(0,previews.length-1)), preview=previews[index];
 return <Card padding="none" className="min-w-0 overflow-hidden" data-media-collection>
  <Heading className="m-0 px-3 py-2 text-sm font-semibold"><button type="button" onClick={onOpen} className="block w-full truncate text-left text-text-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary" title={title}>{title}</button></Heading>
  <button type="button" disabled={!preview} aria-label={`Play ${title}`} onClick={()=>preview&&onPlay(preview)} className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-surface-muted text-text-secondary focus-visible:outline-2 focus-visible:outline-primary">
    {preview?.image ? <img src={preview.image} alt={`${title} · ${preview.label}`} className="h-full w-full object-cover"/> : <span className="text-xs">{preview ? 'Preview unavailable' : 'No review movie'}</span>}
    {preview && <span className="absolute rounded-full bg-surface p-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><PlayCircleIcon size={24}/></span>}
  </button>
  <div className="flex min-w-0 items-center justify-between gap-1 px-2 py-1 text-xs text-text-secondary">
    <span className="shrink-0 tabular-nums">{preview?.duration||'Length unknown'}</span>{status}
  </div>
  {preview && <div className="flex min-w-0 items-center gap-1 border-t border-border px-1 py-1">
    {previews.length>1 && <IconButton size="sm" aria-label={`Previous preview for ${title}`} disabled={index===0} onClick={()=>setSelected(index-1)}><ChevronIcon dir="left"/></IconButton>}
    <span className="min-w-0 flex-1 truncate text-xs text-text-secondary" title={preview.label}>{preview.label}</span>
    {previews.length>1 && <><span className="text-xs tabular-nums text-text-secondary">{index+1}/{previews.length}</span><IconButton size="sm" aria-label={`Next preview for ${title}`} disabled={index===previews.length-1} onClick={()=>setSelected(index+1)}><ChevronIcon dir="right"/></IconButton></>}
  </div>}
 </Card>;
}
