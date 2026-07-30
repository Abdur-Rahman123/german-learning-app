const NS={progress:'deutsch-app:progress',images:'deutsch-app:selected-images',settings:'deutsch-app:settings'};
const defaults={completed:{},difficult:{},saved:{},reviews:{},exerciseResults:{},examResults:{},currentLesson:null,currentWord:null};
export function read(key,fallback={}){try{return {...fallback,...JSON.parse(localStorage.getItem(key)||'{}')}}catch{return structuredClone(fallback)}}
export function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
export const getProgress=()=>read(NS.progress,defaults);
export const saveProgress=p=>write(NS.progress,p);
export const getSettings=()=>read(NS.settings,{theme:'light',pexelsKey:''});
export const saveSettings=s=>write(NS.settings,s);
export const getImages=()=>read(NS.images,{});
export const saveImages=x=>write(NS.images,x);
export function toggleProgress(bucket,id){const p=getProgress();p[bucket][id]=!p[bucket][id];if(!p[bucket][id])delete p[bucket][id];saveProgress(p);return !!p[bucket][id]}
export function markReview(id,rating='good'){const days={again:1,difficult:3,good:7,easy:14}[rating];const p=getProgress();const old=p.reviews[id]||{count:0};p.reviews[id]={count:old.count+1,lastReviewed:new Date().toISOString(),nextReview:new Date(Date.now()+days*86400000).toISOString(),rating};p.completed[id]=true;saveProgress(p)}
export function dueIds(){const p=getProgress(),now=Date.now();return Object.keys(p.completed).filter(id=>!p.reviews[id]||new Date(p.reviews[id].nextReview).getTime()<=now)}

export function speakGerman(text,rate=.85){if(!('speechSynthesis'in window))throw new Error('Speech is not supported in this browser.');speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='de-DE';u.rate=rate;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang.toLowerCase().startsWith('de'))||null;speechSynthesis.speak(u)}
export const stopSpeech=()=>window.speechSynthesis?.cancel();

const https=url=>{try{const u=new URL(url);return u.protocol==='https:'?u.href:null}catch{return null}};
async function fetchJSON(url,options={}){const response=await fetch(url,{...options,signal:AbortSignal.timeout(9000)});if(!response.ok)throw new Error(`Media service returned ${response.status}`);return response.json()}
export async function searchOpenverseImages(query){const data=await fetchJSON(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=10&mature=false`);return(data.results||[]).map(x=>{const thumbnail=https(x.thumbnail),original=https(x.url);return{provider:'Openverse',imageUrl:thumbnail||original,thumbnailUrl:thumbnail||original,title:x.title||query,creator:x.creator||'Unknown creator',license:(x.license||'').toUpperCase(),sourcePage:https(x.foreign_landing_url)}}).filter(x=>x.imageUrl)}
export async function searchWikimediaImages(query){const p=new URLSearchParams({action:'query',generator:'search',gsrsearch:`filetype:bitmap ${query}`,gsrnamespace:'6',gsrlimit:'8',prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'800',format:'json',origin:'*'});const data=await fetchJSON(`https://commons.wikimedia.org/w/api.php?${p}`);return Object.values(data.query?.pages||{}).map(x=>{const i=x.imageinfo?.[0],m=i?.extmetadata||{};return{provider:'Wikimedia Commons',imageUrl:https(i?.url),thumbnailUrl:https(i?.thumburl||i?.url),title:x.title?.replace('File:','')||query,creator:(m.Artist?.value||'Wikimedia contributor').replace(/<[^>]*>/g,''),license:m.LicenseShortName?.value||'See source',sourcePage:https(i?.descriptionurl)}}).filter(x=>x.imageUrl)}
export async function searchPexelsImages(query){const key=getSettings().pexelsKey;if(!key)return[];const data=await fetchJSON(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8`,{headers:{Authorization:key}});return(data.photos||[]).map(x=>({provider:'Pexels',imageUrl:https(x.src?.large),thumbnailUrl:https(x.src?.medium),title:x.alt||query,creator:x.photographer||'Unknown',license:'Pexels license',sourcePage:https(x.url)})).filter(x=>x.imageUrl)}
export async function findImages(query){const results=await Promise.allSettled([searchOpenverseImages(query),searchWikimediaImages(query),searchPexelsImages(query)]);const hits=results.flatMap(x=>x.status==='fulfilled'?x.value:[]);if(!hits.length&&results.some(x=>x.status==='rejected'))console.info('Media providers unavailable; showing fallback.');return hits.slice(0,18)}
export async function getImage(word){const selected=getImages()[word.id];if(selected?.imageUrl)return selected;const hits=await findImages(word.imageQuery);return hits[0]||null}
export function exportData(){const payload={version:1,exportedAt:new Date().toISOString(),progress:getProgress(),images:getImages(),settings:getSettings()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`hallo-deutsch-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)}
export async function importData(file){const data=JSON.parse(await file.text());if(data?.version!==1||typeof data.progress!=='object'||typeof data.settings!=='object')throw new Error('This is not a valid Hallo Deutsch backup.');write(NS.progress,data.progress);write(NS.images,data.images||{});write(NS.settings,data.settings)}
export function resetData(){Object.values(NS).forEach(k=>localStorage.removeItem(k))}
