import { useState } from 'react';
import { orderMessage } from '@/data/orderMessage.ts';
import { useForm } from 'react-hook-form';

export default function useMessageForm() {
  const [image, setImage] = useState(orderMessage[0].imageUrl);
  const [watchValidation, setWatchValidation] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      textMessage: orderMessage[0].defaultTextMessage,
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  const text = watch("textMessage");

  return {
    image,
    setImage,
    watchValidation,
    setWatchValidation,
    register,
    handleSubmit,
    trigger,
    setValue,
    text,
    errors,
    onSubmit,
  }
}
