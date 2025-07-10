import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { renderOrderSuccessToast } from '@/utils/toastContents.tsx';
import { EXPANDED_LIST_STORAGE_ID } from '@/constants/storage.ts';

export default function useOrderButton({ id, count, messageRef, senderRef, receiverRef }) {
  // localStorage에 저장된 data list 가져오기
  const item = JSON.parse(localStorage.getItem(EXPANDED_LIST_STORAGE_ID))[id - 1];
  const itemName = item.name;
  const itemPrice = item.price.sellingPrice;

  const navigate = useNavigate();
  const [price, setPrice] = useState(itemPrice * count);

  // count로 가격 계산
  useEffect(() => {
    setPrice(itemPrice * count);
  }, [count]);

  // 각 컴포넌트에 가져온 ref가 유효한지 확인
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
