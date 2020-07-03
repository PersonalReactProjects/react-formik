import React from 'react';
import { Box, Button, Card, CardContent, Checkbox, CheckboxProps, FormControlLabel, FormGroup, MenuItem, TextField, Typography, Container } from '@material-ui/core';
import { Form, Formik, Field, useField, ErrorMessage, } from 'formik';
import { array, boolean, mixed, number, object, string } from 'yup';


const initialValues = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptTermsAndConditions: false
}

function FormikMaterialUI() {
    return (
        <>
            <Container>
                <Card>
                    <CardContent>
                        <Box marginBottom={2}>
                            <Typography variant="h4">New Account</Typography>
                        </Box>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, formikHelpers) => {
                                return new Promise(res => {
                                    setTimeout(() => {
                                        console.log(values);
                                        console.log(formikHelpers);
                                        console.log('---------');
                                        res();
                                    }, 5000);
                                })
                            }}
                            validationSchema={
                                object({
                                    fullName: string().required('Your name is mandatory').min(2, "Full Name must be at least 2 characters long").max(100, "Full Name must not be more than 100 characters long"),
                                    initialInvestment: number().required("This field is required").min(100, "Minimum Initial investment cannot be less than 100 Dollars"),
                                    dependents: number().required("This field is required").min(0, "Dependents must not be less than zero").max(5, "Dependents cannot exceed 5 "),
                                    acceptTermsAndConditions: boolean().oneOf([true], "You have to accept Terms and Conditions"),
                                    investmentRisk: array(string().oneOf(['High', 'Medium', 'Low',], "You have to choose one of the values of High, Medium or Low ")).min(1, "Choose at least one of the given values"),
                                    commentAboutInvestmentRisk: mixed().when('investmentRisk', {
                                        is: (investmentRisk: string[]) => investmentRisk.find(ir => ir === 'High'),
                                        then: string().required("This field is required").min(20, "Minimum of 20 characters").max(100, "Maximum of 100 characters"),
                                        otherwise: string().min(20, "Minimum of 20 characters").max(100, "Maximum of 100 characters")
                                    })
                                })
                            }
                        >
                            {
                                ({ values, errors, isSubmitting, isValidating, ...props }) =>

                                    (<Form>
                                        <Box marginBottom={2}>
                                            <FormGroup>
                                                <Field name="fullName" as={TextField} label="Full Name"
                                                    error={errors.fullName && props.touched.fullName}
                                                    helperText={errors.fullName}
                                                />
                                            </FormGroup>
                                        </Box>


                                        <Box marginBottom={2}>
                                            <FormGroup>
                                                <Field
                                                    name="initialInvestment"
                                                    type="number"
                                                    as={TextField}
                                                    label="Initial Investment"
                                                    error={errors.initialInvestment && props.touched.initialInvestment}
                                                    helperText={errors.initialInvestment}
                                                />

                                            </FormGroup>
                                        </Box>

                                        <Box marginBottom={2}>
                                            <label>Select the risk you want to take:</label>
                                            <FormGroup>
                                                <MyCheckbox
                                                    name="investmentRisk"
                                                    value="High"
                                                    label="High - Super Risky"
                                                />
                                                <MyCheckbox
                                                    name="investmentRisk"
                                                    value="Medium"
                                                    label="Medium - Risky"
                                                />
                                                <MyCheckbox
                                                    name="investmentRisk"
                                                    value="Low"
                                                    label="Low - Safe"
                                                />
                                                <MyCheckbox
                                                    name="investmentRisk"
                                                    value="Very low"
                                                    label="Very low"
                                                />
                                            </FormGroup>
                                            <ErrorMessage name="investmentRisk" />
                                        </Box>
                                        <Box marginBottom={2}>
                                            <FormGroup>
                                                <Field
                                                    name="commentAboutInvestmentRisk"
                                                    as={TextField}
                                                    multiline
                                                    rows={3}
                                                    rowsMax={10}
                                                    label="Comment About Investment Risk"
                                                    error={errors.commentAboutInvestmentRisk && props.touched.commentAboutInvestmentRisk}
                                                    helperText={errors.commentAboutInvestmentRisk}
                                                />

                                            </FormGroup>
                                        </Box>

                                        <Box marginBottom={2}>
                                            <FormGroup>
                                                <Field
                                                    name="dependents"
                                                    label="dependents"
                                                    as={TextField}
                                                    select
                                                    error={errors.dependents && props.touched.dependents}
                                                    helperText={errors.dependents}
                                                >
                                                    <MenuItem value={-1}>Select ...</MenuItem>
                                                    <MenuItem value={0}>0</MenuItem>
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                </Field>

                                            </FormGroup>
                                        </Box>

                                        <Box marginBottom={2}>
                                            <FormGroup>
                                                <MyCheckbox
                                                    name="acceptTermsAndConditions"
                                                    label="Accept terms and conditions"
                                                />
                                                <ErrorMessage name="acceptTermsAndConditions" />
                                            </FormGroup>
                                        </Box>
                                        <Button type="submit" disabled={isSubmitting || isValidating}>Submit</Button>


                                        <pre>{JSON.stringify(props, null, 4)}</pre>
                                        <pre>{JSON.stringify(errors, null, 4)}</pre>
                                    </Form>
                                    )
                            }
                        </Formik>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}


export function MyCheckbox(props) {

    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    });
    return (
        <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />
    )
}

export default FormikMaterialUI
