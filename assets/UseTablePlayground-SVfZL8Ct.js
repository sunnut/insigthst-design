import{s as le,r as n,a4 as ot,t as at,l as Te,m as A,b1 as ye,O as lt,ae as it,J as Et,M as k,af as ze,U as ct,a0 as dt,$ as fe,cB as mt,bK as Ft,ad as Mt,cC as De,cD as se,bL as He,a5 as K,aH as Lt,cE as Nt,X as Be,a6 as ve,V as jt,cF as Ut,a_ as Pt,cG as Rt,cH as At,cI as ut,cJ as Tt,cK as zt,ag as he,Y as we,w as qe,cL as Dt,aE as Bt,bx as kt,bE as _e,cM as Ot,y as pt,i as Vt,I as Ht,a7 as qt,ai as _t,bP as Wt,G as Gt,ay as Xt,aI as Kt,az as Qt,ak as Yt,o as Jt,cN as gt,C as ft,cO as Zt,bI as es,cP as ts,cQ as ss,cR as ns,bD as rs,b6 as os,cS as as,cT as ls,ab as Me,j as i,k as pe,aA as is}from"./index-xmebibFO.js";import{u as cs}from"./useFetch-BR2-YnyL.js";import{C as de}from"./CodeBlock-yFUMCofH.js";import{P as ds,a as ae,b as ms}from"./playgroundLayout-CGRPHSL3.js";import{S as We,T as us}from"./index-DBXKx-wM.js";import{C as ps}from"./index-MYjNgFGO.js";import{F as gs}from"./Table-D1NkAf_t.js";import{g as ht,h as bt,t as Ne,i as fs}from"./index-Bb-42o0d.js";import{C as xt,R as hs}from"./row-D629FKty.js";import{m as Re,u as bs,r as xs}from"./useBreakpoint-BTBPzJyn.js";import{M as ke}from"./index-B1BLf4B9.js";import{I as Ee}from"./index-cDK7M9L-.js";import{T as yt}from"./index-C3vQFiwS.js";import"./check-Dj_QKhp6.js";import"./copy-pcll_cHZ.js";import"./PlusOutlined-BqMy9szs.js";import"./index-CVXb91g1.js";import"./index-CjaCUbl5.js";import"./index-D5q0OV2r.js";import"./SearchOutlined-DLe303NC.js";import"./Input-BKc4tNfr.js";import"./EyeOutlined-DDJ_kKJH.js";const ys={xxxl:4,xxl:3,xl:3,lg:3,md:3,sm:2,xs:1},Oe=le.createContext(null),Cs=e=>at(e).map(t=>({...t==null?void 0:t.props,key:t.key}));function $s(e,t,s){const r=n.useMemo(()=>t||Cs(s),[t,s]);return n.useMemo(()=>r.map(({span:o,...l})=>o==="filled"?{...l,filled:!0}:{...l,span:ot(o)?o:Re(e,o)}),[r,e])}function Ss(e,t){let s=[],r=[],a=!1,o=0;return e.filter(l=>l).forEach(l=>{const{filled:d,...m}=l;if(d){r.push(m),s.push(r),r=[],o=0;return}const c=t-o;o+=l.span||1,o>=t?(o>t?(a=!0,r.push({...m,span:c})):r.push(m),s.push(r),r=[],o=0):r.push(m)}),r.length>0&&s.push(r),s=s.map(l=>{const d=l.reduce((m,c)=>m+(c.span||1),0);if(d<t){const m=l[l.length-1];return m.span=t-(d-(m.span||1)),l}return l}),[s,a]}const Is=(e,t)=>{const[s,r]=n.useMemo(()=>Ss(t,e),[t,e]);return s},vs=e=>e.children,je=e=>{const{itemPrefixCls:t,component:s,span:r,className:a,style:o,labelStyle:l,contentStyle:d,bordered:m,label:c,content:p,colon:h,type:f,styles:v,classNames:E}=e,$=s,{classNames:S,styles:I}=le.useContext(Oe),[b,u]=Te([S,E],[I,v],{props:e}),g={...l,...u.label},y={...d,...u.content};return m?le.createElement($,{colSpan:r,style:o,className:A(a,{[`${t}-item-${f}`]:f==="label"||f==="content",[b.label]:b.label&&f==="label",[b.content]:b.content&&f==="content"})},ye(c)&&le.createElement("span",{style:g},c),ye(p)&&le.createElement("span",{style:y},p)):le.createElement($,{className:A(`${t}-item`,a),style:o,colSpan:r},le.createElement("div",{className:`${t}-item-container`},ye(c)&&le.createElement("span",{style:g,className:A(`${t}-item-label`,b.label,{[`${t}-item-no-colon`]:!h})},c),ye(p)&&le.createElement("span",{style:y,className:A(`${t}-item-content`,b.content)},p)))};function Ue(e,{colon:t,prefixCls:s,bordered:r},{component:a,type:o,showLabel:l,showContent:d,labelStyle:m,contentStyle:c,styles:p}){return e.map(({label:h,children:f,prefixCls:v=s,className:E,style:$,labelStyle:S,contentStyle:I,span:b=1,key:u,styles:g,classNames:y},x)=>typeof a=="string"?n.createElement(je,{key:`${o}-${u||x}`,className:E,style:$,classNames:y,styles:{label:{...m,...p==null?void 0:p.label,...S,...g==null?void 0:g.label},content:{...c,...p==null?void 0:p.content,...I,...g==null?void 0:g.content}},span:b,colon:t,component:a,itemPrefixCls:v,bordered:r,label:l?h:null,content:d?f:null,type:o}):[n.createElement(je,{key:`label-${u||x}`,className:E,style:{...m,...p==null?void 0:p.label,...$,...S,...g==null?void 0:g.label},span:1,colon:t,component:a[0],itemPrefixCls:v,bordered:r,label:h,type:"label"}),n.createElement(je,{key:`content-${u||x}`,className:E,style:{...c,...p==null?void 0:p.content,...$,...I,...g==null?void 0:g.content},span:b*2-1,component:a[1],itemPrefixCls:v,bordered:r,content:f,type:"content"})])}const ws=e=>{const t=n.useContext(Oe),{prefixCls:s,vertical:r,row:a,index:o,bordered:l}=e;return r?n.createElement(n.Fragment,null,n.createElement("tr",{key:`label-${o}`,className:`${s}-row`},Ue(a,e,{component:"th",type:"label",showLabel:!0,...t})),n.createElement("tr",{key:`content-${o}`,className:`${s}-row`},Ue(a,e,{component:"td",type:"content",showContent:!0,...t}))):n.createElement("tr",{key:o,className:`${s}-row`},Ue(a,e,{component:l?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0,...t}))},Es=e=>{const{componentCls:t,labelBg:s}=e;return{[`&${t}-bordered`]:{[`> ${t}-view`]:{border:`${k(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"> table":{tableLayout:"auto"},[`${t}-row`]:{borderBottom:`${k(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:first-child":{"> th:first-child, > td:first-child":{borderStartStartRadius:e.borderRadiusLG}},"&:last-child":{borderBottom:"none","> th:first-child, > td:first-child":{borderEndStartRadius:e.borderRadiusLG}},[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${k(e.padding)} ${k(e.paddingLG)}`,borderInlineEnd:`${k(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:last-child":{borderInlineEnd:"none"}},[`> ${t}-item-label`]:{color:e.colorTextSecondary,backgroundColor:s,"&::after":{display:"none"}}}},[`&${t}-medium`]:{[`${t}-row`]:{[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${k(e.paddingSM)} ${k(e.paddingLG)}`}}},[`&${t}-small`]:{[`${t}-row`]:{[`> ${t}-item-label, > ${t}-item-content`]:{padding:`${k(e.paddingXS)} ${k(e.padding)}`}}}}}},Fs=e=>{const{componentCls:t,extraColor:s,itemPaddingBottom:r,itemPaddingEnd:a,colonMarginRight:o,colonMarginLeft:l,titleMarginBottom:d}=e;return{[t]:{...ze(e),...Es(e),"&-rtl":{direction:"rtl"},[`${t}-header`]:{display:"flex",alignItems:"center",marginBottom:d},[`${t}-title`]:{...Et,flex:"auto",color:e.titleColor,fontWeight:e.fontWeightStrong,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG},[`${t}-extra`]:{marginInlineStart:"auto",color:s,fontSize:e.fontSize},[`${t}-view`]:{width:0,minWidth:"100%",borderRadius:e.borderRadiusLG,table:{width:"100%",tableLayout:"fixed",borderCollapse:"collapse"}},[`${t}-row`]:{"> th, > td":{paddingBottom:r,paddingInlineEnd:a},"> th:last-child, > td:last-child":{paddingInlineEnd:0},"&:last-child":{borderBottom:"none","> th, > td":{paddingBottom:0}}},[`${t}-item-label`]:{color:e.labelColor,fontWeight:"normal",fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"start","&::after":{content:'":"',position:"relative",top:-.5,marginInline:`${k(l)} ${k(o)}`},[`&${t}-item-no-colon::after`]:{content:'""'}},[`${t}-item-no-label`]:{"&::after":{margin:0,content:'""'}},[`${t}-item-content`]:{display:"table-cell",flex:1,color:e.contentColor,fontSize:e.fontSize,lineHeight:e.lineHeight,wordBreak:"break-word",overflowWrap:"break-word"},[`${t}-item`]:{paddingBottom:0,verticalAlign:"top","&-container":{display:"flex",[`${t}-item-label`]:{display:"inline-flex",alignItems:"baseline"},[`${t}-item-content`]:{display:"inline-flex",alignItems:"baseline",minWidth:"1em"}}},"&-medium":{[`${t}-row`]:{"> th, > td":{paddingBottom:e.paddingSM}}},"&-small":{[`${t}-row`]:{"> th, > td":{paddingBottom:e.paddingXS}}}}}},Ms=e=>({labelBg:e.colorFillAlter,labelColor:e.colorTextTertiary,titleColor:e.colorText,titleMarginBottom:e.fontSizeSM*e.lineHeightSM,itemPaddingBottom:e.padding,itemPaddingEnd:e.padding,colonMarginRight:e.marginXS,colonMarginLeft:e.marginXXS/2,contentColor:e.colorText,extraColor:e.colorText}),Ls=lt("Descriptions",e=>{const t=it(e,{});return Fs(t)},Ms),ge=e=>{const{prefixCls:t,title:s,extra:r,column:a,colon:o=!0,bordered:l,layout:d,children:m,className:c,rootClassName:p,style:h,size:f,labelStyle:v,contentStyle:E,styles:$,items:S,classNames:I,...b}=e,{getPrefixCls:u,direction:g,className:y,style:x,classNames:M,styles:T}=ct("descriptions"),C=u("descriptions",t),P=bs(),N=n.useMemo(()=>ot(a)?a:Re(P,a)??Re(P,ys)??3,[P,a]),z=$s(P,S,m),w=dt(f),X=Is(N,z),[V,H]=Ls(C),q={...e,column:N,items:z,size:w},[D,F]=Te([M,I],[T,$],{props:q}),Y=n.useMemo(()=>({labelStyle:v,contentStyle:E,styles:{label:F.label,content:F.content},classNames:{label:D.label,content:D.content}}),[v,E,F.label,F.content,D.label,D.content]);return n.createElement(Oe.Provider,{value:Y},n.createElement("div",{className:A(C,y,D.root,{[`${C}-medium`]:w==="medium"||w==="middle",[`${C}-small`]:w==="small",[`${C}-bordered`]:!!l,[`${C}-rtl`]:g==="rtl"},c,p,V,H),style:{...x,...F.root,...h},...b},(s||r)&&n.createElement("div",{className:A(`${C}-header`,D.header),style:F.header},s&&n.createElement("div",{className:A(`${C}-title`,D.title),style:F.title},s),r&&n.createElement("div",{className:A(`${C}-extra`,D.extra),style:F.extra},r)),n.createElement("div",{className:`${C}-view`},n.createElement("table",null,n.createElement("tbody",null,X.map((L,W)=>n.createElement(ws,{key:W,index:W,colon:o,prefixCls:C,vertical:d==="vertical",bordered:l,row:L})))))))};ge.Item=vs;const Ns=(e,t)=>ye(e)?fe(e)&&!n.isValidElement(e)?{...t,...e}:{...t,title:e}:null;function Fe(e){const[t,s]=n.useState(e);return n.useEffect(()=>{const r=setTimeout(()=>{s(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}const js=e=>{const{componentCls:t,motionDurationFast:s,motionEaseInOut:r}=e,a=`${t}-show-help`,o=`${t}-show-help-item`;return{[a]:{transition:`opacity ${s} ${r}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[o]:{overflow:"hidden",transition:`${["height","opacity","transform"].map(l=>`${l} ${s} ${r}`).join(", ")} !important`,[`&${o}-appear, &${o}-enter`]:{transform:"translateY(-5px)",opacity:0,"&-active":{transform:"translateY(0)",opacity:1}},[`&${o}-leave-active`]:{transform:"translateY(-5px)"}}}}},Us=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${k(e.lineWidth)} ${e.lineType} ${e.colorBorder}`},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},"input[type='file']:focus, input[type='radio']:focus, input[type='checkbox']:focus":{outline:0,boxShadow:`0 0 0 ${k(e.controlOutlineWidth)} ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),Ge=(e,t)=>{const{formItemCls:s}=e;return{[s]:{[`${s}-label > label`]:{height:t},[`${s}-control-input`]:{minHeight:t}}}},Ps=e=>{const{componentCls:t}=e;return{[t]:{...ze(e),...Us(e),[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":{...Ge(e,e.controlHeightSM)},"&-large":{...Ge(e,e.controlHeightLG)}}}},Rs=e=>{const{formItemCls:t,iconCls:s,rootPrefixCls:r,antCls:a,labelRequiredMarkColor:o,labelColor:l,labelFontSize:d,labelHeight:m,labelColonMarginInlineStart:c,labelColonMarginInlineEnd:p,itemMarginBottom:h}=e,[f]=Mt(a,"grid");return{[t]:{...ze(e),marginBottom:h,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden${a}-row`]:{display:"none"},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:e.lineHeight,whiteSpace:"unset","> label":{verticalAlign:"middle",textWrap:"balance"}},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:m,color:l,fontSize:d,[`> ${s}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required`]:{"&::before":{display:"inline-block",marginInlineEnd:e.marginXXS,color:o,fontSize:e.fontSize,fontFamily:"sans-serif",lineHeight:1,content:'"*"'},[`&${t}-required-mark-hidden, &${t}-required-mark-optional`]:{"&::before":{display:"none"}}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`&${t}-required-mark-hidden`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:c,marginInlineEnd:p},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{[f("display")]:"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${r}-col-'"]):not([class*="' ${r}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%",[`&:has(> ${a}-switch:only-child, > ${a}-rate:only-child)`]:{display:"flex",alignItems:"center"}}}},[t]:{"&-additional":{display:"flex",flexDirection:"column"},"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:mt,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}}}},me=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),As=e=>{const{antCls:t,formItemCls:s}=e;return{[`${s}-horizontal`]:{[`${s}-label`]:{flexGrow:0},[`${s}-control`]:{flex:"1 1 0",minWidth:0},[`${s}-label[class$='-24'], ${s}-label[class*='-24 ']`]:{[`& + ${s}-control`]:{minWidth:"unset"}},[`${t}-col-24${s}-label,
        ${t}-col-xl-24${s}-label`]:me(e)}}},Ts=e=>{const{componentCls:t,formItemCls:s,inlineItemMarginBottom:r}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[`${s}-inline`]:{flex:"none",marginInlineEnd:e.margin,marginBottom:r,"&-row":{flexWrap:"nowrap"},[`> ${s}-label,
        > ${s}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${s}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${s}-has-feedback`]:{display:"inline-block"}}}}},zs=e=>{const{componentCls:t,formItemCls:s,rootPrefixCls:r}=e;return{[`${s} ${s}-label`]:me(e),[`${t}:not(${t}-inline)`]:{[s]:{flexWrap:"wrap",[`${s}-label, ${s}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},Ds=e=>{const{componentCls:t,formItemCls:s,antCls:r}=e;return{[`${s}-vertical`]:{[`${s}-row`]:{flexDirection:"column"},[`${s}-label > label`]:{height:"auto"},[`${s}-control`]:{width:"100%"},[`${s}-label,
        ${r}-col-24${s}-label,
        ${r}-col-xl-24${s}-label`]:me(e)},[`@media (max-width: ${k(e.screenXSMax)})`]:[zs(e),{[t]:{[`${s}:not(${s}-horizontal)`]:{[`${r}-col-xs-24${s}-label`]:me(e)}}}],[`@media (max-width: ${k(e.screenSMMax)})`]:{[t]:{[`${s}:not(${s}-horizontal)`]:{[`${r}-col-sm-24${s}-label`]:me(e)}}},[`@media (max-width: ${k(e.screenMDMax)})`]:{[t]:{[`${s}:not(${s}-horizontal)`]:{[`${r}-col-md-24${s}-label`]:me(e)}}},[`@media (max-width: ${k(e.screenLGMax)})`]:{[t]:{[`${s}:not(${s}-horizontal)`]:{[`${r}-col-lg-24${s}-label`]:me(e)}}}}},Bs=e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0,inlineItemMarginBottom:0}),Ct=(e,t)=>it(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),Ve=lt("Form",(e,{rootPrefixCls:t})=>{const s=Ct(e,t);return[Ps(s),Rs(s),js(s),As(s),Ts(s),Ds(s),Ft(s),mt]},Bs,{order:-1e3}),Xe=[];function Pe(e,t,s,r=0){return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:s}}const $t=({help:e,helpStatus:t,errors:s=Xe,warnings:r=Xe,className:a,fieldId:o,onVisibleChanged:l})=>{const{prefixCls:d}=n.useContext(De),{classNames:m,styles:c}=n.useContext(se),p=`${d}-item-explain`,h=Be(d),[f,v]=Ve(d,h),E=n.useMemo(()=>He(d),[d]),$=Fe(s),S=Fe(r),I=ve(e)&&e!==!1,b=n.useMemo(()=>I?[Pe(e,"help",t)]:[].concat(K($.map((y,x)=>Pe(y,"error","error",x))),K(S.map((y,x)=>Pe(y,"warning","warning",x)))),[e,t,I,$,S]),u=n.useMemo(()=>{const y={};return b.forEach(({key:x})=>{y[x]=(y[x]||0)+1}),b.map((x,M)=>({...x,key:y[x.key]>1?`${x.key}-fallback-${M}`:x.key}))},[b]),g={};return o&&(g.id=`${o}_help`),n.createElement(Lt,{motionDeadline:E.motionDeadline,motionName:`${d}-show-help`,visible:!!u.length,onVisibleChanged:l},y=>{const{className:x,style:M}=y;return n.createElement("div",{...g,className:A(p,x,m==null?void 0:m.help,v,h,a,f),style:{...c==null?void 0:c.help,...M}},n.createElement(Nt,{keys:u,...He(d),motionName:`${d}-show-help-item`,component:!1},T=>{const{key:C,error:P,errorStatus:N,className:z,style:w}=T;return n.createElement("div",{key:C,className:A(z,m==null?void 0:m.helpItem,{[`${p}-${N}`]:N}),style:{...c==null?void 0:c.helpItem,...w}},P)}))})},ks=(e,t)=>{const s=n.useContext(jt),{getPrefixCls:r,direction:a,requiredMark:o,colon:l,scrollToFirstError:d,className:m,style:c,styles:p,classNames:h,tooltip:f,labelAlign:v}=ct("form"),{prefixCls:E,className:$,rootClassName:S,size:I,disabled:b=s,form:u,colon:g,labelAlign:y,labelWrap:x,labelCol:M,wrapperCol:T,layout:C="horizontal",scrollToFirstError:P,requiredMark:N,onFinishFailed:z,name:w,style:X,feedbackIcons:V,variant:H,classNames:q,styles:D,tooltip:F,...Y}=e,L=dt(I),W=n.useContext(Ut),J=n.useMemo(()=>N!==void 0?N:o!==void 0?o:!0,[N,o]),ue=g??l,ie=y??v,j={...f,...F},U=r("form",E),B=Be(U),[Z,ne]=Ve(U,B),ce={...e,size:L,disabled:b,layout:C,colon:ue,requiredMark:J},[re,Q]=Te([h,q],[p,D],{props:ce}),R=A(U,`${U}-${C}`,{[`${U}-hide-required-mark`]:J===!1,[`${U}-rtl`]:a==="rtl",[`${U}-large`]:L==="large",[`${U}-small`]:L==="small"},ne,B,Z,m,$,S,re.root),[_]=ht(u),{__INTERNAL__:Ce}=_;Ce.name=w;const oe=n.useMemo(()=>({name:w,labelAlign:ie,labelCol:M,labelWrap:x,wrapperCol:T,layout:C,colon:ue,requiredMark:J,itemRef:Ce.itemRef,form:_,feedbackIcons:V,tooltip:j,classNames:re,styles:Q}),[w,ie,M,T,C,ue,J,_,V,re,Q,j]),be=n.useRef(null);n.useImperativeHandle(t,()=>{var G;return{..._,nativeElement:(G=be.current)==null?void 0:G.nativeElement}});const xe=(G,Se)=>{if(G){let Le={block:"nearest"};fe(G)&&(Le={...Le,...G}),_.scrollToField(Se,Le)}},$e=G=>{if(z==null||z(G),G.errorFields.length){const Se=G.errorFields[0].name;if(P!==void 0){xe(P,Se);return}d!==void 0&&xe(d,Se)}};return n.createElement(Pt.Provider,{value:H},n.createElement(Rt,{disabled:b},n.createElement(At.Provider,{value:L},n.createElement(ut,{validateMessages:W},n.createElement(se.Provider,{value:oe},n.createElement(Tt,{status:!0},n.createElement(zt,{id:w,...Y,name:w,onFinishFailed:$e,form:_,ref:be,style:{...Q==null?void 0:Q.root,...c,...X},className:R})))))))},Os=n.forwardRef(ks),Vs=e=>{if(he(e))return e;const t=at(e);return t.length<=1?t[0]:t},St=()=>{const{status:e,errors:t=[],warnings:s=[]}=n.useContext(we);return{status:e,errors:t,warnings:s}};St.Context=we;function Hs(e){const[t,s]=n.useState(e),r=n.useRef(null),a=n.useRef([]),o=n.useRef(!1);n.useEffect(()=>(o.current=!1,()=>{o.current=!0,qe.cancel(r.current),r.current=null}),[]);function l(d){o.current||(r.current===null&&(a.current=[],r.current=qe(()=>{r.current=null,s(m=>{let c=m;return a.current.forEach(p=>{c=p(c)}),c})})),a.current.push(d))}return[t,l]}const qs=()=>{const{itemRef:e}=n.useContext(se),t=n.useRef({});return(r,a)=>{const o=a&&fe(a)&&Dt(a),l=r.join("_");return(t.current.name!==l||t.current.originRef!==o)&&(t.current.name=l,t.current.originRef=o,t.current.ref=Bt(e(r),o)),t.current.ref}},_s=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},Ws=kt(["Form","item-item"],(e,{rootPrefixCls:t})=>{const s=Ct(e,t);return _s(s)}),Gs=24,Xs=e=>{const{prefixCls:t,status:s,labelCol:r,wrapperCol:a,children:o,errors:l,warnings:d,_internalItemRender:m,extra:c,help:p,fieldId:h,marginBottom:f,onErrorVisibleChanged:v,label:E}=e,$=`${t}-item`,S=n.useContext(se),{classNames:I,styles:b}=S,u=n.useMemo(()=>{let H={...a||S.wrapperCol||{}};return E===null&&!r&&!a&&S.labelCol&&[void 0].concat(K(xs)).forEach(D=>{const F=D?[D]:[],Y=_e(S.labelCol,F),L=fe(Y)?Y:{},W=_e(H,F),J=fe(W)?W:{};"span"in L&&!("offset"in J)&&L.span<Gs&&(H=Ot(H,[].concat(F,["offset"]),L.span))}),H},[a,S.wrapperCol,S.labelCol,E,r]),g=A(`${$}-control`,u.className),y=n.useMemo(()=>{const{labelCol:H,wrapperCol:q,...D}=S;return D},[S]),x=n.useRef(null),[M,T]=n.useState(0);pt(()=>{c&&x.current?T(x.current.clientHeight):T(0)},[c]);const C=n.createElement("div",{className:`${$}-control-input`},n.createElement("div",{className:A(`${$}-control-input-content`,I==null?void 0:I.content),style:b==null?void 0:b.content},o)),P=n.useMemo(()=>({prefixCls:t,status:s}),[t,s]),N=f!==null||l.length||d.length?n.createElement(De.Provider,{value:P},n.createElement($t,{fieldId:h,errors:l,warnings:d,help:p,helpStatus:s,className:`${$}-explain-connected`,onVisibleChanged:v})):null,z={};h&&(z.id=`${h}_extra`);const w=c?n.createElement("div",{...z,className:A(`${$}-extra`,I==null?void 0:I.extra),style:b==null?void 0:b.extra,ref:x},c):null,X=N||w?n.createElement("div",{className:`${$}-additional`,style:f?{minHeight:f+M}:{}},N,w):null,V=m&&m.mark==="pro_table_render"&&m.render?m.render(e,{input:C,errorList:N,extra:w}):n.createElement(n.Fragment,null,C,X);return n.createElement(se.Provider,{value:y},n.createElement(xt,{...u,className:g},V),n.createElement(Ws,{prefixCls:t}))};var Ie={},Ke;function Ks(){if(Ke)return Ie;Ke=1,Object.defineProperty(Ie,"__esModule",{value:!0});var e={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};return Ie.default=e,Ie}var Qs=Ks();const Ys=Vt(Qs);function Ae(){return Ae=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},Ae.apply(this,arguments)}const Js=(e,t)=>n.createElement(Ht,Ae({},e,{ref:t,icon:Ys})),Zs=n.forwardRef(Js),en=({prefixCls:e,label:t,htmlFor:s,labelCol:r,labelAlign:a,colon:o,required:l,requiredMark:d,tooltip:m,vertical:c})=>{var V;const[p]=qt("Form"),{labelAlign:h,labelCol:f,labelWrap:v,colon:E,classNames:$,styles:S,tooltip:I}=n.useContext(se);if(!t)return null;const b=r||f||{},u=a||h,g=`${e}-item-label`,y=A(g,u==="left"&&`${g}-left`,b.className,{[`${g}-wrap`]:!!v});let x=t;const M=o===!0||E!==!1&&o!==!1;M&&!c&&typeof t=="string"&&t.trim()&&(x=t.replace(/[:|：]\s*$/,""));const C=Ns(m,I);if(C){const H=n.createElement(_t,{...C},n.createElement("span",{className:`${e}-item-tooltip`,onClick:q=>{q.preventDefault()},tabIndex:-1},C.icon||C.children||n.createElement(Zs,null)));x=n.createElement(n.Fragment,null,x,H)}const P=d==="optional",N=he(d),z=d===!1;N?x=d(x,{required:!!l}):P&&!l&&(x=n.createElement(n.Fragment,null,x,n.createElement("span",{className:`${e}-item-optional`},(p==null?void 0:p.optional)||((V=Wt.Form)==null?void 0:V.optional))));let w;z?w="hidden":(P||N)&&(w="optional");const X=A($==null?void 0:$.label,{[`${e}-item-required`]:l,[`${e}-item-required-mark-${w}`]:w,[`${e}-item-no-colon`]:!M});return n.createElement(xt,{...b,className:y},n.createElement("label",{htmlFor:s,className:X,style:S==null?void 0:S.label,title:typeof t=="string"?t:void 0},x))},tn={success:Qt,warning:Kt,error:Xt,validating:Gt};function It({children:e,errors:t,warnings:s,hasFeedback:r,validateStatus:a,prefixCls:o,meta:l,noStyle:d,name:m}){const c=`${o}-item`,{feedbackIcons:p}=n.useContext(se),h=bt(t,s,l,null,!!r,a),{isFormItemInput:f,status:v,hasFeedback:E,feedbackIcon:$,name:S}=n.useContext(we),I=n.useMemo(()=>{var g;let b;if(r){const y=r!==!0&&r.icons||p,x=h&&((g=y==null?void 0:y({status:h,errors:t,warnings:s}))==null?void 0:g[h]),M=h?tn[h]:null;b=x!==!1&&M?n.createElement("span",{className:A(`${c}-feedback-icon`,`${c}-feedback-icon-${h}`)},x||n.createElement(M,null)):null}const u={status:h||"",errors:t,warnings:s,hasFeedback:!!r,feedbackIcon:b,isFormItemInput:!0,name:m};return d&&(u.status=(h??v)||"",u.isFormItemInput=f,u.hasFeedback=!!(r??E),u.feedbackIcon=r!==void 0?u.feedbackIcon:$,u.name=m??S),u},[h,r,d,f,v]);return n.createElement(we.Provider,{value:I},e)}function sn(e){const{prefixCls:t,className:s,rootClassName:r,style:a,help:o,errors:l,warnings:d,validateStatus:m,meta:c,hasFeedback:p,hidden:h,children:f,fieldId:v,required:E,isRequired:$,onSubItemMetaChange:S,layout:I,name:b,...u}=e,g=`${t}-item`,{requiredMark:y,layout:x}=n.useContext(se),M=I||x,T=M==="vertical",C=n.useRef(null),P=Fe(l),N=Fe(d),z=ve(o)&&o!==!1,w=!!(z||l.length||d.length),X=!!C.current&&Yt(C.current),[V,H]=n.useState(null);pt(()=>{if(w&&C.current){const L=getComputedStyle(C.current);H(Number.parseInt(L.marginBottom,10))}},[w,X]);const q=L=>{L||H(null)},F=((L=!1)=>{const W=L?P:c.errors,J=L?N:c.warnings;return bt(W,J,c,"",!!p,m)})(),Y=A(g,s,r,{[`${g}-with-help`]:z||P.length||N.length,[`${g}-has-feedback`]:F&&p,[`${g}-has-success`]:F==="success",[`${g}-has-warning`]:F==="warning",[`${g}-has-error`]:F==="error",[`${g}-is-validating`]:F==="validating",[`${g}-hidden`]:h,[`${g}-${M}`]:M});return n.createElement("div",{className:Y,style:a,ref:C},n.createElement(hs,{className:`${g}-row`,...Jt(u,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])},n.createElement(en,{htmlFor:v,...e,requiredMark:y,required:E??$,prefixCls:t,vertical:T}),n.createElement(Xs,{...e,...c,errors:P,warnings:N,prefixCls:t,status:F,help:o,marginBottom:V,onErrorVisibleChanged:q},n.createElement(gt.Provider,{value:S},n.createElement(It,{prefixCls:t,meta:c,errors:c.errors,warnings:c.warnings,hasFeedback:p,validateStatus:F,name:b},f)))),!!V&&n.createElement("div",{className:`${g}-margin-offset`,style:{marginBottom:-V}}))}const nn="__SPLIT__";function rn(e,t){const s=Object.keys(e),r=Object.keys(t);return s.length===r.length&&s.every(a=>{const o=e[a],l=t[a];return o===l||he(o)||he(l)})}const on=n.memo(e=>e.children,(e,t)=>rn(e.control,t.control)&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((s,r)=>s===t.childProps[r]));function Qe(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function an(e){const{name:t,noStyle:s,className:r,dependencies:a,prefixCls:o,shouldUpdate:l,rules:d,children:m,required:c,label:p,messageVariables:h,trigger:f="onChange",validateTrigger:v,hidden:E,help:$,layout:S}=e,{getPrefixCls:I}=n.useContext(ft),{name:b}=n.useContext(se),u=Vs(m),g=he(u),y=n.useContext(gt),{validateTrigger:x}=n.useContext(Zt),M=ve(v)?v:x,T=ve(t),C=I("form",o),P=Be(C),[N,z]=Ve(C,P);es();const w=n.useContext(ts),X=n.useRef(null),[V,H]=Hs({}),[q,D]=ss(()=>Qe()),F=j=>{const U=w==null?void 0:w.getKey(j.name);if(D(j.destroy?Qe():j,!0),s&&$!==!1&&y){let B=j.name;if(j.destroy)B=X.current||B;else if(U!==void 0){const[Z,ne]=U;B=[Z].concat(K(ne)),X.current=B}y(j,B)}},Y=(j,U)=>{H(B=>{const Z={...B},ce=[].concat(K(j.name.slice(0,-1)),K(U)).join(nn);return j.destroy?delete Z[ce]:Z[ce]=j,Z})},[L,W]=n.useMemo(()=>{const j=K(q.errors),U=K(q.warnings);return Object.values(V).forEach(B=>{j.push.apply(j,K(B.errors||[])),U.push.apply(U,K(B.warnings||[]))}),[j,U]},[V,q.errors,q.warnings]),J=qs();function ue(j,U,B){return s&&!E?n.createElement(It,{prefixCls:C,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:q,errors:L,warnings:W,noStyle:!0,name:t},j):n.createElement(sn,{key:"row",...e,className:A(r,z,P,N),prefixCls:C,fieldId:U,isRequired:B,errors:L,warnings:W,meta:q,onSubItemMetaChange:Y,layout:S,name:t},j)}if(!T&&!g&&!a)return ue(u);let ie={};return typeof p=="string"?ie.label=p:t&&(ie.label=String(t)),h&&(ie={...ie,...h}),n.createElement(ns,{...e,messageVariables:ie,trigger:f,validateTrigger:M,onMetaChange:F},(j,U,B)=>{const Z=Ne(t).length&&U?U.name:[],ne=fs(Z,b),ce=c!==void 0?c:d==null?void 0:d.some(R=>{if(fe(R)&&R.required&&!R.warningOnly)return!0;if(he(R)){const _=R(B);return(_==null?void 0:_.required)&&!(_!=null&&_.warningOnly)}return!1}),re={...j};let Q=null;if(Array.isArray(u)&&T)Q=u;else if(!(g&&(!(l||a)||T))){if(!(a&&!g&&!T))if(n.isValidElement(u)){const R={...u.props,...re};if(R.id||(R.id=ne),$||L.length>0||W.length>0||e.extra){const oe=[];($||L.length>0)&&oe.push(`${ne}_help`),e.extra&&oe.push(`${ne}_extra`),R["aria-describedby"]=oe.join(" ")}L.length>0&&(R["aria-invalid"]="true"),ce&&(R["aria-required"]="true"),rs(u)&&(R.ref=J(Z,u)),new Set([].concat(K(Ne(f)),K(Ne(M)))).forEach(oe=>{R[oe]=(...be)=>{var xe,$e,G;(xe=re[oe])==null||xe.call(re,...be),(G=($e=u.props)[oe])==null||G.call($e,...be)}});const Ce=[R["aria-required"],R["aria-invalid"],R["aria-describedby"]];Q=n.createElement(on,{control:re,update:u,childProps:Ce},os(u,R))}else g&&(l||a)&&!T?Q=u(B):Q=u}return ue(Q,ne,ce)})}const vt=an;vt.useStatus=St;const ln=({prefixCls:e,children:t,...s})=>{const{getPrefixCls:r}=n.useContext(ft),a=r("form",e),o=n.useMemo(()=>({prefixCls:a,status:"error"}),[a]);return n.createElement(as,{...s},(l,d,m)=>n.createElement(De.Provider,{value:o},t(l.map(c=>({...c,fieldKey:c.key})),d,{errors:m.errors,warnings:m.warnings})))};function cn(){const{form:e}=n.useContext(se);return e}const O=Os;O.Item=vt;O.List=ln;O.ErrorList=$t;O.useForm=ht;O.useFormInstance=cn;O.useWatch=ls;O.Provider=ut;const wt={current:1,pageSize:10};function dn(e,t=!1){const[s,r]=n.useState({...wt,pageSize:e.pageSize});return{newPagination:n.useMemo(()=>t?!1:{...e,...s,showSizeChanger:!1,pageSizeOptions:["5","10","20","30","50"],onChange:(o,l)=>{r({pageSize:l,current:o})},onShowSizeChange:(o,l)=>{r({pageSize:l,current:o})}},[e,t,s]),setPagination:r}}function mn(e){const[t,s]=n.useState([]),[r,a]=n.useState([]),o=n.useMemo(()=>{if(e)return{columnWidth:"44px",selectedRowKeys:r,onChange:d=>{a(d)},onSelect:(d,m)=>{s(m?[...t,d]:t.filter(c=>c.key!==d.key))},onSelectAll:(d,m,c)=>{s(d?[...t,...c]:t.filter(p=>c.find(h=>p.key===h.key)===void 0))}}},[t,r]),l=n.useCallback(()=>{s([]),a([])},[]);return[o,t,l]}const un=e=>{e.sortOrder||(delete e.sortOrder,delete e.sortField);for(let[t,s]of Object.entries(e))if(Array.isArray(s))s.length===0?delete e[t]:e[t]=s.map(r=>typeof r=="object"&&r._isAMomentObject?r.valueOf():r);else if(typeof s=="object"){const r=s;r._isAMomentObject&&(e[t]=r.valueOf())}};function pn({getData:e,params:t={},options:s={}}){let r=s.pagination===!1;const a=n.useMemo(()=>{const{current:u,pageSize:g}={...wt,...s.pagination};return r?t:{page:u,per:g,...t}},[r,t]),[o,l,d,m,c]=cs(e,a),p=n.useMemo(()=>gn(r,l,c),[l]),h={total:r||l===null?0:l.total,...s.pagination||{}},{newPagination:f,setPagination:v}=dn(h,r),[E,$,S]=mn(s.rowSelection),I=n.useCallback(u=>{m(u||{...c}),S(),f!==!1&&v({current:(u==null?void 0:u.page)??(f==null?void 0:f.current)??1,pageSize:(u==null?void 0:u.per)??(f==null?void 0:f.pageSize)??10})},[m,c,S,f,v]);return{tableProps:{...s,loading:o,dataSource:p,pagination:f,rowSelection:E,onChange:(u,g,y)=>{const x={...c,page:u.current,per:u.pageSize,sortField:Array.isArray(y)?y[0].field:y.field,sortOrder:Array.isArray(y)?y[0].order:y.order,...g};un(x),I(x)}},refresh:I,oldParams:c,selectedList:$,resetSelection:S,result:l,setResult:d}}function gn(e,t,s){if(!t)return[];let r=t.data||[];if(e)return r.map((a,o)=>({key:o,...a}));if(s){let a=s.page-1,o=s.per;return r.map((l,d)=>({key:d+a*o,...l}))}return[]}const{Text:ee}=us;let te=[{id:1,name:"张三",age:24,description:"全栈开发工程师，热爱开源"},{id:2,name:"李四",age:28,description:"高级算法专家，专注于大语言模型"},{id:3,name:"王五",age:32,description:"产品总监，负责数字化转型项目"}];const fn=async e=>new Promise(t=>{setTimeout(()=>{t({success:!0,data:[...te],total:te.length})},600)}),Ye=async e=>new Promise(t=>{setTimeout(()=>{te=te.filter(s=>!e.includes(s.id)),t({success:!0,message:"删除成功"})},400)}),hn=async e=>new Promise(t=>{setTimeout(()=>{const r={id:te.length>0?Math.max(...te.map(a=>a.id))+1:1,...e};te.push(r),t({success:!0,data:r,message:"创建成功"})},400)}),bn=async e=>new Promise(t=>{setTimeout(()=>{te=te.map(s=>s.id===e.id?e:s),t({success:!0,data:e,message:"更新成功"})},400)}),xn=async e=>new Promise(t=>{setTimeout(()=>{const s=te.find(r=>r.id===e);t(s?{success:!0,data:s}:{success:!1,message:"用户不存在"})},400)}),yn=({open:e,onCancel:t,onSuccess:s})=>{const[r]=O.useForm(),[a,o]=n.useState(!1),{message:l}=Me.useApp(),d=async()=>{try{const m=await r.validateFields();o(!0);const c=await hn(m);o(!1),c.success?(l.success("创建成功"),r.resetFields(),s()):l.error(c.message||"创建失败")}catch(m){console.log("Validation failed:",m)}};return i.jsx(ke,{title:"创建用户",open:e,onOk:d,confirmLoading:a,onCancel:()=>{r.resetFields(),t()},destroyOnClose:!0,children:i.jsxs(O,{form:r,layout:"vertical",initialValues:{age:24},children:[i.jsx(O.Item,{name:"name",label:"姓名",rules:[{required:!0,message:"请输入姓名"}],children:i.jsx(Ee,{placeholder:"请输入姓名"})}),i.jsx(O.Item,{name:"age",label:"年龄",rules:[{required:!0,message:"请输入年龄"}],children:i.jsx(yt,{min:1,max:120,style:{width:"100%"}})}),i.jsx(O.Item,{name:"description",label:"个人简介",rules:[{required:!0,message:"请输入个人简介"}],children:i.jsx(Ee.TextArea,{placeholder:"请输入个人简介",rows:3})})]})})},Cn=({open:e,user:t,onCancel:s,onSuccess:r})=>{const[a]=O.useForm(),[o,l]=n.useState(!1),{message:d}=Me.useApp();n.useEffect(()=>{e&&t&&a.setFieldsValue(t)},[e,t,a]);const m=async()=>{if(t)try{const c=await a.validateFields();l(!0);const p=await bn({...t,...c});l(!1),p.success?(d.success("更新成功"),r()):d.error(p.message||"更新失败")}catch(c){console.log("Validation failed:",c)}};return i.jsx(ke,{title:"编辑用户",open:e,onOk:m,confirmLoading:o,onCancel:s,destroyOnClose:!0,children:i.jsxs(O,{form:a,layout:"vertical",children:[i.jsx(O.Item,{name:"name",label:"姓名",rules:[{required:!0,message:"请输入姓名"}],children:i.jsx(Ee,{placeholder:"请输入姓名"})}),i.jsx(O.Item,{name:"age",label:"年龄",rules:[{required:!0,message:"请输入年龄"}],children:i.jsx(yt,{min:1,max:120,style:{width:"100%"}})}),i.jsx(O.Item,{name:"description",label:"个人简介",rules:[{required:!0,message:"请输入个人简介"}],children:i.jsx(Ee.TextArea,{placeholder:"请输入个人简介",rows:3})})]})})},$n=({open:e,userId:t,onCancel:s})=>{const[r,a]=n.useState(!1),[o,l]=n.useState(null),{message:d}=Me.useApp();return n.useEffect(()=>{e&&t!==null?(a(!0),xn(t).then(m=>{a(!1),m.success&&m.data?l(m.data):(d.error(m.message||"获取详情失败"),s())})):l(null)},[e,t,s]),i.jsx(ke,{title:"用户详情",open:e,footer:null,onCancel:s,destroyOnClose:!0,children:i.jsx(is,{spinning:r,children:o&&i.jsxs(ge,{column:1,bordered:!0,size:"small",children:[i.jsx(ge.Item,{label:"ID",children:o.id}),i.jsx(ge.Item,{label:"姓名",children:o.name}),i.jsx(ge.Item,{label:"年龄",children:o.age}),i.jsx(ge.Item,{label:"个人简介",children:o.description})]})})})},Je=`// api.ts —— 接口及数据模型层
import { type Result } from '@insightst-design/hooks';

export interface User {
  id: number;
  name: string;
  age: number;
  description: string;
}

// 模拟数据库数据
let mockUsersList: User[] = [
  { id: 1, name: '张三', age: 24, description: '全栈开发工程师，热爱开源' },
  { id: 2, name: '李四', age: 28, description: '高级算法专家，专注于大语言模型' },
  { id: 3, name: '王五', age: 32, description: '产品总监，负责数字化转型项目' }
];

// 获取用户列表 (带分页与筛选参数)
export const getUsers = async (params: Record<string, unknown>): Promise<Result<User[]>> => {
  console.log('Request API parameters:', params);
  return {
    success: true,
    data: [...mockUsersList],
    total: mockUsersList.length,
  };
};

// 批量删除用户
export const deleteUsers = async (ids: number[]): Promise<Result<null>> => {
  console.log('Deleting users:', ids);
  mockUsersList = mockUsersList.filter(item => !ids.includes(item.id));
  return { success: true, message: '删除成功' };
};

// 创建用户
export const createUser = async (user: Omit<User, 'id'>): Promise<Result<User>> => {
  console.log('Creating user:', user);
  const nextId = mockUsersList.length > 0 ? Math.max(...mockUsersList.map(u => u.id)) + 1 : 1;
  const newUser = { id: nextId, ...user };
  mockUsersList.push(newUser);
  return { success: true, data: newUser, message: '创建成功' };
};

// 更新用户
export const updateUser = async (user: User): Promise<Result<User>> => {
  console.log('Updating user:', user);
  mockUsersList = mockUsersList.map(u => u.id === user.id ? user : u);
  return { success: true, data: user, message: '更新成功' };
};

// 获取用户详情
export const getUserDetail = async (id: number): Promise<Result<User>> => {
  console.log('Getting user detail:', id);
  const user = mockUsersList.find(u => u.id === id);
  if (user) {
    return { success: true, data: user };
  }
  return { success: false, message: '用户不存在' };
};`,Ze=`// useColumn.tsx —— 列表列定义 Hook
import React, { useMemo } from 'react';
import { type TableColumnsType, Button, Space, App } from '@insightst-design/ui';
import { type User } from './api';

export default function useColumn(
  onDetail: (record: User) => void,
  onEdit: (record: User) => void,
  onDelete: (id: number) => void
): TableColumnsType<User> {
  const { message } = App.useApp();

  const columns: TableColumnsType<User> = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: '个人简介',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size={0}>
          <Button type="link" onClick={() => onDetail(record)}>
            详情
          </Button>
          <Button type="link" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => {
              onDelete(record.id);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    }
  ], [onDetail, onEdit, onDelete]);

  return columns;
}`,et=`// batchActions.tsx —— 批量操作组件
import React, { type FC } from 'react';
import { Button, Space, App } from '@insightst-design/ui';
import { type User, deleteUsers } from './api';

interface BatchActionsProps {
  selectedList: User[];
  refresh: () => void;
  onCreate: () => void;
}

const BatchActions: FC<BatchActionsProps> = ({ selectedList, refresh, onCreate }) => {
  const { modal, message } = App.useApp();
  const hasSelected = selectedList.length > 0;

  const handleBatchDelete = () => {
    modal.confirm({
      title: '确认删除',
      content: \`确定要批量删除选中的 \${selectedList.length} 个用户吗？\`,
      onOk: async () => {
        const ids = selectedList.map(item => item.id);
        const res = await deleteUsers(ids);
        if (res.success) {
          message.success('批量删除成功');
          refresh();
        } else {
          message.error(res.message || '批量删除失败');
        }
      }
    });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Space>
        <Button type="primary" onClick={onCreate}>
          创建
        </Button>
        <Button 
          type="primary" 
          danger 
          disabled={!hasSelected} 
          onClick={handleBatchDelete}
        >
          批量删除
        </Button>
        <Button onClick={() => refresh()}>
          刷新
        </Button>
      </Space>
    </div>
  );
};

export default BatchActions;`,tt=`// add.tsx —— 创建组件
import React, { type FC, useState } from 'react';
import { Modal, Form, Input, InputNumber, App } from '@insightst-design/ui';
import { createUser } from './api';

interface AddProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const Add: FC<AddProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await createUser(values);
      setLoading(false);
      if (res.success) {
        message.success('创建成功');
        form.resetFields();
        onSuccess();
      } else {
        message.error(res.message || '创建失败');
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="创建用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" initialValues={{ age: 24 }}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;`,st=`// update.tsx —— 编辑组件
import React, { type FC, useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, App } from '@insightst-design/ui';
import { updateUser, type User } from './api';

interface UpdateProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const Update: FC<UpdateProps> = ({ open, user, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue(user);
    }
  }, [open, user, form]);

  const handleOk = async () => {
    if (!user) return;
    try {
      const values = await form.validateFields();
      setLoading(true);
      const res = await updateUser({ ...user, ...values });
      setLoading(false);
      if (res.success) {
        message.success('更新成功');
        onSuccess();
      } else {
        message.error(res.message || '更新失败');
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="编辑用户"
      open={open}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber min={1} max={120} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="个人简介"
          rules={[{ required: true, message: '请输入个人简介' }]}
        >
          <Input.TextArea placeholder="请输入个人简介" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Update;`,nt=`// detail.tsx —— 详情组件
import React, { type FC, useState, useEffect } from 'react';
import { Modal, Descriptions, Spin, App } from '@insightst-design/ui';
import { getUserDetail, type User } from './api';

interface DetailProps {
  open: boolean;
  userId: number | null;
  onCancel: () => void;
}

const Detail: FC<DetailProps> = ({ open, userId, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { message } = App.useApp();

  useEffect(() => {
    if (open && userId !== null) {
      setLoading(true);
      getUserDetail(userId).then(res => {
        setLoading(false);
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          message.error(res.message || '获取详情失败');
          onCancel();
        }
      });
    } else {
      setUser(null);
    }
  }, [open, userId, onCancel]);

  return (
    <Modal
      title="用户详情"
      open={open}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <Spin spinning={loading}>
        {user && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
            <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
            <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
            <Descriptions.Item label="个人简介">{user.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Spin>
    </Modal>
  );
};

export default Detail;`,rt=`// view.tsx —— 主页面视图组件
import React, { type FC, useState } from 'react';
import { Table, Card } from '@insightst-design/ui';
import { useTable } from '@insightst-design/hooks';
import { getUsers, type User, deleteUsers } from './api';
import useColumn from './useColumn';
import BatchActions from './batchActions';
import Add from './add';
import Update from './update';
import Detail from './detail';

const UserListView: FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [detailUserId, setDetailUserId] = useState<number | null>(null);

  // 1. 初始化 useTable 核心数据流
  const { tableProps, refresh, selectedList } = useTable<User>({
    getData: getUsers,
    options: {
      rowSelection: { type: 'checkbox' },
      pagination: { pageSize: 10 }
    }
  });

  // 2. 处理单项删除后刷新表格
  const handleDeleteItem = async (id: number) => {
    await deleteUsers([id]);
    refresh();
  };

  // 3. 加载列配置并绑定操作回调
  const columns = useColumn(
    (record) => setDetailUserId(record.id),
    (record) => setEditUser(record),
    handleDeleteItem
  );

  return (
    <Card title="用户管理系统 (useTable)">
      {/* 4. 批量操作栏 */}
      <BatchActions 
        selectedList={selectedList} 
        refresh={refresh} 
        onCreate={() => setAddOpen(true)} 
      />
      
      {/* 5. 数据表格 */}
      <Table<User> 
        columns={columns} 
        {...tableProps} 
        rowKey="id" 
      />

      {/* 6. 创建、编辑与详情模态框 */}
      <Add
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onSuccess={() => {
          setAddOpen(false);
          refresh();
        }}
      />

      <Update
        open={!!editUser}
        user={editUser}
        onCancel={() => setEditUser(null)}
        onSuccess={() => {
          setEditUser(null);
          refresh();
        }}
      />

      <Detail
        open={detailUserId !== null}
        userId={detailUserId}
        onCancel={() => setDetailUserId(null)}
      />
    </Card>
  );
};

export default UserListView;`;function qn(){const{message:e,modal:t}=Me.useApp(),[s,r]=n.useState(!1),[a,o]=n.useState(!1),[l,d]=n.useState(null),[m,c]=n.useState(null),{tableProps:p,refresh:h,selectedList:f}=pn({getData:fn,options:{rowSelection:{type:"checkbox"},pagination:{pageSize:5}}}),v=async I=>{r(!0);const b=await Ye([I]);r(!1),b.success&&(e.success("删除成功"),h())},E=()=>{t.confirm({title:"确认删除",content:`确定要批量删除选中的 ${f.length} 个用户吗？`,onOk:async()=>{r(!0);const I=f.map(u=>u.id),b=await Ye(I);r(!1),b.success&&(e.success("批量删除成功"),h())}})},$=n.useMemo(()=>[{title:"ID",dataIndex:"id",key:"id",width:60},{title:"姓名",dataIndex:"name",key:"name",width:100},{title:"年龄",dataIndex:"age",key:"age",width:80},{title:"个人简介",dataIndex:"description",key:"description"},{title:"操作",key:"action",width:180,render:(I,b)=>i.jsxs(We,{size:0,children:[i.jsx(pe,{type:"link",onClick:()=>c(b.id),style:{padding:"0 8px"},children:"详情"}),i.jsx(pe,{type:"link",onClick:()=>d(b),style:{padding:"0 8px"},children:"编辑"}),i.jsx(pe,{type:"link",danger:!0,onClick:()=>v(b.id),style:{padding:"0 8px"},children:"删除"})]})}],[f]),S=f.length>0;return i.jsxs(ds,{children:[i.jsx("div",{children:i.jsxs(ee,{style:{fontSize:13,color:"var(--ds-text-secondary)",display:"block",marginBottom:8},children:[i.jsx("code",{children:"useTable"})," 整合了 ",i.jsx("code",{children:"useFetch"}),"、",i.jsx("code",{children:"usePagination"}),"、",i.jsx("code",{children:"useRowSelection"})," 与 ",i.jsx("code",{children:"useColumn"}),"。 它支持列表加载、翻页重载、条件过滤、单行/批量行选择等整套后台数据流水线。"]})}),i.jsxs(ae,{title:"交互演示",titleEn:"Interactive Demo",children:[i.jsx(ms,{hint:"交互范例 · 完美集成创建、编辑、详情、多选、删除操作，动作会执行列表重载及真实数据更新",trailing:i.jsxs(ee,{type:"secondary",style:{fontSize:12},children:["已选中 ",f.length," 项"]})}),i.jsx("div",{style:{marginTop:16,marginBottom:16},children:i.jsxs(ps,{styles:{body:{padding:16}},style:{background:"var(--ds-bg-card)",border:"1px solid var(--ds-border)",borderRadius:8},children:[i.jsx("div",{style:{marginBottom:16},children:i.jsxs(We,{children:[i.jsx(pe,{type:"primary",onClick:()=>o(!0),loading:s,children:"创建"}),i.jsx(pe,{type:"primary",danger:!0,disabled:!S,onClick:E,loading:s,children:"批量删除"}),i.jsx(pe,{onClick:()=>h(),loading:s,children:"刷新列表"})]})}),i.jsx(gs,{columns:$,...p,rowKey:"id"})]})})]}),i.jsxs(ae,{title:"组件文件结构",titleEn:"Component Directory Structure",children:[i.jsxs(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:["将表格页面的各个模块",i.jsx("strong",{children:"按职责拆分到独立文件中"}),"进行封装，可维护性更高。以下是推荐的文件结构："]}),i.jsx("pre",{style:{background:"var(--ds-bg-card)",padding:"12px 16px",borderRadius:8,border:"1px solid var(--ds-border)",fontFamily:"monospace",fontSize:13,color:"var(--ds-text)",lineHeight:"1.6",margin:0},children:`UseTablePlayground/
├── api.ts          # 接口及数据模型层（负责数据的增删改查 API 模拟）
├── useColumn.tsx   # 列表列定义 Hook（抽离表格列配置及操作回调）
├── batchActions.tsx# 批量操作组件（处理表格上方的批量操作和刷新）
├── add.tsx         # 创建组件（新增数据弹窗/表单）
├── update.tsx      # 编辑组件（修改数据弹窗/表单）
├── detail.tsx      # 详情组件（查看单条数据详情弹窗）
└── view.tsx        # 主页面视图组件（入口视图，进行核心数据流整合与装配）`})]}),i.jsxs(ae,{title:"1. 接口文件",titleEn:"api.ts",children:[i.jsxs(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:["定义数据传输契约，直接以统一的 ",i.jsx("code",{children:"Result"})," 格式作为返回值。"]}),i.jsx(de,{darkCode:Je,lightCode:Je,lang:"typescript"})]}),i.jsxs(ae,{title:"2. 列表列配置文件",titleEn:"useColumn.tsx",children:[i.jsx(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:"将表格的 columns 单独抽离成 Hook。在渲染每一行（例如详情、编辑、删除按钮）时，可通过依赖传入的回调来联动。"}),i.jsx(de,{darkCode:Ze,lightCode:Ze,lang:"tsx"})]}),i.jsxs(ae,{title:"3. 批量操作栏组件",titleEn:"batchActions.tsx",children:[i.jsxs(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:["批量操作、新建按钮等工具栏通常较为复杂，将其抽离并接收外部的 ",i.jsx("code",{children:"selectedList"}),"、",i.jsx("code",{children:"refresh"})," 方法和 ",i.jsx("code",{children:"onCreate"})," 回调。"]}),i.jsx(de,{darkCode:et,lightCode:et,lang:"tsx"})]}),i.jsxs(ae,{title:"4. 创建组件",titleEn:"add.tsx",children:[i.jsx(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:"负责展示创建新用户的模态对话框，包含输入校验，并在成功后执行刷新。"}),i.jsx(de,{darkCode:tt,lightCode:tt,lang:"tsx"})]}),i.jsxs(ae,{title:"5. 编辑组件",titleEn:"update.tsx",children:[i.jsx(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:"负责展示编辑已有用户的模态对话框，预填充被修改的数据，保存成功后刷新。"}),i.jsx(de,{darkCode:st,lightCode:st,lang:"tsx"})]}),i.jsxs(ae,{title:"6. 详情组件",titleEn:"detail.tsx",children:[i.jsx(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:"负责展示单条数据的详细属性，采用只读形式显示。"}),i.jsx(de,{darkCode:nt,lightCode:nt,lang:"tsx"})]}),i.jsxs(ae,{title:"7. 主页面视图",titleEn:"view.tsx",children:[i.jsx(ee,{type:"secondary",style:{fontSize:12,display:"block",marginBottom:8},children:"入口视图，用于将 `useTable` 的 `tableProps` 和上面定义的各个独立文件组装在一起，使代码极为紧凑、条理清晰。"}),i.jsx(de,{darkCode:rt,lightCode:rt,lang:"tsx"})]}),i.jsx(yn,{open:a,onCancel:()=>o(!1),onSuccess:()=>{o(!1),h()}}),i.jsx(Cn,{open:!!l,user:l,onCancel:()=>d(null),onSuccess:()=>{d(null),h()}}),i.jsx($n,{open:m!==null,userId:m,onCancel:()=>c(null)})]})}export{qn as default};
