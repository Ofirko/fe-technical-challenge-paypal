# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

    *Answer*: ...
    * It seems like the component indulges in [busy waiting](https://en.wikipedia.org/wiki/Busy_waiting), which is generally a bad practice and is easily avoidable.

    * onError and onCancel both call a function within the render. This seems counterproductive to their goal.
    
    * Considering `render`s lifecycle, the change in `window['paypal']` will not re-render the component. Even passing it as a prop might help.

    * The `Button` const should be of type `PayPalButtonsComponent`.

    * The env shouldn't be hardcoded.

    * There's no error handling in place.

    * onApprove is not written yet.





2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).
4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

    *Answer*: 
    A quick googling showed this is an intended feature added to [React 18](https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state) to find bugs as explained [here](https://legacy.reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects). Basically: 
    >`"Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking..."`

    This was also brought up in the specific context of the PayPal button [here](https://stackoverflow.com/questions/72922779/how-to-fix-duplicated-paypal-button-in-react-strict-mode) and [here](https://copyprogramming.com/howto/how-does-react-strict-mode-works#how-to-fix-duplicated-paypal-button-in-react-strict-mode).

    As far as going about the problem - I would look into the 'driver' in line 41.


### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
