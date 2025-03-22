import React from 'react'
import TokenomicsCard from './TokenomicsCard'
import BuyTokenNow from '../../component/common/BuyTokenNow'
import JoinOurCommunity from '../../component/common/JoinOurCommunity'


export default function Tokenomics() {
  return (
    <div className='max-w-[780px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 xl:gap-12 p-4'>
      <div className='w-full lg:max-w-[450px] 2xl:max-w-[600px]'>
        <TokenomicsCard />
        <JoinOurCommunity />
      </div>
      <BuyTokenNow />
    </div>
  )
}