import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {


    renderError({error, touched}){
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => { //we destructred 'input' from 'formProps'

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)} 
            </div>//meta => comming from form redux and has error message in it and other properties
        )
    }

    onSubmit = (formValues) => {
       this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Ender Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    } 
        
}

// if a field has same name as a property that exists inside that (error) object then redux form is going to take that message and pass it to renderInput function for each field that gets created
const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        //only ran if the user did not enter a tittle
        errors.title = 'You must enter a title';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);

