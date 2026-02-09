import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function QRRedirectPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Fetch Campaign
    const { data: campaign, error } = await supabase
        .from('qr_campaigns')
        .select('destination_url, visits, id')
        .eq('slug', slug)
        .single();

    if (error || !campaign) {
        // Fallback if QR code is invalid/expired
        redirect('/');
    }

    // 2. Increment Analytics (Fire and forget, or wait if critical)
    // We use rpc or simple update. For speed, we just fire update.
    await supabase
        .from('qr_campaigns')
        .update({ visits: (campaign.visits || 0) + 1 })
        .eq('id', campaign.id);

    // 3. Redirect to destination
    redirect(campaign.destination_url);
}
