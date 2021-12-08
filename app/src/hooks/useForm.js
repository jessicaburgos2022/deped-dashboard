import { useEffect, useState } from 'react';

const useForm = (callback, initialData) => {
  const [values, setValues] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //trigger submit callback
  useEffect(() => {
    //if no error, proceed submit callback
    if (isSubmitting) {
      callback();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  //handle field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAdd = () => {
    setIsSubmitting(true);
  };

  return {
    values,
    handleChange,
    handleAdd,
  };
};

export { useForm as default };
