import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import TextError from './TextError'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const onSubmit = (values) => {
    console.log(values)
}


const validationSchema = yup.object({
    name: yup.string().required('This field is required'),

    email: yup.string().email("Invalid Email").required('This field is required'),

    channel: yup.string().required("This field is required"),
    address: yup.string().required("This field is required"),
    comments: yup.string().required("This field is required"),

    social: yup.string().required("This field is required")

})

function YoutubeForm() {


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text"
                        name="name"
                        id="name"
                    />
                    <ErrorMessage component={TextError} name="name" />
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email"
                        name="email"
                        id="email"
                    />
                    <ErrorMessage name="email" >
                        {
                            (errorMsg) => {
                                return <div className="error">
                                    {errorMsg}
                                </div>
                            }
                        }
                    </ErrorMessage>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text"
                        name="channel"
                        id="channel"
                    />
                    <ErrorMessage component={TextError} name="channel" />
                </div>

                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field as="textarea" id="comments" name="comments" />
                    {/* you can also change the 'as' props to component and it stills works fine */}
                    <ErrorMessage component={TextError} name="comments" />

                </div>

                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <Field name="address" >
                        {
                            (props) => {
                                const { field, meta } = props;

                                return <div>
                                    <input type="text" id="address"{...field} />
                                    {meta.error && meta.touched ? <div className="error">{meta.error}</div> : null}
                                </div>
                            }
                        }
                    </Field>
                </div>
                <div className="form-control">
                    <label htmlFor="facebook">Facebook Profile</label>
                    <Field type="text" id="facebook" name='social.facebook' />

                </div>
                <div className="form-control">
                    <label htmlFor="twitter">Twitter Profile</label>
                    <Field type="text" id="twitter" name='social.twitter' />
                </div>

                <div className="form-control">
                    <label htmlFor="primaryPh">Primary Phone</label>
                    <Field type="text" id="primaryPh" name='phoneNumbers[0]' />
                </div>

                <div className="form-control">
                    <label htmlFor="secondaryPh">Secondary Phone</label>
                    <Field type="text" id="secondaryPh" name='phoneNumbers[1]' />
                </div>


                <div className="form-control">
                    <label htmlFor="">List of phone numbers</label>

                    <FieldArray name="phNumbers">
                        {
                            (fieldArrayProps) => {
                                console.log("field array props", fieldArrayProps)
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { phNumbers } = values;
                                return <div>
                                    {
                                        phNumbers.map((phNumbers, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                {
                                                    index > 0 && (

                                                        <button type="button" onClick={() => remove(index)}>
                                                            {' '}
                                                            -{' '}
                                                        </button>
                                                    )
                                                }
                                                <button type="button" onClick={() => push('')}> + </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                </div>


                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default YoutubeForm
