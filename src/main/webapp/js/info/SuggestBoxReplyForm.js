SuggestBoxReplyForm=Ext.extend(Ext.Window,{formPanel:null,displayPanel:null,constructor:function(a){Ext.applyIf(this,a);this.initUIComponents();SuggestBoxReplyForm.superclass.constructor.call(this,{id:"SuggestBoxReplyFormWin",layout:{type:"vbox",align:"stretch"},items:[this.displayPanel,this.formPanel],modal:true,height:550,width:735,maximizable:true,title:"意见回复",iconCls:"menu-suggestbox",buttonAlign:"center",buttons:this.buttons});},initUIComponents:function(){this.displayPanel=new Ext.Panel({flex:1,id:"CheckEmpProfileFormPanel",autoScroll:true,border:false,autoLoad:{url:__ctxPath+"/pages/info/displaySuggest.jsp?boxId="+this.boxId}});this.formPanel=new Ext.FormPanel({layout:"form",flex:1,bodyStyle:"padding:10px 10px 10px 10px",border:false,url:__ctxPath+"/info/replySuggestBox.do",id:"SuggestBoxReplyForm",defaults:{anchor:"95%,95%"},autoScroll:true,defaultType:"textfield",items:[{name:"suggestBox.boxId",id:"boxId",xtype:"hidden",value:this.boxId==null?"":this.boxId},{xtype:"radiogroup",fieldLabel:"是否公开",autoHeight:true,columns:2,width:520,items:[{boxLabel:"公开",name:"suggestBox.isOpen",inputValue:0,id:"isOpen1",checked:true},{boxLabel:"不公开",name:"suggestBox.isOpen",inputValue:1,id:"isOpen0"}]},{fieldLabel:"回复内容",name:"suggestBox.replyContent",id:"replyContent",width:200,xtype:"htmleditor"}]});this.buttons=[{text:"保存",iconCls:"btn-save",scope:this,handler:this.reply.createCallback(this.formPanel,this)},{text:"重置",iconCls:"btn-reset",scope:this,handler:this.reset.createCallback(this.formPanel)},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.cancel.createCallback(this)}];},reset:function(a){a.getForm().reset();},cancel:function(a){a.close();},reply:function(a,b){if(a.getForm().isValid()){a.getForm().submit({method:"POST",waitMsg:"正在提交数据...",success:function(c,e){Ext.ux.Toast.msg("操作信息","成功保存信息！");var d=Ext.getCmp("SuggestBoxGrid");if(d!=null){d.getStore().reload();}b.close();},failure:function(c,d){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});b.close();}});}}});