import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const AppTooltip = ({
  children,
  content
}: {
  children: React.ReactNode;
  content: JSX.Element | string;
}) => {
  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={1000}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade bg-dark m-2 select-none rounded p-2 leading-none text-white shadow-sm will-change-[transform,opacity]"
            sideOffset={0}
            alignOffset={0}
          >
            {content}
            <Tooltip.Arrow className="fill-dark" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AppTooltip;
