import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressFormModal({ isOpen, onClose }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    street: '',
    city: '',
    zip_code: '',
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('addresses.store'), {
      onSuccess: () => {
        reset();
        onClose(); // cerrar el modal
      },
    });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition-transform ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-gray-800">
                  Nueva Dirección
                </Dialog.Title>
                <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Calle"
                      value={data.street}
                      onChange={(e) => setData('street', e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Ciudad"
                      value={data.city}
                      onChange={(e) => setData('city', e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Código Postal"
                      value={data.zip_code}
                      onChange={(e) => setData('zip_code', e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.zip_code && <p className="text-sm text-red-500 mt-1">{errors.zip_code}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-indigo-600 text-white rounded px-4 py-2 mt-2 hover:bg-indigo-700 transition"
                  >
                    Guardar Dirección
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
