/*! formstone v0.6.5 [tabs.js] 2015-06-12 | MIT License | formstone.it */

!function(a,b){"use strict";function c(b){var c="__"+t++;b.eventGuid=s.namespace+c,b.rawGuid=r.base+c,b.classGuid="."+b.rawGuid,b.mq="(max-width:"+(b.mobileMaxWidth===1/0?"100000px":b.mobileMaxWidth)+")",b.content=this.attr("href"),b.group=this.data(p+"-group"),b.tabClasses=[r.tab,b.rawGuid].join(" "),b.mobileTabClasses=[r.tab,r.tab_mobile,b.rawGuid].join(" "),b.contentClasses=[r.content,b.rawGuid].join(" "),b.$mobileTab=a('<button type="button" class="'+b.mobileTabClasses+'">'+this.text()+"</button>"),b.$content=a(b.content).addClass(b.contentClasses),b.$content.before(b.$mobileTab),this.attr("data-swap-target",b.content).attr("data-swap-group",b.group).addClass(b.tabClasses).on("activate.swap"+b.eventGuid,b,h).on("deactivate.swap"+b.eventGuid,b,i).on("enable.swap"+b.eventGuid,b,j).on("disable.swap"+b.eventGuid,b,k).swap({maxWidth:b.maxWidth,classes:{target:b.classGuid,enabled:q.enabled,active:q.active,raw:{target:b.rawGuid,enabled:r.enabled,active:r.active}},collapse:!1}),b.$mobileTab.touch({tap:!0}).on("tap"+b.eventGuid,b,l),a.mediaquery("bind",b.rawGuid,b.mq,{enter:function(){m.call(b.$el,b)},leave:function(){n.call(b.$el,b)}})}function d(b){a.mediaquery("unbind",b.rawGuid),b.$mobileTab.off(s.namespace).touch("destroy").remove(),b.$content.removeClass(r.content),this.removeAttr("data-swap-target").removeData("data-swap-target").removeAttr("data-swap-group").removeData("data-swap-group").removeClass(r.tab).off(s.namespace).swap("destroy")}function e(){this.swap("activate")}function f(){this.swap("enable")}function g(){this.swap("disable")}function h(a){if(!a.originalEvent){var b=a.data,c=0;b.$el.trigger(s.update,[c]),b.$mobileTab.addClass(r.active),b.$content.addClass(r.active)}}function i(a){if(!a.originalEvent){var b=a.data;b.$mobileTab.removeClass(r.active),b.$content.removeClass(r.active)}}function j(a){var b=a.data;b.$mobileTab.addClass(r.enabled),b.$content.addClass(r.enabled)}function k(a){var b=a.data;b.$mobileTab.removeClass(r.enabled),b.$content.removeClass(r.enabled)}function l(a){a.data.$el.swap("activate")}function m(a){a.$el.addClass(r.mobile),a.$mobileTab.addClass(r.mobile)}function n(a){a.$el.removeClass(r.mobile),a.$mobileTab.removeClass(r.mobile)}var o=b.Plugin("tabs",{widget:!0,defaults:{customClass:"",maxWidth:1/0,mobileMaxWidth:"740px",vertical:!1},classes:["tab","tab_mobile","mobile","content","enabled","active"],events:{tap:"tap",update:"update"},methods:{_construct:c,_destruct:d,activate:e,enable:f,disable:g}}),p=o.namespace,q=o.classes,r=q.raw,s=o.events,t=(o.functions,0)}(jQuery,Formstone);