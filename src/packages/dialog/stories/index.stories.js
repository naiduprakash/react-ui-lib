import { Fragment, useState } from "react";
import Dialog from "../src";
import Transition from "../../transition/src";

export default {
	title: "Dialog",
	component: Dialog,
	parameters: {
		controls: { hideNoControlsWarning: true }
	}
};

export function Example1() {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center">
				<button
					type="button"
					onClick={openModal}
					className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Open dialog
				</button>
			</div>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
				show={isOpen}
				as={Fragment}
			>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 opacity-5" />

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>

						<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<Dialog.Title
								as="h3"
								className="text-lg font-medium leading-6 text-gray-900"
							>
								Payment successful
							</Dialog.Title>
							<Dialog.Description>
								Your payment has been successfully submitted. We’ve sent you an
								email with all of the details of your order.
							</Dialog.Description>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
