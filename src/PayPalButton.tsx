import React from 'react'
import ReactDOM from 'react-dom'
import { connect, useFormikContext} from 'formik'
import type PayPal from '@paypal/paypal-js'
const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style']
type PayPalButtonComponent = React.ComponentType<
  PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }
>

  const PayPalButton = () => {
  const formik = useFormikContext()
  const createOrderOrBillingAgreement = async () => {
    formik.submitForm() // submit will call api with form values and inject _paypal_token into the form values
    await sleepUntilSubmitted()
    if (formik.isValid) formik.setSubmitting(true)
    return 'fake_paypal_token' 
  }

  const env = "sandbox";
  const sleepUntilSubmitted = async () => {
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    while (formik.isSubmitting) {
      await sleep(100)
    }
  }

  const onApprove = async () => {    
    // do something on success
  }
  
  const onCancel = async () => {
    formik.setSubmitting(false);
  }

  const onError = async (err: Record<string, unknown>) => {
    formik.setSubmitting(false);
    console.log("error!", err);
  }

  const paypal = window['paypal']
  if (!paypal) return null

  const Button = (paypal.Buttons! as any).driver('react', {
    React,
    ReactDOM,
  }) as PayPalButtonComponent
  const { isSubmitting } = formik

  return (
    <div>
      <div style={(isSubmitting && { display: 'none' }) || {}}>
        <Button
          commit
          env={env}
          createBillingAgreement={createOrderOrBillingAgreement}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
          style={buttonStyle}
        />
      </div>
    </div>
  )
}

export type PayPalFormValues = { _paypal_token?: string }

export default connect(PayPalButton);
