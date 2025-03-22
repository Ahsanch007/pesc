import { EthIcon, UsdtIcon, BnbIcon } from "./Icon"

export const FaqDropDownData = [
  {
    question: "FaqDropDownData_q_1",
    answer: "FaqDropDownData_1"
  },
  {
    question: "FaqDropDownData_q_2",
    answer: "FaqDropDownData_2"
  },
  {
    question: "FaqDropDownData_q_3",
    answer: "FaqDropDownData_3"
  },
  {
    question: "FaqDropDownData_q_4",
    answer: "FaqDropDownData_4"
  },
  {
    question: "FaqDropDownData_q_5",
    answer: "FaqDropDownData_5"
  }
];
export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_1_3398)">
        <path
          d="M18 6L6 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_3398">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const CurrencyData = [
  {
    value: 'ETH',
    icon: <EthIcon />
  },
  // {
  //   value: 'BNB',
  //   icon: <BnbIcon />
  // },
  {
    value: 'USDT',
    icon: <UsdtIcon />
  },
]
export const CurrencyDataBNB = [
  // {
  //   value: 'ETH',
  //   icon: <EthIcon />
  // },
  {
    value: 'BNB',
    icon: <BnbIcon />
  },
  {
    value: 'USDT',
    icon: <UsdtIcon />
  },
]
export const TokenStakingData = [
  {
    heading: 'welcome_pesc',
    data: [
      {
        title: 'staked_balance',
        text: [
          { text: '0', type: 'pesc', highlight: true },
        ]
      },
      {
        title: 'stake_available', text: [
          { text: '0', type: 'pesc', highlight: true },
        ]
      },],
    btn: {
      text: 'buy_stake_se',
      href: ''
    }
  },
  {
    heading: 'welcome_pesc',
    data: [
      {
        title: 'pool_perc',
        text: [
          { text: '0', type: '%' },
        ]
      }, {
        title: 'total_staked',
        text: [
          { text: '2,308,070,906', type: '$PESC' },
        ]
      },
    ]
  },
  {
    heading: 'welcome_pesc',
    data: [
      {
        title: 'ESTIMATED_REWARDS',
        text: [
          {
            text: '18',
            type: '% p/a'
          },
        ]
      },
      {
        className: 'font-normal',
        title: 'Rewards_dynamic',
        text: [
          { text: 'Monthly = Rewards % / 12' },
          { text: 'Daily = Rewards % / 365' },
        ]
      },
    ]
  },
  {
    heading: 'welcome_pesc',
    data: [{
      title: 'TOTAL_REWARDS',
      text: [
        { text: '0', type: 'pesc', highlight: true },
      ]
    },
    ],
    btn: {
      text: 'claim_rewards',
      href: ''
    }

  },
]
export const TokenomicsCardData = [
  {
    title: 'Community',
    pera: '50%'
  },
  {
    title: 'Liquidity',
    pera: '50%'
  },
  {
    title: 'Marketing',
    pera: '50%'
  },
  {
    title: 'Community',
    pera: '50%'
  },
  {
    title: 'total_supply',
    pera: '1,000,000 $PESC'
  },
]
export const AboutUsSliderData = [
  {
    heading: 'Are ',
    points: [
      'RoadmapSliderData_content_1_1',
      'RoadmapSliderData_content_1_2',
      'RoadmapSliderData_content_1_3',
      'RoadmapSliderData_content_1_4',
      'RoadmapSliderData_content_1_5',
    ],
  },
  {
    heading: 'Phase 2: Making Waves',
    points: [
      'RoadmapSliderData_content_2_1',
      'RoadmapSliderData_content_2_2',
      'RoadmapSliderData_content_2_3',
      'RoadmapSliderData_content_2_4',
      'RoadmapSliderData_content_2_5',
    ],
  },
  {
    heading: 'Phase 3: The Big Splash',
    points: [
      'RoadmapSliderData_content_3_1',
      'RoadmapSliderData_content_3_2',
      'RoadmapSliderData_content_3_3',
      'RoadmapSliderData_content_3_4',
      'RoadmapSliderData_content_3_5',
    ],
  },
  {
    heading: 'Phase 4: Deep-Sea Domination',
    points: [
      'RoadmapSliderData_content_4_1',
      'RoadmapSliderData_content_4_2',
      'Charity & eco-friendly initiatives',
      'RoadmapSliderData_content_4_4',
    ],
  },
]
export const RoadmapSliderData = [
  {
    heading: 'RoadmapSliderData_heading_1',
    points: [
      'RoadmapSliderData_content_1_1',
      'RoadmapSliderData_content_1_2',
      'RoadmapSliderData_content_1_3',
      'RoadmapSliderData_content_1_4',
      'RoadmapSliderData_content_1_5',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_2',
    points: [
      'RoadmapSliderData_content_2_1',
      'RoadmapSliderData_content_2_2',
      'RoadmapSliderData_content_2_3',
      'RoadmapSliderData_content_2_4',
      'RoadmapSliderData_content_2_5',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_3',
    points: [
      'RoadmapSliderData_content_3_1',
      'RoadmapSliderData_content_3_2',
      'RoadmapSliderData_content_3_3',
      'RoadmapSliderData_content_3_4',
      'RoadmapSliderData_content_3_5',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_3_1',
    points: [
      'RoadmapSliderData_content_3_1_1',
      'RoadmapSliderData_content_3_1_2',
      'RoadmapSliderData_content_3_1_3',
      'RoadmapSliderData_content_3_1_4',
    ],
    
  },
  {
    heading: 'RoadmapSliderData_heading_3_2',
    points: [
      'RoadmapSliderData_content_3_2_1',
      'RoadmapSliderData_content_3_2_2',
      'RoadmapSliderData_content_3_2_3',
      'RoadmapSliderData_content_3_2_4',
      'RoadmapSliderData_content_3_2_5',
    ],
    
  },  {
    heading: 'RoadmapSliderData_heading_3_3',
    points: [
      'RoadmapSliderData_content_3_3_1',
      'RoadmapSliderData_content_3_3_2',
      'RoadmapSliderData_content_3_3_3',
      'RoadmapSliderData_content_3_3_4',
    ],
    
  },
  {
    heading: 'RoadmapSliderData_heading_4',
    points: [
      'RoadmapSliderData_content_4_1',
      'RoadmapSliderData_content_4_2',
      'RoadmapSliderData_content_4_3',
      'RoadmapSliderData_content_4_4',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_4_1',
    points: [
'RoadmapSliderData_content_4_5_1',
'RoadmapSliderData_content_4_5_2',
'RoadmapSliderData_content_4_5_3',
'RoadmapSliderData_content_4_5_4',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_4_2',
    points: [
'RoadmapSliderData_content_4_6_1',
'RoadmapSliderData_content_4_6_2',
'RoadmapSliderData_content_4_6_3',
'RoadmapSliderData_content_4_6_4',
    ],
  },
  {
    heading: 'RoadmapSliderData_heading_4_3',
    points: [
'RoadmapSliderData_content_4_7_1',
'RoadmapSliderData_content_4_7_2',
'RoadmapSliderData_content_4_7_3',
'RoadmapSliderData_content_4_7_4',
    ],
  },

  {
    heading: 'RoadmapSliderData_heading_4_4',
    points: [
'RoadmapSliderData_content_4_8_1',
'RoadmapSliderData_content_4_8_2',
'RoadmapSliderData_content_4_8_3',

    ],
  },
]
export const HowToBuyData = [
  {
    que: 'howToBuy_1_header',
    ans: 'howToBuy_content_1'
  },
  {
    que: 'howToBuy_2_header',
    ans: 'howToBuy_content_2'
  },
  {
    que: 'howToBuy_3_header',
    ans: 'howToBuy_content_3'
  },
  
]
export const HowToBuyData_2 = [
{
    que: 'howToBuy_1_header_2',
    ans: 'howToBuy_content_2_1'
  },
  {
    que: 'howToBuy_2_header_2',
    ans: 'howToBuy_content_2_2'
  },
  {
    que: 'howToBuy_3_header_2',
    ans: 'howToBuy_content_2_3'
  },
]
export const AboutUsData = [
  {
    chapter: 'about_us_chapter',
    title: 'about_us_chapter_title_1',
    content: 'about_us_chapter_content_1'
  },
  {
    chapter: 'about_us_chapter',
    title: 'about_us_chapter_title_2',
    content: 'about_us_chapter_content_2'
  },
  {
    chapter: 'about_us_chapter',
    title: 'about_us_chapter_title_3',
    content: 'about_us_chapter_content_3'
  },
  {
    chapter: 'about_us_chapter',
    title: 'about_us_chapter_title_4',
    content: 'about_us_chapter_content_4'
  },
]
export const SidebarData = [
  {
    title: 'About Us',
    href: '/#about',
  },
  {
    title: 'How To Buy PESC',
    href: '/#how-to-buy',
  },
  {
    title: 'Tokenomics',
    href: '/#token',
  },
  {
    title: 'Roadmap',
    href: '/#roadmap',
  },
  {
    title: 'Faq',
    href: '/#faq',
  },
  {
    title: 'Referral',
    href: '/#referral',
  },
]