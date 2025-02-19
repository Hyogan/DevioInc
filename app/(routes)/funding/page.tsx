'use client'
import TokenSale from '@/app/components/TokenSale';
import TokenUtility from '@/app/components/TokenUtility';
import FundingTiers from '@/app/components/FundingTiers';
import Tokenomics from '@/app/components/Tokenomics';

const FundingPage = () => {
  return (
    <div>
      <TokenSale />
      <TokenUtility />
      <Tokenomics />
      <FundingTiers />
    </div>
  );
};

export default FundingPage; 