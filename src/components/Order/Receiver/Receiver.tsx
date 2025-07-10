import { forwardRef, useEffect, useImperativeHandle } from 'react';
import type { ReceiverRef, Receiver } from '@/types/order.ts';
import ReceiverCurrentState from '@/components/Order/Receiver/ReceiverCurrentState.tsx';
import ReceiverModal from '@/components/Order/Receiver/ReceiverModal.tsx';
import { addHandler, cancleHandler, openModalHandler, submitHandler } from '@/hooks/receiver/useReceiverHandlers.ts';
import useReceiverModalControl from '@/hooks/receiver/useReceiverModalControl.ts';
import useReceiverForm from '@/hooks/receiver/useReceiverForm.ts';
import useReceiverValidation from '@/hooks/receiver/useReceiverValidation.ts';

function Receiver2Component({ setCount }, ref: React.Ref<ReceiverRef>) {
  // 모달 상태 제어
  const { modal, setModal } = useReceiverModalControl();

  // form 상태 제어
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    submittedRef,
    beforeRef,
    values,
  } = useReceiverForm();

  // ref 제어 메서드
  useImperativeHandle(ref, () => ({
    triggerReceiverValidation: async () => {
      return !(!submittedRef.current || submittedRef.current.length === 0);
    }
  }))

  // 번호 타당성 검사
  const { isSamePhoneNumber } = useReceiverValidation(values);

  // 각종 Handle
  const handleAdd = addHandler(fields.length, append);
  const handleCancle = cancleHandler(beforeRef, reset, setModal);
  const handleOpenModal = openModalHandler(beforeRef, getValues, setModal);
  const onSubmit = submitHandler(submittedRef, setModal);

  // count 세기
  useEffect(() => {
    if (submittedRef.current) {
      const total = submittedRef.current.reduce((acc, cur) => acc + Number(cur.count), 0);
      setCount(total);
    }
  }, [submittedRef.current]);

  return (
    <>
      <ReceiverCurrentState
        openModal={handleOpenModal}
        submittedRef={submittedRef.current}
      />

      {modal && (
        <ReceiverModal
          setModal={setModal}
          fields={fields}
          register={register}
          handleAdd={handleAdd}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          remove={remove}
          errors={errors}
          handleCancle={handleCancle}
          isSamePhoneNumber={isSamePhoneNumber}
        />
      )}
    </>
  )
}

const Receiver = forwardRef(Receiver2Component);
export default Receiver;
