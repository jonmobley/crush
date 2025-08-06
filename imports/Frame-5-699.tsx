import svgPaths from "./svg-u1cx7mcnp5";

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
      className="absolute bg-[rgba(0,0,0,0)] left-[304px] size-8 top-0"
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
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[109.94px] not-italic text-[#ffffff] text-[18px] text-left top-0.5 w-[117px]">
        <p className="block leading-[28px]">Add Payment</p>
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

function H3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-5 top-5 w-[296px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0.5 w-[221px]">
        <p className="block leading-[normal]">Which debt are you paying?</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[#ffffff] left-1 rounded-[9999px] size-2 top-1"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[#667eea] left-0 rounded-[9999px] size-4 top-3"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <Div2 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-7 top-0 w-[104.578px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-24">
        <p className="block leading-[24px]">Car Dreams</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[105px]">
        <p className="block leading-[16px]">$18,500 remaining</p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-0 w-[132.578px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div3 />
      <Div4 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[214.47px] top-0.5 w-[45.531px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[50.56px] not-italic text-[14px] text-gray-900 text-right top-0 translate-x-[-100%] w-[41px]">
        <p className="block leading-[20px]">$485</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[46px] not-italic text-[12px] text-gray-500 text-right top-5 translate-x-[-100%] w-[46px]">
        <p className="block leading-[16px]">monthly</p>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[18px] top-[18px] w-[260px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div5 />
      <Div6 />
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(102,126,234,0.05)] h-[76px] left-5 rounded-xl top-[60px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#667eea] border-solid inset-0 pointer-events-none rounded-xl"
      />
      <Div7 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-4 top-3"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-7 top-0 w-[150.234px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[151px]">
        <p className="block leading-[24px]">Wedding Memories</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[105px]">
        <p className="block leading-[16px]">$4,250 remaining</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-0 w-[178.234px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div9 />
      <Div10 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[216.47px] top-0.5 w-[45.531px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[51.2px] not-italic text-[14px] text-gray-900 text-right top-0 translate-x-[-100%] w-[38px]">
        <p className="block leading-[20px]">$125</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[46px] not-italic text-[12px] text-gray-500 text-right top-5 translate-x-[-100%] w-[46px]">
        <p className="block leading-[16px]">monthly</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[17px] top-[17px] w-[262px]"
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

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[74px] left-5 rounded-xl top-[148px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <Div13 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] left-0 rounded-[9999px] size-4 top-3"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-gray-300 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-7 top-0 w-[151.703px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[152px]">
        <p className="block leading-[24px]">Home Improvement</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[106px]">
        <p className="block leading-[16px]">$2,000 remaining</p>
      </div>
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-0 w-[179.703px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div15 />
      <Div16 />
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[216.47px] top-0.5 w-[45.531px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-5 leading-[0] left-[51.3px] not-italic text-[14px] text-gray-900 text-right top-0 translate-x-[-100%] w-[39px]">
        <p className="block leading-[20px]">$180</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[46px] not-italic text-[12px] text-gray-500 text-right top-5 translate-x-[-100%] w-[46px]">
        <p className="block leading-[16px]">monthly</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[17px] top-[17px] w-[262px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div17 />
      <Div18 />
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[74px] left-5 rounded-xl top-[234px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <Div19 />
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[328px] left-6 rounded-2xl top-0 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <H3 />
      <Div8 />
      <Div14 />
      <Div20 />
    </div>
  );
}

function H4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-5 top-5 w-[296px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0.5 w-[258px]">
        <p className="block leading-[normal]">How much extra are you paying?</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-gray-50 h-[72px] left-0 rounded-xl top-0 w-[296px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[72px] justify-center leading-[0] left-[188px] not-italic text-[#adaebc] text-[30px] text-center top-9 translate-x-[-50%] translate-y-[-50%] w-[296px]">
        <p className="block leading-[36px]">150</p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-5 top-[60px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-4 not-italic text-[24px] text-gray-400 text-left top-5 w-4">
        <p className="block leading-[32px]">$</p>
      </div>
      <Input />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-gray-100 h-11 left-0 rounded-xl top-0 w-[90.656px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[48.09px] not-italic text-[14px] text-center text-gray-700 top-[13px] translate-x-[-50%] w-[41px]">
        <p className="block leading-[normal]">+$25</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-gray-100 h-11 left-[102.66px] rounded-xl top-0 w-[90.672px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[47.89px] not-italic text-[14px] text-center text-gray-700 top-[13px] translate-x-[-50%] w-[41px]">
        <p className="block leading-[normal]">+$50</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-gray-100 h-11 left-[205.33px] rounded-xl top-0 w-[90.656px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[48.19px] not-italic text-[14px] text-center text-gray-700 top-[13px] translate-x-[-50%] w-12">
        <p className="block leading-[normal]">+$100</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-5 top-[148px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[228px] left-6 rounded-2xl top-[352px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <H4 />
      <Div22 />
      <Div23 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_5_703)">
            <path
              d={svgPaths.p13699700}
              fill="var(--fill-0, #16A34A)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_703">
            <path d="M0 0H14V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3.5 top-[2.75px]"
      data-name="svg"
    >
      <Frame1 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[9px] top-1.5 w-3.5"
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

function Div25() {
  return (
    <div
      className="absolute bg-green-100 left-0 rounded-[9999px] size-8 top-0"
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

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-5 top-5 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div25 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-10 not-italic text-[16px] text-gray-900 text-left top-1 w-[119px]">
        <p className="block leading-[24px]">Impact Preview</p>
      </div>
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[41px] left-0 top-0 w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-2.5 w-[77px]">
        <p className="block leading-[20px]">Time saved</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-[165.67px] not-italic text-[16px] text-green-600 text-left top-2 w-[131px]">
        <p className="block leading-[24px]">3 months sooner</p>
      </div>
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[41px] left-0 top-[53px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-2.5 w-[94px]">
        <p className="block leading-[20px]">Interest saved</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-[255.17px] not-italic text-[16px] text-green-600 text-left top-2 w-[42px]">
        <p className="block leading-[24px]">$425</p>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-[106px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-0 not-italic text-[14px] text-gray-600 text-left top-2.5 w-[110px]">
        <p className="block leading-[20px]">New payoff date</p>
      </div>
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-[221.39px] not-italic text-[16px] text-gray-900 text-left top-2 w-[75px]">
        <p className="block leading-[24px]">Sep 2026</p>
      </div>
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[146px] left-5 top-[68px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div27 />
      <Div28 />
      <Div29 />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[234px] left-6 rounded-2xl top-[604px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div26 />
      <Div30 />
    </div>
  );
}

function H5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-5 top-5 w-[296px]"
      data-name="h3"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0.5 w-[286px]">
        <p className="block leading-[normal]">
          When are you making this payment?
        </p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[#667eea] h-11 left-0 rounded-xl top-0 w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.52px] not-italic text-[#ffffff] text-[14px] text-center top-[13px] translate-x-[-50%] w-[46px]">
        <p className="block leading-[normal]">Today</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-gray-100 h-11 left-[154px] rounded-xl top-0 w-[142px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[73.98px] not-italic text-[14px] text-center text-gray-700 top-[13px] translate-x-[-50%] w-[92px]">
        <p className="block leading-[normal]">Choose Date</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-5 top-[60px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[124px] left-6 rounded-2xl top-[862px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <H5 />
      <Div32 />
    </div>
  );
}

function Main() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1106px] left-0 top-28 w-96"
      data-name="main"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div21 />
      <Div24 />
      <Div31 />
      <Div33 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[#667eea] h-[60px] left-6 rounded-2xl top-0 w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[170.56px] not-italic text-[#ffffff] text-[18px] text-center top-[19px] translate-x-[-50%] w-[168px]">
        <p className="block leading-[normal]">Add $150 Payment</p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[60px] left-0 top-[1078px] w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button6 />
    </div>
  );
}

function Frame2() {
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

function Frame3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[20.83px] overflow-clip p-0 top-[4.25px] w-[20.25px]"
      data-name="Frame"
    >
      <Frame2 />
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
      <Frame3 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[31px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[62px]">
        <p className="block leading-[16px]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame4() {
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

function Frame5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[19.64px] overflow-clip p-0 size-[18px] top-[4.25px]"
      data-name="Frame"
    >
      <Frame4 />
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
      <Frame5 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[29px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[58px]">
        <p className="block leading-[16px]">Strategies</p>
      </div>
    </div>
  );
}

function Frame6() {
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

function Frame7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[18.63px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame6 />
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
      <Frame7 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[26.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[53px]">
        <p className="block leading-[16px]">Schedule</p>
      </div>
    </div>
  );
}

function Frame8() {
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

function Frame9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[10.34px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame8 />
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
      <Frame9 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[18.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[37px]">
        <p className="block leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Div35() {
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
      className="absolute bg-[#ffffff] h-[73px] left-0 top-[1145px] w-96"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div35 />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[1218px] left-[3px] top-0 w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Header />
      <Main />
      <Div34 />
      <Nav />
    </div>
  );
}

function Body() {
  return (
    <div
      className="bg-gray-50 h-[1218px] relative shrink-0 w-[390px]"
      data-name="body"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div36 />
    </div>
  );
}

export default function Frame10() {
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