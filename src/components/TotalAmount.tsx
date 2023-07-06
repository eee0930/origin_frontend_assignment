import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  totalAmount,
  goalByValue,
  getMonths,
  todayValue,
  monthSizeValue,
} from '../atoms';
import { useEffect, useState } from 'react';

const TotalAmountSection = styled.div`
  margin-top: 24px;
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;
const ContentBox = styled.div`
  height: 81px;
`;
const BoxTitle = styled.div`
  font-family: 'Work Sans';
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${(props) => props.theme.$blueGray900};
`;
const TotalAmountBox = styled(ContentBox)`
  width: 272px;
`;
const FormEleBox = styled.div`
  border: 1px solid ${(props) => props.theme.$blueGray50};
  display: flex;
  align-items: center;
  height: 56px;
  border-radius: 4px;
`;
const FormElement = styled(FormEleBox)`
  padding: 14px 12px;
  position: relative;
`;
const Input = styled.input`
  position: absolute;
  width: 100%;
  left: 44px;
  top: 14px;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 24px;
  line-height: 28.8px;
  width: 200px;
  height: 29px;
  border: none;
  color: transparent;
  background-color: transparent;
`;
const FormatDataSection = styled.div`
  position: absolute;
  width: 100%;
  left: 44px;
  top: 14px;
  height: 29px;
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 24px;
  line-height: 28.8px;
  width: 200px;
  height: 29px;
  color: ${(props) => props.theme.$blueGray600};
`;
const ReachGoalBy = styled(ContentBox)`
  margin-left: 16px;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 15px;
  }
`;
const Button = styled.button`
  width: 48px;
  height: 56px;
  background-color: transparent;
  border: none;
  align-self: center;
  cursor: pointer;
`;
const InputDate = styled.div`
  margin: 0 8px;
  align-self: center;
`;
const DateSection = styled.div`
  font-family: 'Work Sans';
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  width: 100%;
`;
const MonthSection = styled(DateSection)`
  font-weight: 600;
  border: none;
  border-line: none;
  color: ${(props) => props.theme.$blueGray900};
`;
const YearSection = styled(DateSection)`
  font-weight: 400;
  color: ${(props) => props.theme.$blueGray400};
`;

interface IForm {
  amount: string;
}

function TotalAmount() {
  const [amount, setAmount] = useRecoilState(totalAmount);
  const months = useRecoilValue(getMonths);
  const today = useRecoilValue(todayValue);
  const [goalBy, setGoalBy] = useRecoilState(goalByValue);
  const [monthSize, setMonthSize] = useRecoilState(monthSizeValue);
  const [formatAmount, setFormatAmount] = useState('0');
  const [month, setMonth] = useState(goalBy[1]);
  const [year, setYear] = useState(goalBy[0]);
  const { register } = useForm<IForm>();

  useEffect(() => updateGoalBy(monthSize), [monthSize]);

  const updateGoalBy = (count: number) => {
    const updateMonth = (today[1] + count) % 12;
    const updateYear = today[0] + Math.floor((today[1] + count) / 12);
    setMonth(updateMonth);
    setYear(updateYear);
    setGoalBy([updateYear, updateMonth]);
  };

  const handleAmount = (e: any) => {
    const value = e.target.value as string;
    setAmount(value);
    const length = value.length;
    let newAmount = value;
    if (length > 3) {
      newAmount = value
        .split('')
        .map((a, i) =>
          length % 3 === (i + 1) % 3 && i !== length - 1 ? `${a},` : a
        )
        .join('');
    }
    setFormatAmount(newAmount);
  };

  const handleFocus = (e: any) => {
    const value = e.target.value as string;
    if (value === '0') {
      setFormatAmount('');
      setAmount('');
    }
  };
  const handleMouseBlur = (e: any) => {
    const value = e.target.value as string;
    if (value === '') {
      setFormatAmount('0');
      setAmount('0');
    }
  };
  const handlePrevMonth = () => {
    if (monthSize < 2) return;
    setMonthSize((prev) => (prev -= 1));
  };
  const handleNextMonth = () => {
    setMonthSize((prev) => (prev += 1));
  };

  return (
    <TotalAmountSection className="row">
      <TotalAmountBox className="col-12 col-md-auto">
        <BoxTitle>Total amount</BoxTitle>
        <FormElement>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13020_195)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C12.5523 0 13 0.447715 13 1V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V1C11 0.447715 11.4477 0 12 0Z"
                fill="#CBD5DC"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.31802 5.31802C7.16193 4.47411 8.30653 4 9.5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9.5C8.83696 6 8.20107 6.26339 7.73223 6.73223C7.26339 7.20107 7 7.83696 7 8.5C7 9.16304 7.26339 9.79893 7.73223 10.2678C8.20107 10.7366 8.83696 11 9.5 11H14.5C15.6935 11 16.8381 11.4741 17.682 12.318C18.5259 13.1619 19 14.3065 19 15.5C19 16.6935 18.5259 17.8381 17.682 18.682C16.8381 19.5259 15.6935 20 14.5 20H6C5.44772 20 5 19.5523 5 19C5 18.4477 5.44772 18 6 18H14.5C15.163 18 15.7989 17.7366 16.2678 17.2678C16.7366 16.7989 17 16.163 17 15.5C17 14.837 16.7366 14.2011 16.2678 13.7322C15.7989 13.2634 15.163 13 14.5 13H9.5C8.30653 13 7.16193 12.5259 6.31802 11.682C5.47411 10.8381 5 9.69347 5 8.5C5 7.30653 5.47411 6.16193 6.31802 5.31802Z"
                fill="#CBD5DC"
              />
            </g>
            <defs>
              <clipPath id="clip0_13020_195">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <FormatDataSection>{formatAmount}</FormatDataSection>
          <Input
            {...register('amount', { required: true, minLength: 1 })}
            type="text"
            value={amount}
            onChange={handleAmount}
            onFocus={handleFocus}
            onBlur={handleMouseBlur}
          />
        </FormElement>
      </TotalAmountBox>
      <ReachGoalBy className="col-12 col-md">
        <BoxTitle>Reach goal by</BoxTitle>
        <FormEleBox className="row">
          <Button onClick={handlePrevMonth} className="col-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z"
                fill="#8A9CA9"
              />
            </svg>
          </Button>
          <InputDate className="col">
            <MonthSection
              name="reachDate"
              as="input"
              value={months[month]}
              readOnly
            />
            <YearSection>{year}</YearSection>
          </InputDate>
          <Button onClick={handleNextMonth} className="col-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_13020_146)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z"
                  fill="#8A9CA9"
                />
              </g>
              <defs>
                <clipPath id="clip0_13020_146">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </FormEleBox>
      </ReachGoalBy>
    </TotalAmountSection>
  );
}

export default TotalAmount;
