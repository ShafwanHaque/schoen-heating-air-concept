/** A hand-built, resolution-independent architectural scene. No external media or API calls. */
export function ComfortScene() {
  return (
    <svg className="cinema__drawing" viewBox="0 0 1100 800" role="img" aria-labelledby="comfort-scene-title comfort-scene-description" preserveAspectRatio="xMidYMid meet">
      <title id="comfort-scene-title">A home transformed by heating and cooling</title>
      <desc id="comfort-scene-description">Cinematic cutaway illustration of a home, with changing weather outside, a working outdoor unit, visible air circulation, and a welcoming living room.</desc>
      <defs>
        <linearGradient id="cs-night" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0e2239"/><stop offset=".6" stopColor="#264056"/><stop offset="1" stopColor="#415062"/></linearGradient>
        <linearGradient id="cs-day" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#697c91"/><stop offset=".55" stopColor="#d4a17b"/><stop offset="1" stopColor="#e6bd8f"/></linearGradient>
        <linearGradient id="cs-wall" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#efe1c9"/><stop offset=".52" stopColor="#d6cbb8"/><stop offset="1" stopColor="#a9ab9f"/></linearGradient>
        <linearGradient id="cs-wall-cool" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b3d1d7"/><stop offset=".6" stopColor="#96b6c1"/><stop offset="1" stopColor="#7797aa"/></linearGradient>
        <linearGradient id="cs-floor" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b99d78"/><stop offset="1" stopColor="#624e44"/></linearGradient>
        <linearGradient id="cs-roof" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#40474c"/><stop offset=".65" stopColor="#263238"/><stop offset="1" stopColor="#101d26"/></linearGradient>
        <linearGradient id="cs-sofa" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#dac8aa"/><stop offset="1" stopColor="#907f69"/></linearGradient>
        <linearGradient id="cs-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9dcbd7" stopOpacity=".18"/><stop offset="1" stopColor="#d5f2ed" stopOpacity=".06"/></linearGradient>
        <linearGradient id="cs-flow" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#a8f2ef" stopOpacity="0"/><stop offset=".32" stopColor="#b5faff"/><stop offset=".7" stopColor="#65ddf4"/><stop offset="1" stopColor="#a8f2ef" stopOpacity="0"/></linearGradient>
        <radialGradient id="cs-light"><stop stopColor="#ffe8a2" stopOpacity=".74"/><stop offset=".4" stopColor="#ffc884" stopOpacity=".25"/><stop offset="1" stopColor="#ffdc99" stopOpacity="0"/></radialGradient>
        <radialGradient id="cs-sky-glow"><stop stopColor="#ffbc84" stopOpacity=".58"/><stop offset="1" stopColor="#ffbc84" stopOpacity="0"/></radialGradient>
        <filter id="cs-shadow" x="-30%" y="-40%" width="170%" height="190%"><feGaussianBlur stdDeviation="24"/></filter>
        <filter id="cs-softglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>
        <clipPath id="cs-window-clip"><rect x="466" y="247" width="208" height="194" rx="2"/></clipPath>
        <clipPath id="cs-room-clip"><path d="M314 243H1000V629H314Z"/></clipPath>
      </defs>

      {/* The outdoor weather is visible through the window and in the exterior air. */}
      <path d="M135 577C234 490 301 370 328 201L646 53 1006 213V648H148Z" fill="#081523" opacity=".45" filter="url(#cs-shadow)"/>
      <path d="M0 698Q280 670 518 688T1100 687V800H0Z" fill="#142b37"/>
      <path d="M0 704Q286 685 515 700T1100 694" stroke="#79b0ad" opacity=".24" strokeWidth="2" fill="none"/>

      {/* Building shell: wall structure, pitched roof and exposed living room. */}
      <path d="M306 228 653 78 1014 231 1014 652 306 652Z" fill="url(#cs-wall)"/>
      <path className="cinema__wall-cool" d="M306 228 653 78 1014 231 1014 652 306 652Z" fill="url(#cs-wall-cool)"/>
      <path d="M275 230 653 59 1047 231 1026 258 653 98 300 261Z" fill="url(#cs-roof)" stroke="#71817c" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M306 264 653 113 1015 266" fill="none" stroke="#778078" strokeWidth="10" opacity=".6"/>
      <path d="M312 258V646H1007V258" fill="none" stroke="#4f5554" strokeWidth="16"/>
      <path d="M322 249V640H999V250" fill="none" stroke="#efe4cd" strokeWidth="5" opacity=".7"/>
      <path d="M321 623H1001V654H321Z" fill="url(#cs-floor)"/>
      <path d="M307 651H1028" stroke="#141c22" strokeWidth="15" strokeLinecap="square"/>
      <path d="M310 652 260 698H1055L1019 652Z" fill="#34454c"/>
      <path d="M326 660 284 691M436 659 410 694M546 657 535 694M667 657 668 694M790 657 799 694M913 657 932 696" stroke="#68706a" opacity=".37" strokeWidth="2"/>

      {/* Double window: the weather changes while the indoor scene stays grounded. */}
      <rect x="454" y="234" width="231" height="218" rx="5" fill="#394b52"/>
      <g clipPath="url(#cs-window-clip)">
        <rect x="466" y="247" width="208" height="194" fill="url(#cs-night)"/>
        <rect className="cinema__sunset" x="466" y="247" width="208" height="194" fill="url(#cs-day)"/>
        <circle className="cinema__sun" cx="619" cy="313" r="72" fill="url(#cs-sky-glow)"/>
        <path d="M458 408Q506 361 548 407T650 402L685 419V451H456Z" fill="#2d4f52"/>
        <path d="M453 418Q523 385 573 423T686 415V459H456Z" fill="#1b3741"/>
        <g className="cinema__rain" stroke="#addbe9" strokeWidth="2" strokeLinecap="round" opacity=".9">
          <path d="m479 269-10 25m38-15-12 30m55-44-11 24m49-11-10 25m55-32-11 25m-139 35-12 31m62-29-10 24m56-23-11 29m51-31-10 23m-147 24-11 22m74-8-8 22m50-18-9 22m53-20-9 23"/>
        </g>
        <path d="M470 257 524 257 474 437" fill="#ffffff" opacity=".065"/>
      </g>
      <rect x="456" y="236" width="225" height="212" rx="3" stroke="#e5e4d5" strokeWidth="9" fill="none"/>
      <path d="M566 243v198" stroke="#e5e4d5" strokeWidth="10"/>
      <path d="M463 337h209" stroke="#e5e4d5" strokeWidth="8"/>
      <rect x="448" y="446" width="242" height="13" rx="3" fill="#b8ab91"/>

      {/* Indoor climate and light interact with physical surfaces, never arbitrary orbits. */}
      <g clipPath="url(#cs-room-clip)">
        <ellipse className="cinema__warm-wash" cx="846" cy="402" rx="286" ry="270" fill="url(#cs-light)"/>
        <path className="cinema__cool-wash" d="M679 261H1001V627H461C562 508 633 381 679 261Z" fill="#87d8ea" opacity=".22"/>
        <path d="M325 467H1000" stroke="#ffffff" strokeWidth="4" opacity=".1"/>
        {/* Built-in mini-split, a visible source of the comfort change. */}
        <rect x="736" y="252" width="211" height="52" rx="13" fill="#33434b" opacity=".21"/>
        <rect x="727" y="245" width="211" height="51" rx="13" fill="#f9f9ef" stroke="#bac9c5" strokeWidth="3"/>
        <path d="M742 282Q835 293 924 282" stroke="#8d9da1" strokeWidth="5" fill="none"/>
        <rect x="753" y="263" width="93" height="5" rx="2" fill="#aebdbe"/>
        <circle className="cinema__unit-led" cx="905" cy="264" r="4" fill="#93dbdb"/>
        <g className="cinema__air-routes" fill="none" stroke="url(#cs-flow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M819 300C812 373 720 339 652 389S518 438 428 434"/>
          <path d="M853 300C848 395 765 420 684 453S550 486 460 470"/>
          <path d="M885 300C893 361 873 406 832 433S749 464 716 510"/>
          <path d="M785 301C763 344 700 319 635 338"/>
        </g>
        <g className="cinema__air-sparkles" fill="#b9fbff">
          <circle cx="614" cy="395" r="3"/><circle cx="716" cy="440" r="3"/><circle cx="770" cy="385" r="2.6"/><circle cx="566" cy="469" r="2.4"/>
        </g>
        {/* Layered furniture and authentic residential details. */}
        <path d="M486 624Q663 600 822 631L862 649H457Z" fill="#7c6d59" opacity=".46"/>
        <ellipse cx="662" cy="625" rx="217" ry="36" fill="#c7ad88" opacity=".62"/>
        <path d="M472 613H846M486 627H837" stroke="#dbc6a2" strokeWidth="3" opacity=".65"/>
        {/* Couch back */}
        <rect x="539" y="465" width="280" height="112" rx="34" fill="#6b7069"/>
        <rect x="545" y="454" width="271" height="114" rx="29" fill="url(#cs-sofa)" stroke="#eddbc0" strokeWidth="3"/>
        <path d="M675 471v88" stroke="#aea085" strokeWidth="3" opacity=".65"/>
        <rect x="513" y="514" width="43" height="102" rx="17" fill="#b8a385"/>
        <rect x="801" y="514" width="43" height="102" rx="17" fill="#b8a385"/>
        <rect x="542" y="557" width="277" height="55" rx="20" fill="#cebb9c"/>
        <path d="M551 610h17v21h-17zM786 610h17v21h-17z" fill="#524a44"/>
        <path d="M573 479q35-15 64 7l-12 40q-31 7-56-10Z" fill="#e7d9bd"/>
        <path d="M738 477q28-10 49 11l-13 38-45-13Z" fill="#d5b99c"/>
        {/* Coffee table, lamp, plant and wall art */}
        <path d="M638 615h105l14 8-6 8H624l-4-7Z" fill="#746050"/>
        <path d="M649 629v24m85-24v24" stroke="#473b35" strokeWidth="7"/>
        <rect x="349" y="476" width="21" height="145" rx="5" fill="#5e554a"/>
        <path d="M321 478h76l-22-65h-33Z" fill="#ede2c8"/>
        <path className="cinema__lamp-light" d="M344 476H376L425 601H304Z" fill="url(#cs-light)" opacity=".72"/>
        <path d="M362 414V396" stroke="#49413c" strokeWidth="5"/>
        <rect x="365" y="603" width="125" height="12" rx="5" fill="#625c4c"/>
        <path d="M388 602v-72" stroke="#566054" strokeWidth="7"/>
        <path d="M386 558q-45-7-49-66 51 5 49 66m5-17q53-34 42-77-49 17-42 77m-2 36q-46-25-42-55 37 1 42 55" fill="#426a56"/>
        <path d="M367 615h42l-6 37h-29Z" fill="#a46f5a"/>
        <rect x="876" y="353" width="92" height="87" rx="4" fill="#e5dfcc" stroke="#9e9682" strokeWidth="5"/>
        <path d="M895 407q27-44 54-15" stroke="#8b9f8f" strokeWidth="8" fill="none"/>
      </g>

      {/* Outside condenser, its rotating fan and physical connecting service line. */}
      <path d="M248 578H310L336 505H343" fill="none" stroke="#94b5b9" strokeWidth="10" strokeLinecap="round"/>
      <path d="M248 578H310L336 505H343" fill="none" stroke="#3d6871" strokeWidth="3" strokeLinecap="round"/>
      <path d="M95 639h207" stroke="#10212b" strokeWidth="16"/>
      <rect x="104" y="480" width="189" height="158" rx="13" fill="#59666c" stroke="#9aafb1" strokeWidth="5"/>
      <rect x="116" y="497" width="166" height="125" rx="6" fill="#152833" stroke="#83989a" strokeWidth="3"/>
      <circle cx="199" cy="558" r="57" stroke="#668c90" strokeWidth="10" fill="#0e1e29"/>
      <circle cx="199" cy="558" r="45" stroke="#a4b6b5" strokeWidth="3" fill="#233742"/>
      <g className="cinema__condenser-fan" fill="#718f92">
        <path d="M199 558C174 528 166 502 197 510c21 5 29 25 13 45Z"/>
        <path d="M199 558C231 542 260 541 248 565c-10 18-28 20-46 6Z"/>
        <path d="M199 558C198 591 184 617 168 595c-13-19-6-34 22-41Z"/>
        <path d="M199 558C168 566 140 552 156 534c13-15 32-12 44 16Z"/>
        <circle cx="199" cy="558" r="12" fill="#b6cbc8"/>
      </g>
      <rect x="130" y="482" width="136" height="8" rx="4" fill="#9db0af"/>
      <path d="M119 628h157" stroke="#8aa6a7" strokeWidth="4"/>
      <rect x="128" y="639" width="30" height="14" rx="2" fill="#35464c"/>
      <rect x="244" y="639" width="30" height="14" rx="2" fill="#35464c"/>
      <g className="cinema__heat-haze" fill="none" stroke="#ffb18c" strokeLinecap="round" strokeWidth="4">
        <path d="M156 458c-14-18 7-26-4-49"/><path d="M203 457c-10-20 9-34 0-51"/><path d="M253 458c-11-20 10-31 1-52"/>
      </g>

      {/* Physically attached environment lighting, with no random decorative geometry. */}
      <path d="M311 664H1019" stroke="#ddc5a0" strokeWidth="2" opacity=".7"/>
    </svg>
  );
}
