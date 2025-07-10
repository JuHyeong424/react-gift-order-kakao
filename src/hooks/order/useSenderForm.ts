import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useSenderForm() {
  const [watchValidation, setWatchValidation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender: '',
    }
  });

  const text = watch("sender");

  return {
    watchValidation,
    setWatchValidation,
    register,
    handleSubmit,
    setValue,
    trigger,
    errors,
    text
  }
}