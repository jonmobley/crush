import svgPaths from "./svg-xgcwvthb4q";

function Frame() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_874)">
            <path
              d={svgPaths.p15680000}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_874">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[12.25px]"
      data-name="svg"
    >
      <Frame />
    </div>
  );
}

function I() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[9.88px] top-1.5 w-[12.25px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg />
    </div>
  );
}

function Button() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.2)] left-0 rounded-[9999px] size-8 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I />
    </div>
  );
}

function Div() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-[303.98px] size-8 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-6 top-12 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[105.63px] not-italic text-[#ffffff] text-[18px] text-left top-0.5 w-[126px]">
        <p className="block leading-[28px]">Add New Debt</p>
      </div>
      <Div />
    </div>
  );
}

function Header() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#667eea] h-[120px] left-0 to-[#764ba2] top-0 w-96"
      data-name="header"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-4" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Frame">
          <path d="M16 16H0V0H16V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.pd2c0e00}
            fill="var(--fill-0, #667EEA)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-4 top-1"
      data-name="svg"
    >
      <Frame1 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3 top-2 w-4"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg1 />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(102,126,234,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I1 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[165.969px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[114px]">
        <p className="block leading-[24px]">Give it a name</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[166px]">
        <p className="block leading-[16px]">Something meaningful to you</p>
      </div>
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div2 />
      <Div3 />
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-gray-50 h-12 left-5 rounded-xl top-[76px] w-[296px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-4 not-italic text-[#adaebc] text-[16px] text-left top-6 translate-y-[-50%] w-[296px]">
        <p className="block leading-[24px]">
          e.g., Dream Vacation, New Kitchen...
        </p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[#ffffff] h-36 left-0 rounded-2xl top-0 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div4 />
      <Input />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <path d="M14 16H0V0H14V16Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p253b5400}
            fill="var(--fill-0, #764BA2)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame2 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[13px] top-2 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg2 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(118,75,162,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I2 />
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[180.078px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[125px]">
        <p className="block leading-[24px]">What type is it?</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[181px]">
        <p className="block leading-[16px]">This helps us give better advice</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div6 />
      <Div7 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-3.5 relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_311)">
            <path
              d={svgPaths.p1897e700}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_311">
            <path d="M0 0H15.75V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[45.13px] p-0 top-[2.75px] w-[15.75px]"
      data-name="svg"
    >
      <Frame3 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[18px] top-3.5 w-[106px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg3 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-0 rounded-xl top-0 w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-100 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <I3 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.83px] not-italic text-[14px] text-center text-gray-700 top-[39px] translate-x-[-50%] w-[82px]">
        <p className="block leading-[normal]">Credit Card</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_308)">
            <path
              d={svgPaths.p218e7100}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_308">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[46px] p-0 size-3.5 top-[2.75px]"
      data-name="svg"
    >
      <Frame4 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[18px] top-3.5 w-[106px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg4 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-[154px] rounded-xl top-0 w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-100 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <I4 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.97px] not-italic text-[14px] text-center text-gray-700 top-[39px] translate-x-[-50%] w-[74px]">
        <p className="block leading-[normal]">Auto Loan</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-3.5 relative shrink-0 w-[17.5px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_299)">
            <path
              d={svgPaths.p27711c00}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_299">
            <path d="M0 0H17.5V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[44.25px] p-0 top-[2.75px] w-[17.5px]"
      data-name="svg"
    >
      <Frame5 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[18px] top-3.5 w-[106px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg5 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-0 rounded-xl top-[84px] w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-100 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <I5 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.97px] not-italic text-[14px] text-center text-gray-700 top-[39px] translate-x-[-50%] w-[101px]">
        <p className="block leading-[normal]">Personal Loan</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_296)">
            <path
              d={svgPaths.pc3b9780}
              fill="var(--fill-0, #374151)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_296">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[46.88px] p-0 top-[2.75px] w-[12.25px]"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[18px] top-3.5 w-[106px]"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg6 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-[154px] rounded-xl top-[84px] w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-100 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <I6 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.7px] not-italic text-[14px] text-center text-gray-700 top-[39px] translate-x-[-50%] w-[43px]">
        <p className="block leading-[normal]">Other</p>
      </div>
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[156px] left-5 top-[76px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[252px] left-0 rounded-2xl top-[168px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div8 />
      <Div9 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-4 relative shrink-0 w-2.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 10 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_314)">
            <path
              d={svgPaths.p143bd580}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_314">
            <path d="M0 0H10V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-2.5"
      data-name="svg"
    >
      <Frame7 />
    </div>
  );
}

