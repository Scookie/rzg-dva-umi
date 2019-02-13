import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import PlanForm from './planForm';
import { Table,Button,Modal,message,Divider } from "antd";

@connect(({ ecom,menu, loading }) => ({
  planData:ecom.planData,
  menu:menu,
  loading: loading.effects['ecom/fetchPlan'],
}))
export default class Test extends Component {
  state = {
    visible:false,
    formType:"create",
    currentRow:{},
    pagination:{current:1,pageSize:20},
  }

  componentDidMount(){
    this.fetchList();
  }

  fetchList = () => {
    const { pagination } = this.state;
    this.props.dispatch({
      type: 'ecom/fetchPlan',
      payload:{page:pagination.current,size:pagination.pageSize}
    });
  }  

  onCreate = () => {
    this.setState({visible:true});
  }

  onEdit = (row) => {
    this.setState({visible:true,formType:"edit",currentRow:row},()=>{
      if(this.form){
        this.setFormValue();
      }
    })
  }

  onDelete = (row) => {
    this.props.dispatch({
      type: 'ecom/delete',
      payload: {id:row.id},
      callback:(result)=>{
        if(result.status == "success"){
          message.success("操作成功");
          this.fetchList();
        }else{
          message.error("操作失败");
        }
      }
    });
  }

  onOk = () => {
    this.form && this.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:"ecom/create",
          payload:this.state.formType == "edit" ? {...value,id:this.state.currentRow.id} : {...values},
          callback:(result)=>{
            if(result.status == "success"){
              message.success("操作成功");
              this.onCancel();
              this.fetchList();
            }else{
              message.error("操作失败");
            }
          }
        })
        
      }
    });
  }

  onCancel = () => {
    this.form.resetFields();
    this.setState({visible:false,formType:"create"});
  }

  saveForm = (form) => {
    if(form){
      this.form=form;
      if(this.state.formType == "edit"){
        this.setFormValue(form);
      }
    }
  }

  //表单回显
  setFormValue = (form=this.form) => {
    const { currentRow } = this.state;
    form && form.setFieldsValue({gq:currentRow.gq,zhwchm:currentRow.zhwchm});
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination,...pagination };
    this.setState({
      pagination: pager,
    },this.fetchList); 
  }

  render(){
    const { loading,planData,pagination } = this.props;
    const { data=[],total=0 } = planData;
    let columns = [
      {title:"名称",dataIndex:"zhwchm"},
      {title:"港区",dataIndex:"gq"},
      {title:"更新时间",dataIndex:"gxshj"},
      {title:"操作",render:(data,row)=>(<Fragment><a href="#" onClick={this.onEdit.bind(this,row)}>编辑</a><Divider type="vertical" /><a href="#" onClick={this.onDelete.bind(this,row)}>删除</a></Fragment>)},
    ]
    return(
      <Fragment>
        <Button onClick={this.onCreate} style={{marginBottom:10}}>新增</Button>
        <Table 
          dataSource={data} 
          columns={columns}
          pagination={{...this.state.pagination,total:total,showTotal:total => `共${total}条`}}
          onChange={this.handleTableChange}
          rowKey="id" 
          loading={loading} />
        <Modal 
          visible={this.state.visible} 
          title={this.state.formType =="edit" ? "编辑" : "新增"}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <PlanForm ref={this.saveForm}/>
        </Modal>
      </Fragment>
      
    );
  }
}
