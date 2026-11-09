import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCollectionCard } from './MediaCollectionCard';
import Chip from './Chip';
const meta={title:'Shared/MediaCollectionCard',component:MediaCollectionCard,tags:['autodocs']} satisfies Meta<typeof MediaCollectionCard>;
export default meta;type Story=StoryObj<typeof meta>;
export const Episode:Story={args:{title:'1. A new backyard',status:<Chip tone="warning">In review</Chip>,previews:[{id:'1',label:'Draft · first scene',duration:'2:05'},{id:'2',label:'Draft · middle scene',duration:'2:05'}],onOpen:()=>{},onPlay:()=>{}},render:args=><div className="max-w-xs"><MediaCollectionCard {...args}/></div>};
export const NoMovie:Story={...Episode,args:{...Episode.args,previews:[]}};

export const ProjectSection:Story={...Episode,args:{...Episode.args,title:'Production previews',headingAs:'h2'}};
/** Nothing to play: one quiet line instead of the 16:9 card (`emptyLabel`, 2.515.0). `hideWhenEmpty` draws nothing. */
export const EmptyLine:Story={...Episode,args:{...Episode.args,previews:[],emptyLabel:'No review movie yet'}};
