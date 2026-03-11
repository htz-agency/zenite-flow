import clsx from "clsx";
import img3DAvatars23 from "figma:asset/2179a66fb715ad1631c22160cf1ff3c21a2aa7d6.png";
import svgPaths from "./svg-7v4bj4iatc";

function MenubarLeftBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[60px]">
      <div className="h-[54px] relative shrink-0 w-[32px]" data-name="Component 1">
        {children}
      </div>
    </div>
  );
}

function BackgroundImage7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="backdrop-blur-[50px] bg-[#28415c] h-[32px] relative rounded-[500px] shrink-0 w-[42px]">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0.7px] border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[500px] shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)]" />
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-[#4e6987] text-[15px] text-center top-1/2">
      <p className="leading-[22px]">{children}</p>
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="content-stretch flex flex-col relative">
      <div className="content-stretch flex flex-col items-start relative shrink-0">{children}</div>
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <BackgroundImage5 additionalClassNames={additionalClassNames}>
      <div className="content-stretch flex flex-col items-center relative shrink-0">{children}</div>
    </BackgroundImage5>
  );
}

function Frame178DividerBackgroundImage() {
  return (
    <div className="h-[1.893px] relative shrink-0 w-[23px]">
      <div className="absolute inset-[-2.83%_-1.67%_-2.83%_-4.35%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3848 2">
          <path d="M1 1H23.3848" id="Divider" stroke="var(--stroke-0, #98989D)" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
type ButtonMenuBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function ButtonMenuBackgroundImageAndText1({ text, additionalClassNames = "" }: ButtonMenuBackgroundImageAndText1Props) {
  return (
    <div className={clsx("overflow-clip relative rounded-[500px] shrink-0", additionalClassNames)}>
      <BackgroundImage6>{text}</BackgroundImage6>
    </div>
  );
}
type ButtonSymbolBackgroundImageAndTextProps = {
  text: string;
};

function ButtonSymbolBackgroundImageAndText({ text }: ButtonSymbolBackgroundImageAndTextProps) {
  return (
    <div className="overflow-clip relative rounded-[500px] shrink-0 size-[28px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[28px] text-[#4e6987] text-[13px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <div style={{ fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className="flex flex-col font-['DM_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#28415c] text-[12px] text-center tracking-[-0.5px] whitespace-nowrap">
      <p className="leading-[22px]">{text}</p>
    </div>
  );
}
type ButtonMenuBackgroundImageAndTextProps = {
  text: string;
};

function ButtonMenuBackgroundImageAndText({ text }: ButtonMenuBackgroundImageAndTextProps) {
  return (
    <BackgroundImage7>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-[#f6f7f9] text-[15px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22px]">{text}</p>
      </div>
    </BackgroundImage7>
  );
}
type BackgroundImage3Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function BackgroundImage3({ text, text1, additionalClassNames = "" }: BackgroundImage3Props) {
  return (
    <div className={clsx("content-stretch flex flex-col items-center", additionalClassNames)}>
      <ButtonMenuBackgroundImageAndText text={text} />
      <BackgroundImageAndText1 text={text1} />
    </div>
  );
}
type BackgroundImage2Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function BackgroundImage2({ text, text1, additionalClassNames = "" }: BackgroundImage2Props) {
  return (
    <BackgroundImage5 additionalClassNames={additionalClassNames}>
      <BackgroundImage3 text={text} text1={text1} additionalClassNames="relative shrink-0" />
    </BackgroundImage5>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div style={{ fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }} className={clsx("flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] text-[#4e6987] text-[12px] text-center tracking-[-0.5px] whitespace-nowrap", additionalClassNames)}>
      <p className="leading-[22px]">{text}</p>
    </div>
  );
}
type BackgroundImage1Props = {
  symbol: string;
  additionalClassNames?: string;
};

function BackgroundImage1({ symbol, additionalClassNames = "" }: BackgroundImage1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[28px] text-[13px] text-center top-1/2", additionalClassNames)}>
      <p className="leading-[22px]">{symbol}</p>
    </div>
  );
}
type BackgroundImageProps = {
  symbol: string;
  additionalClassNames?: string;
};

function BackgroundImage({ symbol, additionalClassNames = "" }: BackgroundImageProps) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-1/2 text-center top-1/2", additionalClassNames)}>
      <p className="leading-[22px]">{symbol}</p>
    </div>
  );
}
type ButtonMenuProps = {
  className?: string;
  size?: "Mini" | "Small" | "Standard" | "Large" | "Extra Large";
  state?: "Idle (No Platter)" | "Idle (Platter)" | "Hover" | "Selected" | "Disabled";
  symbol?: string;
};

function ButtonMenu({ className, size = "Mini", state = "Idle (No Platter)", symbol = "􀻒" }: ButtonMenuProps) {
  const isDisabledAndIsExtraLargeOrLargeOrStandardOrSmallOrMini = state === "Disabled" && ["Extra Large", "Large", "Standard", "Small", "Mini"].includes(size);
  const isExtraLargeAndHover = size === "Extra Large" && state === "Hover";
  const isExtraLargeAndSelected = size === "Extra Large" && state === "Selected";
  const isLargeAndDisabled = size === "Large" && state === "Disabled";
  const isLargeAndHover = size === "Large" && state === "Hover";
  const isLargeAndIdlePlatter = size === "Large" && state === "Idle (Platter)";
  const isLargeAndSelected = size === "Large" && state === "Selected";
  const isMiniAndDisabled = size === "Mini" && state === "Disabled";
  const isMiniAndHover = size === "Mini" && state === "Hover";
  const isMiniAndSelected = size === "Mini" && state === "Selected";
  const isSelectedAndIsExtraLargeOrLargeOrStandardOrSmallOrMini = state === "Selected" && ["Extra Large", "Large", "Standard", "Small", "Mini"].includes(size);
  const isSmallAndDisabled = size === "Small" && state === "Disabled";
  const isSmallAndHover = size === "Small" && state === "Hover";
  const isSmallAndSelected = size === "Small" && state === "Selected";
  const isStandardAndDisabled = size === "Standard" && state === "Disabled";
  const isStandardAndHover = size === "Standard" && state === "Hover";
  const isStandardAndSelected = size === "Standard" && state === "Selected";
  return (
    <div className={className || `relative ${size === "Mini" && state === "Idle (No Platter)" ? "overflow-clip rounded-[500px] size-[28px]" : size === "Mini" && state === "Idle (Platter)" ? "bg-[#dde3ec] h-[28px] overflow-clip rounded-[500px] w-[38px]" : isMiniAndHover ? "h-[28px] overflow-clip rounded-[100px] w-[38px]" : isMiniAndSelected ? "backdrop-blur-[50px] bg-[#28415c] h-[28px] rounded-[500px] w-[38px]" : isMiniAndDisabled ? "h-[28px] overflow-clip rounded-[500px] w-[38px]" : size === "Small" && state === "Idle (No Platter)" ? "overflow-clip rounded-[500px] size-[32px]" : size === "Small" && state === "Idle (Platter)" ? "bg-[#dde3ec] h-[32px] overflow-clip rounded-[500px] w-[42px]" : isSmallAndHover ? "h-[32px] overflow-clip rounded-[100px] w-[42px]" : isSmallAndSelected ? "backdrop-blur-[50px] bg-[#28415c] h-[32px] rounded-[500px] w-[42px]" : isSmallAndDisabled ? "h-[32px] overflow-clip rounded-[500px] w-[42px]" : size === "Standard" && state === "Idle (No Platter)" ? "overflow-clip rounded-[500px] size-[44px]" : size === "Standard" && state === "Idle (Platter)" ? "bg-[#dde3ec] h-[44px] overflow-clip rounded-[500px] w-[60px]" : isStandardAndHover ? "h-[44px] overflow-clip rounded-[100px] w-[60px]" : isStandardAndSelected ? "backdrop-blur-[50px] bg-[#28415c] h-[44px] rounded-[500px] w-[60px]" : isStandardAndDisabled ? "h-[44px] overflow-clip rounded-[500px] w-[60px]" : size === "Large" && state === "Idle (No Platter)" ? "overflow-clip rounded-[500px] size-[52px]" : isLargeAndIdlePlatter ? "bg-[#dde3ec] h-[52px] overflow-clip rounded-[500px] w-[69px]" : isLargeAndHover ? "h-[52px] overflow-clip rounded-[100px] w-[70px]" : isLargeAndSelected ? "backdrop-blur-[50px] bg-[#28415c] h-[52px] rounded-[500px] w-[70px]" : isLargeAndDisabled ? "h-[52px] overflow-clip rounded-[500px] w-[69px]" : size === "Extra Large" && state === "Idle (No Platter)" ? "overflow-clip rounded-[500px] size-[64px]" : size === "Extra Large" && state === "Idle (Platter)" ? "bg-[#dde3ec] h-[64px] overflow-clip rounded-[500px] w-[90px]" : isExtraLargeAndHover ? "h-[64px] overflow-clip rounded-[100px] w-[90px]" : isExtraLargeAndSelected ? "backdrop-blur-[50px] bg-[#28415c] h-[64px] rounded-[500px] w-[90px]" : "h-[64px] overflow-clip rounded-[500px] w-[90px]"}`} style={isMiniAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 38 28\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-8.682e-9 -2.2 2.9857 -6.3973e-9 19 28)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(221, 227, 236) 0%, rgb(221, 227, 236) 100%)" } : isSmallAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 42 32\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-9.5959e-9 -2.5143 3.3 -7.3112e-9 21 32)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(221, 227, 236) 0%, rgb(221, 227, 236) 100%)" } : isStandardAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 60 44\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.3708e-8 -3.4571 4.7143 -1.0053e-8 30 44)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(221, 227, 236) 0%, rgb(221, 227, 236) 100%)" } : isLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 70 52\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.5993e-8 -4.0857 5.5 -1.1881e-8 35 52)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(221, 227, 236) 0%, rgb(221, 227, 236) 100%)" } : isExtraLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 90 64\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-2.0563e-8 -5.0286 7.0714 -1.4622e-8 45 64)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(221, 227, 236) 0%, rgb(221, 227, 236) 100%)" } : undefined}>
      {((size === "Extra Large" && state === "Disabled") || isExtraLargeAndSelected || isLargeAndDisabled || isLargeAndSelected || isStandardAndDisabled || isStandardAndSelected || isSmallAndDisabled || isSmallAndSelected || isMiniAndDisabled || isMiniAndSelected) && (
        <div className={isMiniAndDisabled ? '-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-["SF_Pro:Semibold",sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[28px] text-[#d9d9d9] text-[13px] text-center top-1/2' : isSmallAndDisabled ? '-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-["SF_Pro:Medium",sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[32px] text-[#d9d9d9] text-[15px] text-center top-1/2' : isStandardAndDisabled ? '-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-["SF_Pro:Medium",sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[44px] text-[#d9d9d9] text-[19px] text-center top-1/2' : isLargeAndDisabled ? '-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-["SF_Pro:Medium",sans-serif] font-[510] justify-center leading-[0] left-[calc(50%+0.5px)] size-[50px] text-[#d9d9d9] text-[24px] text-center top-1/2' : isSelectedAndIsExtraLargeOrLargeOrStandardOrSmallOrMini ? "overflow-clip relative rounded-[inherit] size-full" : '-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-["SF_Pro:Medium",sans-serif] font-[510] justify-center leading-[0] left-1/2 size-[50px] text-[#d9d9d9] text-[29px] text-center top-1/2'} style={isDisabledAndIsExtraLargeOrLargeOrStandardOrSmallOrMini ? { fontVariationSettings: "'wdth' 100" } : undefined}>
          {isDisabledAndIsExtraLargeOrLargeOrStandardOrSmallOrMini && <p className="leading-[22px]">􀻒</p>}
          {isSelectedAndIsExtraLargeOrLargeOrStandardOrSmallOrMini && (
            <div className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-1/2 text-[#f6f7f9] text-center top-1/2 ${isMiniAndSelected ? 'font-["SF_Pro:Semibold",sans-serif] font-[590] size-[28px] text-[13px]' : isSmallAndSelected ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[32px] text-[15px]' : isStandardAndSelected ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[44px] text-[19px]' : isLargeAndSelected ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[24px]' : 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[29px]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[22px]">􀻓</p>
            </div>
          )}
        </div>
      )}
      {isSelectedAndIsExtraLargeOrLargeOrStandardOrSmallOrMini && <div aria-hidden="true" className="absolute border-[0.5px] border-[rgba(200,207,219,0.6)] border-solid inset-0 pointer-events-none rounded-[500px] shadow-[0px_2px_4px_0px_rgba(18,34,50,0.3)]" />}
      {size === "Extra Large" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[50px] text-[#4e6987] text-[29px]" symbol={symbol} />}
      {size === "Standard" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[44px] text-[#4e6987] text-[19px]" symbol={symbol} />}
      {size === "Small" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[32px] text-[#4e6987] text-[15px]" symbol={symbol} />}
      {size === "Mini" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage1 additionalClassNames="text-[#4e6987]" symbol={symbol} />}
      {size === "Large" && ["Hover", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[50px] text-[#4e6987] text-[24px]" symbol={symbol} />}
      {isLargeAndIdlePlatter && (
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center leading-[0] left-[calc(50%+0.5px)] size-[50px] text-[#4e6987] text-[24px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px]">{symbol}</p>
        </div>
      )}
    </div>
  );
}
type AjustesProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "􀥏 Ajustes";
};

function Ajustes({ className, property1 = "Default" }: AjustesProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "cursor-pointer relative"} data-name="Property 1=Variant2">
        <BackgroundImage4 additionalClassNames="items-start">
          <ButtonMenu className="h-[32px] overflow-clip relative rounded-[100px] shrink-0 w-[42px]" size="Small" state="Hover" symbol="􀥎" />
          <BackgroundImageAndText text="Ajustes" additionalClassNames="relative shrink-0" />
        </BackgroundImage4>
      </button>
    );
  }
  if (property1 === "􀥏 Ajustes") {
    return (
      <div className={className || "relative"} data-name="Property 1=􀥏 Ajustes">
        <BackgroundImage2 text="􀻓" text1="Ajustes" additionalClassNames="items-start" />
      </div>
    );
  }
  return (
    <div className={className || "relative"} data-name="Property 1=Default">
      <div className="content-stretch flex flex-col items-start relative">
        <div className="content-stretch flex flex-col items-center relative shrink-0">
          <ButtonMenu className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􀥎" />
          <BackgroundImageAndText text="Ajustes" additionalClassNames="relative shrink-0" />
        </div>
      </div>
    </div>
  );
}
type DashProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Dash({ className, property1 = "Default" }: DashProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "cursor-pointer relative"} data-name="Property 1=Variant2">
        <div className="flex flex-col items-center size-full">
          <BackgroundImage4 additionalClassNames="items-center">
            <ButtonMenu className="h-[32px] overflow-clip relative rounded-[100px] shrink-0 w-[42px]" size="Small" state="Hover" symbol="􀇴" />
            <BackgroundImageAndText text="Dash" additionalClassNames="relative shrink-0" />
          </BackgroundImage4>
        </div>
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className={className || "relative"} data-name="Property 1=Variant3">
        <div className="flex flex-col items-center size-full">
          <BackgroundImage2 text="􀻓" text1="Dash" additionalClassNames="items-center" />
        </div>
      </div>
    );
  }
  return (
    <div className={className || "relative"} data-name="Property 1=Default">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center relative">
          <ButtonMenu className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􀇴" />
          <BackgroundImageAndText text="Dash" additionalClassNames="relative shrink-0" />
        </div>
      </div>
    </div>
  );
}
type PipesProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Pipes({ className, property1 = "Default" }: PipesProps) {
  const isDefault = property1 === "Default";
  const isVariant3 = property1 === "Variant3";
  return (
    <div className={className || "relative"}>
      <div className="content-stretch flex flex-col items-start relative">
        {["Default", "Variant3"].includes(property1) && (
          <div className={`content-stretch flex flex-col relative shrink-0 ${isVariant3 ? "items-start" : "items-center"}`}>
            {isDefault && <ButtonMenu className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􁙠" />}
            <div className={`flex flex-col relative shrink-0 ${isVariant3 ? "content-stretch items-center" : 'font-["DM_Sans:Medium",sans-serif] font-medium justify-center leading-[0] text-[#4e6987] text-[12px] text-center tracking-[-0.5px] whitespace-nowrap'}`} style={isDefault ? { fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" } : undefined}>
              {isDefault && <p className="leading-[22px]">Pipes</p>}
              {isVariant3 && (
                <>
                  <ButtonMenuBackgroundImageAndText text="􀻓" />
                  <BackgroundImageAndText1 text="Pipes" />
                </>
              )}
            </div>
          </div>
        )}
        {property1 === "Variant2" && (
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0">
            <div className="content-stretch flex flex-col items-center relative shrink-0">
              <ButtonMenu className="h-[32px] overflow-clip relative rounded-[100px] shrink-0 w-[42px]" size="Small" state="Hover" symbol="􁙠" />
              <BackgroundImageAndText text="Pipes" additionalClassNames="relative shrink-0" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
type ComponentProps = {
  className?: string;
  property1?: "Default" | "Variant2" | "Variant3";
};

function Component({ className, property1 = "Default" }: ComponentProps) {
  if (property1 === "Variant2") {
    return (
      <button className={className || "block cursor-pointer h-[54px] relative w-[32px]"} data-name="Property 1=Variant2">
        <BackgroundImageAndText text="Início" additionalClassNames="absolute inset-[59.26%_6.25%_0_6.25%]" />
        <div className="absolute content-stretch flex flex-col inset-[0_-15.63%] items-center">
          <ButtonMenu className="bg-[#dde3ec] h-[32px] overflow-clip relative rounded-[500px] shrink-0 w-[42px]" size="Small" state="Idle (Platter)" symbol="􀎞" />
          <BackgroundImageAndText text="Início" additionalClassNames="relative shrink-0" />
        </div>
      </button>
    );
  }
  if (property1 === "Variant3") {
    return (
      <div className={className || "h-[54px] relative w-[32px]"} data-name="Property 1=Variant3">
        <BackgroundImage3 text="􀎟" text1="Início" additionalClassNames="absolute inset-[0_-15.63%]" />
      </div>
    );
  }
  return (
    <div className={className || "h-[54px] relative w-[32px]"} data-name="Property 1=Default">
      <ButtonMenu className="absolute inset-[0_0_40.74%_0] overflow-clip rounded-[500px]" size="Small" symbol="􀎞" />
      <BackgroundImageAndText text="Início" additionalClassNames="absolute inset-[59.26%_6.25%_0_6.25%]" />
    </div>
  );
}
type ButtonSymbolProps = {
  className?: string;
  size?: "Mini" | "Small" | "Standard" | "Large" | "Extra Large";
  state?: "Idle (No Platter)" | "Idle (Platter)" | "Hover" | "Selected" | "Disabled";
  symbol?: string;
};

function ButtonSymbol({ className, size = "Mini", state = "Idle (No Platter)", symbol = "􀻒" }: ButtonSymbolProps) {
  const isExtraLargeAndHover = size === "Extra Large" && state === "Hover";
  const isExtraLargeAndSelected = size === "Extra Large" && state === "Selected";
  const isLargeAndHover = size === "Large" && state === "Hover";
  const isLargeAndSelected = size === "Large" && state === "Selected";
  const isMiniAndHover = size === "Mini" && state === "Hover";
  const isMiniAndSelected = size === "Mini" && state === "Selected";
  const isSmallAndHover = size === "Small" && state === "Hover";
  const isSmallAndSelected = size === "Small" && state === "Selected";
  const isStandardAndHover = size === "Standard" && state === "Hover";
  const isStandardAndSelected = size === "Standard" && state === "Selected";
  return (
    <div className={className || `overflow-clip relative ${size === "Mini" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[28px]" : isMiniAndHover ? "rounded-[100px] size-[28px]" : isMiniAndSelected ? "bg-[#07abde] rounded-[500px] size-[28px]" : size === "Mini" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[28px]" : size === "Small" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[32px]" : isSmallAndHover ? "rounded-[100px] size-[32px]" : isSmallAndSelected ? "bg-[#07abde] rounded-[500px] size-[32px]" : size === "Small" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[32px]" : size === "Standard" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[44px]" : isStandardAndHover ? "rounded-[100px] size-[44px]" : isStandardAndSelected ? "bg-[#07abde] rounded-[500px] size-[44px]" : size === "Standard" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[44px]" : size === "Large" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[52px]" : isLargeAndHover ? "rounded-[100px] size-[52px]" : isLargeAndSelected ? "bg-[#07abde] rounded-[500px] size-[52px]" : size === "Large" && ["Disabled", "Idle (No Platter)"].includes(state) ? "rounded-[500px] size-[52px]" : size === "Extra Large" && state === "Idle (Platter)" ? "bg-[#dde3ec] rounded-[500px] size-[64px]" : isExtraLargeAndHover ? "rounded-[100px] size-[64px]" : isExtraLargeAndSelected ? "bg-[#07abde] rounded-[500px] size-[64px]" : "rounded-[500px] size-[64px]"}`} style={isMiniAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 28 28\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-6.3973e-9 -2.2 2.2 -6.3973e-9 14 28)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isSmallAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 32 32\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-7.3112e-9 -2.5143 2.5143 -7.3112e-9 16 32)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isStandardAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 44 44\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.0053e-8 -3.4571 3.4571 -1.0053e-8 22 44)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 52 52\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.1881e-8 -4.0857 4.0857 -1.1881e-8 26 52)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : isExtraLargeAndHover ? { backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 64 64\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.20000000298023224\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-1.4622e-8 -5.0286 5.0286 -1.4622e-8 32 64)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(220, 240, 255) 0%, rgb(220, 240, 255) 100%)" } : undefined}>
      {state === "Disabled" && ["Extra Large", "Large", "Standard", "Small", "Mini"].includes(size) && (
        <div className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-1/2 text-[#d9d9d9] text-center top-1/2 ${size === "Mini" && state === "Disabled" ? 'font-["SF_Pro:Semibold",sans-serif] font-[590] size-[28px] text-[13px]' : size === "Small" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[32px] text-[15px]' : size === "Standard" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[44px] text-[19px]' : size === "Large" && state === "Disabled" ? 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[24px]' : 'font-["SF_Pro:Medium",sans-serif] font-[510] size-[50px] text-[29px]'}`} style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[22px]">􀻒</p>
        </div>
      )}
      {size === "Extra Large" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[50px] text-[#28415c] text-[29px]" symbol={symbol} />}
      {size === "Large" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[50px] text-[#28415c] text-[24px]" symbol={symbol} />}
      {size === "Standard" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[44px] text-[#28415c] text-[19px]" symbol={symbol} />}
      {size === "Small" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage additionalClassNames="size-[32px] text-[#28415c] text-[15px]" symbol={symbol} />}
      {size === "Mini" && ["Hover", "Idle (Platter)", "Idle (No Platter)"].includes(state) && <BackgroundImage1 additionalClassNames="text-[#28415c]" symbol={symbol} />}
      {isExtraLargeAndSelected && <BackgroundImage additionalClassNames="size-[50px] text-[#f6f7f9] text-[29px]" symbol={symbol} />}
      {isLargeAndSelected && <BackgroundImage additionalClassNames="size-[50px] text-[#f6f7f9] text-[24px]" symbol={symbol} />}
      {isStandardAndSelected && <BackgroundImage additionalClassNames="size-[44px] text-[#f6f7f9] text-[19px]" symbol={symbol} />}
      {isSmallAndSelected && <BackgroundImage additionalClassNames="size-[32px] text-[#f6f7f9] text-[15px]" symbol={symbol} />}
      {isMiniAndSelected && <BackgroundImage1 additionalClassNames="text-[#f6f7f9]" symbol={symbol} />}
    </div>
  );
}

export default function Padroes() {
  return (
    <div className="relative size-full" data-name="Padrões">
      <div className="absolute contents left-[367px] top-[9px]" data-name="Topo padrão Gmail">
        <div className="absolute bg-[#dde3ec] content-stretch flex h-[44px] items-center justify-between left-[367px] px-[10px] rounded-[100px] top-[9px] w-[462px]" data-name="Search Bar">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Search">
            <div className="col-1 content-stretch flex gap-[10px] items-center ml-0 mt-0 relative row-1">
              <ButtonSymbolBackgroundImageAndText text="􀊫" />
              <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[22px] relative shrink-0 text-[#4e6987] text-[15px] tracking-[-0.5px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14", fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" }}>
                Pesquisar em Fluxos
              </p>
            </div>
          </div>
          <ButtonSymbolBackgroundImageAndText text="􁵤" />
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_1px_0px_rgba(255,255,255,0.3),inset_0px_-0.5px_1px_0px_rgba(255,255,255,0.25),inset_0px_1.5px_4px_0px_rgba(0,0,0,0.08),inset_0px_1.5px_4px_0px_rgba(0,0,0,0.1)]" />
        </div>
        <div className="absolute content-stretch flex gap-[15px] items-center justify-end left-[1073px] top-[18px] w-[422px]" data-name="Settings/signin/menu">
          <ButtonSymbol className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􀝖" />
          <ButtonSymbol className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􀦳" />
          <div className="relative shrink-0 size-[27px]" data-name="3D Avatars / 23">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3DAvatars23} />
          </div>
        </div>
      </div>
      <div className="absolute contents left-0 top-0" data-name="Google Sidebar - Left">
        <div className="absolute bg-[#ebf1fa] h-[902px] left-0 top-0 w-[60px]" />
      </div>
      <div className="absolute contents left-[1466px] top-[60px]" data-name="Google Sidebar - Right">
        <div className="absolute bg-[#f7f8fc] h-[283px] left-[1466px] top-[60px] w-[46px]" />
        <div className="absolute h-[241.757px] left-[1477px] top-[76px] w-[23px]" data-name="Google Sidebar - Right">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 241.757">
            <g id="Google Sidebar - Right">
              <g clipPath="url(#clip0_1_363)" id="Camada_1">
                <path d={svgPaths.p12be6a00} fill="var(--fill-0, #28415C)" id="Vector" />
                <path clipRule="evenodd" d={svgPaths.p2e432f00} fill="var(--fill-0, #3CCEA7)" fillRule="evenodd" id="Vector_2" />
              </g>
              <g id="Calendar Icon">
                <path d={svgPaths.p20777500} fill="white" />
                <path d={svgPaths.p3c774a80} fill="#EA4335" />
                <path d={svgPaths.p11cc7600} fill="#188038" />
                <path d={svgPaths.p31482870} fill="#1967D2" />
                <path d={svgPaths.p1c289e40} fill="#FBBC04" />
                <path d={svgPaths.p204ad3f0} fill="#34A853" />
                <path d={svgPaths.p12f69400} fill="var(--fill-0, #4285F4)" />
                <path d={svgPaths.p2d75f380} fill="var(--fill-0, #4285F4)" />
              </g>
              <g id="Note Taker Iocn">
                <path d={svgPaths.p2fc83c80} fill="#F4B400" />
                <path d={svgPaths.p2b87a500} fill="var(--fill-0, white)" />
              </g>
              <path d={svgPaths.p3cf8af00} fill="var(--fill-0, #005CC4)" id="Contact Icon" />
              <path d="M0 195H22.3848" id="Divider" stroke="var(--stroke-0, #F3F3F5)" strokeWidth="2" />
              <path d={svgPaths.p1c50e600} fill="var(--fill-0, #4A4A4A)" id="Plus Icon" />
            </g>
            <defs>
              <clipPath id="clip0_1_363">
                <rect fill="white" height="17" transform="translate(3)" width="17" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[26px] items-center left-0 top-[14px]">
        <ButtonMenuBackgroundImageAndText1 text="􀏚" additionalClassNames="size-[32px]" />
        <div className="content-stretch flex flex-col items-center relative shrink-0">
          <ButtonMenu className="overflow-clip relative rounded-[500px] shrink-0 size-[32px]" size="Small" symbol="􀱍" />
          <BackgroundImageAndText text="Gmail" additionalClassNames="relative shrink-0" />
        </div>
        <Frame178DividerBackgroundImage />
        <div className="relative shrink-0 w-[60px]" data-name="Menubar - Left">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[16px] items-center relative w-full">
              <Component className="h-[54px] relative shrink-0 w-[32px]" />
              <Pipes className="relative shrink-0" />
              <Dash className="relative shrink-0" />
              <Ajustes className="relative shrink-0" />
            </div>
          </div>
        </div>
        <Frame178DividerBackgroundImage />
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
          <MenubarLeftBackgroundImage>
            <div className="absolute content-stretch flex flex-col inset-[0_-15.63%] items-center">
              <ButtonMenuBackgroundImageAndText1 text="􀌤" additionalClassNames="h-[32px] w-[42px]" />
              <BackgroundImageAndText text="Message" additionalClassNames="relative shrink-0" />
            </div>
          </MenubarLeftBackgroundImage>
          <MenubarLeftBackgroundImage>
            <div className="absolute content-stretch flex flex-col inset-[0_-15.63%] items-center">
              <BackgroundImage7>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro:Semibold',sans-serif] font-[590] justify-center leading-[0] left-1/2 size-[32px] text-[#f6f7f9] text-[13px] text-center top-1/2" style={{ fontVariationSettings: "'wdth' 100", fontFeatureSettings: "'ss16'" }}>
                  <p className="leading-[22px]">􀐖</p>
                </div>
              </BackgroundImage7>
              <BackgroundImageAndText1 text="Flow" />
            </div>
          </MenubarLeftBackgroundImage>
          <MenubarLeftBackgroundImage>
            <div className="absolute inset-[0_0_40.74%_0] overflow-clip rounded-[500px]" data-name="Button - Menu">
              <BackgroundImage6>􀴥</BackgroundImage6>
            </div>
            <BackgroundImageAndText text="Atalho" additionalClassNames="absolute inset-[59.26%_6.25%_0_6.25%]" />
          </MenubarLeftBackgroundImage>
        </div>
      </div>
    </div>
  );
}