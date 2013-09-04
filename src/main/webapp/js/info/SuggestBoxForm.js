SuggestBoxForm=Ext.extend(Ext.Window,{formPanel:null,constructor:function(a){Ext.applyIf(this,a);this.initUIComponents();SuggestBoxForm.superclass.constructor.call(this,{id:"SuggestBoxFormWin",layout:"fit",items:this.formPanel,modal:true,height:550,iconCls:"menu-suggestbox",width:735,maximizable:true,title:"意见详细信息",buttonAlign:"center",buttons:this.buttons});},initUIComponents:function(){this.formPanel=new Ext.FormPanel({layout:"form",bodyStyle:"padding:10px 10px 10px 10px",border:false,url:__ctxPath+"/info/saveSuggestBox.do",id:"SuggestBoxForm",defaults:{anchor:"95%,95%"},autoScroll:true,defaultType:"textfield",items:[{name:"suggestBox.boxId",id:"boxId",xtype:"hidden",value:this.boxId==null?"":this.boxId},{name:"suggestBox.status",id:"status",xtype:"hidden",value:0},{xtype:"radiogroup",fieldLabel:"签名方式",autoHeight:true,columns:2,width:520,items:[{boxLabel:"使用签名",name:"SuggestBoxSign",inputValue:1,id:"isSign1",checked:true,handler:function(a){if(a.getValue()!=true){Ext.getCmp("PersonalInfo").hide();Ext.getCmp("senderFullname").setValue("");Ext.getCmp("senderId").setValue("");}else{Ext.getCmp("PersonalInfo").show();if(curUserInfo!=null){Ext.getCmp("senderFullname").setValue(curUserInfo.fullname);Ext.getCmp("senderId").setValue(curUserInfo.userId);}}}},{boxLabel:"匿名",name:"SuggestBoxSign",inputValue:0,id:"isSign0"}]},{xtype:"fieldset",title:"个人信息",id:"PersonalInfo",defaults:{anchor:"95%,95%"},defaultType:"textfield",layout:"form",items:[{xtype:"container",layout:"column",height:27,defaultType:"textfield",items:[{xtype:"label",text:"发送人",width:103},{name:"suggestBox.senderFullname",id:"senderFullname",value:curUserInfo!=null?curUserInfo.fullname:null},{xtype:"label",text:"联系电话",width:103},{name:"suggestBox.phone",id:"phone"}]},{fieldLabel:"Email",name:"suggestBox.email",id:"email"}]},{fieldLabel:"意见标题",name:"suggestBox.subject",id:"subject"},{fieldLabel:"意见内容",name:"suggestBox.content",id:"content",xtype:"htmleditor"},{fieldLabel:"发送人ID",name:"suggestBox.senderId",id:"senderId",xtype:"hidden",value:curUserInfo!=null?curUserInfo.userId:null},{xtype:"radiogroup",fieldLabel:"是否公开",autoHeight:true,columns:2,width:520,items:[{boxLabel:"公开",name:"suggestBox.isOpen",inputValue:0,id:"isOpen1",checked:true,handler:function(a){if(a.getValue()==true){Ext.getCmp("SuggestBoxFormQueryPwd").hide();}else{Ext.getCmp("SuggestBoxFormQueryPwd").show();}}},{boxLabel:"不公开",name:"suggestBox.isOpen",inputValue:1,id:"isOpen0"}]},{xtype:"fieldset",title:"查询密码（选填）",hidden:true,defaults:{anchor:"95%,95%"},id:"SuggestBoxFormQueryPwd",defaultType:"textfield",layout:"column",items:[{xtype:"label",text:"查询密码",width:103},{name:"suggestBox.queryPwd",id:"queryPwd",inputType:"password"},{xtype:"label",text:"密码确认",width:103},{name:"SureQueryPwd",id:"SureQueryPwd",inputType:"password",listeners:{change:function(d,c,a){var b=Ext.getCmp("queryPwd");if(b.getValue()!=d.getValue()){Ext.Msg.alert("注意","两次输入的密码不一致,请重新填写.");b.setValue("");d.setValue("");}}}}]}]});if(this.boxId!=null&&this.boxId!="undefined"){this.formPanel.loadData({url:__ctxPath+"/info/getSuggestBox.do?boxId="+this.boxId,preName:"SuggestBox",root:"data"});}this.buttons=[{text:"提交",iconCls:"btn-ok",scope:this,handler:this.draft},{text:"保存",iconCls:"btn-save",scope:this,handler:this.save.createCallback(this.formPanel,this)},{text:"重置",iconCls:"btn-reset",scope:this,handler:this.reset.createCallback(this.formPanel)},{text:"取消",iconCls:"btn-cancel",scope:this,handler:this.cancel.createCallback(this)}];},reset:function(a){a.getForm().reset();},cancel:function(a){a.close();},save:function(a,b){if(a.getForm().isValid()){a.getForm().submit({method:"POST",waitMsg:"正在提交数据...",success:function(c,e){Ext.ux.Toast.msg("操作信息","成功保存信息！");var d=Ext.getCmp("SuggestBoxGrid");if(d!=null){d.getStore().reload();}b.close();},failure:function(c,d){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});b.close();}});}},draft:function(){Ext.getCmp("status").setValue("1");this.save(this.formPanel,this);}});