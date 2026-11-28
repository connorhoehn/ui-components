// The label id of the FormField a control sits in (since 2.549.0), for a
// control that cannot be named by `<label htmlFor>` — a `role="radiogroup"`
// is not a labelable element — and so names itself with `aria-labelledby`.
// Internal: FormField provides it, RadioGroup reads it.

import { createContext, useContext } from 'react';

export const FormFieldLabelContext = createContext<string | null>(null);

/** The enclosing FormField's label id, or `null` outside one. */
export function useFormFieldLabelId(): string | null {
  return useContext(FormFieldLabelContext);
}
