import { Fragment, useState } from "react";
import Dialog from "../src";
import Transition from "../../transition/src";
import Button from "@react-ui-lib/button";

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
			<div className="inset-0 flex items-center justify-center">
				<Button type="button" color="primary" onClick={openModal}>
					Open dialog
				</Button>
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
					onClose={closeModal}
					classNames={{
						content:
							"inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
					}}
				>
					<h3 className="text-lg font-medium leading-6 text-gray-900">
						Payment successful
					</h3>
					<p>
						Your payment has been successfully submitted. We’ve sent you an email with
						all of the details of your order.
					</p>
				</Dialog>
			</Transition>
		</>
	);
}

export function Example2() {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className="inset-0 flex items-center justify-center">
				<Button type="button" color="primary" onClick={openModal}>
					Open dialog
				</Button>
			</div>

			<Dialog as="div" open={isOpen} onClose={closeModal}>
				<h3 className="text-lg font-medium leading-6 text-gray-900">Payment successful</h3>
				<p>
					Your payment has been successfully submitted. We’ve sent you an email with all
					of the details of your order.
				</p>
			</Dialog>
		</>
	);
}
