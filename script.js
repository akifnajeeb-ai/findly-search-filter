const products = [
  {name:'Arc Desk Lamp',category:'Workspace',price:74,stock:true,emoji:'💡',color:'#ded8bc',badge:'NEW'},
  {name:'Focus Timer',category:'Workspace',price:38,stock:true,emoji:'⏳',color:'#d5e1d6'},
  {name:'Craft Notebook',category:'Workspace',price:24,stock:true,emoji:'📓',color:'#e9cdbb'},
  {name:'Orbit Chair',category:'Workspace',price:149,stock:false,emoji:'🪑',color:'#d9d5ca'},
  {name:'Ripple Vase',category:'Home',price:62,stock:true,emoji:'🏺',color:'#c9dce1'},
  {name:'Linen Throw',category:'Home',price:89,stock:true,emoji:'🧶',color:'#d7c6b1',badge:'POPULAR'},
  {name:'Cedar Candle',category:'Home',price:32,stock:false,emoji:'🕯️',color:'#e6d7c4'},
  {name:'Cloud Bottle',category:'Wellness',price:42,stock:true,emoji:'🧴',color:'#d8dfea'},
  {name:'Balance Mat',category:'Wellness',price:68,stock:true,emoji:'🧘',color:'#d1e0ce',badge:'ECO-FRIENDLY',detail:'Non-slip · 6 mm comfort'},
  {name:'Morning Mug',category:'Wellness',price:28,stock:true,emoji:'☕',color:'#ecd7c8'},
  {name:'Weekender Bag',category:'Travel',price:119,stock:true,emoji:'🧳',color:'#d6c5b1',badge:'NEW'},
  {name:'Pocket Journal',category:'Travel',price:20,stock:false,emoji:'📔',color:'#d6d8bd'}
];
const photos={
  'Arc Desk Lamp':'https://loremflickr.com/720/520/desk,lamp?lock=11', 'Focus Timer':'https://images.unsplash.com/photo-1679168429245-c6d2c7e85e8c?auto=format&fit=crop&w=720&q=85',
  'Craft Notebook':'https://images.unsplash.com/photo-1633304557382-979afee9f9a2?auto=format&fit=crop&w=720&q=85', 'Orbit Chair':'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=720&q=85',
  'Ripple Vase':'https://images.unsplash.com/photo-1687191883721-257d8cad5b54?auto=format&fit=crop&w=720&q=85', 'Linen Throw':'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=720&q=85',
  'Cedar Candle':'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=720&q=85', 'Cloud Bottle':'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=720&q=85',
  'Balance Mat':'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=720&q=85', 'Morning Mug':'https://loremflickr.com/720/520/ceramic,mug?lock=20',
  'Weekender Bag':'https://loremflickr.com/720/520/weekender,bag?lock=21', 'Pocket Journal':'https://loremflickr.com/720/520/journal,notebook?lock=22'
};
const grid=document.querySelector('#productGrid'), search=document.querySelector('#searchInput'), range=document.querySelector('#priceRange'), priceValue=document.querySelector('#priceValue'), count=document.querySelector('#resultCount'), empty=document.querySelector('#emptyState'), sort=document.querySelector('#sortSelect');
function render(){const cats=[...document.querySelectorAll('[name=category]:checked')].map(x=>x.value), onlyStock=document.querySelector('[name=availability]').checked, term=search.value.trim().toLowerCase();let list=products.filter(p=>(!term||`${p.name} ${p.category}`.toLowerCase().includes(term))&&(!cats.length||cats.includes(p.category))&&p.price<=range.value&&(!onlyStock||p.stock)); if(sort.value==='low')list.sort((a,b)=>a.price-b.price);if(sort.value==='high')list.sort((a,b)=>b.price-a.price);if(sort.value==='name')list.sort((a,b)=>a.name.localeCompare(b.name));count.textContent=list.length;grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image" style="--card:${p.color}">${p.badge?`<span class="badge">${p.badge}</span>`:''}<img src="${photos[p.name]}" alt="${p.name}" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><span class="product-emoji" style="opacity:0">${p.emoji}</span></div><div class="product-info"><span class="category">${p.category}</span><h3>${p.name}</h3>${p.detail?`<p style="margin:-1px 0 6px;color:#758078;font-size:11px">${p.detail}</p>`:''}<div class="price-row"><span class="price">$${p.price}</span><span class="stock ${p.stock?'':'out'}">${p.stock?'In stock':'Sold out'}</span></div></div></article>`).join('');empty.hidden=!!list.length;}
function reset(){search.value='';range.value=150;priceValue.textContent='$150+';document.querySelectorAll('input[type=checkbox]').forEach(x=>x.checked=false);sort.value='featured';render();}
document.querySelectorAll('input').forEach(x=>x.addEventListener('input',render));sort.addEventListener('change',render);range.addEventListener('input',()=>{priceValue.textContent=range.value==150?'$150+':`$${range.value}`});document.querySelector('#clearFilters').addEventListener('click',reset);document.querySelector('#resetEmpty').addEventListener('click',reset);document.querySelector('#filterToggle').addEventListener('click',e=>{const open=document.querySelector('#filters').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}});render();
