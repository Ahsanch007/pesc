import React from 'react';
import HowToBuycard from './HowToBuycard';
import Heading from '../../component/common/Heading';
import BuyTokenNow from '../../component/common/BuyTokenNow';
import { useTranslation } from 'react-i18next';

export default function HowtoBuy() {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 xl:gap-12 p-4'>
      <div className='w-full max-w-[450px] xl:max-w-[543px] mt-10'>
        <Heading heading={t("how_to_buy")} />
        <HowToBuycard />
      </div>
      <BuyTokenNow />
    </div>
  );
}
