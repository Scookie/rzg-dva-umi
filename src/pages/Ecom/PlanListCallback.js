import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from "antd";

@connect(({ loading }) => ({
  loading: loading.effects['ecom/fetchPlan'],
}))
export default class Test extends Component {
  state={
    planData:[]
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'ecom/fetchPlanAndCallback',
      payload:{},
      callback:(planData)=>{
        this.setState({planData});
      }
    });
  }

  render(){
    const { loading } = this.props;
    const { planData } = this.state;

    let columns = [
      {title:"计划Id",dataIndex:"id"},
      {title:"计划名称",dataIndex:"name"},
      {title:"更新时间",dataIndex:"updateTime"},
    ]
    return(
      <Table dataSource={planData} columns={columns} rowKey="id" loading={loading} />
    );
  }
}