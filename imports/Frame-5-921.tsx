import svgPaths from "./svg-4skztuqt90";

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
          <g clipPath="url(#clip0_4_370)">
            <path
              d={svgPaths.p2d9f400}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_370">
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

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.2)] left-[304px] rounded-[9999px] size-8 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I1 />
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
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-[86.84px] not-italic text-[#ffffff] text-[18px] text-left top-0.5 w-[163px]">
        <p className="block leading-[28px]">Payment Schedule</p>
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

function Button2() {
  return (
    <div
      className="absolute bg-[#667eea] h-9 left-1 rounded-lg top-1 w-[148px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[76.56px] not-italic text-[#ffffff] text-[14px] text-center top-[9px] translate-x-[-50%] w-12">
        <p className="block leading-[normal]">Month</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[152px] top-1 w-[148px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-5 leading-[0] left-[76.63px] not-italic text-[14px] text-center text-gray-600 top-[9px] translate-x-[-50%] w-[29px]">
        <p className="block leading-[normal]">List</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div
      className="absolute bg-gray-100 h-11 left-4 rounded-xl top-4 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-xl"
      />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Div2() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[76px] left-6 rounded-2xl top-0 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-3.5 relative shrink-0 w-[8.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 9 14"
      >
        <g id="Frame">
          <path d="M8.75 14H0V0H8.75V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p35051800}
            fill="var(--fill-0, #4B5563)"
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
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[8.75px]"
      data-name="svg"
    >
      <Frame2 />
    </div>
  );
}

function I2() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[11.63px] top-1.5 w-[8.75px]"
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

function Button4() {
  return (
    <div
      className="absolute bg-[#ffffff] left-0 rounded-[9999px] size-8 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <I2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-3.5 relative shrink-0 w-[8.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 9 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_5_931)">
            <path
              d={svgPaths.p167dbc00}
              fill="var(--fill-0, #4B5563)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_931">
            <path d="M0 0H8.75V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[8.75px]"
      data-name="svg"
    >
      <Frame3 />
    </div>
  );
}

function I3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[11.63px] top-1.5 w-[8.75px]"
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

function Button5() {
  return (
    <div
      className="absolute bg-[#ffffff] left-[304px] rounded-[9999px] size-8 top-0"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <I3 />
    </div>
  );
}

function Div3() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-6 top-[100px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button4 />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-7 leading-[0] left-[89.2px] not-italic text-[20px] text-gray-900 text-left top-0.5 w-[159px]">
        <p className="block leading-[28px]">December 2024</p>
      </div>
      <Button5 />
    </div>
  );
}

function Div4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-0 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.61px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-11 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-[22.52px] not-italic size-4 text-[12px] text-center text-gray-500 top-2 translate-x-[-50%]">
        <p className="block leading-[normal]">M</p>
      </div>
    </div>
  );
}

function Div6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[88px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.58px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Div7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[132px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.97px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[18px]">
        <p className="block leading-[normal]">W</p>
      </div>
    </div>
  );
}

function Div8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-44 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.58px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">T</p>
      </div>
    </div>
  );
}

function Div9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[220px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.95px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">F</p>
      </div>
    </div>
  );
}

function Div10() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-[264px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[22.61px] not-italic text-[12px] text-center text-gray-500 top-2 translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">S</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-8 left-4 top-4 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div4 />
      <Div5 />
      <Div6 />
      <Div7 />
      <Div8 />
      <Div9 />
      <Div10 />
    </div>
  );
}

function Div12() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.64px] not-italic text-[14px] text-center text-gray-400 top-[9px] translate-x-[-50%] w-[11px]">
        <p className="block leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Div13() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.72px] not-italic text-[14px] text-center text-gray-400 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Div14() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[88px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.67px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[132px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.97px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[15px]">
        <p className="block leading-[normal]">4</p>
      </div>
    </div>
  );
}

function Div16() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-44 top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.84px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Div17() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[220px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.66px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">6</p>
      </div>
    </div>
  );
}

function Div18() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[264px] top-0 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.53px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[13px]">
        <p className="block leading-[normal]">7</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.66px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">8</p>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.66px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-3.5">
        <p className="block leading-[normal]">9</p>
      </div>
    </div>
  );
}

function Div21() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[88px] top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.73px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">10</p>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[132px] top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.8px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[17px]">
        <p className="block leading-[normal]">11</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-44 top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.88px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">12</p>
      </div>
    </div>
  );
}

function Div24() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[220px] top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.83px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">13</p>
      </div>
    </div>
  );
}