function I7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[15px] top-2 w-2.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg7 />
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-green-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I7 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[183.547px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[184px]">
        <p className="block leading-[24px]">How much do you owe?</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[156px]">
        <p className="block leading-[16px]">Current balance remaining</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div11 />
      <Div12 />
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute bg-gray-50 h-12 left-0 rounded-xl top-0 w-[296px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-8 not-italic text-[#adaebc] text-[16px] text-left top-6 translate-y-[-50%] w-[296px]">
        <p className="block leading-[24px]">0.00</p>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-5 top-[76px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-7 leading-[0] left-4 not-italic text-[18px] text-gray-500 text-left top-2.5 w-3">
        <p className="block leading-[28px]">$</p>
      </div>
      <Input1 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[#ffffff] h-36 left-0 rounded-2xl top-[444px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div13 />
      <Div14 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-4 relative shrink-0 w-3" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_317)">
            <path
              d={svgPaths.p350fd680}
              fill="var(--fill-0, #CA8A04)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_317">
            <path d="M0 0H12V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3"
      data-name="svg"
    >
      <Frame8 />
    </div>
  );
}

function I8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-3.5 top-2 w-3"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg8 />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-yellow-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I8 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[168.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[99px]">
        <p className="block leading-[24px]">Interest rate</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[169px]">
        <p className="block leading-[16px]">Annual percentage rate (APR)</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div16 />
      <Div17 />
    </div>
  );
}

function Input2() {
  return (
    <div
      className="absolute bg-gray-50 h-12 left-0 rounded-xl top-0 w-[296px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-4 not-italic text-[#adaebc] text-[16px] text-left top-6 translate-y-[-50%] w-[296px]">
        <p className="block leading-[24px]">0.0</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-5 top-[76px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input2 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[264.28px] not-italic text-[16px] text-gray-500 text-left top-3 w-4">
        <p className="block leading-[24px]">%</p>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[#ffffff] h-36 left-0 rounded-2xl top-[612px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div18 />
      <Div19 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-4 relative shrink-0 w-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 16"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_326)">
            <path
              d={svgPaths.p19abf500}
              fill="var(--fill-0, #2563EB)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_326">
            <path d="M0 0H14V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-4 items-center justify-center left-0 p-0 top-1 w-3.5"
      data-name="svg"
    >
      <Frame9 />
    </div>
  );
}

function I9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-[13px] top-2 w-3.5"
      data-name="i"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Svg9 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-blue-100 left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I9 />
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[216.5px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[141px]">
        <p className="block leading-[24px]">Monthly payment</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[217px]">
        <p className="block leading-[16px]">
          Minimum amount you pay each month
        </p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div21 />
      <Div22 />
    </div>
  );
}

function Input3() {
  return (
    <div
      className="absolute bg-gray-50 h-12 left-0 rounded-xl top-0 w-[296px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-8 not-italic text-[#adaebc] text-[16px] text-left top-6 translate-y-[-50%] w-[296px]">
        <p className="block leading-[24px]">0.00</p>
      </div>
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-0 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-7 leading-[0] left-4 not-italic text-[18px] text-gray-500 text-left top-2.5 w-3">
        <p className="block leading-[28px]">$</p>
      </div>
      <Input3 />
    </div>
  );
}

function Label() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-[296px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[97px]">
        <p className="block leading-[normal]">Payment date</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute left-[258px] size-[30px] top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 30 30"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p35acae00}
            fill="var(--fill-0, #111827)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div
      className="absolute bg-gray-50 h-[46px] left-0 rounded-xl top-7 w-[296px]"
      data-name="select"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[46px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[16px] text-gray-900 text-left text-nowrap top-[23px] translate-y-[-50%] w-[152px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Select day of month
        </p>
      </div>
      <Frame10 />
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[74px] left-0 top-16 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label />
      <Select />
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[138px] left-5 top-[76px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div24 />
      <Div25 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[234px] left-0 rounded-2xl top-[780px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div23 />
      <Div26 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[#667eea] h-[60px] left-0 rounded-2xl top-4 w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[170.95px] not-italic text-[#ffffff] text-[18px] text-center top-[19px] translate-x-[-50%] w-[129px]">
        <p className="block leading-[normal]">Add This Debt</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-gray-100 h-14 left-0 rounded-2xl top-[88px] w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-6 leading-[0] left-[170.94px] not-italic text-[16px] text-center text-gray-700 top-[18px] translate-x-[-50%] w-[59px]">
        <p className="block leading-[normal]">Cancel</p>
      </div>
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-60 left-0 top-[1038px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Form() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1278px] left-6 top-0 w-[336px]"
      data-name="form"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div5 />
      <Div10 />
      <Div15 />
      <Div20 />
      <Div27 />
      <Div28 />
    </div>
  );
}

function Main() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1278px] left-0 top-28 w-96"
      data-name="main"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Form />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_3_320)">
            <path
              d={svgPaths.p32d88500}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_320">
            <path d="M0 0H20.25V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[20.83px] overflow-clip p-0 top-[4.25px] w-[20.25px]"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[21.92px] top-3 w-[61.906px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame12 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[31px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[62px]">
        <p className="block leading-[16px]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
      >
        <g id="Frame">
          <path d="M18 18H0V0H18V18Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p196f0c00}
            fill="var(--fill-0, #9CA3AF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[19.64px] overflow-clip p-0 size-[18px] top-[4.25px]"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[127.67px] top-3 w-[57.281px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[29px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[58px]">
        <p className="block leading-[16px]">Strategies</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_175)">
            <path
              d={svgPaths.p20a70880}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_175">
            <path d="M0 0H15.75V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[18.63px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[228.8px] top-3 w-[53px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame16 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[26.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[53px]">
        <p className="block leading-[16px]">Schedule</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_172)">
            <path
              d={svgPaths.pff03780}
              fill="var(--fill-0, #9CA3AF)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_172">
            <path d="M0 0H15.75V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[10.34px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame17 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[325.64px] top-3 w-[36.438px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame18 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[18.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[37px]">
        <p className="block leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-px w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[73px] left-0 top-[1317px] w-96"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div29 />
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[1390px] left-[3px] top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Header />
      <Main />
      <Nav />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[1390px] relative shrink-0 w-[390px]"
      data-name="body"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div30 />
    </div>
  );
}

export default function Frame19() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg size-full"
      data-name="Frame"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
        <Body />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ced4da] border-solid inset-0 pointer-events-none rounded-lg"
      />
    </div>
  );
}