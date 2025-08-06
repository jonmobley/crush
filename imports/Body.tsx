import svgPaths from "./svg-wz2e8q3jzm";

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

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.2)] h-7 left-[279.22px] rounded-[9999px] top-0.5 w-[56.781px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[31px] not-italic text-[#ffffff] text-[14px] text-center top-[5px] translate-x-[-50%] w-[38px]">
        <p className="block leading-[normal]">Save</p>
      </div>
    </div>
  );
}

function Div() {
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
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[116.13px] not-italic text-[#ffffff] text-[18px] text-left top-0.5 w-[81px]">
        <p className="block leading-[28px]">Edit Debt</p>
      </div>
      <Button1 />
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
      <Div />
    </div>
  );
}

function Label() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-20">
        <p className="block leading-[normal]">Debt Name</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-xl top-7 w-72"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[50px] leading-[0] left-4 not-italic text-[16px] text-gray-900 text-left top-3 w-72">
        <p className="block leading-[24px]">Car Dreams</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[114px] left-6 top-6 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label />
      <Input />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-8 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-[82px] w-[269px]">
        <p className="block leading-[16px]">
          Give your debt a personal name that motivates you
        </p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[74px]">
        <p className="block leading-[normal]">Debt Type</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-[248px] size-8 top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pfd263c0}
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
      className="absolute bg-[#ffffff] h-12 left-0 rounded-xl top-7 w-72"
      data-name="select"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[16px] text-gray-900 text-left text-nowrap top-6 translate-y-[-50%] w-[77px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Auto Loan
        </p>
      </div>
      <Frame1 />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[76px] left-6 top-[162px] w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label1 />
      <Select />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[113px]">
        <p className="block leading-[normal]">Current Balance</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-xl top-0 w-72"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[50px] leading-[0] left-8 not-italic text-[16px] text-gray-900 text-left top-3 w-72">
        <p className="block leading-[24px]">18500</p>
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[50px] left-0 top-7 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-4 not-italic text-[16px] text-gray-500 text-left top-[13px] w-[11px]">
        <p className="block leading-[24px]">$</p>
      </div>
      <Input1 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[78px] left-6 top-[262px] w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label2 />
      <Div3 />
    </div>
  );
}

function Label3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[122px]">
        <p className="block leading-[normal]">Monthly Payment</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-xl top-0 w-72"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[50px] leading-[0] left-8 not-italic text-[16px] text-gray-900 text-left top-3 w-72">
        <p className="block leading-[24px]">485</p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[50px] left-0 top-7 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-4 not-italic text-[16px] text-gray-500 text-left top-[13px] w-[11px]">
        <p className="block leading-[24px]">$</p>
      </div>
      <Input2 />
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[78px] left-6 top-[364px] w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label3 />
      <Div5 />
    </div>
  );
}

function Label4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[90px]">
        <p className="block leading-[normal]">Interest Rate</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[50px] left-0 rounded-xl top-0 w-72"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[50px] leading-[0] left-4 not-italic text-[16px] text-gray-900 text-left top-3 w-72">
        <p className="block leading-[24px]">4.2</p>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[50px] left-0 top-7 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Input3 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-6 leading-[0] left-[256.28px] not-italic text-[16px] text-gray-500 text-left top-[13px] w-4">
        <p className="block leading-[24px]">%</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[78px] left-6 top-[466px] w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label4 />
      <Div7 />
    </div>
  );
}

