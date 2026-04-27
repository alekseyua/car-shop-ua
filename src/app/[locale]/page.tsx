import { redirect } from 'next/navigation';
import HomePage from './home/page';
import Home from './home/page';
export default async function Page({params}: {params: Promise<{locale: string}>}) {
    const { locale } = await params;
    // redirect(`/${locale}/home`);
    return <HomePage />;
}