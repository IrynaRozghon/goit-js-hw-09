!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body"),n=null;function o(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.addEventListener("click",(function(){t.setAttribute("disabled",""),r.style.backgroundColor=o(),e.removeAttribute("disabled"),n=setInterval((function(){r.style.backgroundColor=o()}),1e3)})),e.addEventListener("click",(function(){clearInterval(n),t.removeAttribute("disabled"),e.setAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.99047954.js.map