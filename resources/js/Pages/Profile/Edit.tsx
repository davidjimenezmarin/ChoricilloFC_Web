import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateAddresses from './Partials/UpdateAddresses';
import PrimaryButton from '@/Components/PrimaryButton';
import Cart from '@/Components/Cart';
import { useTranslation } from 'react-i18next';

export default function Edit({
    mustVerifyEmail,
    addresses,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {t('profile.title')}
                    </h2>
                    <PrimaryButton className="w-auto" onClick={() => window.history.back()}>
                        {t('profile.back')}
                    </PrimaryButton>
                </div>
            }
            cartComponent={<Cart />}
        >
            <Head title={t('profile.title')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateAddresses className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <Link
                            href={route('orders.index')}
                            className="text-sm text-gray-700 dark:text-gray-500 underline"
                        >
                            {t('profile.orders')}
                        </Link>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