function Div25() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[264px] top-10 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.63px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">14</p>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div
      className="absolute bg-[#667eea] left-[18px] rounded-[9999px] size-1 top-9"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div27() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.5px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[normal]">15</p>
      </div>
      <Div26 />
    </div>
  );
}

function Div28() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.8px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">16</p>
      </div>
    </div>
  );
}

function Div29() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[88px] top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.69px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[normal]">17</p>
      </div>
    </div>
  );
}

function Div30() {
  return (
    <div
      className="absolute bg-green-500 left-[18px] rounded-[9999px] size-1 top-9"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div31() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[132px] top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.81px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">18</p>
      </div>
      <Div30 />
    </div>
  );
}

function Div32() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-44 top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.8px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">19</p>
      </div>
    </div>
  );
}

function Div33() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[220px] top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.81px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">20</p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[264px] top-20 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.88px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">21</p>
      </div>
    </div>
  );
}

function Div35() {
  return (
    <div
      className="absolute bg-red-500 left-[18px] rounded-[9999px] size-1 top-9"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
    </div>
  );
}

function Div36() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.95px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">22</p>
      </div>
      <Div35 />
    </div>
  );
}

function Div37() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.91px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">23</p>
      </div>
    </div>
  );
}

function Div38() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[88px] top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.81px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">24</p>
      </div>
    </div>
  );
}

function Div39() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[132px] top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.58px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[22px]">
        <p className="block leading-[normal]">25</p>
      </div>
    </div>
  );
}

function Div40() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-44 top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.88px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">26</p>
      </div>
    </div>
  );
}

function Div41() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[220px] top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.77px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[22px]">
        <p className="block leading-[normal]">27</p>
      </div>
    </div>
  );
}

function Div42() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[264px] top-[120px] w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.89px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">28</p>
      </div>
    </div>
  );
}

function Div43() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-0 top-40 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.88px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">29</p>
      </div>
    </div>
  );
}

function Div44() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-11 top-40 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-5 leading-[0] left-[22.75px] not-italic text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%] w-[23px]">
        <p className="block leading-[normal]">30</p>
      </div>
    </div>
  );
}

function Div45() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-9 left-[88px] top-40 w-10"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[22.83px] not-italic size-5 text-[14px] text-center text-gray-900 top-[9px] translate-x-[-50%]">
        <p className="block leading-[normal]">31</p>
      </div>
    </div>
  );
}

function Div46() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[196px] left-4 top-16 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div12 />
      <Div13 />
      <Div14 />
      <Div15 />
      <Div16 />
      <Div17 />
      <Div18 />
      <Div19 />
      <Div20 />
      <Div21 />
      <Div22 />
      <Div23 />
      <Div24 />
      <Div25 />
      <Div27 />
      <Div28 />
      <Div29 />
      <Div31 />
      <Div32 />
      <Div33 />
      <Div34 />
      <Div36 />
      <Div37 />
      <Div38 />
      <Div39 />
      <Div40 />
      <Div41 />
      <Div42 />
      <Div43 />
      <Div44 />
      <Div45 />
    </div>
  );
}

function Div47() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[276px] left-6 rounded-2xl top-[156px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div11 />
      <Div46 />
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
          <g clipPath="url(#clip0_5_928)">
            <path
              d={svgPaths.p218e7100}
              fill="var(--fill-0, #667EEA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_928">
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
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3.5 top-[2.75px]"
      data-name="svg"
    >
      <Frame4 />
    </div>
  );
}

function I4() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[13px] top-2.5 w-3.5"
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

function Div48() {
  return (
    <div
      className="absolute bg-[rgba(102,126,234,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I4 />
    </div>
  );
}

function Div49() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[90.922px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[91px]">
        <p className="block leading-[24px]">Car Dreams</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[70px]">
        <p className="block leading-[16px]">Due Dec 15</p>
      </div>
    </div>
  );
}

function Div50() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-1 w-[142.922px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div48 />
      <Div49 />
    </div>
  );
}

function Span() {
  return (
    <div
      className="absolute bg-yellow-100 h-[23px] left-0 rounded-[9999px] top-[26px] w-[71.313px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[69px] not-italic text-[12px] text-right text-yellow-800 top-1 translate-x-[-100%] w-[61px]">
        <p className="block leading-[normal]">Due Soon</p>
      </div>
    </div>
  );
}

