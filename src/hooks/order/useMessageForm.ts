import { useState } from 'react';
import { orderMessage } from '@/data/orderMessage.ts';
import { useForm, useFormContext } from 'react-hook-form';

export default function useMessageForm() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors }
  } = useFormContext();

  const [image, setImage] = useState(orderMessage[0].imageUrl);
  const [watchValidation, setWatchValidation] = useState(false);
  const text = watch("textMessage");

  const onSubmit = data => {
    console.log(data);
  };

  return {
    image,
    setImage,
    watchValidation,
    setWatchValidation,
    trigger,
    setValue,
    text,
    errors,
    register,
    onSubmit,
  }
}
