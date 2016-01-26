!function(e,t){"use strict";function n(e,t){for(var n,i=[],a=0;a<e.length;++a){if(n=o[e[a]]||r(e[a]),!n)throw"module definition dependecy not found: "+e[a];i.push(n)}t.apply(null,i)}function i(e,i,r){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(i===t)throw"invalid module definition, dependencies must be specified";if(r===t)throw"invalid module definition, definition function must be specified";n(i,function(){o[e]=r.apply(null,arguments)})}function r(t){for(var n=e,i=t.split(/[.\/]/),r=0;r<i.length;++r){if(!n[i[r]])return;n=n[i[r]]}return n}function a(n){var i,r,a,s,l;for(i=0;i<n.length;i++){r=e,a=n[i],s=a.split(/[.\/]/);for(var u=0;u<s.length-1;++u)r[s[u]]===t&&(r[s[u]]={}),r=r[s[u]];r[s[s.length-1]]=o[a]}if(e.AMDLC_TESTS){l=e.privateModules||{};for(a in o)l[a]=o[a];for(i=0;i<n.length;i++)delete l[n[i]];e.privateModules=l}}var o={};i("tinymce/pasteplugin/Utils",["tinymce/util/Tools","tinymce/html/DomParser","tinymce/html/Schema"],function(e,t,n){function i(t,n){return e.each(n,function(e){t=e.constructor==RegExp?t.replace(e,""):t.replace(e[0],e[1])}),t}function r(r){function a(e){var t=e.name,n=e;if("br"===t)return void(l+="\n");if(u[t]&&(l+=" "),c[t])return void(l+=" ");if(3==e.type&&(l+=e.value),!e.shortEnded&&(e=e.firstChild))do a(e);while(e=e.next);d[t]&&n.next&&(l+="\n","p"==t&&(l+="\n"))}var o=new n,s=new t({},o),l="",u=o.getShortEndedElements(),c=e.makeMap("script noscript style textarea video audio iframe object"," "),d=o.getBlockElements();return r=i(r,[/<!\[[^\]]+\]>/g]),a(s.parse(r)),l}function a(e){function t(e,t,n){return t||n?" ":" "}return e=i(e,[/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/g,/<!--StartFragment-->|<!--EndFragment-->/g,[/( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,t],/<br class="Apple-interchange-newline">/g,/<br>$/i])}return{filter:i,innerText:r,trimHtml:a}}),i("tinymce/pasteplugin/Clipboard",["tinymce/Env","tinymce/dom/RangeUtils","tinymce/util/VK","tinymce/pasteplugin/Utils","tinymce/util/Delay"],function(e,t,n,i,r){return function(a){function o(e){var t,n=a.dom;if(t=a.fire("BeforePastePreProcess",{content:e}),t=a.fire("PastePreProcess",t),e=t.content,!t.isDefaultPrevented()){if(a.hasEventListeners("PastePostProcess")&&!t.isDefaultPrevented()){var i=n.add(a.getBody(),"div",{style:"display:none"},e);t=a.fire("PastePostProcess",{node:i}),n.remove(i),e=t.node.innerHTML}t.isDefaultPrevented()||a.insertContent(e,{merge:a.settings.paste_merge_formats!==!1,data:{paste:!0}})}}function s(e){e=a.dom.encode(e).replace(/\r\n/g,"\n");var t,n=a.dom.getParent(a.selection.getStart(),a.dom.isBlock),r=a.settings.forced_root_block;r&&(t=a.dom.createHTML(r,a.settings.forced_root_block_attrs),t=t.substr(0,t.length-3)+">"),n&&/^(PRE|DIV)$/.test(n.nodeName)||!r?e=i.filter(e,[[/\n/g,"<br>"]]):(e=i.filter(e,[[/\n\n/g,"</p>"+t],[/^(.*<\/p>)(<p>)$/,t+"$1"],[/\n/g,"<br />"]]),-1!=e.indexOf("<p>")&&(e=t+e)),o(e)}function l(){function t(e){var t,n,r,a=e.startContainer;if(t=e.getClientRects(),t.length)return t[0];if(e.collapsed&&1==a.nodeType){for(r=a.childNodes[_.startOffset];r&&3==r.nodeType&&!r.data.length;)r=r.nextSibling;if(r)return"BR"==r.tagName&&(n=i.doc.createTextNode("\ufeff"),r.parentNode.insertBefore(n,r),e=i.createRng(),e.setStartBefore(n),e.setEndAfter(n),t=e.getClientRects(),i.remove(n)),t.length?t[0]:void 0}}var n,i=a.dom,r=a.getBody(),o=a.dom.getViewPort(a.getWin()),s=o.y,l=20;if(_=a.selection.getRng(),a.inline&&(n=a.selection.getScrollContainer(),n&&n.scrollTop>0&&(s=n.scrollTop)),_.getClientRects){var u=t(_);if(u)l=s+(u.top-i.getPos(r).y);else{l=s;var c=_.startContainer;c&&(3==c.nodeType&&c.parentNode!=r&&(c=c.parentNode),1==c.nodeType&&(l=i.getPos(c,n||r).y))}}x=i.add(a.getBody(),"div",{id:"mcepastebin",contentEditable:!0,"data-mce-bogus":"all",style:"position: absolute; top: "+l+"px;width: 10px; height: 10px; overflow: hidden; opacity: 0"},T),(e.ie||e.gecko)&&i.setStyle(x,"left","rtl"==i.getStyle(r,"direction",!0)?65535:-65535),i.bind(x,"beforedeactivate focusin focusout",function(e){e.stopPropagation()}),x.focus(),a.selection.select(x,!0)}function u(){if(x){for(var e;e=a.dom.get("mcepastebin");)a.dom.remove(e),a.dom.unbind(e);_&&a.selection.setRng(_)}x=_=null}function c(){var e,t,n,i,r="";for(e=a.dom.select("div[id=mcepastebin]"),t=0;t<e.length;t++)n=e[t],n.firstChild&&"mcepastebin"==n.firstChild.id&&(n=n.firstChild),i=n.innerHTML,r!=T&&(r+=i);return r}function d(e){var t,n,i,r;for(i=[25942,29554,28521,14958],t=0;t<i.length;t++)if(e.charCodeAt(t)!=i[t])return e;for(n="",t=0;t<e.length;t++)r=e.charCodeAt(t),n+=String.fromCharCode(255&r),n+=String.fromCharCode((65280&r)>>8);return decodeURIComponent(escape(n))}function f(e){var t,n,i;return n="<!--StartFragment-->",t=e.indexOf(n),-1!==t&&(e=e.substr(t+n.length)),i="<!--EndFragment-->",t=e.indexOf(i),-1!==t&&(e=e.substr(0,t)),e}function p(e){var t={};if(e){if(e.getData){var n=e.getData("Text");n&&n.length>0&&-1==n.indexOf(F)&&(t["text/plain"]=n)}if(e.types)for(var i=0;i<e.types.length;i++){var r=e.types[i],a=e.getData(r);"text/html"==r&&(a=f(d(a))),t[r]=a}}return t}function m(e){return p(e.clipboardData||a.getDoc().dataTransfer)}function g(e,t){function n(n){function i(e){t&&(a.selection.setRng(t),t=null),o('<img src="'+e.result+'">')}var r,s,l,u=!1;if(n)for(r=0;r<n.length;r++)s=n[r],/^image\/(jpeg|png|gif|bmp)$/.test(s.type)&&(l=new FileReader,l.onload=i.bind(null,l),l.readAsDataURL(s.getAsFile?s.getAsFile():s),e.preventDefault(),u=!0);return u}var i=e.clipboardData||e.dataTransfer;return a.settings.paste_data_images&&i?n(i.items)||n(i.files):void 0}function v(e){var t=e.clipboardData;return-1!=navigator.userAgent.indexOf("Android")&&t&&t.items&&0===t.items.length}function h(e){return t.getCaretRangeFromPoint(e.clientX,e.clientY,a.getDoc())}function y(e,t){return t in e&&e[t].length>0}function b(e){return n.metaKeyPressed(e)&&86==e.keyCode||e.shiftKey&&45==e.keyCode}function w(){function t(e,t,n){var r;return y(e,"text/html")?r=e["text/html"]:(r=c(),r==T&&(n=!0)),r=i.trimHtml(r),x&&x.firstChild&&"mcepastebin"===x.firstChild.id&&(n=!0),u(),r.length||(n=!0),n&&(r=y(e,"text/plain")&&-1==r.indexOf("</p>")?e["text/plain"]:i.innerText(r)),r==T?void(t||a.windowManager.alert("Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents.")):void(n?s(r):o(r))}a.on("keydown",function(t){function n(e){b(e)&&!e.isDefaultPrevented()&&u()}if(b(t)&&!t.isDefaultPrevented()){if(C=t.shiftKey&&86==t.keyCode,C&&e.webkit&&-1!=navigator.userAgent.indexOf("Version/"))return;if(t.stopImmediatePropagation(),k=(new Date).getTime(),e.ie&&C)return t.preventDefault(),void a.fire("paste",{ieFake:!0});u(),l(),a.once("keyup",n),a.once("paste",function(){a.off("keyup",n)})}}),a.on("paste",function(n){var i=(new Date).getTime(),o=m(n),s=(new Date).getTime()-i,d=(new Date).getTime()-k-s<1e3,f="text"==P.pasteFormat||C;return C=!1,n.isDefaultPrevented()||v(n)?void u():g(n)?void u():(d||n.preventDefault(),!e.ie||d&&!n.ieFake||(l(),a.dom.bind(x,"paste",function(e){e.stopPropagation()}),a.getDoc().execCommand("Paste",!1,null),o["text/html"]=c()),void(y(o,"text/html")?(n.preventDefault(),t(o,d,f)):r.setEditorTimeout(a,function(){t(o,d,f)},0)))}),a.on("dragstart dragend",function(e){D="dragstart"==e.type}),a.on("drop",function(e){var t=h(e);if(!e.isDefaultPrevented()&&!D&&!g(e,t)&&t&&a.settings.paste_filter_drop!==!1){var n=p(e.dataTransfer),r=n["mce-internal"]||n["text/html"]||n["text/plain"];r&&(e.preventDefault(),a.undoManager.transact(function(){n["mce-internal"]&&a.execCommand("Delete"),a.selection.setRng(t),r=i.trimHtml(r),n["text/html"]?o(r):s(r)}))}}),a.on("dragover dragend",function(e){a.settings.paste_data_images&&e.preventDefault()})}var x,_,C,P=this,k=0,D=!1,T="%MCEPASTEBIN%",F="data:text/mce-internal,";P.pasteHtml=o,P.pasteText=s,a.on("preInit",function(){w(),a.parser.addNodeFilter("img",function(t,n,i){function r(e){return e.data&&e.data.paste===!0}function o(t){t.attr("data-mce-object")||c===e.transparentSrc||t.remove()}function s(e){return 0===e.indexOf("webkit-fake-url")}function l(e){return 0===e.indexOf("data:")}if(!a.settings.paste_data_images&&r(i))for(var u=t.length;u--;){var c=t[u].attributes.map.src;c&&(s(c)?o(t[u]):!a.settings.allow_html_data_urls&&l(c)&&o(t[u]))}})})}}),i("tinymce/pasteplugin/WordFilter",["tinymce/util/Tools","tinymce/html/DomParser","tinymce/html/Schema","tinymce/html/Serializer","tinymce/html/Node","tinymce/pasteplugin/Utils"],function(e,t,n,i,r,a){function o(e){return/<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(e)||/class="OutlineElement/.test(e)||/id="?docs\-internal\-guid\-/.test(e)}function s(t){var n,i;return i=[/^[IVXLMCD]{1,2}\.[ \u00a0]/,/^[ivxlmcd]{1,2}\.[ \u00a0]/,/^[a-z]{1,2}[\.\)][ \u00a0]/,/^[A-Z]{1,2}[\.\)][ \u00a0]/,/^[0-9]+\.[ \u00a0]/,/^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,/^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/],t=t.replace(/^[\u00a0 ]+/,""),e.each(i,function(e){return e.test(t)?(n=!0,!1):void 0}),n}function l(e){return/^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(e)}function u(u){var c=u.settings;u.on("BeforePastePreProcess",function(d){function f(e){function t(e){var n="";if(3===e.type)return e.value;if(e=e.firstChild)do n+=t(e);while(e=e.next);return n}function n(e,t){if(3===e.type&&t.test(e.value))return e.value=e.value.replace(t,""),!1;if(e=e.firstChild)do if(!n(e,t))return!1;while(e=e.next);return!0}function i(e){if(e._listIgnore)return void e.remove();if(e=e.firstChild)do i(e);while(e=e.next)}function a(e,t,a){var s=e._listLevel||c;s!=c&&(c>s?o&&(o=o.parent.parent):(u=o,o=null)),o&&o.name==t?o.append(e):(u=u||o,o=new r(t,1),a>1&&o.attr("start",""+a),e.wrap(o)),e.name="li",s>c&&u&&u.lastChild.append(o),c=s,i(e),n(e,/^\u00a0+/),n(e,/^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/),n(e,/^\u00a0+/)}for(var o,u,c=1,d=[],f=e.firstChild;"undefined"!=typeof f&&null!==f;)if(d.push(f),f=f.walk(),null!==f)for(;"undefined"!=typeof f&&f.parent!==e;)f=f.walk();for(var p=0;p<d.length;p++)if(e=d[p],"p"==e.name&&e.firstChild){var m=t(e);if(l(m)){a(e,"ul");continue}if(s(m)){var g=/([0-9]+)\./.exec(m),v=1;g&&(v=parseInt(g[1],10)),a(e,"ol",v);continue}if(e._listLevel){a(e,"ul",1);continue}o=null}else u=o,o=null}function p(t,n){var i,a={},o=u.dom.parseStyle(n);return e.each(o,function(e,r){switch(r){case"mso-list":i=/\w+ \w+([0-9]+)/i.exec(n),i&&(t._listLevel=parseInt(i[1],10)),/Ignore/i.test(e)&&t.firstChild&&(t._listIgnore=!0,t.firstChild._listIgnore=!0);break;case"horiz-align":r="text-align";break;case"vert-align":r="vertical-align";break;case"font-color":case"mso-foreground":r="color";break;case"mso-background":case"mso-highlight":r="background";break;case"font-weight":case"font-style":return void("normal"!=e&&(a[r]=e));case"mso-element":if(/^(comment|comment-list)$/i.test(e))return void t.remove()}return 0===r.indexOf("mso-comment")?void t.remove():void(0!==r.indexOf("mso-")&&("all"==m||g&&g[r])&&(a[r]=e))}),/(bold)/i.test(a["font-weight"])&&(delete a["font-weight"],t.wrap(new r("b",1))),/(italic)/i.test(a["font-style"])&&(delete a["font-style"],t.wrap(new r("i",1))),a=u.dom.serializeStyle(a,t.name),a?a:null}var m,g,v=d.content;if(v=v.replace(/<b[^>]+id="?docs-internal-[^>]*>/gi,""),v=v.replace(/<br class="?Apple-interchange-newline"?>/gi,""),m=c.paste_retain_style_properties,m&&(g=e.makeMap(m.split(/[, ]/))),c.paste_enable_default_filters!==!1&&o(d.content)){d.wordContent=!0,v=a.filter(v,[/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi," "],[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(e,t){return t.length>0?t.replace(/./," ").slice(Math.floor(t.length/2)).split("").join(" "):""}]]);var h=c.paste_word_valid_elements;h||(h="-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody");var y=new n({valid_elements:h,valid_children:"-li[p]"});e.each(y.elements,function(e){e.attributes["class"]||(e.attributes["class"]={},e.attributesOrder.push("class")),e.attributes.style||(e.attributes.style={},e.attributesOrder.push("style"))});var b=new t({},y);b.addAttributeFilter("style",function(e){for(var t,n=e.length;n--;)t=e[n],t.attr("style",p(t,t.attr("style"))),"span"==t.name&&t.parent&&!t.attributes.length&&t.unwrap()}),b.addAttributeFilter("class",function(e){for(var t,n,i=e.length;i--;)t=e[i],n=t.attr("class"),/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(n)&&t.remove(),t.attr("class",null)}),b.addNodeFilter("del",function(e){for(var t=e.length;t--;)e[t].remove()}),b.addNodeFilter("a",function(e){for(var t,n,i,r=e.length;r--;)if(t=e[r],n=t.attr("href"),i=t.attr("name"),n&&-1!=n.indexOf("#_msocom_"))t.remove();else if(n&&0===n.indexOf("file://")&&(n=n.split("#")[1],n&&(n="#"+n)),n||i){if(i&&!/^_?(?:toc|edn|ftn)/i.test(i)){t.unwrap();continue}t.attr({href:n,name:i})}else t.unwrap()});var w=b.parse(v);c.paste_convert_word_fake_lists!==!1&&f(w),d.content=new i({validate:c.validate},y).serialize(w)}})}return u.isWordContent=o,u}),i("tinymce/pasteplugin/Quirks",["tinymce/Env","tinymce/util/Tools","tinymce/pasteplugin/WordFilter","tinymce/pasteplugin/Utils"],function(e,t,n,i){return function(r){function a(e){r.on("BeforePastePreProcess",function(t){t.content=e(t.content)})}function o(e){if(!n.isWordContent(e))return e;var a=[];t.each(r.schema.getBlockElements(),function(e,t){a.push(t)});var o=new RegExp("(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?("+a.join("|")+")[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*","g");return e=i.filter(e,[[o,"$1"]]),e=i.filter(e,[[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]])}function s(e){if(n.isWordContent(e))return e;var t=r.settings.paste_webkit_styles;if(r.settings.paste_remove_styles_if_webkit===!1||"all"==t)return e;if(t&&(t=t.split(/[, ]/)),t){var i=r.dom,a=r.selection.getNode();e=e.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,function(e,n,r,o){var s=i.parseStyle(r,"span"),l={};if("none"===t)return n+o;for(var u=0;u<t.length;u++){var c=s[t[u]],d=i.getStyle(a,t[u],!0);/color/.test(t[u])&&(c=i.toHex(c),d=i.toHex(d)),d!=c&&(l[t[u]]=c)}return l=i.serializeStyle(l,"span"),l?n+' style="'+l+'"'+o:n+o})}else e=e.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,"$1$3");return e=e.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi,function(e,t,n,i){return t+' style="'+n+'"'+i})}e.webkit&&a(s),e.ie&&a(o)}}),i("tinymce/pasteplugin/Plugin",["tinymce/PluginManager","tinymce/pasteplugin/Clipboard","tinymce/pasteplugin/WordFilter","tinymce/pasteplugin/Quirks"],function(e,t,n,i){var r;e.add("paste",function(e){function a(){if("text"==o.pasteFormat)this.active(!1),o.pasteFormat="html";else if(o.pasteFormat="text",this.active(!0),!r){var t=e.translate("Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.");e.notificationManager.open({text:t,type:"info"}),r=!0}}var o,s=this,l=e.settings;s.clipboard=o=new t(e),s.quirks=new i(e),s.wordFilter=new n(e),e.settings.paste_as_text&&(s.clipboard.pasteFormat="text"),l.paste_preprocess&&e.on("PastePreProcess",function(e){l.paste_preprocess.call(s,s,e)}),l.paste_postprocess&&e.on("PastePostProcess",function(e){l.paste_postprocess.call(s,s,e)}),e.addCommand("mceInsertClipboardContent",function(e,t){t.content&&s.clipboard.pasteHtml(t.content),t.text&&s.clipboard.pasteText(t.text)}),e.paste_block_drop&&e.on("dragend dragover draggesture dragdrop drop drag",function(e){e.preventDefault(),e.stopPropagation()}),e.settings.paste_data_images||e.on("drop",function(e){var t=e.dataTransfer;t&&t.files&&t.files.length>0&&e.preventDefault()}),e.addButton("pastetext",{icon:"pastetext",tooltip:"Paste as text",onclick:a,active:"text"==s.clipboard.pasteFormat}),e.addMenuItem("pastetext",{text:"Paste as text",selectable:!0,active:o.pasteFormat,onclick:a})})}),a(["tinymce/pasteplugin/Utils"])}(this);