function Div51() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[232.69px] top-0 w-[71.313px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[76.64px] not-italic text-[16px] text-gray-900 text-right top-0 translate-x-[-100%] w-[47px]">
        <p className="block leading-[24px]">$485</p>
      </div>
      <Span />
    </div>
  );
}

function Div52() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-4 top-4 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div50 />
      <Div51 />
    </div>
  );
}

function Div53() {
  return (
    <div
      className="absolute bg-[#ffffff] h-20 left-0 rounded-2xl top-11 w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div52 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-3.5 relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 14"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_5_937)">
            <path
              d={svgPaths.p10e0e700}
              fill="var(--fill-0, #22C55E)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_5_937">
            <path d="M0 0H15.75V14H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Svg5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-3.5 items-center justify-center left-0 p-0 top-[2.75px] w-[15.75px]"
      data-name="svg"
    >
      <Frame5 />
    </div>
  );
}

function I5() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[12.13px] top-2.5 w-[15.75px]"
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

function Div54() {
  return (
    <div
      className="absolute bg-[rgba(34,197,94,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I5 />
    </div>
  );
}

function Div55() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[151.703px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[152px]">
        <p className="block leading-[24px]">Home Improvement</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[70px]">
        <p className="block leading-[16px]">Due Dec 18</p>
      </div>
    </div>
  );
}

function Div56() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-1 w-[203.703px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div54 />
      <Div55 />
    </div>
  );
}

function Span1() {
  return (
    <div
      className="absolute bg-green-100 h-[23px] left-0 rounded-[9999px] top-[26px] w-[67.406px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[65px] not-italic text-[12px] text-green-800 text-right top-1 translate-x-[-100%] w-[57px]">
        <p className="block leading-[normal]">On Track</p>
      </div>
    </div>
  );
}

function Div57() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[236.59px] top-0 w-[67.406px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[72.83px] not-italic text-[16px] text-gray-900 text-right top-0 translate-x-[-100%] w-11">
        <p className="block leading-[24px]">$180</p>
      </div>
      <Span1 />
    </div>
  );
}

function Div58() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-4 top-4 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div56 />
      <Div57 />
    </div>
  );
}

function Div59() {
  return (
    <div
      className="absolute bg-[#ffffff] h-20 left-0 rounded-2xl top-[136px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div58 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Frame">
          <path d="M14 14H0V0H14V14Z" stroke="var(--stroke-0, #E5E7EB)" />
          <path
            d={svgPaths.p170ff400}
            fill="var(--fill-0, #EF4444)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Svg6() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-0 p-0 size-3.5 top-[2.75px]"
      data-name="svg"
    >
      <Frame6 />
    </div>
  );
}

function I6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-5 left-[13px] top-2.5 w-3.5"
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

function Div60() {
  return (
    <div
      className="absolute bg-[rgba(239,68,68,0.1)] left-0 rounded-[9999px] size-10 top-0"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <I6 />
    </div>
  );
}

function Div61() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-[52px] top-0 w-[150.234px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0 w-[151px]">
        <p className="block leading-[24px]">Wedding Memories</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-0 not-italic text-[12px] text-gray-500 text-left top-6 w-[72px]">
        <p className="block leading-[16px]">Due Dec 22</p>
      </div>
    </div>
  );
}

function Div62() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-10 left-0 top-1 w-[202.234px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div60 />
      <Div61 />
    </div>
  );
}

function Span2() {
  return (
    <div
      className="absolute bg-gray-100 h-[23px] left-0 rounded-[9999px] top-[26px] w-[76.344px]"
      data-name="span"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-[9999px]"
      />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[74px] not-italic text-[12px] text-gray-600 text-right top-1 translate-x-[-100%] w-[66px]">
        <p className="block leading-[normal]">Scheduled</p>
      </div>
    </div>
  );
}

function Div63() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[227.66px] top-0 w-[76.344px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-6 leading-[0] left-[81.94px] not-italic text-[16px] text-gray-900 text-right top-0 translate-x-[-100%] w-[43px]">
        <p className="block leading-[24px]">$125</p>
      </div>
      <Span2 />
    </div>
  );
}

function Div64() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-4 top-4 w-[304px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div62 />
      <Div63 />
    </div>
  );
}

function Div65() {
  return (
    <div
      className="absolute bg-[#ffffff] h-20 left-0 rounded-2xl top-[228px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <Div64 />
    </div>
  );
}

