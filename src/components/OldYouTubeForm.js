import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
    name: '',
    email: '',
    channel: ''
}

const onSubmit = (values) => {
    console.log(values)
}


const validationSchema = yup.object({
    name: yup.string().required('This field is required'),

    email: yup.string().email("Invalid Email").required('This field is required'),

    channel: yup.string().required("This field is required")

})

function YoutubeForm() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    console.log("Visited Fields", formik.touched);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ?
                        <div className="error">{formik.errors.name}</div> : null
                    }
                </div>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ?
                        <div className="error">{formik.errors.email}</div> : null
                    }
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" name="channel" id="name" onChange={formik.handleChange}
                        value={formik.values.channel}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.channel && formik.touched.channel ?
                        <div className="error">{formik.errors.channel}</div> : null
                    }
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
