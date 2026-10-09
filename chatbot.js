(function () {
  if (window.__dreamBotLoaded) return;
  window.__dreamBotLoaded = true;

  // Optional AI backend. Leave empty to use built-in answers. Never put an API key here.
  var AI_ENDPOINT = '';
  var KEY_SITE = 'https://keys-modsdream.netlify.app/';
  var BASE = /\/posts\//.test(location.pathname) ? '../' : '';
  function u(p) { return BASE + p; }
  function a(p, label) { return '<a href="' + (/^https?:/.test(p) ? p : u(p)) + '"' + (/^https?:/.test(p) ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>'; }

  var PLANS = [['1 Month','$2'],['2 Months','$4'],['3 Months','$5'],['6 Months','$9'],['1 Year','$10'],['2 Years','$18'],['3 Years','$25']];
  function planList() { return '<ul>' + PLANS.map(function (p) { return '<li><b>' + p[0] + ':</b> ' + p[1] + '</li>'; }).join('') + '</ul>'; }

  var DEFAULT_CHIPS = ['Plans & prices', 'How to pay', 'Free key', 'VIP key', 'Mods list', 'Install help', 'Not working', 'Contact us'];
  var GREETING = "Hi there! I'm Dream Helper. I can help you pick a mod, understand VIP, get a key, or install a file. What would you like to do today?";
  var FALLBACK = "I'm not sure what you mean yet. I'm best with plans, payments, downloads, keys, mods, and installing. Try asking another way, or tap a button below. For anything else, use the " + a('contact.html', 'Contact page') + '.';

  var INTENTS = [
    { id:'greet', words:['hi','hello','hey','hii','hlo','salam','assalam','assalamualaikum','morning','evening','afternoon'],
      reply:function(){return GREETING;} },
    { id:'thanks', words:['thanks','thank','thx','ty','great','awesome','nice','appreciate'],
      reply:function(){return "You're very welcome! Happy modding. Anything else I can help with?";} },
    { id:'bye', words:['bye','goodbye','later','cya','night'],
      reply:function(){return 'Bye for now! Come back anytime.';} },
    { id:'plans', chips:['How to pay','Redeem code','VIP benefits'], words:['plan','plans','price','prices','pricing','cost','how much','subscription','subscribe','monthly','yearly','month','months','year','years','cheap','lifetime','expensive'],
      reply:function(){return 'Here are our VIP plan prices:' + planList() + 'Every plan includes instant downloads, no ads, and all mod access. ' + a('plans.html','Open the VIP Plans page') + ' to choose one.';} },
    { id:'pay', chips:['Plans & prices','Redeem code','Contact us'], words:['pay','payment','paying','upi','buy','purchase','order','checkout','paid','transaction','verify','verified','gpay','paytm','bank'],
      reply:function(){return 'Happy to help you buy VIP! Here is how:<ol><li>Pay with UPI to <b>dreammods145@okaxis</b>, or email dreammods145@gmail.com, or message t.me/Customplayer99 on Telegram.</li><li>Open the ' + a('plans.html','VIP Plans page') + ', choose a plan, and fill in the Order Form.</li><li>Our admin checks your payment and turns on VIP within 1 to 2 hours.</li></ol>If a step gets stuck, tell me where you are.';} },
    { id:'redeem', chips:['Plans & prices','How to pay'], words:['redeem','gift','coupon','promo','voucher','giftcard'],
      reply:function(){return 'If you have a redeem or gift code, open the ' + a('plans.html','VIP Plans page') + ', scroll to <b>Redeem Code</b>, type your code, and press <b>Redeem Code</b>.';} },
    { id:'vip', chips:['Plans & prices','VIP key','How to pay'], words:['vip','premium','benefit','benefits','instant','direct','faster','speed','upgrade','member','membership'],
      reply:function(){return 'VIP is our paid membership:<ul><li>Instant, direct downloads</li><li>No ads or link shorteners</li><li>Maximum download speed</li><li>Instant VIP key from the ' + a('vipkey.html','VIP Key Generator') + '</li><li>Early updates, and priority support on longer plans</li></ul>' + a('plans.html','See the VIP plans') + '.';} },
    { id:'freekey', chips:['VIP key','Install help','Not working'], words:['freekey','free key','key free','getkey','get key','keyfree'],
      reply:function(){return 'To get your <b>free key</b>:<ol><li>Read the ' + a('posts/loginkeys.html','key guide') + ' if you are new.</li><li>Open the <a href="' + KEY_SITE + '" target="_blank" rel="noopener">free key site</a>, watch the ads, and follow the timer steps.</li><li>Copy the key and paste it into the mod menu.</li></ol>';} },
    { id:'vipkey', chips:['Free key','Plans & prices','Not working'], words:['vipkey','vip key','generator','generate','create key','make key'],
      reply:function(){return 'The VIP Key Generator works for active VIP members. Sign in first. If your plan is active, the generator opens. If not, you will be sent to the plans page.<ol><li>Type the game name.</li><li>Pick how many days the key should last.</li><li>Tap Create and copy the key.</li></ol>Not a VIP yet? ' + a('plans.html','See the plans') + '.';} },
    { id:'key', chips:['Free key','VIP key','Install help'], words:['key','keys','activation','activate','license','unlock','locked'],
      reply:function(){return 'Some mods need an activation key to turn on the mod menu:<ul><li><b>Free key:</b> from the ' + '<a href="' + KEY_SITE + '" target="_blank" rel="noopener">key site</a>, with ads.</li><li><b>VIP key:</b> instant, from the ' + a('vipkey.html','VIP Key Generator') + '.</li></ul>';} },
    { id:'free', chips:['VIP benefits','Free key','Install help'], words:['free','download','downloads','ads','ad','shortener','shorteners','link','links','apk','file','files'],
      reply:function(){return 'Free downloads are on every mod page. You go through a link shortener and watch a few ads, then the file unlocks. Want no ads and instant downloads? ' + a('plans.html','Get VIP') + ' is the fastest way.';} },
    { id:'mods', chips:['Install help','Free key','Plans & prices'], words:['mod','mods','game','games','list','available','offer','offers','catalog','app','apps','which'],
      reply:function(){return 'Here are the mods available right now:<ul><li>' + a('posts/SubwaySurf.html','Subway Surfers Mod') + '</li><li>' + a('posts/gc5mod.html','Game Changer 5 Mod Menu') + '</li><li>' + a('posts/stickwar.html','Stick War Legacy') + '</li></ul>See all of them on the ' + a('allmods.html','All Mods page') + '.';} },
    { id:'install', chips:['Not working','Free key','Contact us'], words:['install','installing','installation','unknown','sources','setup','opening','settings','apk'],
      reply:function(){return 'Installing is easy:<ol><li>Download the file with the Free or VIP button.</li><li>If Android asks, allow installs from your browser: Settings, Apps, Install unknown apps.</li><li>Open the .apk from Downloads and tap <b>Install</b>.</li><li>Open the game. If the mod menu asks for a key, enter it.</li></ol>';} },
    { id:'usemenu', chips:['Free key','Not working'], words:['menu','icon','toggle','enable','turn','use','open menu'],
      reply:function(){return 'Once the mod is installed and your key works: open the game, look for the small mod icon on the screen, tap it, and turn on the features you want. If you can\'t see the icon, make sure the game is fully open, then try again.';} },
    { id:'problem', chips:['Install help','Contact us'], words:['error','problem','issue','crash','crashes','crashing','broken','black','stuck','fail','failed','bug','blank','working'],
      reply:function(){return "Sorry about that. Try these in order:<ol><li>Uninstall the old version of the game first.</li><li>Make sure your phone has enough free storage.</li><li>Download the file again, in case it didn't finish.</li><li>Check that you typed the key exactly as shown.</li></ol>If it still fails, tell me your phone model and Android version, or message us on the " + a('contact.html','Contact page') + '.';} },
    { id:'contact', chips:['Not working','Plans & prices'], words:['contact','support','email','telegram','human','admin','team','reach','message','person','someone','speak'],
      reply:function(){return 'Reach our team:<ul><li>Email: modsdream21@gmail.com</li><li>Telegram: @Modsdream</li></ul>We usually reply within 24 hours. You can also use the ' + a('contact.html','Contact form') + '.';} },
    { id:'account', chips:['How to pay','Plans & prices'], words:['account','login','signin','sign','register','signup','password','profile','logout'],
      reply:function(){return 'Sign in on the ' + a('sign.html','Account page') + '. Your VIP status is tied to your account, so use the same one you used to buy VIP.';} },
    { id:'safety', chips:['Contact us','How to pay'], words:['safe','safety','virus','malware','secure','trust','scam','fake','fraud','hack','risk'],
      reply:function(){return "Good question! Every mod is tested before it is shared. To stay safe: only download from Dream Mods, never share your account password, and only pay using the details on the Plans page. If anyone asks for money another way, don't pay them.";} },
    { id:'glossary', chips:['Mods list','Free key'], words:['apk','meaning','explain','beginner','new'],
      reply:function(){return 'Quick glossary:<ul><li><b>APK:</b> the installer file for Android apps and games.</li><li><b>Mod:</b> a changed version of a game with extra features.</li><li><b>Mod menu:</b> the on-screen panel where you turn features on or off.</li><li><b>Key:</b> a code that unlocks the mod menu.</li><li><b>VIP:</b> our paid membership with instant, ad-free downloads.</li></ul>';} },
    { id:'about', chips:['Mods list','Free download'], words:['about','website','site','owner','who made'],
      reply:function(){return 'Dream Mods offers modded Android games with easy guides. Free downloads use ads, and VIP gives instant, ad-free downloads. ' + a('index.html','Browse the latest mods') + '.';} },
    { id:'capabilities', chips:DEFAULT_CHIPS, words:['who are you','what are you','what can you do','help me','help'],
      reply:function(){return "I'm Dream Helper, the guide for this site. I can explain VIP plans and payment, show you where to download, help you get a free or VIP key, answer install and error questions, and point you to our team.";} }
  ];

  function norm(s){return s.toLowerCase().replace(/[^a-z0-9$ ]+/g,' ').replace(/\s+/g,' ').trim();}
  function lev(x,y){var m=x.length,n=y.length,i,j,d=[];for(i=0;i<=m;i++)d[i]=[i];for(j=0;j<=n;j++)d[0][j]=j;
    for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(x[i-1]===y[j-1]?0:1));return d[m][n];}
  function hits(text,kw){
    if(kw.indexOf(' ')>=0) return (' '+text+' ').indexOf(' '+kw+' ')>=0?1:0;
    return text.split(' ').some(function(t){return t===kw||(kw.length>=5&&Math.abs(t.length-kw.length)<=1&&lev(t,kw)<=1);})?1:0;
  }
  var lastId=null;
  function localAnswer(text){
    var t=norm(text);
    if(!t) return {html:'Type a question and I will do my best to help!',chips:DEFAULT_CHIPS};
    var best=null,bestScore=0;
    INTENTS.forEach(function(it){var s=0;it.words.forEach(function(w){s+=hits(t,w);});if(s>bestScore){bestScore=s;best=it;}});
    if(best){lastId=best.id;return {html:best.reply(),chips:best.chips||DEFAULT_CHIPS};}
    if(lastId&&t.split(' ').length<=3){var prev=INTENTS.filter(function(i){return i.id===lastId;})[0];if(prev)return {html:'Here is more on that:<br>'+prev.reply(),chips:prev.chips||DEFAULT_CHIPS};}
    return {html:FALLBACK,chips:DEFAULT_CHIPS};
  }
  var history=[];
  function fetchAI(text){
    var ctrl=new AbortController(),timer=setTimeout(function(){ctrl.abort();},15000);
    return fetch(AI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,page:location.pathname,history:history.slice(-8)}),signal:ctrl.signal})
      .then(function(r){if(!r.ok)throw new Error('bad');return r.json();})
      .then(function(d){clearTimeout(timer);if(d&&d.reply)return String(d.reply);throw new Error('empty');},function(e){clearTimeout(timer);throw e;});
  }

  var ICON_BOT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3h3V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2zm-3 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>';
  var ICON_SEND='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>';
  function el(tag,cls,html){var e=document.createElement(tag);e.className=cls;if(html!=null)e.innerHTML=html;return e;}

  function build(){
    var fab=el('button','dmb-fab',ICON_BOT+'<span>Ask Dream Helper</span>');
    fab.setAttribute('aria-label','Open Dream Helper chat');
    var panel=el('div','dmb-panel');
    panel.innerHTML='<div class="dmb-head"><div class="dmb-avatar">'+ICON_BOT+'</div><div class="dmb-title"><b>Dream Helper</b><small>Online, ready to help</small></div><button class="dmb-close" aria-label="Close chat">&times;</button></div>'+
      '<div class="dmb-body" id="dmbBody"></div><form class="dmb-form" id="dmbForm"><input id="dmbInput" type="text" placeholder="Ask about plans, mods, keys..." autocomplete="off" maxlength="300"><button type="submit" aria-label="Send">'+ICON_SEND+'</button></form>';
    document.body.appendChild(fab);document.body.appendChild(panel);
    var body=panel.querySelector('#dmbBody'),form=panel.querySelector('#dmbForm'),input=panel.querySelector('#dmbInput');
    var greeted=false,lastChips=null;
    function down(){body.scrollTop=body.scrollHeight;}
    function addBot(html){var row=el('div','dmb-row');row.appendChild(el('div','dmb-mini',ICON_BOT));row.appendChild(el('div','dmb-msg dmb-bot',html));body.appendChild(row);down();}
    function addUser(text){var row=el('div','dmb-row user');var m=el('div','dmb-msg dmb-user');m.textContent=text;row.appendChild(m);body.appendChild(row);down();}
    function removeChips(){if(lastChips){lastChips.remove();lastChips=null;}}
    function addChips(list){removeChips();var wrap=el('div','dmb-chips');list.forEach(function(c){var b=el('button','dmb-chip');b.type='button';b.textContent=c;b.onclick=function(){ask(c);};wrap.appendChild(b);});body.appendChild(wrap);lastChips=wrap;down();}
    function showTyping(){var row=el('div','dmb-row');row.appendChild(el('div','dmb-mini',ICON_BOT));row.appendChild(el('div','dmb-msg dmb-bot dmb-typing','<span></span><span></span><span></span>'));body.appendChild(row);down();return row;}
    function finish(typing,reply){typing.remove();addBot(reply.html);history.push({role:'assistant',content:reply.html});addChips(reply.chips||DEFAULT_CHIPS);}
    function ask(text){
      text=(text||'').trim();if(!text)return;
      addUser(text);history.push({role:'user',content:text});removeChips();
      var typing=showTyping(),local=localAnswer(text);
      if(AI_ENDPOINT){fetchAI(text).then(function(r){finish(typing,{html:esc(r),chips:DEFAULT_CHIPS});},function(){finish(typing,local);});}
      else{setTimeout(function(){finish(typing,local);},450);}
    }
    function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    fab.onclick=function(){var open=panel.classList.toggle('open');if(open){if(!greeted){greeted=true;addBot(GREETING);addChips(DEFAULT_CHIPS);}input.focus();}};
    panel.querySelector('.dmb-close').onclick=function(){panel.classList.remove('open');};
    form.addEventListener('submit',function(e){e.preventDefault();var t=input.value;input.value='';ask(t);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