function Div66() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[308px] left-6 top-[456px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-7 leading-[0] left-0 not-italic text-[18px] text-gray-900 text-left top-0 w-[185px]">
        <p className="block leading-[28px]">Upcoming Payments</p>
      </div>
      <Div53 />
      <Div59 />
      <Div65 />
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
      <div className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold h-6 leading-[0] left-0 not-italic text-[16px] text-gray-900 text-left top-0.5 w-[93px]">
        <p className="block leading-[normal]">This Month</p>
      </div>
    </div>
  );
}

function Div67() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-0 top-0 w-[140px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-[72.89px] not-italic text-[24px] text-center text-gray-900 top-0 translate-x-[-50%] w-[67px]">
        <p className="block leading-[32px]">$790</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[72.64px] not-italic text-[12px] text-center text-gray-500 top-8 translate-x-[-50%] w-[92px]">
        <p className="block leading-[16px]">Total Payments</p>
      </div>
    </div>
  );
}

function Div68() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[156px] top-0 w-[140px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold h-8 leading-[0] left-[72.75px] not-italic text-[#667eea] text-[24px] text-center top-0 translate-x-[-50%] w-[21px]">
        <p className="block leading-[32px]">3</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[72.66px] not-italic text-[12px] text-center text-gray-500 top-8 translate-x-[-50%] w-16">
        <p className="block leading-[16px]">Due Dates</p>
      </div>
    </div>
  );
}

function Div69() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-5 top-[60px] w-[296px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div67 />
      <Div68 />
    </div>
  );
}

function Div70() {
  return (
    <div
      className="absolute bg-[#ffffff] h-32 left-6 rounded-2xl top-[788px] w-[336px]"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none rounded-2xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]"
      />
      <H3 />
      <Div69 />
    </div>
  );
}

function Main() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[996px] left-0 top-28 w-96"
      data-name="main"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div2 />
      <Div3 />
      <Div47 />
      <Div66 />
      <Div70 />
    </div>
  );
}

function Frame7() {
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

function Frame8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[20.83px] overflow-clip p-0 top-[4.25px] w-[20.25px]"
      data-name="Frame"
    >
      <Frame7 />
    </div>
  );
}

function Button6() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[21.83px] top-3 w-[61.906px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[31px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[62px]">
        <p className="block leading-[16px]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame9() {
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

function Frame10() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-center justify-center left-[19.64px] overflow-clip p-0 size-[18px] top-[4.25px]"
      data-name="Frame"
    >
      <Frame9 />
    </div>
  );
}

function Button7() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[127.41px] top-3 w-[57.281px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame10 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[29px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[58px]">
        <p className="block leading-[16px]">Strategies</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[15.75px]" data-name="Frame">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 18"
      >
        <g id="Frame">
          <g clipPath="url(#clip0_4_358)">
            <path
              d={svgPaths.p20a70880}
              fill="var(--fill-0, #667EEA)"
              id="Vector"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_358">
            <path d="M0 0H15.75V18H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[18.95px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame11 />
    </div>
  );
}

function Button8() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[228.36px] top-3 w-[53.656px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame12 />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-4 leading-[0] left-[27px] not-italic text-[#667eea] text-[12px] text-center top-8 translate-x-[-50%] w-[54px]">
        <p className="block leading-[16px]">Schedule</p>
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

function Frame14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[18px] items-center justify-center left-[10.34px] overflow-clip p-0 top-[4.25px] w-[15.75px]"
      data-name="Frame"
    >
      <Frame13 />
    </div>
  );
}

function Button9() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-12 left-[325.69px] top-3 w-[36.438px]"
      data-name="button"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Frame14 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal h-4 leading-[0] left-[18.5px] not-italic text-[12px] text-center text-gray-400 top-8 translate-x-[-50%] w-[37px]">
        <p className="block leading-[16px]">Profile</p>
      </div>
    </div>
  );
}

function Div71() {
  return (
    <div
      className="absolute bg-[rgba(0,0,0,0)] h-[72px] left-0 top-px w-96"
      data-name="div"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Nav() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[73px] left-0 top-[1035px] w-96"
      data-name="nav"
    >
      <div
        aria-hidden="true"
        className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div71 />
    </div>
  );
}

function Div72() {
  return (
    <div
      className="absolute bg-[#ffffff] h-[1108px] left-[3px] top-0 w-96"
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
      className="bg-gray-50 h-[1108px] relative shrink-0 w-[390px]"
      data-name="body"
    >
      <div
        aria-hidden="true"
        className="absolute border-0 border-gray-200 border-solid inset-0 pointer-events-none"
      />
      <Div72 />
    </div>
  );
}

export default function Frame15() {
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