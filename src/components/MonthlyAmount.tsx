import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { getMonths, goalByValue, monthSizeValue, totalAmount } from '../atoms';
import { useEffect, useState } from 'react';

const MonthlyAmountSection = styled.div`
  margin-top: 25px;
  border: 1px solid ${(props) => props.theme.$blueGray50};
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;
const MonthlyAmountCover = styled.div`
  padding: 24px 32px;
  @media (max-width: 768px) {
    padding: 24px;
  }
`;
const Title = styled.div`
  width: 220px;
  font-family: 'Work Sans';
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  align-self: center;
  color: ${(props) => props.theme.$blueGray900};
`;
const Amount = styled.div`
  text-align: right;
  font-family: 'Rubik';
  font-size: 32px;
  line-height: 38.4px;
  align-self: center;
  color: ${(props) => props.theme.$brandColorSecondary};
`;
const InformationSection = styled.div`
  padding: 24px 32px;
  font-family: 'Work Sans';
  font-width: 400px;
  font-size: 12px;
  line-height: 16px;
  background-color: ${(props) => props.theme.$blueGray10};
  span {
    font-weight: 600;
  }
  @media (max-width: 768px) {
    padding: 24px;
    text-align: center;
  }
`;

function MonthlyAmount() {
  const months = useRecoilValue(getMonths);
  const totalAmountValue = useRecoilValue(totalAmount);
  const goalByDate = useRecoilValue(goalByValue);
  const monthSize = useRecoilValue(monthSizeValue);
  const [formatAmount, setFormatAmount] = useState('0');
  const [formatMonthly, setFormatMonthly] = useState('0');

  useEffect(() => {
    handleFormatAmount(totalAmountValue);
  }, [totalAmountValue]);

  useEffect(() => {
    handleFormatMonthlyAmount(totalAmountValue, monthSize);
  }, [totalAmountValue, monthSize]);

  const handleFormatAmount = (amount: string) => {
    let newAmount = amount;
    if (amount.length > 3) {
      newAmount = formatData(amount);
    }
    setFormatAmount(newAmount);
  };

  const handleFormatMonthlyAmount = (amount: string, size: number) => {
    const monthly = (Number(amount) / size).toFixed(2);
    const [monthly1, monthly2] = monthly.split('.');
    let newAmount = monthly1;
    if (monthly1.length > 3) {
      newAmount = formatData(monthly1);
    }
    setFormatMonthly(`${newAmount}.${monthly2}`);
  };

  const formatData = (data: string) => {
    const length = data.length;
    return data
      .split('')
      .map((a, i) =>
        length % 3 === (i + 1) % 3 && i !== length - 1 ? `${a},` : a
      )
      .join('');
  };

  return (
    <MonthlyAmountSection>
      <MonthlyAmountCover className="row">
        <Title className="col-auto">Monthly amount</Title>
        <Amount className="col">${formatMonthly}</Amount>
      </MonthlyAmountCover>
      <InformationSection>
        You're planning <span>{monthSize} monthly deposits</span> to reach your{' '}
        <span>${formatAmount}</span> goal by{' '}
        <span>
          {months[goalByDate[1]]} {goalByDate[0]}.
        </span>
      </InformationSection>
    </MonthlyAmountSection>
  );
}

export default MonthlyAmount;
