import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  BaseContainer,
  BlurContainer, InfoList, Input, ItemInput,
  ModalAddBtn,
  ModalBottomBtn,
  ModalCancleBtn,
  ModalFinishBtn,
  ModalText,
  ModalTitle,
  ReceiverAddBtn, ReceiverForm, ReceiverIndex,
  ReceiverInfo, ReceiverItem, ReceiverTable,
  ReceiverWrapper,
  RecevierTitle,
  Title_Btn,
} from '@/components/Order/Receiver/Receiver.style.ts';
import { useFieldArray, useForm } from 'react-hook-form';
import { isValidPhoneFlexible } from '@/utils/phoneValidation.ts';

type Receiver = {
  name: string;
  phone: string;
  count: number;
}

export type Ref = {
  triggerReceiverValidation: () => Promise<boolean>;
}

function Receiver2Component({ setCount }, ref: React.Ref<Ref>) {
  const [modal, setModal] = useState(false);
  // 받는 사람 정보를 저장할 배열 ref
  const submittedRef = useRef<Receiver[] | null>(null);
  // 취소 시 되돌릴 이전 배열 저장 ref
  const beforeRef = useRef<{ receiverInfo: Receiver[] } | null>(null);

  const { register, control, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      receiverInfo: [{ name: "", phone: "", count: 1 }],
    },
    mode: 'onChange',
  });

  const { fields , append, remove } = useFieldArray({
    control,
    name: "receiverInfo",
  });

  // 현재 모든 입력 값들을 watch
  const values = watch("receiverInfo");

  useImperativeHandle(ref, () => ({
    triggerReceiverValidation: async () => {
      return !(!submittedRef.current || submittedRef.current.length === 0);
    }
  }))

  const isSamePhoneNumber = (value: string, index: number) => {
    const allPhones = values?.map(item => item.phone);
    return allPhones?.filter((phone, i) => phone === value && i !== index).length === 0 || "전화번호가 중복되었습니다.";
  }

  const handleOpenModal = () => {
    // 현재 배열 상태 저장
    beforeRef.current = getValues();
    setModal(true);
  }

  const onSubmit = data => {
    console.log(data);
    submittedRef.current = data.receiverInfo;
    setModal(false);
  };

  const handleAdd = () => {
    if (fields.length < 10) {
      append({ name: '', phone: '', count: 1 });
    }
  }

  const handleCancle = () => {
    // 취소 시, 이전 배열이 있으면 이전 시점으로 reset
    if (beforeRef.current) {
      reset(beforeRef.current);
    }
    setModal(false);
  }

  // 모달 상태 스크롤 제어
  useEffect(() => {
    if (modal) { // 스크롤 막기
      document.body.style.overflow = 'hidden';
    } else { // 다시 하용
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트가 사라질 때도 스크롤 생성
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modal]);

  useEffect(() => {
    if (submittedRef.current) {
      const total = submittedRef.current.reduce((acc, cur) => acc + Number(cur.count), 0);
      setCount(total);
    }
  }, [submittedRef.current]);

  return (
    <>
      <ReceiverWrapper>
        <Title_Btn>
          <RecevierTitle>받는 사람</RecevierTitle>
          <ReceiverAddBtn onClick={handleOpenModal}>추가</ReceiverAddBtn>
        </Title_Btn>

        {submittedRef.current && submittedRef.current.length > 0 ? (
          <ReceiverTable>
            <thead>
            <tr>
              <th>이름</th>
              <th>전화번호</th>
              <th>수량</th>
            </tr>
            </thead>
            <tbody>
            {submittedRef.current.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.count}</td>
              </tr>
            ))}
            </tbody>
          </ReceiverTable>
        ) : (
          <ReceiverInfo>
            <p>받는 사람이 없습니다.</p>
            <p>받는 사람을 추가해주세요.</p>
          </ReceiverInfo>
        )}

      </ReceiverWrapper>

      {modal && (
        <>
          <BlurContainer onClick={() => setModal(false)} />
          <BaseContainer>
            <ModalTitle>받는 사람</ModalTitle>
            <ModalText>* 최대 10명까지 추가할 수 있어요.</ModalText>
            <ModalText>* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.</ModalText>
            <ModalAddBtn onClick={handleAdd}>추가하기</ModalAddBtn>

            <ReceiverForm onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <InfoList key={field.id} isLast={index === fields.length - 1 }>
                  <ReceiverIndex>
                    <span>받는 사람 {index + 1}</span>
                    <button type="button" onClick={() => remove(index)}>X</button>
                  </ReceiverIndex>

                  <ReceiverItem>
                    <span>이름</span>
                    <ItemInput>
                      <Input
                        {...register(`receiverInfo.${index}.name`, {
                          required: '이름을 입력해주세요',
                        })}
                        hasError={!!errors.receiverInfo?.[index]?.name}
                        placeholder="이름을 입력하세요."
                      />
                      {errors.receiverInfo?.[index]?.name?.message &&
                        <p>{errors.receiverInfo?.[index]?.name?.message}</p>}
                    </ItemInput>
                  </ReceiverItem>

                  <ReceiverItem>
                    <span>전화번호</span>
                    <ItemInput>
                      <Input
                        {...register(`receiverInfo.${index}.phone`, {
                          required: '전화번호를 입력해주세요',
                          validate: value => {
                            const formatValid = isValidPhoneFlexible(value);
                            if (!formatValid) return '전화번호 형식이 올바르지 않습니다';
                            return isSamePhoneNumber(value, index);
                          },
                        })}
                        hasError={!!errors.receiverInfo?.[index]?.phone}
                        placeholder="전화번호를 입력하세요."
                      />
                      {errors.receiverInfo?.[index]?.phone?.message &&
                        <p>{errors.receiverInfo[index].phone.message}</p>}
                    </ItemInput>
                  </ReceiverItem>

                  <ReceiverItem>
                    <span>수량</span>
                    <ItemInput>
                      <Input
                        type="number"
                        {...register(`receiverInfo.${index}.count`, {
                          required: '수량을 선택해주세요',
                          validate: value => value > 0 || '구매 수량은 1개 이상이어야 해요.',
                        })}
                        hasError={!!errors.receiverInfo?.[index]?.count}
                      />
                      {errors.receiverInfo?.[index]?.count?.message &&
                        <p>{errors.receiverInfo?.[index]?.count?.message}</p>}
                    </ItemInput>
                  </ReceiverItem>
                </InfoList>
              ))}

              <ModalBottomBtn>
                <ModalCancleBtn onClick={handleCancle}>취소</ModalCancleBtn>
                <ModalFinishBtn type="submit">완료</ModalFinishBtn>
              </ModalBottomBtn>
            </ReceiverForm>
          </BaseContainer>
        </>
      )}
    </>
  )
}

const Receiver = forwardRef(Receiver2Component);
export default Receiver;

