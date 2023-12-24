// components/ModalComponent.tsx
import { useModalContext } from '@/providers/modal-context';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';



const ModalComponent = () => {
    const { modalData } = useModalContext()
    const { isOpen, onClose, title, content, onClick } = modalData
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative bg-[#202024]" onClose={onClose} style={{ zIndex: 50 }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#00000090]" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-[#202024] rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-secondary"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-text">{content}</p>
                                    </div>

                                    {
                                     modalData?.buttonText &&   <div className="mt-4">
                                            <button
                                                // type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-secondary text-text focus:outline-none"
                                                onClick={onClick}
                                            >
                                                {modalData?.buttonText}
                                            </button>
                                        </div>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalComponent;
