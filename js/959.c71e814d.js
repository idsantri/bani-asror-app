"use strict";(globalThis["webpackChunkbani_asror_app"]=globalThis["webpackChunkbani_asror_app"]||[]).push([[959],{7959:(e,t,a)=>{a.r(t),a.d(t,{default:()=>S});var l=a(1347),n=a(4187),o=a(1659),i=a(4257),s=a(5469),r=a(3022);const d={class:"text-green-10"},u=["innerHTML"],c=(0,l.Lk)("div",{class:"text-h6 text-green-10"},"Edit Artikel",-1),g={__name:"HomeIndex",emits:["pageTitle","pageSubTitle","showButtonSearch"],setup(e,{emit:t}){const a=(0,r.A)(),g=t;g("pageTitle","Ahlan wa Sahlan …"),g("pageSubTitle",null),g("showButtonSearch",!1);const p=(0,n.KR)(!1),b=(0,n.KR)(""),m=(0,n.KR)("");(0,l.nT)((()=>{p.value&&(m.value=b.value)})),(0,l.sV)((async()=>{try{const e=await o.r.get("settings/article-introduction");b.value=e.data.data.setting.val}catch(e){toArray(e.response.data.message).forEach((e=>{(0,s.UG)(e)}))}}));const h=()=>!(!(0,i.A)().getGroup.is_superadmin&&!(0,i.A)().getGroup.is_admin),v=async()=>{try{const e=await o.r.put("settings/article-introduction",{val:m.value});(0,s.VX)(e.data.message),b.value=e.data.data.setting.val}catch(e){toArray(e.response.data.message).forEach((e=>{(0,s.UG)(e)}))}finally{p.value=!1}},f=[[{label:a.lang.editor.align,icon:a.iconSet.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["bold","italic","strike","underline","subscript","superscript"],["token","hr","link","custom_btn"],[{label:a.lang.editor.formatting,icon:a.iconSet.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:a.lang.editor.fontSize,icon:a.iconSet.editor.fontSize,fixedLabel:!0,fixedIcon:!0,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"]];return(e,t)=>{const o=(0,l.g2)("q-card-section"),i=(0,l.g2)("q-card"),s=(0,l.g2)("q-btn"),r=(0,l.g2)("q-editor"),g=(0,l.g2)("q-card-actions"),k=(0,l.g2)("q-dialog"),_=(0,l.gN)("close-popup");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("div",d,[(0,l.bF)(i,null,{default:(0,l.k6)((()=>[(0,l.bF)(o,null,{default:(0,l.k6)((()=>[(0,l.Lk)("span",{innerHTML:b.value},null,8,u)])),_:1})])),_:1})]),h()?((0,l.uX)(),(0,l.Wv)(s,{key:0,onClick:t[0]||(t[0]=e=>p.value=!0),round:"",color:"green-8",icon:"edit",class:"absolute-bottom-left q-ml-md q-mb-xl"})):(0,l.Q3)("",!0),(0,l.bF)(k,{modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=e=>p.value=e),maximized:""},{default:(0,l.k6)((()=>[(0,l.bF)(i,null,{default:(0,l.k6)((()=>[(0,l.bF)(o,null,{default:(0,l.k6)((()=>[c])),_:1}),(0,l.bF)(o,{class:"q-pt-none"},{default:(0,l.k6)((()=>[(0,l.bF)(r,{modelValue:m.value,"onUpdate:modelValue":t[1]||(t[1]=e=>m.value=e),"min-height":"5rem",dense:(0,n.R1)(a).screen.lt.md,toolbar:f},null,8,["modelValue","dense"])])),_:1}),(0,l.bF)(g,{align:"right",class:"bg-white text-green"},{default:(0,l.k6)((()=>[(0,l.bF)(s,{color:"positive",label:"Simpan",onClick:v}),(0,l.bo)((0,l.bF)(s,{color:"negative",label:"Gagal"},null,512),[[_]])])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}}};var p=a(3341),b=a(222),m=a(2677),h=a(45),v=a(30),f=a(5034),k=a(8657),_=a(272),A=a.n(_);const F=g,S=F;A()(g,"components",{QCard:p.A,QCardSection:b.A,QBtn:m.A,QDialog:h.A,QEditor:v.A,QCardActions:f.A}),A()(g,"directives",{ClosePopup:k.A})}}]);