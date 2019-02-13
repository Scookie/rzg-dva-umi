import React, { Component } from 'react';
import { Input,Form, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class CreateForm extends Component{

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return(
      <Form>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          {getFieldDecorator('zhwchm', {
            rules: [{ required: true, message: '长度1-24个字符或汉字，允许输入大小写英文字母、数字、-、_组合',pattern: /^[\u4e00-\u9fa5A-Za-z0-9_-]{1,24}$/ }],
          })(
            <Input disabled={this.props.type=="edit"} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="港区"
        >
          {getFieldDecorator('gq', {
            rules: [{ required: true, message: '请选择港区' }],
          })(
            <Select>
              <Option value="石臼港区">石臼港区</Option>
              <Option value="岚山港区">岚山港区</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('remark', {
            rules: [{ required: false, message: '长度1-128',pattern: /^[\u4e00-\u9fa5A-Za-z0-9_-]{1,128}$/  }],
          })(
            <TextArea></TextArea>
          )}
        </FormItem>
      </Form>
    );
  }
}
export default Form.create()(CreateForm);
