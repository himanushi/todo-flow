import {
	FloatingFocusManager,
	FloatingPortal,
	type Placement,
	autoUpdate,
	flip,
	offset as middlewareOffset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useId,
	useInteractions,
	useRole,
} from "@floating-ui/react";
import type { ReactNode } from "react";

export type PopoverProps = {
	disabled?: boolean;
	dismissOnOutsideClick?: boolean;
	offset?: number;
	open?: boolean;
	placement?: Placement;
	popupContent: ReactNode;
	popupZIndex?: number;
	setOpen?: (open: boolean) => void;
	targetContent: ReactNode;
};

export const Popover = ({
	offset = 10,
	popupContent,
	targetContent,
	dismissOnOutsideClick = true,
	open,
	setOpen,
	placement = "bottom",
	popupZIndex = 100,
}: PopoverProps) => {
	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [
			middlewareOffset(offset),
			flip({ fallbackAxisSideDirection: "end" }),
			shift(),
		],
		whileElementsMounted: autoUpdate,
		placement,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context, { enabled: dismissOnOutsideClick });
	const role = useRole(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
	]);

	const headingId = useId();

	return (
		<>
			<span ref={refs.setReference} {...getReferenceProps()}>
				{targetContent}
			</span>
			{open ? (
				<FloatingPortal>
					<FloatingFocusManager context={context} modal={false}>
						<div
							aria-labelledby={headingId}
							ref={refs.setFloating}
							style={{ ...floatingStyles, zIndex: popupZIndex }}
							{...getFloatingProps()}
						>
							{popupContent}
						</div>
					</FloatingFocusManager>
				</FloatingPortal>
			) : null}
		</>
	);
};