function Label5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-0 top-0 w-72"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-px w-[129px]">
        <p className="block leading-[normal]">Payment Due Date</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[248px] size-8 top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.pfd263c0}
            fill="var(--fill-0, #111827)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select1() {
  return (
    <div
      className="absolute bg-[#ffffff] h-12 left-0 rounded-xl top-7 w-72"
      data-name="select"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-12 justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[16px] text-gray-900 text-left text-nowrap top-6 translate-y-[-50%] w-[95px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          1st of month
        </p>
      </div>
      <Frame2 />
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[76px] left-6 top-[568px] w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label5 />
      <Select1 />
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[692px] left-6 rounded-2xl top-0 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div1 />
      <Div2 />
      <Div4 />
      <Div6 />
      <Div8 />
      <Div9 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[247.78px] top-0.5 w-[40.219px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[20.5px] not-italic text-[#667eea] text-[14px] text-center top-px translate-x-[-50%] w-[41px]">
        <p className="block leading-[normal]">+ Add</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-6 left-6 top-6 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[121px]">
        <p className="block leading-[24px]">Extra Payments</p>
      </div>
      <Button2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_865)">
            <path
              d={svgPaths.p2cfb8a00}
              fill="var(--fill-0, #EF4444)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_865">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 overflow-clip p-0 top-[2.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame3 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[241.75px] top-0 w-[12.25px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame4 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[17px] top-[17px] w-[254px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-0 not-italic text-[14px] text-gray-700 text-left top-0 w-[93px]">
        <p className="block leading-[20px]">Monthly Extra</p>
      </div>
      <Button3 />
    </div>
  );
}

function Label6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-0 top-0 w-[121px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-0 w-[50px]">
        <p className="block leading-[normal]">Amount</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[38px] left-0 rounded-lg top-0 w-[121px]"
      data-name="input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-[38px] leading-[0] left-7 not-italic text-[#000000] text-[14px] text-left top-2 w-[121px]">
        <p className="block leading-[20px]">100</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[38px] left-0 top-5 w-[121px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-3 not-italic text-[14px] text-gray-500 text-left top-[9px] w-[9px]">
        <p className="block leading-[20px]">$</p>
      </div>
      <Input4 />
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[58px] left-0 top-0 w-[121px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label6 />
      <Div13 />
    </div>
  );
}

function Label7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-4 left-0 top-0 w-[121px]"
      data-name="label"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-0 w-[65px]">
        <p className="block leading-[normal]">Frequency</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute left-[92px] size-[21px] top-2" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 21"
      >
        <g id="Frame">
          <path
            clipRule="evenodd"
            d={svgPaths.p1a6425c0}
            fill="var(--fill-0, black)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Select2() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[37px] left-0 rounded-lg top-5 w-[121px]"
      data-name="select"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[37px] justify-center leading-[0] left-3 not-italic overflow-ellipsis overflow-hidden text-[#000000] text-[14px] text-left text-nowrap top-[18.5px] translate-y-[-50%] w-[54px]">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Monthly
        </p>
      </div>
      <Frame5 />
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[58px] left-[133px] top-0 w-[121px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Label7 />
      <Select2 />
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[58px] left-[17px] top-[49px] w-[254px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div14 />
      <Div15 />
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[124px] left-6 rounded-xl top-16 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <Div12 />
      <Div16 />
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
          <path d="M12.25 14H0V0H12.25V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p363f1d80}
            fill="var(--fill-0, #6B7280)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-[70.02px] overflow-clip p-0 top-[16.75px] w-[12.25px]"
      data-name="Frame"
    >
      <Frame6 />
    </div>
  );
}

function Button4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-6 rounded-xl top-[200px] w-72"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-2 border-dashed border-gray-300 inset-0 pointer-events-none rounded-xl"
      />
      <Frame7 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[156.77px] not-italic text-[14px] text-center text-gray-500 top-[15px] translate-x-[-50%] w-[133px]">
        <p className="block leading-[normal]">Add Extra Payment</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[272px] left-6 rounded-2xl top-[716px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div11 />
      <Div17 />
      <Button4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-3.5 relative shrink-0 w-[12.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_859)">
            <path
              d={svgPaths.p24953900}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_859">
            <path d="M0 0H12.25V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[12.25px]"
      data-name="svg"
    >
      <Frame8 />
    </div>
  );
}

function I1() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[9.88px] top-1.5 w-[12.25px]"
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

function Div19() {
  return (
    <div
      className="absolute bg-green-500 left-0 rounded-[9999px] size-8 top-0"
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

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-6 top-6 w-72"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div19 />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-10 not-italic text-[16px] text-green-800 text-left top-1 w-[121px]">
        <p className="block leading-[24px]">Updated Payoff</p>
      </div>
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-0 top-0 w-[136px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-green-600 text-left top-0 w-[100px]">
        <p className="block leading-[16px]">New Payoff Date</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-green-800 text-left top-5 w-[82px]">
        <p className="block leading-[24px]">Nov 2026</p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-[152px] top-0 w-[136px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-green-600 text-left top-0 w-[72px]">
        <p className="block leading-[16px]">Time Saved</p>
      </div>
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-0 not-italic text-[16px] text-green-800 text-left top-5 w-[86px]">
        <p className="block leading-[24px]">10 months</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-11 left-6 top-[68px] w-72"
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

function Div24() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[#f0fdf4] h-[136px] left-6 rounded-2xl to-[#dcfce7] top-[1012px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl"
      />
      <Div20 />
      <Div23 />
    </div>
  );
}

function Button5() {
  return (
    <div
      className="absolute bg-[#667eea] h-14 left-0 rounded-xl top-0 w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-[170.63px] not-italic text-[#ffffff] text-[16px] text-center top-[18px] translate-x-[-50%] w-[116px]">
        <p className="block leading-[normal]">Save Changes</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-gray-100 h-14 left-0 rounded-xl top-[68px] w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-[170.63px] not-italic text-[16px] text-center text-gray-700 top-[18px] translate-x-[-50%] w-[59px]">
        <p className="block leading-[normal]">Cancel</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-[136px] w-[336px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[170.61px] not-italic text-[14px] text-center text-red-500 top-[9px] translate-x-[-50%] w-[116px]">
        <p className="block leading-[normal]">Delete This Debt</p>
      </div>
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[172px] left-6 top-[1172px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Main() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[1440px] left-0 top-28 w-96"
      data-name="main"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div10 />
      <Div18 />
      <Div24 />
      <Div25 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 21 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_1_196)">
            <path
              d={svgPaths.p32d88500}
              fill="var(--fill-0, #667EEA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_196">
            <path d="M0 0H20.25V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[21.17px] overflow-clip p-0 top-[4.25px] w-[20.25px]"
      data-name="Frame"
    >
      <Frame9 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[21.83px] top-3 w-[62.594px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame10 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[31.5px] not-italic text-[#667eea] text-[12px] text-center top-8 translate-x-[-50%] w-[63px]">
        <p className="block leading-[16px]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame11() {
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

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[19.64px] overflow-clip p-0 size-[18px] top-[4.25px]"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[128.09px] top-3 w-[57.281px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame12 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[29px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[58px]">
        <p className="block leading-[16px]">Strategies</p>
      </div>
    </div>
  );
}

function Frame13() {
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

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[18.63px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Button10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[229.05px] top-3 w-[53px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[26.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[53px]">
        <p className="block leading-[16px]">Schedule</p>
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

function Frame16() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[10.34px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame15 />
    </div>
  );
}

function Button11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[325.72px] top-3 w-[36.438px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame16 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[18.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[37px]">
        <p className="block leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-px w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[73px] left-0 top-[1479px] w-96"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div26 />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[1552px] left-[3px] top-0 w-96"
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

export default function Body() {
  return (
    <div className="bg-gray-50 relative size-full" data-name="body">
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div27 />
    </div>
  );
}