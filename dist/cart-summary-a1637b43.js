(window.webpackJsonpCheckout=window.webpackJsonpCheckout||[]).push([[5],{1586:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a(0),c=a.n(n);var i=a(426),s=function(e){var t=e.children;return c.a.createElement("header",{className:"cart-header"},c.a.createElement("h3",{className:"cart-title optimizedCheckout-headingSecondary"},c.a.createElement(i.a,{id:"cart.cart_heading"})),t)},l=a(1488),o=a(1486),u=a(1489),d=a(1487);t.default=function(e){var t=e.storeCurrency,a=e.shopperCurrency,i=e.headerLink,m=e.additionalLineItems,h=e.lineItems,p=e.total,f=Object(r.__rest)(e,["storeCurrency","shopperCurrency","headerLink","additionalLineItems","lineItems","total"]),_=Object(n.useMemo)((function(){return function(e){return Object(r.__assign)(Object(r.__assign)({},e),{physicalItems:e.physicalItems.filter((function(e){return"string"!=typeof e.parentId})),digitalItems:e.digitalItems.filter((function(e){return"string"!=typeof e.parentId}))})}(h)}),[h]);return c.a.createElement("article",{className:"cart optimizedCheckout-orderSummary","data-test":"cart"},c.a.createElement(s,null,i),c.a.createElement(o.a,null,c.a.createElement(l.a,{items:_})),c.a.createElement(o.a,null,c.a.createElement(u.a,Object(r.__assign)({},f)),m),c.a.createElement(o.a,null,c.a.createElement(d.a,{orderAmount:p,shopperCurrencyCode:a.code,storeCurrencyCode:t.code})))}},1632:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a(0),c=a.n(n),i=a(425),s=a(1586),l=a(1579),o=a(1589),u=a(1578);t.default=Object(i.a)(l.a)((function(e){var t=e.cartUrl,a=Object(r.__rest)(e,["cartUrl"]);return Object(o.a)(s.default)(Object(r.__assign)(Object(r.__assign)({},a),{cartUrl:t,headerLink:c.a.createElement(u.a,{url:t})}))}))}}]);
//# sourceMappingURL=cart-summary-a1637b43.js.map