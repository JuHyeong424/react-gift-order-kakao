import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateOrderForm } from '@/utils/validateOrderForm';
import { renderOrderSuccessToast } from '@/utils/toastContents';

export default function useOrderHandler({
  id, count, message, setMessage,
  sender, setSender, receiverName, setReceiverName,
  receiverPhone, setReceiverPhone
}) {
  const navigate = useNavigate();
  // 클릭한 아이템 정보 가져오기
  const item = JSON.parse(localStorage.getItem('expandedList'))[id - 1];
  const itemName = item.name;
  const itemPrice = item.price.sellingPrice;
  const [price, setPrice] = useState(itemPrice * count);

  // 카운트 클릭 시마다 가격 업데이트
  useEffect(() => {
    setPrice(itemPrice * count);
  }, [count]);

  // 입력란이 비어있는지 확인
  const handleOrder = () => {
    const { isValid, errors } = validateOrderForm({
      message,
      sender,
      receiverName,
      receiverPhone,
    });

    // validation에 따른 판단
    if (errors.message) setMessage(prev => ({ ...prev, check: true }));
    if (errors.sender) setSender(prev => ({ ...prev, check: true }));
    if (errors.receiverName) setReceiverName(prev => ({ ...prev, check: true }));
    if (errors.receiverPhone) setReceiverPhone(prev => ({ ...prev, check: true }));
    if (errors.receiverPhoneFormat) setReceiverPhone(prev => ({ ...prev, checkPhoneForm: true }));

    if (!isValid) return;

    toast(renderOrderSuccessToast(itemName, count, sender.text, message.text) as React.ReactNode, {
        type: 'success',
        autoClose: 3000,
        style: { width: '400px' },
      }
    );

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return { price, handleOrder };
}