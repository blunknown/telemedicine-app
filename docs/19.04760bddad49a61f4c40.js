(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{X3O5:function(t,e,a){"use strict";a.r(e),a.d(e,"TeletriagesModule",function(){return N});var o=a("ofXK"),n=a("tyNb"),i=a("M9IT"),c=a("Dh3D"),r=a("+0xr"),s=a("0IaG"),l=a("fXoL"),b=a("3Pt+"),d=a("6WPy"),m=a("kmnG"),u=a("qFsG"),f=a("bTqV");let p=(()=>{class t{constructor(t,e,a){this.teletry=t,this.formBuilder=e,this.teletryService=a,this.registrado=!1,this.buildForm()}buildForm(){this.form=this.formBuilder.group({medicamentos:"",indicaciones:""})}ngOnInit(){this.teletryService.getMedicationByTeletryId(this.teletry._id).subscribe(t=>{this.registrado=t&&t[0],t&&t[0]&&this.form.patchValue({medicamentos:t[0].medicamentos,indicaciones:t[0].indicaciones})})}}return t.\u0275fac=function(e){return new(e||t)(l.Pb(s.a),l.Pb(b.e),l.Pb(d.a))},t.\u0275cmp=l.Jb({type:t,selectors:[["app-details"]],decls:15,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],[1,"form",3,"formGroup"],[1,"w-100"],["matInput","","readonly","","formControlName","medicamentos"],["matInput","","readonly","","formControlName","indicaciones"],["align","end",1,"pt-0"],["mat-button","","mat-dialog-close","","color","primary"]],template:function(t,e){1&t&&(l.Vb(0,"h2",0),l.Qc(1,"Medicaci\xf3n asignada"),l.Ub(),l.Vb(2,"mat-dialog-content",1),l.Vb(3,"form",2),l.Vb(4,"mat-form-field",3),l.Vb(5,"mat-label"),l.Qc(6,"Medicamentos"),l.Ub(),l.Qb(7,"input",4),l.Ub(),l.Vb(8,"mat-form-field",3),l.Vb(9,"mat-label"),l.Qc(10,"Indicaciones"),l.Ub(),l.Qb(11,"input",5),l.Ub(),l.Ub(),l.Ub(),l.Vb(12,"mat-dialog-actions",6),l.Vb(13,"button",7),l.Qc(14,"Cancelar"),l.Ub(),l.Ub()),2&t&&(l.Cb(3),l.qc("formGroup",e.form))},directives:[s.h,s.e,b.v,b.n,b.h,m.b,m.e,u.b,b.c,b.m,b.g,s.c,f.b,s.d],styles:[""]}),t})();var h=a("NFeN");function g(t,e){1&t&&(l.Vb(0,"th",19),l.Qc(1,"N\xb0"),l.Ub())}function C(t,e){if(1&t&&(l.Vb(0,"td",20),l.Qc(1),l.Ub()),2&t){const t=e.$implicit;l.Cb(1),l.Rc(t.numero)}}function w(t,e){1&t&&(l.Vb(0,"th",19),l.Qc(1,"Fecha"),l.Ub())}function U(t,e){if(1&t&&(l.Vb(0,"td",20),l.Qc(1),l.Ub()),2&t){const t=e.$implicit;l.Cb(1),l.Rc(t.created_at)}}function V(t,e){1&t&&(l.Vb(0,"th",21),l.Qc(1,"Indicadores de estado"),l.Ub())}function y(t,e){if(1&t&&(l.Vb(0,"td",20),l.Vb(1,"div",22),l.Vb(2,"div",23),l.Qb(3,"div",24),l.Qc(4),l.Ub(),l.Vb(5,"div",23),l.Qb(6,"div",25),l.Qc(7),l.Ub(),l.Vb(8,"div",23),l.Qb(9,"div",26),l.Qc(10),l.Ub(),l.Vb(11,"div",23),l.Qb(12,"div",27),l.Qc(13),l.Ub(),l.Ub(),l.Ub()),2&t){const t=e.$implicit;l.Cb(4),l.Sc(" ",t.verde," "),l.Cb(3),l.Sc(" ",t.amarillo," "),l.Cb(3),l.Sc(" ",t.naranja," "),l.Cb(3),l.Sc(" ",t.rojo," ")}}function O(t,e){1&t&&(l.Vb(0,"th",19),l.Qc(1,"Recomendacion"),l.Ub())}function Q(t,e){if(1&t&&(l.Vb(0,"td",20),l.Qc(1),l.Ub()),2&t){const t=e.$implicit;l.Cb(1),l.Rc(t.recomendacion)}}function S(t,e){1&t&&(l.Vb(0,"th",21),l.Qc(1,"Acciones"),l.Ub())}function v(t,e){if(1&t){const t=l.Wb();l.Vb(0,"td",20),l.Vb(1,"button",28),l.fc("click",function(){l.Fc(t);const a=e.$implicit;return l.jc().selectTeletry(a)}),l.Vb(2,"mat-icon"),l.Qc(3,"description"),l.Ub(),l.Ub(),l.Ub()}}function D(t,e){1&t&&(l.Vb(0,"th",29),l.Qc(1,"Cargando datos..."),l.Ub())}function M(t,e){1&t&&l.Qb(0,"tr",30)}function P(t,e){1&t&&l.Qb(0,"tr",31)}const _=function(t){return{hide:t}};function j(t,e){if(1&t&&l.Qb(0,"tr",32),2&t){const t=l.jc();l.qc("ngClass",l.uc(1,_,null!=t.dataSource))}}function F(t,e){1&t&&(l.Vb(0,"tr",33),l.Vb(1,"td",34),l.Qc(2,"No hay datos disponibles."),l.Ub(),l.Ub())}const x=function(){return["loading"]},T=function(){return[5,10,20]},k=[{path:"",component:(()=>{class t{constructor(t,e){this.teletryService=t,this.dialog=e,this.isLinear=!1,this.displayedColumns=["numero","created_at","indicadores","recomendacion","acciones"]}ngOnInit(){this.teletryService.getTeletriages().subscribe(t=>{console.log(t);let e=t.length;t.forEach(t=>{t.numero=e,e--}),console.log(t),this.dataSource=new r.o(t),this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator,this.setupFilter()})}setupFilter(){this.dataSource.filterPredicate=(t,e)=>-1!=t.numero.toString().trim().toLowerCase().indexOf(e)||-1!=t.created_at.trim().toLowerCase().indexOf(e)||-1!=t.recomendacion.trim().toLowerCase().indexOf(e)}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}selectTeletry(t){this.dialog.open(p,{data:t,autoFocus:!1})}}return t.\u0275fac=function(e){return new(e||t)(l.Pb(d.a),l.Pb(s.b))},t.\u0275cmp=l.Jb({type:t,selectors:[["app-teletriages"]],viewQuery:function(t,e){if(1&t&&(l.Uc(i.a,!0),l.Uc(c.a,!0)),2&t){let t;l.Cc(t=l.gc())&&(e.paginator=t.first),l.Cc(t=l.gc())&&(e.sort=t.first)}},decls:33,vars:8,consts:[["matInput","","placeholder","Ej. Maricarmen","autocomplete","off",3,"keyup"],["input",""],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","numero"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","created_at"],["matColumnDef","indicadores"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","recomendacion"],["matColumnDef","acciones"],["matColumnDef","loading"],["mat-footer-cell","","colspan","6",4,"matFooterCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-footer-row","",3,"ngClass",4,"matFooterRowDef"],["class","mat-row",4,"matNoDataRow"],["showFirstLastButtons","",3,"pageSizeOptions","pageSize"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],[1,"d-flex","text-center"],[1,"mr-1"],[1,"verde"],[1,"amarillo"],[1,"naranja"],[1,"rojo"],["mat-mini-fab","","color","primary",1,"mr-2",3,"click"],["mat-footer-cell","","colspan","6"],["mat-header-row",""],["mat-row",""],["mat-footer-row","",3,"ngClass"],[1,"mat-row"],["colspan","6",1,"mat-cell"]],template:function(t,e){1&t&&(l.Vb(0,"h1"),l.Qc(1,"Mis Teletriajes"),l.Ub(),l.Vb(2,"p"),l.Qc(3," Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex saepe quas placeat quae illo nobis sed perspiciatis alias, molestias ipsa explicabo perferendis repudiandae dolores culpa animi nulla in excepturi eum?\n"),l.Ub(),l.Vb(4,"mat-form-field"),l.Vb(5,"mat-label"),l.Qc(6,"Buscar por N\xb0, fecha o recomendacion"),l.Ub(),l.Vb(7,"input",0,1),l.fc("keyup",function(t){return e.applyFilter(t)}),l.Ub(),l.Ub(),l.Vb(9,"div",2),l.Vb(10,"table",3),l.Tb(11,4),l.Oc(12,g,2,0,"th",5),l.Oc(13,C,2,1,"td",6),l.Sb(),l.Tb(14,7),l.Oc(15,w,2,0,"th",5),l.Oc(16,U,2,1,"td",6),l.Sb(),l.Tb(17,8),l.Oc(18,V,2,0,"th",9),l.Oc(19,y,14,4,"td",6),l.Sb(),l.Tb(20,10),l.Oc(21,O,2,0,"th",5),l.Oc(22,Q,2,1,"td",6),l.Sb(),l.Tb(23,11),l.Oc(24,S,2,0,"th",9),l.Oc(25,v,4,0,"td",6),l.Sb(),l.Tb(26,12),l.Oc(27,D,2,0,"th",13),l.Sb(),l.Oc(28,M,1,0,"tr",14),l.Oc(29,P,1,0,"tr",15),l.Oc(30,j,1,3,"tr",16),l.Oc(31,F,3,0,"tr",17),l.Ub(),l.Qb(32,"mat-paginator",18),l.Ub()),2&t&&(l.Cb(10),l.qc("dataSource",e.dataSource),l.Cb(18),l.qc("matHeaderRowDef",e.displayedColumns),l.Cb(1),l.qc("matRowDefColumns",e.displayedColumns),l.Cb(1),l.qc("matFooterRowDef",l.tc(6,x)),l.Cb(2),l.qc("pageSizeOptions",l.tc(7,T))("pageSize",5))},directives:[m.b,m.e,u.b,r.n,c.a,r.c,r.h,r.b,r.d,r.j,r.m,r.f,r.k,i.a,r.g,c.b,r.a,f.b,h.a,r.i,r.l,r.e,o.k],styles:["table[_ngcontent-%COMP%]{width:100%}.mat-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.hide[_ngcontent-%COMP%]{display:none}.verde[_ngcontent-%COMP%]{background:green}.naranja[_ngcontent-%COMP%], .verde[_ngcontent-%COMP%]{width:20px;height:20px}.naranja[_ngcontent-%COMP%]{background:orange}.amarillo[_ngcontent-%COMP%]{background:#ff0}.amarillo[_ngcontent-%COMP%], .rojo[_ngcontent-%COMP%]{width:20px;height:20px}.rojo[_ngcontent-%COMP%]{background:red}"]}),t})()}];let R=(()=>{class t{}return t.\u0275mod=l.Nb({type:t}),t.\u0275inj=l.Mb({factory:function(e){return new(e||t)},imports:[[n.c.forChild(k)],n.c]}),t})();var q=a("hctd");let N=(()=>{class t{}return t.\u0275mod=l.Nb({type:t}),t.\u0275inj=l.Mb({factory:function(e){return new(e||t)},imports:[[o.c,R,q.a,b.s]]}),t})()}}]);