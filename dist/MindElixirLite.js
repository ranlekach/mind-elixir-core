(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".map-container{--gap: 30px;--root-radius: 30px;--main-radius: 20px;--root-color: #ffffff;--root-bgcolor: #4c4f69;--root-border-color: rgba(0, 0, 0, 0);--main-color: #444446;--main-bgcolor: #ffffff;--topic-padding: 3px;--color: #777777;--bgcolor: #f6f6f6;--selected: #4dc4ff;--panel-color: #444446;--panel-bgcolor: #ffffff;--panel-border-color: #eaeaea;-webkit-tap-highlight-color:rgba(0,0,0,0);font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;-webkit-user-select:none;user-select:none;height:100%;width:100%;overflow:scroll;font-size:15px}.map-container *{box-sizing:border-box}.map-container::-webkit-scrollbar{width:0px;height:0px}.map-container .selected{outline:2px solid var(--selected);outline-offset:1px}.map-container .hyper-link{text-decoration:none;margin-left:.3em}.map-container .lhs{direction:rtl}.map-container .lhs me-tpc{direction:ltr}.map-container .map-canvas{height:20000px;width:20000px;position:relative;-webkit-user-select:none;user-select:none;transition:transform .3s;transform:scale(1);background-color:var(--bgcolor)}.map-container .map-canvas me-nodes{position:absolute;display:flex;justify-content:center;align-items:center;height:fit-content;width:fit-content}.map-container .map-canvas me-root{position:relative}.map-container .map-canvas me-root me-tpc{display:block;font-size:25px;color:var(--root-color);padding:10px var(--gap);border-radius:var(--root-radius);border:var(--root-border-color) 2px solid;white-space:pre-wrap;background-color:var(--root-bgcolor)}.map-container me-main>me-wrapper{position:relative;margin:45px 65px}.map-container me-main>me-wrapper>me-parent{margin:10px;padding:0}.map-container me-main>me-wrapper>me-parent>me-tpc{border-radius:var(--main-radius);background-color:var(--main-bgcolor);border:2px solid var(--main-color);color:var(--main-color);padding:8px 25px}.map-container me-wrapper{display:block;pointer-events:none;width:fit-content}.map-container me-children,.map-container me-parent{display:inline-block;vertical-align:middle}.map-container me-parent{position:relative;cursor:pointer;padding:6px var(--gap);margin-top:10px}.map-container me-parent me-tpc{position:relative;display:block;border-radius:3px;color:var(--color);pointer-events:all;max-width:35em;white-space:pre-wrap;padding:var(--topic-padding)}.map-container me-parent me-tpc .insert-preview{position:absolute;width:100%;left:0;z-index:9}.map-container me-parent me-tpc .show{background:#7ad5ff;pointer-events:none;opacity:.7}.map-container me-parent me-tpc .before{height:14px;top:-14px}.map-container me-parent me-tpc .in{height:100%;top:0}.map-container me-parent me-tpc .after{height:14px;bottom:-14px}.map-container me-parent me-epd{position:absolute;height:18px;width:18px;opacity:.8;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHQ9IjE2NTY2NTQ3MTcyNDIiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiDQogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+DQogICAgPHBhdGggZD0iTTUxMiA3NC42NjY2NjdDMjcwLjkzMzMzMyA3NC42NjY2NjcgNzQuNjY2NjY3IDI3MC45MzMzMzMgNzQuNjY2NjY3IDUxMlMyNzAuOTMzMzMzIDk0OS4zMzMzMzMgNTEyIDk0OS4zMzMzMzMgOTQ5LjMzMzMzMyA3NTMuMDY2NjY3IDk0OS4zMzMzMzMgNTEyIDc1My4wNjY2NjcgNzQuNjY2NjY3IDUxMiA3NC42NjY2Njd6IiBzdHJva2Utd2lkdGg9IjU0IiBzdHJva2U9J2JsYWNrJyBmaWxsPSd3aGl0ZScgPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNjgyLjY2NjY2NyA0ODBoLTEzOC42NjY2NjdWMzQxLjMzMzMzM2MwLTE3LjA2NjY2Ny0xNC45MzMzMzMtMzItMzItMzJzLTMyIDE0LjkzMzMzMy0zMiAzMnYxMzguNjY2NjY3SDM0MS4zMzMzMzNjLTE3LjA2NjY2NyAwLTMyIDE0LjkzMzMzMy0zMiAzMnMxNC45MzMzMzMgMzIgMzIgMzJoMTM4LjY2NjY2N1Y2ODIuNjY2NjY3YzAgMTcuMDY2NjY3IDE0LjkzMzMzMyAzMiAzMiAzMnMzMi0xNC45MzMzMzMgMzItMzJ2LTEzOC42NjY2NjdINjgyLjY2NjY2N2MxNy4wNjY2NjcgMCAzMi0xNC45MzMzMzMgMzItMzJzLTE0LjkzMzMzMy0zMi0zMi0zMnoiPjwvcGF0aD4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain;background-position:center;pointer-events:all;z-index:9}.map-container me-parent me-epd.minus{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHQ9IjE2NTY2NTU1NjQ5ODUiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiDQogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+DQogICAgPHBhdGggZD0iTTUxMiA3NC42NjY2NjdDMjcwLjkzMzMzMyA3NC42NjY2NjcgNzQuNjY2NjY3IDI3MC45MzMzMzMgNzQuNjY2NjY3IDUxMlMyNzAuOTMzMzMzIDk0OS4zMzMzMzMgNTEyIDk0OS4zMzMzMzMgOTQ5LjMzMzMzMyA3NTMuMDY2NjY3IDk0OS4zMzMzMzMgNTEyIDc1My4wNjY2NjcgNzQuNjY2NjY3IDUxMiA3NC42NjY2Njd6IiBzdHJva2Utd2lkdGg9IjU0IiBzdHJva2U9J2JsYWNrJyBmaWxsPSd3aGl0ZScgPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNjgyLjY2NjY2NyA1NDRIMzQxLjMzMzMzM2MtMTcuMDY2NjY3IDAtMzItMTQuOTMzMzMzLTMyLTMyczE0LjkzMzMzMy0zMiAzMi0zMmgzNDEuMzMzMzM0YzE3LjA2NjY2NyAwIDMyIDE0LjkzMzMzMyAzMiAzMnMtMTQuOTMzMzMzIDMyLTMyIDMyeiI+PC9wYXRoPg0KPC9zdmc+)!important;transition:opacity .3s;opacity:0}.map-container me-parent me-epd.minus:hover{opacity:.8}.map-container .icon{width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden}.map-container .lines,.map-container .summary,.map-container .subLines,.map-container .topiclinks,.map-container .linkcontroller{position:absolute;height:102%;width:100%;top:0;left:0}.map-container .topiclinks,.map-container .linkcontroller,.map-container .summary{pointer-events:none}.map-container .topiclinks text,.map-container .linkcontroller text,.map-container .summary text{pointer-events:all}.map-container .topiclinks .selected,.map-container .linkcontroller .selected,.map-container .summary .selected{pointer-events:none}.map-container .lines,.map-container .subLines{pointer-events:none;z-index:-1}.map-container .topiclinks *,.map-container .linkcontroller *{z-index:100}.map-container .topiclinks g{cursor:pointer}.map-container #input-box{position:absolute;top:0;left:0;width:max-content;max-width:35em;z-index:11;direction:ltr;-webkit-user-select:auto;user-select:auto;pointer-events:auto;background-color:var(--bgcolor)}.map-container me-tpc>*{pointer-events:none}.map-container me-tpc>a,.map-container me-tpc>iframe{pointer-events:auto}.map-container me-tpc>img{display:block;margin-bottom:8px;object-fit:cover}.map-container me-tpc>.text{display:inline-block}.map-container .circle{position:absolute;height:10px;width:10px;margin-top:-5px;margin-left:-5px;border-radius:100%;background:#757575;border:2px solid #ffffff;cursor:pointer}.map-container .tags{direction:ltr}.map-container .tags span{display:inline-block;border-radius:3px;padding:2px 4px;background:#d6f0f8;color:#276f86;margin:2px 4px 0 0;font-size:12px;line-height:1.3em}.map-container .icons{display:inline-block;direction:ltr;margin-left:5px}.map-container .icons span{display:inline-block;line-height:1.3em}.map-container .mind-elixir-ghost{position:fixed;top:-100%;left:-100%;box-sizing:content-box;opacity:.5;background-color:var(--main-bgcolor);border:2px solid var(--main-color);color:var(--main-color);max-width:200px;width:fit-content;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:8px 16px;border-radius:6px}.map-container .selection-area{background:#4f90f22d;border:1px solid #4f90f2}.map-container .context-menu{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99}.map-container .context-menu .menu-list{position:fixed;list-style:none;margin:0;padding:0;color:var(--panel-color);box-shadow:0 12px 15px #0003;border-radius:5px;overflow:hidden}.map-container .context-menu .menu-list li{min-width:200px;overflow:hidden;white-space:nowrap;padding:6px 10px;background:var(--panel-bgcolor);border-bottom:1px solid var(--panel-border-color);cursor:pointer}.map-container .context-menu .menu-list li span{line-height:20px}.map-container .context-menu .menu-list li a{color:#333;text-decoration:none}.map-container .context-menu .menu-list li.disabled{display:none}.map-container .context-menu .menu-list li:hover{filter:brightness(.95)}.map-container .context-menu .menu-list li:last-child{border-bottom:0}.map-container .context-menu .menu-list li span:last-child{float:right}.map-container .context-menu .key{font-size:10px;background-color:#f1f1f1;color:#333;padding:2px 5px;border-radius:3px}.map-container .tips{position:absolute;bottom:20px;left:50%;transform:translate(-50%);color:var(--panel-color);font-weight:bolder}.mind-elixir-toolbar{font-family:iconfont;position:absolute;color:var(--panel-color);background:var(--panel-bgcolor);padding:10px;border-radius:5px;box-shadow:0 1px 2px #0003}.mind-elixir-toolbar svg{display:inline-block}.mind-elixir-toolbar span:active{opacity:.5}.mind-elixir-toolbar.rb{right:20px;bottom:20px}.mind-elixir-toolbar.rb span+span{margin-left:10px}.mind-elixir-toolbar.lt{font-size:20px;left:20px;top:20px}.mind-elixir-toolbar.lt span{display:block}.mind-elixir-toolbar.lt span+span{margin-top:10px}")),document.head.appendChild(e)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})();
(function(e) {
  var t, n, o, s, i, r, l = '<svg><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M423.765333 128a42.666667 42.666667 0 0 1 3.2 85.205333L423.765333 213.333333H234.666667a64 64 0 0 0-63.872 60.245334L170.666667 277.333333v512a64 64 0 0 0 60.245333 63.872L234.666667 853.333333h512a64 64 0 0 0 63.872-60.245333L810.666667 789.333333v-189.098666a42.666667 42.666667 0 0 1 85.205333-3.2l0.128 3.2V789.333333a149.333333 149.333333 0 0 1-144.213333 149.248L746.666667 938.666667h-512a149.333333 149.333333 0 0 1-149.248-144.213334L85.333333 789.333333v-512a149.333333 149.333333 0 0 1 144.213334-149.248L234.666667 128h189.098666z m324.949334-53.248a42.666667 42.666667 0 0 1 60.330666 0l150.869334 150.869333a42.666667 42.666667 0 0 1 0 60.330667l-329.386667 329.386667a42.666667 42.666667 0 0 1-29.44 12.458666l-153.386667 2.517334a42.666667 42.666667 0 0 1-43.349333-43.349334l2.56-153.386666a42.666667 42.666667 0 0 1 12.458667-29.44z m30.165333 90.496L491.946667 452.266667l-1.493334 91.989333 92.032-1.493333 286.976-286.976-90.538666-90.538667z"  ></path></symbol><symbol id="icon-rising" viewBox="0 0 1024 1024"><path d="M553.173333 803.84h-64l0.021334-474.581333-224.021334 224-45.269333-45.226667L521.6 206.293333l301.717333 301.696-45.269333 45.269334-224.853333-224.896v475.477333z"  ></path></symbol><symbol id="icon-falling" viewBox="0 0 1024 1024"><path d="M553.173333 238.314667h-64l0.021334 474.602666-224.021334-224-45.269333 45.226667L521.6 835.861333l301.717333-301.717333-45.269333-45.226667-224.853333 224.853334V238.336z"  ></path></symbol><symbol id="icon-shanchu2" viewBox="0 0 1024 1024"><path d="M516.60601807 107.93026734c-82.64382935 0-149.71865844 65.51751709-152.5729065 147.77160644H171.37136841c-21.40603638 0-38.92044068 17.38504028-38.92044068 38.92126465 0 21.40686036 17.38504028 38.92208862 38.92126466 38.92208862h42.94308471v435.40136719c0 81.73498536 55.39828492 148.55026245 123.90106201 148.55026245h348.99444581c68.37341309 0 123.90106201-66.42553711 123.901062-148.55026245V333.80477906h38.92126465c21.40686036 0 38.92126464-17.38586426 38.92126465-38.92208863 0-21.40686036-17.38504028-38.92126464-38.92126465-38.92126465H668.91854859C666.45321656 173.44860839 599.24902344 107.93109131 516.60601807 107.93109131z m-79.65939331 147.77160644c2.85424805-42.16442872 37.2354126-74.85809326 79.78875732-74.85809326s76.93450927 32.82302857 79.39984131 74.85809326H436.94662476z m-98.86047364 589.01165771c-24.2611084 0-50.98754883-31.13717651-50.98754883-75.76693725V333.80477906h450.97036744V769.33551026c0 44.50039673-26.72644043 75.76776123-50.98754884 75.76776122H338.08615112v-0.38973999z m0 0"  ></path><path d="M390.37063599 751.17263794c17.77313232 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.77478027 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.27124023 40.08883667 32.43493653 40.08883667z m117.41308594 0c17.7739563 0 32.43411255-17.7739563 32.43411255-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43411255-40.08966065-17.7739563 0-32.43493653 17.77478027-32.43493653 40.08966065v228.72875976c0 22.18469239 14.66098023 40.08883667 32.43493653 40.08883667z m123.51049804 0c17.7739563 0 32.43493653-17.7739563 32.43493652-40.08883667V482.35504151c0-22.31488037-14.53079224-40.08966065-32.43493652-40.08966065-17.7739563 0-32.43411255 17.77478027-32.43411255 40.08966065v228.72875976c0 22.18469239 14.14105224 40.08883667 32.43411255 40.08883667z m0 0"  ></path></symbol><symbol id="icon-zijiedian" viewBox="0 0 1024 1024"><path d="M312.208 472c19.568-157.856 153.432-280 315.656-280 175.68 0 318.112 143.272 318.112 320S803.552 832 627.864 832c-162.224 0-296.08-122.144-315.656-280H120a40 40 0 0 1 0-80h192.208zM632 752c132.552 0 240-107.448 240-240 0-132.552-107.448-240-240-240-132.552 0-240 107.448-240 240 0 132.552 107.448 240 240 240z m-40-280v-80a40 40 0 0 1 80 0v80h80a40 40 0 0 1 0 80h-80v80a40 40 0 0 1-80 0v-80h-80a40 40 0 0 1 0-80h80z"  ></path></symbol><symbol id="icon-tongjijiedian-" viewBox="0 0 1024 1024"><path d="M803.84 131.626667H410.24A59.733333 59.733333 0 0 0 350.506667 192v45.226667H199.68a51.626667 51.626667 0 0 0-51.626667 51.626666v465.92a51.626667 51.626667 0 0 0 51.626667 51.626667h187.52v-55.466667h-162.133333a21.333333 21.333333 0 0 1-21.333334-21.333333V313.386667a21.333333 21.333333 0 0 1 21.333334-21.333334h125.653333v64a59.733333 59.733333 0 0 0 59.733333 59.733334h393.386667a59.733333 59.733333 0 0 0 59.733333-59.733334V192a59.733333 59.733333 0 0 0-59.733333-60.373333z m4.266667 224.64a4.266667 4.266667 0 0 1-4.266667 4.266666H410.24a4.266667 4.266667 0 0 1-4.266667-4.266666V192a4.266667 4.266667 0 0 1 4.266667-4.266667h393.6a4.266667 4.266667 0 0 1 4.266667 4.266667zM716.16 749.44h-81.28v-81.493333a27.733333 27.733333 0 0 0-55.466667 0v81.28h-81.493333a27.733333 27.733333 0 1 0 0 55.466666h81.28v81.28a27.733333 27.733333 0 1 0 55.466667 0v-81.066666h81.28a27.733333 27.733333 0 0 0 0-55.466667z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" fill="" ></path></symbol><symbol id="icon-menu" viewBox="0 0 1024 1024"><path d="M109.714 292.571h804.572c21.943 0 36.571-21.942 36.571-43.885 0-14.629-14.628-29.257-36.571-29.257H109.714c-21.943 0-36.571 14.628-36.571 36.571 0 14.629 14.628 36.571 36.571 36.571zM914.286 512H109.714c-21.943 0-36.571 14.629-36.571 36.571 0 14.629 14.628 36.572 36.571 36.572h804.572c21.943 0 36.571-21.943 36.571-43.886 0-14.628-14.628-29.257-36.571-29.257z m0 292.571H109.714c-21.943 0-36.571 14.629-36.571 36.572s14.628 36.571 36.571 36.571h804.572c21.943 0 36.571-21.943 36.571-36.571 0-21.943-14.628-36.572-36.571-36.572z"  ></path></symbol><symbol id="icon-right" viewBox="0 0 1024 1024"><path d="M385 560.69999999L385 738.9c0 36.90000001 26.4 68.5 61.3 68.5l150.2 0c1.5 0 3-0.1 4.5-0.3 10.2 38.7 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-42 0-77.3 28.6-87.5 67.39999999-1.4-0.3-2.9-0.4-4.5-0.39999999L446.3 760.4c-6.8 0-14.3-8.9-14.3-21.49999999l0-427.00000001c0-12.7 7.40000001-21.5 14.30000001-21.5l150.19999999 0c1.5 0 3-0.2 4.5-0.4 10.2 38.8 45.5 67.3 87.5 67.3 50 0 90.5-40.5 90.5-90.4 0-49.9-40.5-90.6-90.5-90.59999999-42 0-77.3 28.6-87.5 67.39999999-1.4-0.2-2.9-0.4-4.49999999-0.4L446.3 243.3c-34.80000001 0-61.3 31.6-61.3 68.50000001L385 513.7l-79.1 0c-10.4-38.5-45.49999999-67-87.4-67-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c41.79999999 0 77.00000001-28.4 87.4-67L385 560.69999999z" fill="" ></path></symbol><symbol id="icon-left" viewBox="0 0 1024 1024"><path d="M639 463.30000001L639 285.1c0-36.90000001-26.4-68.5-61.3-68.5l-150.2 0c-1.5 0-3 0.1-4.5 0.3-10.2-38.7-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.5s40.5 90.5 90.5 90.5c42 0 77.3-28.6 87.5-67.39999999 1.4 0.3 2.9 0.4 4.5 0.39999999L577.7 263.6c6.8 0 14.3 8.9 14.3 21.49999999l0 427.00000001c0 12.7-7.40000001 21.5-14.30000001 21.5l-150.19999999 0c-1.5 0-3 0.2-4.5 0.4-10.2-38.8-45.5-67.3-87.5-67.3-50 0-90.5 40.5-90.5 90.4 0 49.9 40.5 90.6 90.5 90.59999999 42 0 77.3-28.6 87.5-67.39999999 1.4 0.2 2.9 0.4 4.49999999 0.4L577.7 780.7c34.80000001 0 61.3-31.6 61.3-68.50000001L639 510.3l79.1 0c10.4 38.5 45.49999999 67 87.4 67 50 0 90.5-40.5 90.5-90.5s-40.5-90.5-90.5-90.5c-41.79999999 0-77.00000001 28.4-87.4 67L639 463.30000001z" fill="" ></path></symbol><symbol id="icon-side" viewBox="0 0 1024 1024"><path d="M851.91168 328.45312c-59.97056 0-108.6208 48.47104-108.91264 108.36992l-137.92768 38.4a109.14304 109.14304 0 0 0-63.46752-46.58688l1.39264-137.11872c47.29344-11.86816 82.31936-54.66624 82.31936-105.64096 0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.76288-108.91776 108.91776c0 49.18784 32.60928 90.75712 77.38368 104.27392l-1.41312 138.87488a109.19936 109.19936 0 0 0-63.50336 48.55808l-138.93632-39.48544 0.01024-0.72704c0-60.15488-48.76288-108.91776-108.91776-108.91776s-108.91776 48.75776-108.91776 108.91776c0 60.15488 48.76288 108.91264 108.91776 108.91264 39.3984 0 73.91232-20.92032 93.03552-52.2496l139.19232 39.552-0.00512 0.2304c0 25.8304 9.00096 49.5616 24.02816 68.23424l-90.14272 132.63872a108.7488 108.7488 0 0 0-34.2528-5.504c-60.15488 0-108.91776 48.768-108.91776 108.91776 0 60.16 48.76288 108.91776 108.91776 108.91776 60.16 0 108.92288-48.75776 108.92288-108.91776 0-27.14624-9.9328-51.968-26.36288-71.04l89.04704-131.03104a108.544 108.544 0 0 0 37.6832 6.70208 108.672 108.672 0 0 0 36.48512-6.272l93.13792 132.57216a108.48256 108.48256 0 0 0-24.69888 69.0688c0 60.16 48.768 108.92288 108.91776 108.92288 60.16 0 108.91776-48.76288 108.91776-108.92288 0-60.14976-48.75776-108.91776-108.91776-108.91776a108.80512 108.80512 0 0 0-36.69504 6.3488l-93.07136-132.48a108.48768 108.48768 0 0 0 24.79616-72.22784l136.09984-37.888c18.99008 31.93856 53.84192 53.3504 93.69088 53.3504 60.16 0 108.92288-48.75776 108.92288-108.91264-0.00512-60.15488-48.77312-108.92288-108.92288-108.92288z"  ></path></symbol><symbol id="icon-B" viewBox="0 0 1024 1024"><path d="M98.067692 65.457231H481.28c75.854769 0 132.411077 3.150769 169.668923 9.452307 37.336615 6.301538 70.656 19.534769 100.036923 39.620924 29.459692 20.007385 53.956923 46.710154 73.570462 80.029538 19.692308 33.398154 29.459692 70.734769 29.459692 112.167385 0 44.898462-12.130462 86.094769-36.233846 123.588923a224.886154 224.886154 0 0 1-98.461539 84.283077c58.368 17.092923 103.266462 46.08 134.695385 87.04 31.350154 40.96 47.025231 89.088 47.025231 144.462769 0 43.638154-10.082462 86.016-30.404923 127.212308-20.243692 41.196308-47.891692 74.043077-83.02277 98.697846-35.052308 24.654769-78.296615 39.778462-129.732923 45.449846-32.295385 3.465846-110.119385 5.671385-233.472 6.537846H98.067692V65.457231z m193.536 159.507692V446.621538h126.818462c75.460923 0 122.328615-1.024 140.603077-3.229538 33.083077-3.938462 59.155692-15.36 78.139077-34.343385 18.904615-18.904615 28.435692-43.874462 28.435692-74.830769 0-29.696-8.192-53.720615-24.497231-72.310154-16.384-18.510769-40.644923-29.696-72.940307-33.634461-19.140923-2.205538-74.279385-3.308308-165.415385-3.308308h-111.064615z m0 381.243077v256.315077h179.2c69.710769 0 113.979077-1.969231 132.726154-5.907692 28.750769-5.198769 52.145231-17.959385 70.262154-38.281847 18.116923-20.243692 27.096615-47.340308 27.096615-81.368615 0-28.750769-6.931692-53.169231-20.873846-73.255385a118.232615 118.232615 0 0 0-60.494769-43.795692c-26.387692-9.137231-83.574154-13.705846-171.638154-13.705846H291.603692z"  ></path></symbol><symbol id="icon-a" viewBox="0 0 1024 1024"><path d="M757.76 665.6q0 20.48 1.536 34.304t7.68 22.016 18.944 12.288 34.304 4.096q-3.072 25.6-15.36 44.032-11.264 16.384-33.28 29.696t-62.976 13.312q-11.264 0-20.48-0.512t-17.408-2.56l-6.144-2.048-1.024 0q-4.096-1.024-10.24-4.096-2.048-2.048-4.096-2.048-1.024-1.024-2.048-1.024-14.336-8.192-23.552-17.408t-14.336-17.408q-6.144-10.24-9.216-20.48-63.488 75.776-178.176 75.776-48.128 0-88.064-15.36t-69.12-44.032-45.056-68.096-15.872-88.576 16.896-89.088 47.616-67.584 74.24-42.496 96.768-14.848q48.128 0 88.576 17.408t66.048 49.152q0-8.192 0.512-16.384t0.512-15.36q0-71.68-39.936-104.448t-128-32.768q-43.008 0-84.992 6.656t-84.992 17.92q14.336-28.672 25.088-47.616t24.064-29.184q30.72-24.576 158.72-24.576 79.872 0 135.168 13.824t90.624 43.52 51.2 75.264 15.872 108.032l0 200.704zM487.424 743.424q50.176 0 79.872-33.28t29.696-95.744q0-61.44-28.672-93.696t-76.8-32.256q-52.224 0-82.944 33.28t-30.72 94.72q0 58.368 31.744 92.672t77.824 34.304z"  ></path></symbol><symbol id="icon-full" viewBox="0 0 1024 1024"><path d="M639.328 416c8.032 0 16.096-3.008 22.304-9.056l202.624-197.184-0.8 143.808c-0.096 17.696 14.144 32.096 31.808 32.192 0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808l1.248-222.208c0-0.672-0.352-1.248-0.384-1.92 0.032-0.512 0.288-0.896 0.288-1.408 0.032-17.664-14.272-32-31.968-32.032L671.552 96l-0.032 0c-17.664 0-31.968 14.304-32 31.968C639.488 145.632 653.824 160 671.488 160l151.872 0.224-206.368 200.8c-12.672 12.32-12.928 32.608-0.64 45.248C622.656 412.736 630.976 416 639.328 416z"  ></path><path d="M896.032 639.552 896.032 639.552c-17.696 0-32 14.304-32.032 31.968l-0.224 151.872-200.832-206.4c-12.32-12.64-32.576-12.96-45.248-0.64-12.672 12.352-12.928 32.608-0.64 45.248l197.184 202.624-143.808-0.8c-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808-0.096 17.696 14.144 32.096 31.808 32.192l222.24 1.248c0.064 0 0.128 0 0.192 0 0.64 0 1.12-0.32 1.76-0.352 0.512 0.032 0.896 0.288 1.408 0.288l0.032 0c17.664 0 31.968-14.304 32-31.968L928 671.584C928.032 653.952 913.728 639.584 896.032 639.552z"  ></path><path d="M209.76 159.744l143.808 0.8c0.064 0 0.128 0 0.192 0 17.6 0 31.904-14.208 32-31.808 0.096-17.696-14.144-32.096-31.808-32.192L131.68 95.328c-0.064 0-0.128 0-0.192 0-0.672 0-1.248 0.352-1.888 0.384-0.448 0-0.8-0.256-1.248-0.256 0 0-0.032 0-0.032 0-17.664 0-31.968 14.304-32 31.968L96 352.448c-0.032 17.664 14.272 32 31.968 32.032 0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968l0.224-151.936 200.832 206.4c6.272 6.464 14.624 9.696 22.944 9.696 8.032 0 16.096-3.008 22.304-9.056 12.672-12.32 12.96-32.608 0.64-45.248L209.76 159.744z"  ></path><path d="M362.368 617.056l-202.624 197.184 0.8-143.808c0.096-17.696-14.144-32.096-31.808-32.192-0.064 0-0.128 0-0.192 0-17.6 0-31.904 14.208-32 31.808l-1.248 222.24c0 0.704 0.352 1.312 0.384 2.016 0 0.448-0.256 0.832-0.256 1.312-0.032 17.664 14.272 32 31.968 32.032L352.448 928c0 0 0.032 0 0.032 0 17.664 0 31.968-14.304 32-31.968s-14.272-32-31.968-32.032l-151.936-0.224 206.4-200.832c12.672-12.352 12.96-32.608 0.64-45.248S375.008 604.704 362.368 617.056z"  ></path></symbol><symbol id="icon-add" viewBox="0 0 1024 1024"><path d="M863.328 482.56l-317.344-1.12L545.984 162.816c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 318.4L159.616 480.064c-0.032 0-0.064 0-0.096 0-17.632 0-31.936 14.24-32 31.904C127.424 529.632 141.728 544 159.392 544.064l322.592 1.152 0 319.168c0 17.696 14.336 32 32 32s32-14.304 32-32l0-318.944 317.088 1.12c0.064 0 0.096 0 0.128 0 17.632 0 31.936-14.24 32-31.904C895.264 496.992 880.96 482.624 863.328 482.56z"  ></path></symbol><symbol id="icon-move" viewBox="0 0 1024 1024"><path d="M863.744 544 163.424 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l700.32 0c17.696 0 32 14.336 32 32S881.44 544 863.744 544z"  ></path></symbol><symbol id="icon-living" viewBox="0 0 1024 1024"><path d="M514.133333 488.533333m-106.666666 0a106.666667 106.666667 0 1 0 213.333333 0 106.666667 106.666667 0 1 0-213.333333 0Z" fill="" ></path><path d="M512 64C264.533333 64 64 264.533333 64 512c0 236.8 183.466667 428.8 416 445.866667v-134.4c-53.333333-59.733333-200.533333-230.4-200.533333-334.933334 0-130.133333 104.533333-234.666667 234.666666-234.666666s234.666667 104.533333 234.666667 234.666666c0 61.866667-49.066667 153.6-145.066667 270.933334l-59.733333 68.266666V960C776.533333 942.933333 960 748.8 960 512c0-247.466667-200.533333-448-448-448z" fill="" ></path></symbol></svg>', c = (c = document.getElementsByTagName("script"))[c.length - 1].getAttribute("data-injectcss");
  if (c && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch {
    }
  }
  function d() {
    i || (i = !0, o());
  }
  t = function() {
    var a, u, h, p;
    (p = document.createElement("div")).innerHTML = l, l = null, (h = p.getElementsByTagName("svg")[0]) && (h.setAttribute("aria-hidden", "true"), h.style.position = "absolute", h.style.width = 0, h.style.height = 0, h.style.overflow = "hidden", a = h, (u = document.body).firstChild ? (p = a, (h = u.firstChild).parentNode.insertBefore(p, h)) : u.appendChild(a));
  }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(t, 0) : (n = function() {
    document.removeEventListener("DOMContentLoaded", n, !1), t();
  }, document.addEventListener("DOMContentLoaded", n, !1)) : document.attachEvent && (o = t, s = e.document, i = !1, (r = function() {
    try {
      s.documentElement.doScroll("left");
    } catch {
      return void setTimeout(r, 50);
    }
    d();
  })(), s.onreadystatechange = function() {
    s.readyState == "complete" && (s.onreadystatechange = null, d());
  });
})(window);
const R = 0, te = 1, ne = 2, xe = {
  name: "Latte",
  type: "light",
  palette: ["#dd7878", "#ea76cb", "#8839ef", "#e64553", "#fe640b", "#df8e1d", "#40a02b", "#209fb5", "#1e66f5", "#7287fd"],
  cssVar: {
    "--gap": "30px",
    "--main-color": "#444446",
    "--main-bgcolor": "#ffffff",
    "--color": "#777777",
    "--bgcolor": "#f6f6f6",
    "--panel-color": "#444446",
    "--panel-bgcolor": "#ffffff",
    "--panel-border-color": "#eaeaea"
  }
}, we = {
  name: "Dark",
  type: "dark",
  palette: ["#848FA0", "#748BE9", "#D2F9FE", "#4145A5", "#789AFA", "#706CF4", "#EF987F", "#775DD5", "#FCEECF", "#DA7FBC"],
  cssVar: {
    "--main-color": "#ffffff",
    "--main-bgcolor": "#4c4f69",
    "--color": "#cccccc",
    "--bgcolor": "#252526",
    "--panel-color": "#ffffff",
    "--panel-bgcolor": "#2d3748",
    "--panel-border-color": "#696969"
  }
};
function ae(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
const J = function(e, t) {
  if (t.id === e)
    return t;
  if (t.children && t.children.length) {
    for (let n = 0; n < t.children.length; n++) {
      const o = J(e, t.children[n]);
      if (o)
        return o;
    }
    return null;
  } else
    return null;
}, oe = (e, t) => {
  if (e.parent = t, e.children)
    for (let n = 0; n < e.children.length; n++)
      oe(e.children[n], e);
};
function U(e, t, n, o) {
  const s = o - t, i = e - n;
  let r = Math.atan(Math.abs(s) / Math.abs(i)) / 3.14 * 180;
  i < 0 && s > 0 && (r = 180 - r), i < 0 && s < 0 && (r = 180 + r), i > 0 && s < 0 && (r = 360 - r);
  const l = 12, c = 30, d = r + c, a = r - c;
  return {
    x1: n + Math.cos(Math.PI * d / 180) * l,
    y1: o - Math.sin(Math.PI * d / 180) * l,
    x2: n + Math.cos(Math.PI * a / 180) * l,
    y2: o - Math.sin(Math.PI * a / 180) * l
  };
}
function ee() {
  return ((/* @__PURE__ */ new Date()).getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
}
const Ae = function() {
  const e = ee();
  return {
    topic: this.newTopicName,
    id: e
  };
}, D = (e, t) => {
  let n = 0, o = 0;
  for (; t && t !== e; )
    n += t.offsetLeft, o += t.offsetTop, t = t.offsetParent;
  return { offsetLeft: n, offsetTop: o };
}, w = (e, t) => {
  for (const n in t)
    e.setAttribute(n, t[n]);
}, he = (e) => e ? e.tagName === "ME-TPC" : !1, H = {
  moved: !1,
  // diffrentiate click and move
  mousedown: !1,
  onMove(e, t) {
    if (this.mousedown) {
      this.moved = !0;
      const n = e.movementX, o = e.movementY, { container: s, map: i, scaleVal: r } = t;
      let l = s.scrollLeft - n, c = s.scrollTop - o;
      if (r < 1) {
        const d = (s.scrollWidth - i.clientWidth * r) / 2, a = (s.scrollHeight - i.clientHeight * r) / 2;
        l = Math.max(d, Math.min(s.scrollWidth - d - s.clientWidth, l)), c = Math.max(a, Math.min(s.scrollHeight - a - s.clientHeight, c));
      }
      s.scrollTo(l, c);
    }
  },
  clear() {
    setTimeout(() => {
      this.moved = !1, this.mousedown = !1;
    }, 0);
  }
};
function ke(e) {
  e.map.addEventListener("click", (t) => {
    var o, s;
    if (t.button !== 0)
      return;
    if ((o = e.helper1) != null && o.moved) {
      e.helper1.clear();
      return;
    }
    if ((s = e.helper2) != null && s.moved) {
      e.helper2.clear();
      return;
    }
    if (H.moved) {
      H.clear();
      return;
    }
    e.clearSelection();
    const n = t.target;
    if (n.tagName === "ME-EPD")
      e.expandNode(n.previousSibling);
    else if (he(n))
      e.selectNode(n, !1, t);
    else if (e.editable)
      n.tagName === "text" ? n.dataset.type === "custom-link" ? e.selectArrow(n.parentElement) : e.selectSummary(n.parentElement) : n.className;
    else
      return;
  }), e.map.addEventListener("dblclick", (t) => {
    if (!e.editable)
      return;
    const n = t.target;
    he(n) ? e.beginEdit(n) : n.tagName === "text" && (n.dataset.type === "custom-link" ? e.editArrowLabel(n.parentElement) : e.editSummary(n.parentElement));
  }), e.map.addEventListener("mousemove", (t) => {
    t.target.contentEditable === "inherit" && H.onMove(t, e);
  }), e.map.addEventListener("mousedown", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && t.target.contentEditable === "inherit" && (H.moved = !1, H.mousedown = !0);
  }), e.map.addEventListener("mouseleave", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && H.clear();
  }), e.map.addEventListener("mouseup", (t) => {
    const n = e.mouseSelectionButton === 0 ? 2 : 0;
    t.button === n && H.clear();
  });
}
const He = {
  create() {
    return {
      handlers: {},
      showHandler: function() {
      },
      addListener: function(e, t) {
        this.handlers[e] === void 0 && (this.handlers[e] = []), this.handlers[e].push(t);
      },
      fire: function(e, ...t) {
        if (this.handlers[e] instanceof Array) {
          const n = this.handlers[e];
          for (let o = 0; o < n.length; o++)
            n[o](...t);
        }
      },
      removeListener: function(e, t) {
        if (!this.handlers[e])
          return;
        const n = this.handlers[e];
        if (!t)
          n.length = 0;
        else if (n.length)
          for (let o = 0; o < n.length; o++)
            n[o] === t && this.handlers[e].splice(o, 1);
      }
    };
  }
};
var T = /* @__PURE__ */ ((e) => (e.LHS = "lhs", e.RHS = "rhs", e))(T || {});
const Q = document, De = function() {
  this.nodes.innerHTML = "";
  const e = this.createTopic(this.nodeData);
  _e(e, this.nodeData), e.draggable = !1;
  const t = Q.createElement("me-root");
  t.appendChild(e);
  const n = this.nodeData.children || [];
  if (this.direction === ne) {
    let o = 0, s = 0;
    n.map((i) => {
      i.direction === R ? o += 1 : i.direction === te ? s += 1 : o <= s ? (i.direction = R, o += 1) : (i.direction = te, s += 1);
    });
  }
  Pe(this, n, t);
}, Pe = function(e, t, n) {
  const o = Q.createElement("me-main");
  o.className = T.LHS;
  const s = Q.createElement("me-main");
  s.className = T.RHS;
  for (let i = 0; i < t.length; i++) {
    const r = t[i], { grp: l } = e.createWrapper(r);
    e.direction === ne ? r.direction === R ? o.appendChild(l) : s.appendChild(l) : e.direction === R ? o.appendChild(l) : s.appendChild(l);
  }
  e.nodes.appendChild(o), e.nodes.appendChild(n), e.nodes.appendChild(s), e.nodes.appendChild(e.lines);
}, Be = function(e, t) {
  const n = Q.createElement("me-children");
  for (let o = 0; o < t.length; o++) {
    const s = t[o], { grp: i } = e.createWrapper(s);
    n.appendChild(i);
  }
  return n;
}, S = document, M = (e, t) => {
  const o = (t ? t.el : S).querySelector(`[data-nodeid=me${e}]`);
  if (!o)
    throw new Error(`FindEle: Node ${e} not found, maybe it's collapsed.`);
  return o;
}, _e = function(e, t) {
  if (e.innerHTML = "", t.style && (e.style.color = t.style.color || "", e.style.background = t.style.background || "", e.style.fontSize = t.style.fontSize + "px", e.style.fontWeight = t.style.fontWeight || "normal"), t.dangerouslySetInnerHTML) {
    e.innerHTML = t.dangerouslySetInnerHTML;
    return;
  }
  if (t.image) {
    const n = t.image;
    if (n.url && n.width && n.height) {
      const o = S.createElement("img");
      o.src = n.url, o.style.width = n.width + "px", o.style.height = n.height + "px", n.fit && (o.style.objectFit = n.fit), e.appendChild(o), e.image = o;
    }
  } else
    e.image && (e.image = void 0);
  {
    const n = S.createElement("span");
    n.className = "text", n.textContent = t.topic, e.appendChild(n), e.text = n;
  }
  if (t.hyperLink) {
    const n = S.createElement("a");
    n.className = "hyper-link", n.target = "_blank", n.innerText = "🔗", n.href = t.hyperLink, e.appendChild(n), e.link = n;
  } else
    e.link && (e.link = void 0);
  if (t.icons && t.icons.length) {
    const n = S.createElement("span");
    n.className = "icons", n.innerHTML = t.icons.map((o) => `<span>${ae(o)}</span>`).join(""), e.appendChild(n), e.icons = n;
  } else
    e.icons && (e.icons = void 0);
  if (t.tags && t.tags.length) {
    const n = S.createElement("div");
    n.className = "tags", n.innerHTML = t.tags.map((o) => `<span>${ae(o)}</span>`).join(""), e.appendChild(n), e.tags = n;
  } else
    e.tags && (e.tags = void 0);
}, ze = function(e, t) {
  const n = S.createElement("me-wrapper"), { p: o, tpc: s } = this.createParent(e);
  if (n.appendChild(o), !t && e.children && e.children.length > 0) {
    const i = Ve(e.expanded);
    if (o.appendChild(i), e.expanded !== !1) {
      const r = Be(this, e.children);
      n.appendChild(r);
    }
  }
  return { grp: n, top: o, tpc: s };
}, Oe = function(e) {
  const t = S.createElement("me-parent"), n = this.createTopic(e);
  return _e(n, e), t.appendChild(n), { p: t, tpc: n };
}, je = function(e) {
  const t = S.createElement("me-children");
  return t.append(...e), t;
}, Re = function(e) {
  const t = S.createElement("me-tpc");
  return t.nodeObj = e, t.dataset.nodeid = "me" + e.id, t.draggable = this.draggable, t;
};
function Ee(e) {
  const t = S.createRange();
  t.selectNodeContents(e);
  const n = window.getSelection();
  n && (n.removeAllRanges(), n.addRange(t));
}
const qe = function(e) {
  if (!e)
    return;
  const t = S.createElement("div"), n = e.text.textContent;
  e.appendChild(t), t.id = "input-box", t.textContent = n, t.contentEditable = "plaintext-only", t.spellcheck = !1;
  const o = getComputedStyle(e);
  t.style.cssText = `min-width:${e.offsetWidth - 8}px;
  color:${o.color};
  padding:${o.padding};
  margin:${o.margin};
  font:${o.font};
  background-color:${o.backgroundColor !== "rgba(0, 0, 0, 0)" && o.backgroundColor};
  border-radius:${o.borderRadius};`, this.direction === R && (t.style.right = "0"), t.focus(), Ee(t), this.bus.fire("operation", {
    name: "beginEdit",
    obj: e.nodeObj
  }), t.addEventListener("keydown", (s) => {
    s.stopPropagation();
    const i = s.key;
    if (i === "Enter" || i === "Tab") {
      if (s.shiftKey)
        return;
      s.preventDefault(), t.blur(), this.map.focus();
    }
  }), t.addEventListener("blur", () => {
    var r;
    if (!t)
      return;
    const s = e.nodeObj, i = ((r = t.textContent) == null ? void 0 : r.trim()) || "";
    i === "" ? s.topic = n : s.topic = i, t.remove(), i !== n && (e.text.textContent = s.topic, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEdit",
      obj: s,
      origin: n
    }));
  });
}, Ve = function(e) {
  const t = S.createElement("me-epd");
  return t.expanded = e !== !1, t.className = e !== !1 ? "minus" : "", t;
}, q = document, F = "http://www.w3.org/2000/svg", Se = function(e, t, n) {
  const o = q.createElementNS(F, "path");
  return w(o, {
    d: e,
    stroke: t || "#666",
    fill: "none",
    "stroke-width": n
  }), o;
}, W = function(e) {
  const t = q.createElementNS(F, "svg");
  return t.setAttribute("class", e), t.setAttribute("overflow", "visible"), t;
}, de = function() {
  const e = q.createElementNS(F, "line");
  return e.setAttribute("stroke", "#bbb"), e.setAttribute("fill", "none"), e.setAttribute("stroke-width", "2"), e;
}, We = function(e, t, n) {
  const o = {
    stroke: "rgb(235, 95, 82)",
    fill: "none",
    "stroke-linecap": "cap",
    "stroke-width": "2"
  }, s = q.createElementNS(F, "g");
  return [e, t, n].forEach((i, r) => {
    const l = q.createElementNS(F, "path"), c = {
      d: i,
      ...o
    };
    w(l, c), r === 0 && l.setAttribute("stroke-dasharray", "8,2"), s.appendChild(l);
  }), s;
}, Ce = function(e, t, n) {
  if (!t)
    return;
  const o = q.createElement("div");
  e.nodes.appendChild(o);
  const s = t.innerHTML;
  o.id = "input-box", o.textContent = s, o.contentEditable = "plaintext-only", o.spellcheck = !1;
  const i = t.getBBox();
  o.style.cssText = `
    min-width:${Math.max(88, i.width)}px;
    position:absolute;
    left:${i.x}px;
    top:${i.y}px;
    padding: 2px 4px;
    margin: -2px -4px; 
  `, o.focus(), Ee(o), o.addEventListener("keydown", (r) => {
    r.stopPropagation();
    const l = r.key;
    if (l === "Enter" || l === "Tab") {
      if (r.shiftKey)
        return;
      r.preventDefault(), o.blur(), e.map.focus();
    }
  }), o.addEventListener("blur", () => {
    o && n(o);
  });
}, Fe = function(e) {
  const t = this.map.querySelector("me-root"), n = t.offsetTop, o = t.offsetLeft, s = t.offsetWidth, i = t.offsetHeight, l = this.map.querySelector("me-nodes").offsetWidth;
  this.nodes.style.top = `${1e4 - this.nodes.offsetHeight / 2}px`, this.alignment === "root" ? this.nodes.style.left = `${1e4 - o - s / 2}px` : this.nodes.style.left = `${1e4 - l / 2}px`;
  const c = this.map.querySelectorAll("me-main > me-wrapper");
  this.lines.innerHTML = "";
  for (let d = 0; d < c.length; d++) {
    const a = c[d], u = a.querySelector("me-tpc"), { offsetLeft: h, offsetTop: p } = D(this.nodes, u), m = u.offsetWidth, g = u.offsetHeight, f = a.parentNode.className, v = this.generateMainBranch({ pT: n, pL: o, pW: s, pH: i, cT: p, cL: h, cW: m, cH: g, direction: f, containerHeight: this.nodes.offsetHeight }), _ = this.theme.palette, E = u.nodeObj.branchColor || _[d % _.length];
    u.style.borderColor = E, this.lines.appendChild(Se(v, E, "3"));
    const y = a.children[0].children[1];
    if (y && (y.style.top = (y.parentNode.offsetHeight - y.offsetHeight) / 2 + "px", f === T.LHS ? y.style.left = "-10px" : y.style.right = "-10px"), e && e !== a)
      continue;
    const b = W("subLines"), L = a.lastChild;
    L.tagName === "svg" && L.remove(), a.appendChild(b), Le(this, b, E, a, f, !0);
  }
  this.renderArrow(), this.renderSummary(), this.bus.fire("linkDiv");
}, Le = function(e, t, n, o, s, i) {
  const r = o.firstChild, l = o.children[1].children;
  if (l.length === 0)
    return;
  const c = r.offsetTop, d = r.offsetLeft, a = r.offsetWidth, u = r.offsetHeight;
  for (let h = 0; h < l.length; h++) {
    const p = l[h], m = p.firstChild, g = m.offsetTop, f = m.offsetLeft, v = m.offsetWidth, _ = m.offsetHeight, E = m.firstChild.nodeObj.branchColor || n, y = e.generateSubBranch({ pT: c, pL: d, pW: a, pH: u, cT: g, cL: f, cW: v, cH: _, direction: s, isFirst: i });
    t.appendChild(Se(y, E, "2"));
    const b = m.children[1];
    if (b) {
      if (b.style.bottom = (b.parentNode.offsetHeight - b.offsetHeight) / 2 + "px", s === T.LHS ? b.style.left = "20px" : s === T.RHS && (b.style.right = "20px"), !b.expanded)
        continue;
    } else
      continue;
    Le(e, t, E, p, s);
  }
};
const B = (e, t) => {
  const n = document.createElement("span");
  return n.id = e, n.innerHTML = `<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-${t}"></use>
  </svg>`, n;
};
function Ie(e) {
  const t = document.createElement("div"), n = B("fullscreen", "full"), o = B("toCenter", "living"), s = B("zoomout", "move"), i = B("zoomin", "add"), r = document.createElement("span");
  return r.innerText = "100%", t.appendChild(n), t.appendChild(o), t.appendChild(s), t.appendChild(i), t.className = "mind-elixir-toolbar rb", n.onclick = () => {
    document.fullscreenElement === e.el ? document.exitFullscreen() : e.el.requestFullscreen();
  }, o.onclick = () => {
    e.toCenter();
  }, s.onclick = () => {
    e.scaleVal < 0.6 || e.scale(e.scaleVal - e.scaleSensitivity);
  }, i.onclick = () => {
    e.scaleVal > 1.6 || e.scale(e.scaleVal + e.scaleSensitivity);
  }, t;
}
function Xe(e) {
  const t = document.createElement("div"), n = B("tbltl", "left"), o = B("tbltr", "right"), s = B("tblts", "side");
  return t.appendChild(n), t.appendChild(o), t.appendChild(s), t.className = "mind-elixir-toolbar lt", n.onclick = () => {
    e.initLeft();
  }, o.onclick = () => {
    e.initRight();
  }, s.onclick = () => {
    e.initSide();
  }, t;
}
function Ye(e) {
  e.container.append(Ie(e)), e.container.append(Xe(e));
}
/*! @viselect/vanilla v3.5.1 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
var Ge = Object.defineProperty, Ke = (e, t, n) => t in e ? Ge(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, x = (e, t, n) => (Ke(e, typeof t != "symbol" ? t + "" : t, n), n);
class Je {
  constructor() {
    x(this, "_listeners", /* @__PURE__ */ new Map()), x(this, "on", this.addEventListener), x(this, "off", this.removeEventListener), x(this, "emit", this.dispatchEvent);
  }
  addEventListener(t, n) {
    const o = this._listeners.get(t) ?? /* @__PURE__ */ new Set();
    return this._listeners.set(t, o), o.add(n), this;
  }
  removeEventListener(t, n) {
    var o;
    return (o = this._listeners.get(t)) == null || o.delete(n), this;
  }
  dispatchEvent(t, ...n) {
    let o = !0;
    for (const s of this._listeners.get(t) ?? [])
      o = s(...n) !== !1 && o;
    return o;
  }
  unbindAllListeners() {
    this._listeners.clear();
  }
}
const ue = (e, t = "px") => typeof e == "number" ? e + t : e;
function A({ style: e }, t, n) {
  if (typeof t == "object")
    for (const [o, s] of Object.entries(t))
      s !== void 0 && (e[o] = ue(s));
  else
    n !== void 0 && (e[t] = ue(n));
}
const Me = (e) => (t, n, o, s = {}) => {
  t instanceof HTMLCollection || t instanceof NodeList ? t = Array.from(t) : Array.isArray(t) || (t = [t]), Array.isArray(n) || (n = [n]);
  for (const i of t)
    if (i)
      for (const r of n)
        i[e](r, o, { capture: !1, ...s });
  return [t, n, o, s];
}, z = Me("addEventListener"), k = Me("removeEventListener"), Y = (e) => {
  var t;
  const { clientX: n, clientY: o, target: s } = ((t = e.touches) == null ? void 0 : t[0]) ?? e;
  return { x: n, y: o, target: s };
};
function fe(e, t, n = "touch") {
  switch (n) {
    case "center": {
      const o = t.left + t.width / 2, s = t.top + t.height / 2;
      return o >= e.left && o <= e.right && s >= e.top && s <= e.bottom;
    }
    case "cover":
      return t.left >= e.left && t.top >= e.top && t.right <= e.right && t.bottom <= e.bottom;
    case "touch":
      return e.right >= t.left && e.left <= t.right && e.bottom >= t.top && e.top <= t.bottom;
  }
}
function O(e, t = document) {
  const n = Array.isArray(e) ? e : [e];
  let o = [];
  for (let s = 0, i = n.length; s < i; s++) {
    const r = n[s];
    typeof r == "string" ? o = o.concat(Array.from(t.querySelectorAll(r))) : r instanceof Element && o.push(r);
  }
  return o;
}
const Ue = () => matchMedia("(hover: none), (pointer: coarse)").matches, Qe = () => "safari" in window, Ze = (e) => {
  let t, n = -1, o = !1;
  return {
    next(...s) {
      t = s, o || (o = !0, n = requestAnimationFrame(() => {
        e(...t), o = !1;
      }));
    },
    cancel() {
      cancelAnimationFrame(n), o = !1;
    }
  };
};
function et(e, t) {
  for (const n of t) {
    if (typeof n == "number")
      return e.button === n;
    if (typeof n == "object") {
      const o = n.button === e.button, s = n.modifiers.every((i) => {
        switch (i) {
          case "alt":
            return e.altKey;
          case "ctrl":
            return e.ctrlKey || e.metaKey;
          case "shift":
            return e.shiftKey;
        }
      });
      return o && s;
    }
  }
  return !1;
}
const { abs: P, max: pe, min: me, ceil: ge } = Math;
class tt extends Je {
  constructor(t) {
    var n, o, s, i, r;
    super(), x(this, "_options"), x(this, "_selection", {
      stored: [],
      selected: [],
      touched: [],
      changed: {
        added: [],
        // Added elements since last selection
        removed: []
        // Removed elements since last selection
      }
    }), x(this, "_area"), x(this, "_clippingElement"), x(this, "_targetElement"), x(this, "_targetRect"), x(this, "_selectables", []), x(this, "_latestElement"), x(this, "_areaRect", new DOMRect()), x(this, "_areaLocation", { y1: 0, x2: 0, y2: 0, x1: 0 }), x(this, "_singleClick", !0), x(this, "_frame"), x(this, "_scrollAvailable", !0), x(this, "_scrollingActive", !1), x(this, "_scrollSpeed", { x: 0, y: 0 }), x(this, "_scrollDelta", { x: 0, y: 0 }), x(this, "disable", this._bindStartEvents.bind(this, !1)), x(this, "enable", this._bindStartEvents), this._options = {
      selectionAreaClass: "selection-area",
      selectionContainerClass: void 0,
      selectables: [],
      document: window.document,
      startAreas: ["html"],
      boundaries: ["html"],
      container: "body",
      ...t,
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        triggers: [0],
        ...t.behaviour,
        startThreshold: (n = t.behaviour) != null && n.startThreshold ? typeof t.behaviour.startThreshold == "number" ? t.behaviour.startThreshold : { x: 10, y: 10, ...t.behaviour.startThreshold } : { x: 10, y: 10 },
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          ...(o = t.behaviour) == null ? void 0 : o.scrolling,
          startScrollMargins: {
            x: 0,
            y: 0,
            ...(i = (s = t.behaviour) == null ? void 0 : s.scrolling) == null ? void 0 : i.startScrollMargins
          }
        }
      },
      features: {
        range: !0,
        touch: !0,
        ...t.features,
        singleTap: {
          allow: !0,
          intersect: "native",
          ...(r = t.features) == null ? void 0 : r.singleTap
        }
      }
    };
    for (const a of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
      typeof this[a] == "function" && (this[a] = this[a].bind(this));
    const { document: l, selectionAreaClass: c, selectionContainerClass: d } = this._options;
    this._area = l.createElement("div"), this._clippingElement = l.createElement("div"), this._clippingElement.appendChild(this._area), this._area.classList.add(c), d && this._clippingElement.classList.add(d), A(this._area, {
      willChange: "top, left, bottom, right, width, height",
      top: 0,
      left: 0,
      position: "fixed"
    }), A(this._clippingElement, {
      overflow: "hidden",
      position: "fixed",
      transform: "translate3d(0, 0, 0)",
      // https://stackoverflow.com/a/38268846
      pointerEvents: "none",
      zIndex: "1"
    }), this._frame = Ze((a) => {
      this._recalculateSelectionAreaRect(), this._updateElementSelection(), this._emitEvent("move", a), this._redrawSelectionArea();
    }), this.enable();
  }
  _bindStartEvents(t = !0) {
    const { document: n, features: o } = this._options, s = t ? z : k;
    s(n, "mousedown", this._onTapStart), o.touch && s(n, "touchstart", this._onTapStart, {
      passive: !1
    });
  }
  _onTapStart(t, n = !1) {
    const { x: o, y: s, target: i } = Y(t), { _options: r } = this, { document: l } = this._options, c = i.getBoundingClientRect();
    if (t instanceof MouseEvent && !et(t, r.behaviour.triggers))
      return;
    const d = O(r.startAreas, r.document), a = O(r.boundaries, r.document);
    this._targetElement = a.find(
      (p) => fe(p.getBoundingClientRect(), c)
    );
    const u = t.composedPath();
    if (!this._targetElement || !d.find((p) => u.includes(p)) || !a.find((p) => u.includes(p)) || !n && this._emitEvent("beforestart", t) === !1)
      return;
    this._areaLocation = { x1: o, y1: s, x2: 0, y2: 0 };
    const h = l.scrollingElement ?? l.body;
    this._scrollDelta = { x: h.scrollLeft, y: h.scrollTop }, this._singleClick = !0, this.clearSelection(!1, !0), z(l, ["touchmove", "mousemove"], this._delayedTapMove, { passive: !1 }), z(l, ["mouseup", "touchcancel", "touchend"], this._onTapStop), z(l, "scroll", this._onScroll);
  }
  _onSingleTap(t) {
    const { singleTap: { intersect: n }, range: o } = this._options.features, s = Y(t);
    let i;
    if (n === "native")
      i = s.target;
    else if (n === "touch") {
      this.resolveSelectables();
      const { x: l, y: c } = s;
      i = this._selectables.find((d) => {
        const { right: a, left: u, top: h, bottom: p } = d.getBoundingClientRect();
        return l < a && l > u && c < p && c > h;
      });
    }
    if (!i)
      return;
    for (this.resolveSelectables(); !this._selectables.includes(i); ) {
      if (!i.parentElement)
        return;
      i = i.parentElement;
    }
    const { stored: r } = this._selection;
    if (this._emitEvent("start", t), t.shiftKey && o && this._latestElement) {
      const l = this._latestElement, [c, d] = l.compareDocumentPosition(i) & 4 ? [i, l] : [l, i], a = [...this._selectables.filter(
        (u) => u.compareDocumentPosition(c) & 4 && u.compareDocumentPosition(d) & 2
      ), c, d];
      this.select(a), this._latestElement = l;
    } else
      r.includes(i) && (r.length === 1 || t.ctrlKey || r.every((l) => this._selection.stored.includes(l))) ? this.deselect(i) : (this.select(i), this._latestElement = i);
  }
  _delayedTapMove(t) {
    const { container: n, document: o, behaviour: { startThreshold: s } } = this._options, { x1: i, y1: r } = this._areaLocation, { x: l, y: c } = Y(t);
    if (
      // Single number for both coordinates
      typeof s == "number" && P(l + c - (i + r)) >= s || // Different x and y threshold
      typeof s == "object" && P(l - i) >= s.x || P(c - r) >= s.y
    ) {
      if (k(o, ["mousemove", "touchmove"], this._delayedTapMove, { passive: !1 }), this._emitEvent("beforedrag", t) === !1) {
        k(o, ["mouseup", "touchcancel", "touchend"], this._onTapStop);
        return;
      }
      z(o, ["mousemove", "touchmove"], this._onTapMove, { passive: !1 }), A(this._area, "display", "block"), O(n, o)[0].appendChild(this._clippingElement), this.resolveSelectables(), this._singleClick = !1, this._targetRect = this._targetElement.getBoundingClientRect(), this._scrollAvailable = this._targetElement.scrollHeight !== this._targetElement.clientHeight || this._targetElement.scrollWidth !== this._targetElement.clientWidth, this._scrollAvailable && (z(this._targetElement, "wheel", this._manualScroll, { passive: !1 }), this._selectables = this._selectables.filter((d) => this._targetElement.contains(d))), this._setupSelectionArea(), this._emitEvent("start", t), this._onTapMove(t);
    }
    this._handleMoveEvent(t);
  }
  _setupSelectionArea() {
    const { _clippingElement: t, _targetElement: n, _area: o } = this, s = this._targetRect = n.getBoundingClientRect();
    this._scrollAvailable ? (A(t, {
      top: s.top,
      left: s.left,
      width: s.width,
      height: s.height
    }), A(o, {
      marginTop: -s.top,
      marginLeft: -s.left
    })) : (A(t, {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }), A(o, {
      marginTop: 0,
      marginLeft: 0
    }));
  }
  _onTapMove(t) {
    const { x: n, y: o } = Y(t), { _scrollSpeed: s, _areaLocation: i, _options: r, _frame: l } = this, { speedDivider: c } = r.behaviour.scrolling, d = this._targetElement;
    if (i.x2 = n, i.y2 = o, this._scrollAvailable && !this._scrollingActive && (s.y || s.x)) {
      this._scrollingActive = !0;
      const a = () => {
        if (!s.x && !s.y) {
          this._scrollingActive = !1;
          return;
        }
        const { scrollTop: u, scrollLeft: h } = d;
        s.y && (d.scrollTop += ge(s.y / c), i.y1 -= d.scrollTop - u), s.x && (d.scrollLeft += ge(s.x / c), i.x1 -= d.scrollLeft - h), l.next(t), requestAnimationFrame(a);
      };
      requestAnimationFrame(a);
    } else
      l.next(t);
    this._handleMoveEvent(t);
  }
  _handleMoveEvent(t) {
    const { features: n } = this._options;
    (n.touch && Ue() || this._scrollAvailable && Qe()) && t.preventDefault();
  }
  _onScroll() {
    const { _scrollDelta: t, _options: { document: n } } = this, { scrollTop: o, scrollLeft: s } = n.scrollingElement ?? n.body;
    this._areaLocation.x1 += t.x - s, this._areaLocation.y1 += t.y - o, t.x = s, t.y = o, this._setupSelectionArea(), this._frame.next(null);
  }
  _manualScroll(t) {
    const { manualSpeed: n } = this._options.behaviour.scrolling, o = t.deltaY ? t.deltaY > 0 ? 1 : -1 : 0, s = t.deltaX ? t.deltaX > 0 ? 1 : -1 : 0;
    this._scrollSpeed.y += o * n, this._scrollSpeed.x += s * n, this._onTapMove(t), t.preventDefault();
  }
  _recalculateSelectionAreaRect() {
    const { _scrollSpeed: t, _areaLocation: n, _areaRect: o, _targetElement: s, _options: i } = this, { scrollTop: r, scrollHeight: l, clientHeight: c, scrollLeft: d, scrollWidth: a, clientWidth: u } = s, h = this._targetRect, { x1: p, y1: m } = n;
    let { x2: g, y2: f } = n;
    const { behaviour: { scrolling: { startScrollMargins: v } } } = i;
    g < h.left + v.x ? (t.x = d ? -P(h.left - g + v.x) : 0, g = g < h.left ? h.left : g) : g > h.right - v.x ? (t.x = a - d - u ? P(h.left + h.width - g - v.x) : 0, g = g > h.right ? h.right : g) : t.x = 0, f < h.top + v.y ? (t.y = r ? -P(h.top - f + v.y) : 0, f = f < h.top ? h.top : f) : f > h.bottom - v.y ? (t.y = l - r - c ? P(h.top + h.height - f - v.y) : 0, f = f > h.bottom ? h.bottom : f) : t.y = 0;
    const _ = me(p, g), E = me(m, f), y = pe(p, g), b = pe(m, f);
    o.x = _, o.y = E, o.width = y - _, o.height = b - E;
  }
  _redrawSelectionArea() {
    const { x: t, y: n, width: o, height: s } = this._areaRect, { style: i } = this._area;
    i.left = `${t}px`, i.top = `${n}px`, i.width = `${o}px`, i.height = `${s}px`;
  }
  _onTapStop(t, n) {
    var o;
    const { document: s, features: i } = this._options, { _singleClick: r } = this;
    k(s, ["mousemove", "touchmove"], this._delayedTapMove), k(s, ["touchmove", "mousemove"], this._onTapMove), k(s, ["mouseup", "touchcancel", "touchend"], this._onTapStop), k(s, "scroll", this._onScroll), this._keepSelection(), t && r && i.singleTap.allow ? this._onSingleTap(t) : !r && !n && (this._updateElementSelection(), this._emitEvent("stop", t)), this._scrollSpeed.x = 0, this._scrollSpeed.y = 0, k(this._targetElement, "wheel", this._manualScroll, { passive: !0 }), this._clippingElement.remove(), (o = this._frame) == null || o.cancel(), A(this._area, "display", "none");
  }
  _updateElementSelection() {
    const { _selectables: t, _options: n, _selection: o, _areaRect: s } = this, { stored: i, selected: r, touched: l } = o, { intersect: c, overlap: d } = n.behaviour, a = d === "invert", u = [], h = [], p = [];
    for (let g = 0; g < t.length; g++) {
      const f = t[g];
      if (fe(s, f.getBoundingClientRect(), c)) {
        if (r.includes(f))
          i.includes(f) && !l.includes(f) && l.push(f);
        else if (a && i.includes(f)) {
          p.push(f);
          continue;
        } else
          h.push(f);
        u.push(f);
      }
    }
    a && h.push(...i.filter((g) => !r.includes(g)));
    const m = d === "keep";
    for (let g = 0; g < r.length; g++) {
      const f = r[g];
      !u.includes(f) && !// Check if user wants to keep previously selected elements, e.g.
      // not make them part of the current selection as soon as they're touched.
      (m && i.includes(f)) && p.push(f);
    }
    o.selected = u, o.changed = { added: h, removed: p }, this._latestElement = void 0;
  }
  _emitEvent(t, n) {
    return this.emit(t, {
      event: n,
      store: this._selection,
      selection: this
    });
  }
  _keepSelection() {
    const { _options: t, _selection: n } = this, { selected: o, changed: s, touched: i, stored: r } = n, l = o.filter((c) => !r.includes(c));
    switch (t.behaviour.overlap) {
      case "drop": {
        n.stored = [
          ...l,
          ...r.filter((c) => !i.includes(c))
          // Elements not touched
        ];
        break;
      }
      case "invert": {
        n.stored = [
          ...l,
          ...r.filter((c) => !s.removed.includes(c))
          // Elements not removed from selection
        ];
        break;
      }
      case "keep": {
        n.stored = [
          ...r,
          ...o.filter((c) => !r.includes(c))
          // Newly added
        ];
        break;
      }
    }
  }
  /**
   * Manually triggers the start of a selection
   * @param evt A MouseEvent / TouchEvent -like object
   * @param silent If beforestart should be fired,
   */
  trigger(t, n = !0) {
    this._onTapStart(t, n);
  }
  /**
   * Can be used if during a selection elements have been added.
   * Will update everything which can be selected.
   */
  resolveSelectables() {
    this._selectables = O(this._options.selectables, this._options.document);
  }
  /**
   * Same as deselect, but for all elements currently selected.
   * @param includeStored If the store should also get cleared
   * @param quiet If move / stop events should be fired
   */
  clearSelection(t = !0, n = !1) {
    const { selected: o, stored: s, changed: i } = this._selection;
    i.added = [], i.removed.push(
      ...o,
      ...t ? s : []
    ), n || (this._emitEvent("move", null), this._emitEvent("stop", null)), this._selection = {
      stored: t ? [] : s,
      selected: [],
      touched: [],
      changed: { added: [], removed: [] }
    };
  }
  /**
   * @returns {Array} Selected elements
   */
  getSelection() {
    return this._selection.stored;
  }
  /**
   * @returns {HTMLElement} The selection area element
   */
  getSelectionArea() {
    return this._area;
  }
  /**
   * Cancel the current selection process.
   * @param keepEvent {boolean} true to fire a stop event after cancel.
   */
  cancel(t = !1) {
    this._onTapStop(null, !t);
  }
  /**
   * Unbinds all events and removes the area-element.
   */
  destroy() {
    this.cancel(), this.disable(), this._clippingElement.remove(), super.unbindAllListeners();
  }
  /**
   * Adds elements to the selection
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  select(t, n = !1) {
    const { changed: o, selected: s, stored: i } = this._selection, r = O(t, this._options.document).filter(
      (l) => !s.includes(l) && !i.includes(l)
    );
    return i.push(...r), s.push(...r), o.added.push(...r), o.removed = [], this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null)), r;
  }
  /**
   * Removes a particular element from the selection.
   * @param query - CSS Query, can be an array of queries
   * @param quiet - If this should not trigger the move event
   */
  deselect(t, n = !1) {
    const { selected: o, stored: s, changed: i } = this._selection, r = O(t, this._options.document).filter(
      (l) => o.includes(l) || s.includes(l)
    );
    r.length && (this._selection.stored = s.filter((l) => !r.includes(l)), this._selection.selected = o.filter((l) => !r.includes(l)), this._selection.changed.added = [], this._selection.changed.removed.push(
      ...r.filter((l) => !i.removed.includes(l))
    ), this._latestElement = void 0, n || (this._emitEvent("move", null), this._emitEvent("stop", null)));
  }
}
x(tt, "version", "3.5.1");
const nt = function(e, t = !0) {
  this.theme = e;
  const n = this.theme.cssVar, o = Object.keys(n);
  this.container.style.cssText = "";
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    this.container.style.setProperty(i, n[i]);
  }
  e.cssVar["--gap"] || this.container.style.setProperty("--gap", "30px"), t && this.refresh();
}, ot = function(e) {
  const n = e.parentElement.parentElement.lastElementChild;
  (n == null ? void 0 : n.tagName) === "svg" && (n == null || n.remove());
};
function Te(e) {
  return {
    nodeData: e.isFocusMode ? e.nodeDataBackup : e.nodeData,
    arrows: e.arrows,
    summaries: e.summaries,
    direction: e.direction,
    theme: e.theme
  };
}
const st = function(e, t, n) {
  if (e) {
    if (this.clearSelection(), typeof e == "string") {
      const o = M(e);
      return o ? this.selectNode(o) : void 0;
    }
    e.className = "selected", e.scrollIntoView({ block: "nearest", inline: "nearest" }), this.currentNode = e, t ? this.bus.fire("selectNewNode", e.nodeObj) : this.bus.fire("selectNode", e.nodeObj, n);
  }
}, it = function() {
  this.currentNode && (this.currentNode.className = ""), this.currentNode = null, this.bus.fire("unselectNode");
}, rt = function(e) {
  this.clearSelection();
  for (const t of e)
    t.className = "selected";
  this.currentNodes = e, this.bus.fire(
    "selectNodes",
    e.map((t) => t.nodeObj)
  );
}, lt = function() {
  if (this.currentNodes)
    for (const e of this.currentNodes)
      e.classList.remove("selected");
  this.currentNodes = null, this.bus.fire("unselectNodes");
}, ct = function() {
  this.unselectNode(), this.unselectNodes(), this.unselectSummary(), this.unselectArrow();
}, at = function() {
  const e = Te(this);
  return JSON.stringify(e, (t, n) => {
    if (!(t === "parent" && typeof n != "string"))
      return n;
  });
}, ht = function() {
  return JSON.parse(this.getDataString());
}, dt = function() {
  const e = Te(this).nodeData;
  let t = "# " + e.topic + `

`;
  function n(o, s) {
    for (let i = 0; i < o.length; i++)
      s <= 6 ? t += "".padStart(s, "#") + " " + o[i].topic + `

` : t += "".padStart(s - 7, "	") + "- " + o[i].topic + `
`, o[i].children && n(o[i].children || [], s + 1);
  }
  return n(e.children || [], 2), t;
}, ut = function() {
  this.editable = !0;
}, ft = function() {
  this.editable = !1;
}, pt = function(e) {
  this.scaleVal = e, this.map.style.transform = "scale(" + e + ")", this.bus.fire("scale", e);
}, mt = function() {
  const e = this.nodes.offsetHeight / this.container.offsetHeight, t = this.nodes.offsetWidth / this.container.offsetWidth, n = 1 / Math.max(1, Math.max(e, t));
  this.scaleVal = n, this.map.style.transform = "scale(" + n + ")", this.bus.fire("scale", n);
}, gt = function() {
  this.container.scrollTo(1e4 - this.container.offsetWidth / 2, 1e4 - this.container.offsetHeight / 2);
}, vt = function(e) {
  e(this);
}, yt = function(e) {
  e.nodeObj.parent && (this.tempDirection === null && (this.tempDirection = this.direction), this.isFocusMode || (this.nodeDataBackup = this.nodeData, this.isFocusMode = !0), this.nodeData = e.nodeObj, this.initRight(), this.toCenter());
}, bt = function() {
  this.isFocusMode = !1, this.tempDirection !== null && (this.nodeData = this.nodeDataBackup, this.direction = this.tempDirection, this.tempDirection = null, this.refresh(), this.toCenter());
}, xt = function() {
  this.direction = 0, this.refresh();
}, wt = function() {
  this.direction = 1, this.refresh();
}, _t = function() {
  this.direction = 2, this.refresh();
}, Et = function(e) {
  this.locale = e, this.refresh();
}, St = function(e, t) {
  const n = e.nodeObj;
  typeof t == "boolean" ? n.expanded = t : n.expanded !== !1 ? n.expanded = !1 : n.expanded = !0;
  const o = e.parentNode, s = o.children[1];
  if (s.expanded = n.expanded, s.className = n.expanded ? "minus" : "", ot(e), n.expanded) {
    const c = this.createChildren(
      n.children.map((d) => this.createWrapper(d).grp)
    );
    o.parentNode.appendChild(c);
  } else
    o.parentNode.children[1].remove();
  this.linkDiv(e.closest("me-main > me-wrapper"));
  const i = e.getBoundingClientRect(), r = this.container.getBoundingClientRect();
  (i.bottom > r.bottom || i.top < r.top || i.right > r.right || i.left < r.left) && e.scrollIntoView({ block: "center", inline: "center" }), this.bus.fire("expandNode", n);
}, Ct = function(e) {
  e && (e = JSON.parse(JSON.stringify(e)), this.nodeData = e.nodeData, this.arrows = e.arrows || [], this.summaries = e.summaries || []), oe(this.nodeData), this.layout(), this.linkDiv();
}, Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  cancelFocus: bt,
  clearSelection: ct,
  disableEdit: ft,
  enableEdit: ut,
  expandNode: St,
  focusNode: yt,
  getData: ht,
  getDataMd: dt,
  getDataString: at,
  initLeft: xt,
  initRight: wt,
  initSide: _t,
  install: vt,
  refresh: Ct,
  scale: pt,
  scaleFit: mt,
  selectNode: st,
  selectNodes: rt,
  setLocale: Et,
  toCenter: gt,
  unselectNode: it,
  unselectNodes: lt
}, Symbol.toStringTag, { value: "Module" })), Mt = function(e) {
  return {
    dom: e,
    moved: !1,
    // diffrentiate click and move
    mousedown: !1,
    handleMouseMove(t) {
      this.mousedown && (this.moved = !0, this.cb && this.cb(t.movementX, t.movementY));
    },
    handleMouseDown(t) {
      t.button === 0 && (this.mousedown = !0);
    },
    handleClear(t) {
      this.mousedown = !1;
    },
    cb: null,
    init(t, n) {
      this.cb = n, this.handleClear = this.handleClear.bind(this), this.handleMouseMove = this.handleMouseMove.bind(this), this.handleMouseDown = this.handleMouseDown.bind(this), t.addEventListener("mousemove", this.handleMouseMove), t.addEventListener("mouseleave", this.handleClear), t.addEventListener("mouseup", this.handleClear), this.dom.addEventListener("mousedown", this.handleMouseDown);
    },
    destory(t) {
      t.removeEventListener("mousemove", this.handleMouseMove), t.removeEventListener("mouseleave", this.handleClear), t.removeEventListener("mouseup", this.handleClear), this.dom.removeEventListener("mousedown", this.handleMouseDown);
    },
    clear() {
      this.moved = !1, this.mousedown = !1;
    }
  };
}, ve = {
  create: Mt
};
function Z(e, t, n) {
  const { offsetLeft: o, offsetTop: s } = D(e.nodes, t), i = t.offsetWidth, r = t.offsetHeight, l = o + i / 2, c = s + r / 2, d = l + n.x, a = c + n.y;
  return {
    w: i,
    h: r,
    cx: l,
    cy: c,
    ctrlX: d,
    ctrlY: a
  };
}
function j(e) {
  let t, n;
  const o = (e.cy - e.ctrlY) / (e.ctrlX - e.cx);
  return o > e.h / e.w || o < -e.h / e.w ? e.cy - e.ctrlY < 0 ? (t = e.cx - e.h / 2 / o, n = e.cy + e.h / 2) : (t = e.cx + e.h / 2 / o, n = e.cy - e.h / 2) : e.cx - e.ctrlX < 0 ? (t = e.cx + e.w / 2, n = e.cy - e.w * o / 2) : (t = e.cx - e.w / 2, n = e.cy + e.w * o / 2), {
    x: t,
    y: n
  };
}
const Tt = function(e, t, n, o) {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "text");
  return w(s, {
    "text-anchor": "middle",
    x: t + "",
    y: n + "",
    fill: o || "#666"
  }), s.dataset.type = "custom-link", s.innerHTML = e, s;
}, $e = function(e, t, n, o, s) {
  if (!t || !n)
    return;
  performance.now();
  const i = Z(e, t, o.delta1), r = Z(e, n, o.delta2), { x: l, y: c } = j(i), { ctrlX: d, ctrlY: a } = i, { ctrlX: u, ctrlY: h } = r, { x: p, y: m } = j(r), g = U(u, h, p, m), f = `M ${g.x1} ${g.y1} L ${p} ${m} L ${g.x2} ${g.y2}`;
  let v = "";
  if (o.bidirectional) {
    const L = U(d, a, l, c);
    v = `M ${L.x1} ${L.y1} L ${l} ${c} L ${L.x2} ${L.y2}`;
  }
  const _ = We(`M ${l} ${c} C ${d} ${a} ${u} ${h} ${p} ${m}`, f, v), E = l / 8 + d * 3 / 8 + u * 3 / 8 + p / 8, y = c / 8 + a * 3 / 8 + h * 3 / 8 + m / 8, b = Tt(o.label, E, y, e.theme.cssVar["--color"]);
  _.appendChild(b), _.arrowObj = o, _.dataset.linkid = o.id, e.linkSvgGroup.appendChild(_), s || (e.arrows.push(o), e.currentArrow = _, Ne(e, o, i, r)), performance.now();
}, $t = function(e, t, n = {}) {
  const o = {
    id: ee(),
    label: "Custom Link",
    from: e.nodeObj.id,
    to: t.nodeObj.id,
    delta1: {
      x: 0,
      y: -200
    },
    delta2: {
      x: 0,
      y: -200
    },
    ...n
  };
  $e(this, e, t, o), this.bus.fire("operation", {
    name: "createArrow",
    obj: o
  });
}, Nt = function(e) {
  let t;
  if (e ? t = e : t = this.currentArrow, !t)
    return;
  se(this);
  const n = t.arrowObj.id;
  this.arrows = this.arrows.filter((o) => o.id !== n), t.remove(), this.bus.fire("operation", {
    name: "removeArrow",
    obj: {
      id: n
    }
  });
}, At = function(e) {
  this.currentArrow = e;
  const t = e.arrowObj, n = M(t.from), o = M(t.to), s = Z(this, n, t.delta1), i = Z(this, o, t.delta2);
  Ne(this, t, s, i);
}, kt = function() {
  this.currentArrow = null, se(this);
}, se = function(e) {
  var t, n;
  (t = e.helper1) == null || t.destory(e.map), (n = e.helper2) == null || n.destory(e.map), e.linkController.style.display = "none", e.P2.style.display = "none", e.P3.style.display = "none";
}, Ne = function(e, t, n, o) {
  e.linkController.style.display = "initial", e.P2.style.display = "initial", e.P3.style.display = "initial", e.nodes.appendChild(e.linkController), e.nodes.appendChild(e.P2), e.nodes.appendChild(e.P3);
  let { x: s, y: i } = j(n), { ctrlX: r, ctrlY: l } = n, { ctrlX: c, ctrlY: d } = o, { x: a, y: u } = j(o);
  e.P2.style.cssText = `top:${l}px;left:${r}px;`, e.P3.style.cssText = `top:${d}px;left:${c}px;`, w(e.line1, {
    x1: s + "",
    y1: i + "",
    x2: r + "",
    y2: l + ""
  }), w(e.line2, {
    x1: c + "",
    y1: d + "",
    x2: a + "",
    y2: u + ""
  }), e.helper1 = ve.create(e.P2), e.helper2 = ve.create(e.P3), e.helper1.init(e.map, (h, p) => {
    if (!e.currentArrow)
      return;
    r = r + h / e.scaleVal, l = l + p / e.scaleVal;
    const m = j({ ...n, ctrlX: r, ctrlY: l });
    s = m.x, i = m.y;
    const g = s / 8 + r * 3 / 8 + c * 3 / 8 + a / 8, f = i / 8 + l * 3 / 8 + d * 3 / 8 + u / 8;
    if (e.P2.style.top = l + "px", e.P2.style.left = r + "px", e.currentArrow.children[0].setAttribute("d", `M ${s} ${i} C ${r} ${l} ${c} ${d} ${a} ${u}`), t.bidirectional) {
      const v = U(r, l, s, i);
      e.currentArrow.children[2].setAttribute("d", `M ${v.x1} ${v.y1} L ${s} ${i} L ${v.x2} ${v.y2}`);
    }
    w(e.currentArrow.children[3], {
      x: g + "",
      y: f + ""
    }), w(e.line1, {
      x1: s + "",
      y1: i + "",
      x2: r + "",
      y2: l + ""
    }), t.delta1.x = r - n.cx, t.delta1.y = l - n.cy, e.bus.fire("updateArrowDelta", t);
  }), e.helper2.init(e.map, (h, p) => {
    if (!e.currentArrow)
      return;
    c = c + h / e.scaleVal, d = d + p / e.scaleVal;
    const m = j({ ...o, ctrlX: c, ctrlY: d });
    a = m.x, u = m.y;
    const g = s / 8 + r * 3 / 8 + c * 3 / 8 + a / 8, f = i / 8 + l * 3 / 8 + d * 3 / 8 + u / 8, v = U(c, d, a, u);
    e.P3.style.top = d + "px", e.P3.style.left = c + "px", e.currentArrow.children[0].setAttribute("d", `M ${s} ${i} C ${r} ${l} ${c} ${d} ${a} ${u}`), e.currentArrow.children[1].setAttribute("d", `M ${v.x1} ${v.y1} L ${a} ${u} L ${v.x2} ${v.y2}`), w(e.currentArrow.children[3], {
      x: g + "",
      y: f + ""
    }), w(e.line2, {
      x1: c + "",
      y1: d + "",
      x2: a + "",
      y2: u + ""
    }), t.delta2.x = c - o.cx, t.delta2.y = d - o.cy, e.bus.fire("updateArrowDelta", t);
  });
};
function Ht() {
  this.linkSvgGroup.innerHTML = "";
  for (let e = 0; e < this.arrows.length; e++) {
    const t = this.arrows[e];
    try {
      $e(this, M(t.from), M(t.to), t, !0);
    } catch {
    }
  }
  this.nodes.appendChild(this.linkSvgGroup);
}
function Dt(e) {
  if (se(this), !e)
    return;
  const t = e.children[3];
  Ce(this, t, (n) => {
    var i;
    const o = e.arrowObj, s = ((i = n.textContent) == null ? void 0 : i.trim()) || "";
    s === "" ? o.label = origin : o.label = s, n.remove(), s !== origin && (t.innerHTML = o.label, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEditArrowLabel",
      obj: o
    }));
  });
}
function Pt() {
  this.arrows = this.arrows.filter((e) => J(e.from, this.nodeData) && J(e.to, this.nodeData));
}
const Bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createArrow: $t,
  editArrowLabel: Dt,
  removeArrow: Nt,
  renderArrow: Ht,
  selectArrow: At,
  tidyArrow: Pt,
  unselectArrow: kt
}, Symbol.toStringTag, { value: "Module" })), zt = function(e) {
  var c, d;
  if (e.length === 0)
    throw new Error("No selected node.");
  if (e.length === 1) {
    const a = e[0].nodeObj, u = e[0].nodeObj.parent;
    if (!u)
      throw new Error("Can not select root node.");
    const h = u.children.findIndex((p) => a === p);
    return {
      parent: u.id,
      start: h,
      end: h
    };
  }
  let t = 0;
  const n = e.map((a) => {
    let u = a.nodeObj;
    const h = [];
    for (; u.parent; ) {
      const p = u.parent, m = p.children, g = m == null ? void 0 : m.indexOf(u);
      u = p, h.unshift({ node: u, index: g });
    }
    return h.length > t && (t = h.length), h;
  });
  let o = 0;
  e:
    for (; o < t; o++) {
      const a = (c = n[0][o]) == null ? void 0 : c.node;
      for (let u = 1; u < n.length; u++)
        if (((d = n[u][o]) == null ? void 0 : d.node) !== a)
          break e;
    }
  if (!o)
    throw new Error("Can not select root node.");
  const s = n.map((a) => a[o - 1].index).sort(), i = s[0] || 0, r = s[s.length - 1] || 0, l = n[0][o - 1].node;
  if (!l.parent)
    throw new Error("Please select nodes in the same main topic.");
  return {
    parent: l.id,
    start: i,
    end: r
  };
}, Ot = function(e) {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return t.setAttribute("id", e), t;
}, ye = function(e, t) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return w(n, {
    d: e,
    stroke: t || "#666",
    fill: "none",
    "stroke-linecap": "round",
    "stroke-width": "2"
  }), n;
}, be = function(e, t, n, o, s) {
  const i = document.createElementNS("http://www.w3.org/2000/svg", "text");
  return w(i, {
    "text-anchor": o,
    x: t + "",
    y: n + "",
    fill: s || "#666"
  }), i.innerHTML = e, i;
}, jt = (e) => M(e).parentElement.parentElement, Rt = function({ parent: e, start: t }) {
  const n = M(e), o = n.nodeObj;
  let s;
  return o.parent ? s = n.closest("me-main").className : s = M(o.children[t].id).closest("me-main").className, s;
}, ie = function(e, t) {
  var L;
  const { id: n, text: o, parent: s, start: i, end: r } = t, l = e.nodes, d = M(s).nodeObj, a = Rt(t);
  let u = 1 / 0, h = 0, p = 0, m = 0;
  for (let N = i; N <= r; N++) {
    const re = (L = d.children) == null ? void 0 : L[N];
    if (!re)
      return e.removeSummary(n), null;
    const I = jt(re.id), { offsetLeft: X, offsetTop: le } = D(l, I), ce = i === r ? 10 : 20;
    N === i && (p = le + ce), N === r && (m = le + I.offsetHeight - ce), X < u && (u = X), I.offsetWidth + X > h && (h = I.offsetWidth + X);
  }
  let g, f;
  const v = p + 10, _ = m + 10, E = (v + _) / 2, y = e.theme.cssVar["--color"];
  a === T.LHS ? (g = ye(`M ${u + 10} ${v} c -5 0 -10 5 -10 10 L ${u} ${_ - 10} c 0 5 5 10 10 10 M ${u} ${E} h -10`, y), f = be(o, u - 20, E + 6, "end", y)) : (g = ye(`M ${h - 10} ${v} c 5 0 10 5 10 10 L ${h} ${_ - 10} c 0 5 -5 10 -10 10 M ${h} ${E} h 10`, y), f = be(o, h + 20, E + 6, "start", y));
  const b = Ot("s-" + n);
  return b.appendChild(g), b.appendChild(f), b.summaryObj = t, e.summarySvg.appendChild(b), b;
}, qt = function() {
  let e = [];
  this.currentNode ? e = [this.currentNode] : this.currentNodes && (e = this.currentNodes);
  const { parent: t, start: n, end: o } = zt(e), s = { id: ee(), parent: t, start: n, end: o, text: "summary" }, i = ie(this, s);
  this.summaries.push(s), this.editSummary(i), this.bus.fire("operation", {
    name: "createSummary",
    obj: s
  });
}, Vt = function(e) {
  const t = ee(), n = { ...e, id: t };
  ie(this, n), this.summaries.push(n), this.bus.fire("operation", {
    name: "createSummary",
    obj: n
  });
}, Wt = function(e) {
  var n;
  const t = this.summaries.findIndex((o) => o.id === e);
  t > -1 && (this.summaries.splice(t, 1), (n = document.querySelector("#s-" + e)) == null || n.remove()), this.bus.fire("operation", {
    name: "removeSummary",
    obj: { id: e }
  });
}, Ft = function(e) {
  const t = e.children[1].getBBox(), n = 6, o = 3, s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  w(s, {
    x: t.x - n + "",
    y: t.y - n + "",
    width: t.width + n * 2 + "",
    height: t.height + n * 2 + "",
    rx: o + "",
    stroke: this.theme.cssVar["--selected"] || "#4dc4ff",
    "stroke-width": "2",
    fill: "none"
  }), e.appendChild(s), this.currentSummary = e;
}, It = function() {
  var e, t;
  (t = (e = this.currentSummary) == null ? void 0 : e.querySelector("rect")) == null || t.remove(), this.currentSummary = null;
}, Xt = function() {
  this.summarySvg.innerHTML = "", this.summaries.forEach((e) => {
    try {
      ie(this, e);
    } catch {
    }
  }), this.nodes.insertAdjacentElement("beforeend", this.summarySvg);
}, Yt = function(e) {
  if (!e)
    return;
  const t = e.childNodes[1];
  Ce(this, t, (n) => {
    var i;
    const o = e.summaryObj, s = ((i = n.textContent) == null ? void 0 : i.trim()) || "";
    s === "" ? o.text = origin : o.text = s, n.remove(), s !== origin && (t.innerHTML = o.text, this.linkDiv(), this.bus.fire("operation", {
      name: "finishEditSummary",
      obj: o
    }));
  });
}, Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createSummary: qt,
  createSummaryFrom: Vt,
  editSummary: Yt,
  removeSummary: Wt,
  renderSummary: Xt,
  selectSummary: Ft,
  unselectSummary: It
}, Symbol.toStringTag, { value: "Module" })), C = "http://www.w3.org/2000/svg";
function Kt(e, t) {
  const n = document.createElementNS(C, "svg");
  return w(n, {
    version: "1.1",
    xmlns: C,
    height: e,
    width: t
  }), n;
}
function Jt(e, t) {
  return (parseInt(e) - parseInt(t)) / 2;
}
function Ut(e, t, n, o) {
  const s = document.createElementNS(C, "g");
  let i = "";
  return e.text ? i = e.text.textContent : i = e.childNodes[0].textContent, i.split(`
`).forEach((l, c) => {
    const d = document.createElementNS(C, "text");
    w(d, {
      x: n + parseInt(t.paddingLeft) + "",
      y: o + parseInt(t.paddingTop) + Jt(t.lineHeight, t.fontSize) * (c + 1) + parseFloat(t.fontSize) * (c + 1) + "",
      "text-anchor": "start",
      "font-family": t.fontFamily,
      "font-size": `${t.fontSize}`,
      "font-weight": `${t.fontWeight}`,
      fill: `${t.color}`
    }), d.innerHTML = l, s.appendChild(d);
  }), s;
}
function Qt(e, t, n, o) {
  var l;
  let s = "";
  (l = e.nodeObj) != null && l.dangerouslySetInnerHTML ? s = e.nodeObj.dangerouslySetInnerHTML : e.text ? s = e.text.textContent : s = e.childNodes[0].textContent;
  const i = document.createElementNS(C, "foreignObject");
  w(i, {
    x: n + parseInt(t.paddingLeft) + "",
    y: o + parseInt(t.paddingTop) + "",
    width: t.width,
    height: t.height
  });
  const r = document.createElement("div");
  return w(r, {
    xmlns: "http://www.w3.org/1999/xhtml",
    style: `font-family: ${t.fontFamily}; font-size: ${t.fontSize}; font-weight: ${t.fontWeight}; color: ${t.color}; white-space: pre-wrap;`
  }), r.innerHTML = s, i.appendChild(r), i;
}
function Zt(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: s } = D(e.nodes, t), i = document.createElementNS(C, "rect");
  return w(i, {
    x: o + "",
    y: s + "",
    rx: n.borderRadius,
    ry: n.borderRadius,
    width: n.width,
    height: n.height,
    fill: n.backgroundColor,
    stroke: n.borderColor,
    "stroke-width": n.borderWidth
  }), i;
}
function G(e, t, n = !1) {
  const o = getComputedStyle(t), { offsetLeft: s, offsetTop: i } = D(e.nodes, t), r = document.createElementNS(C, "rect");
  w(r, {
    x: s + "",
    y: i + "",
    rx: o.borderRadius,
    ry: o.borderRadius,
    width: o.width,
    height: o.height,
    fill: o.backgroundColor,
    stroke: o.borderColor,
    "stroke-width": o.borderWidth
  });
  const l = document.createElementNS(C, "g");
  l.appendChild(r);
  let c;
  return n ? c = Qt(t, o, s, i) : c = Ut(t, o, s, i), l.appendChild(c), l;
}
function en(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: s } = D(e.nodes, t), i = document.createElementNS(C, "a"), r = document.createElementNS(C, "text");
  return w(r, {
    x: o + "",
    y: s + parseInt(n.fontSize) + "",
    "text-anchor": "start",
    "font-family": n.fontFamily,
    "font-size": `${n.fontSize}`,
    "font-weight": `${n.fontWeight}`,
    fill: `${n.color}`
  }), r.innerHTML = t.textContent, i.appendChild(r), i.setAttribute("href", t.href), i;
}
function tn(e, t) {
  const n = getComputedStyle(t), { offsetLeft: o, offsetTop: s } = D(e.nodes, t), i = document.createElementNS(C, "image");
  return w(i, {
    x: o + "",
    y: s + "",
    width: n.width + "",
    height: n.height + "",
    href: t.src
  }), i;
}
const K = 100, nn = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', on = (e, t = !1) => {
  var u, h, p;
  const n = e.nodes, o = n.offsetHeight + K * 2, s = n.offsetWidth + K * 2, i = Kt(o + "px", s + "px"), r = document.createElementNS(C, "svg"), l = document.createElementNS(C, "rect");
  w(l, {
    x: "0",
    y: "0",
    width: `${s}`,
    height: `${o}`,
    fill: e.theme.cssVar["--bgcolor"]
  }), i.appendChild(l), n.querySelectorAll(".subLines").forEach((m) => {
    const g = m.cloneNode(!0), { offsetLeft: f, offsetTop: v } = D(n, m.parentElement);
    g.setAttribute("x", `${f}`), g.setAttribute("y", `${v}`), r.appendChild(g);
  });
  const c = (u = n.querySelector(".lines")) == null ? void 0 : u.cloneNode(!0);
  c && r.appendChild(c);
  const d = (h = n.querySelector(".topiclinks")) == null ? void 0 : h.cloneNode(!0);
  d && r.appendChild(d);
  const a = (p = n.querySelector(".summary")) == null ? void 0 : p.cloneNode(!0);
  return a && r.appendChild(a), n.querySelectorAll("me-tpc").forEach((m) => {
    m.nodeObj.dangerouslySetInnerHTML ? r.appendChild(G(e, m, !t)) : (r.appendChild(Zt(e, m)), r.appendChild(G(e, m.text, !t)));
  }), n.querySelectorAll(".tags > span").forEach((m) => {
    r.appendChild(G(e, m));
  }), n.querySelectorAll(".icons > span").forEach((m) => {
    r.appendChild(G(e, m));
  }), n.querySelectorAll(".hyper-link").forEach((m) => {
    r.appendChild(en(e, m));
  }), n.querySelectorAll("img").forEach((m) => {
    r.appendChild(tn(e, m));
  }), w(r, {
    x: K + "",
    y: K + "",
    overflow: "visible"
  }), i.appendChild(r), i;
}, sn = (e, t) => (t && e.insertAdjacentHTML("afterbegin", "<style>" + t + "</style>"), nn + e.outerHTML);
function rn(e) {
  return new Promise((t, n) => {
    const o = new FileReader();
    o.onload = (s) => {
      t(s.target.result);
    }, o.onerror = (s) => {
      n(s);
    }, o.readAsDataURL(e);
  });
}
const ln = function(e = !1, t) {
  const n = on(this, e), o = sn(n, t);
  return new Blob([o], { type: "image/svg+xml" });
}, cn = async function(e = !1, t) {
  const n = this.exportSvg(e, t), o = await rn(n);
  return new Promise((s, i) => {
    const r = new Image();
    r.setAttribute("crossOrigin", "anonymous"), r.onload = () => {
      const l = document.createElement("canvas");
      l.width = r.width, l.height = r.height, l.getContext("2d").drawImage(r, 0, 0), l.toBlob(s, "image/png", 1);
    }, r.src = o, r.onerror = i;
  });
}, an = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exportPng: cn,
  exportSvg: ln
}, Symbol.toStringTag, { value: "Module" })), hn = {}, dn = {
  getObjById: J,
  generateNewObj: Ae,
  layout: De,
  linkDiv: Fe,
  editTopic: qe,
  createWrapper: ze,
  createParent: Oe,
  createChildren: je,
  createTopic: Re,
  findEle: M,
  changeTheme: nt,
  ...Lt,
  ...hn,
  ...Bt,
  ...Gt,
  ...an,
  init(e) {
    if (e = JSON.parse(JSON.stringify(e)), !e || !e.nodeData)
      return new Error("MindElixir: `data` is required");
    e.direction !== void 0 && (this.direction = e.direction), this.changeTheme(e.theme || this.theme, !1), this.nodeData = e.nodeData, oe(this.nodeData), this.arrows = e.arrows || [], this.summaries = e.summaries || [], this.tidyArrow(), this.toolBar && Ye(this), this.toCenter(), this.layout(), this.linkDiv();
  },
  destroy() {
    var e;
    this.disposable.forEach((t) => t()), this.el && (this.el.innerHTML = ""), this.el = void 0, this.nodeData = void 0, this.arrows = void 0, this.summaries = void 0, this.currentArrow = void 0, this.currentNode = void 0, this.currentNodes = void 0, this.currentSummary = void 0, this.waitCopy = void 0, this.theme = void 0, this.direction = void 0, this.bus = void 0, this.container = void 0, this.map = void 0, this.lines = void 0, this.linkController = void 0, this.linkSvgGroup = void 0, this.P2 = void 0, this.P3 = void 0, this.line1 = void 0, this.line2 = void 0, this.nodes = void 0, (e = this.selection) == null || e.destroy(), this.selection = void 0;
  }
};
function un({ pT: e, pL: t, pW: n, pH: o, cT: s, cL: i, cW: r, cH: l, direction: c, containerHeight: d }) {
  let a = t + n / 2;
  const u = e + o / 2;
  let h;
  c === T.LHS ? h = i + r : h = i;
  const p = s + l / 2, g = (1 - Math.abs(p - u) / d) * 0.25 * (n / 2);
  return c === T.LHS ? a = a - n / 10 - g : a = a + n / 10 + g, `M ${a} ${u} Q ${a} ${p} ${h} ${p}`;
}
function fn({ pT: e, pL: t, pW: n, pH: o, cT: s, cL: i, cW: r, cH: l, direction: c, isFirst: d }) {
  const a = parseInt(this.container.style.getPropertyValue("--gap"));
  let u = 0, h = 0;
  d ? u = e + o / 2 : u = e + o;
  const p = s + l;
  let m = 0, g = 0, f = 0;
  const v = Math.abs(u - p) / 300 * a;
  return c === T.LHS ? (f = t, m = f + a, g = f - a, h = i + a, `M ${m} ${u} C ${f} ${u} ${f + v} ${p} ${g} ${p} H ${h}`) : (f = t + n, m = f - a, g = f + a, h = i + r - a, `M ${m} ${u} C ${f} ${u} ${f - v} ${p} ${g} ${p} H ${h}`);
}
const pn = "4.6.3", V = document;
function $({
  el: e,
  direction: t,
  locale: n,
  draggable: o,
  editable: s,
  contextMenu: i,
  toolBar: r,
  keypress: l,
  mouseSelectionButton: c,
  selectionContainer: d,
  before: a,
  newTopicName: u,
  allowUndo: h,
  generateMainBranch: p,
  generateSubBranch: m,
  overflowHidden: g,
  theme: f,
  alignment: v,
  scaleSensitivity: _,
  selectionDisabled: E
}) {
  let y = null;
  const b = Object.prototype.toString.call(e);
  if (b === "[object HTMLDivElement]" ? y = e : b === "[object String]" && (y = document.querySelector(e)), !y)
    throw new Error("MindElixir: el is not a valid element");
  y.style.position = "relative", y.innerHTML = "", this.el = y, this.disposable = [], this.before = a || {}, this.locale = n || "en", this.contextMenu = i === void 0 ? !0 : i, this.toolBar = r === void 0 ? !0 : r, this.keypress = l === void 0 ? !0 : l, this.mouseSelectionButton = c || 0, this.direction = typeof t == "number" ? t : 1, this.draggable = o === void 0 ? !0 : o, this.newTopicName = u || "new node", this.editable = s === void 0 ? !0 : s, this.allowUndo = h === void 0 ? !1 : h, this.scaleSensitivity = typeof _ == "number" ? _ : 0.2, this.currentNode = null, this.currentArrow = null, this.scaleVal = 1, this.tempDirection = null, this.generateMainBranch = p || un, this.generateSubBranch = m || fn, this.overflowHidden = g || !1, this.bus = He.create(), this.container = V.createElement("div"), this.selectionContainer = d || this.container, this.selectionDisabled = E || !1, this.container.className = "map-container";
  const L = window.matchMedia("(prefers-color-scheme: dark)");
  this.theme = f || (L.matches ? we : xe);
  const N = V.createElement("div");
  N.className = "map-canvas", this.map = N, this.map.setAttribute("tabindex", "0"), this.container.appendChild(this.map), this.el.appendChild(this.container), this.nodes = V.createElement("me-nodes"), this.nodes.className = "main-node-container", this.lines = W("lines"), this.summarySvg = W("summary"), this.linkController = W("linkcontroller"), this.P2 = V.createElement("div"), this.P3 = V.createElement("div"), this.P2.className = this.P3.className = "circle", this.P2.style.display = this.P3.style.display = "none", this.line1 = de(), this.line2 = de(), this.linkController.appendChild(this.line1), this.linkController.appendChild(this.line2), this.linkSvgGroup = W("topiclinks"), this.alignment = v ?? "root", this.map.appendChild(this.nodes), this.overflowHidden ? this.container.style.overflow = "hidden" : ke(this);
}
$.prototype = dn;
$.LEFT = R;
$.RIGHT = te;
$.SIDE = ne;
$.THEME = xe;
$.DARK_THEME = we;
$.version = pn;
$.E = M;
$.dragMoveHelper = H;
export {
  $ as default
};
