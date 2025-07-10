import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { renderOrderSuccessToast } from '@/utils/toastContents.tsx';
import { EXPANDED_LIST_STORAGE_ID } from '@/constants/storage.ts';

export default function useOrderButton({ id, count, messageRef, senderRef, receiverRef }) {
  const item = JSON.parse(localStorage.getItem(EXPANDED_LIST_STORAGE_ID))[id - 1];
  const itemName = item.name;
  const itemPrice = item.price.sellingPrice;

  const navigate = useNavigate();
  const [price, setPrice] = useState(itemPrice * count);

  useEffect(() => {
    setPrice(itemPrice * count);
  }, [count]);

  const handleClick = async () => {
    const isMessageValid = await messageRef.current?.triggerValidation();
    const isSenderValid = await senderRef.current?.triggerSenderValidation();
    const isReceiverValid = await receiverRef.current?.triggerReceiverValidation();

    if (!isMessageValid || !isSenderValid || !isReceiverValid) {
      return;
    }

    const message= messageRef.current?.getMessage();
    const sender = senderRef.current?.getSender();

    toast(renderOrderSuccessToast(itemName, count, sender, message) as React.ReactNode, {
        type: 'success',
        autoClose: 3000,
        style: { width: '400px' },
      }
    );

    navigate('/');
  };

  return {
    handleClick,
    price,
  }
}