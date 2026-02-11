import StudioLayout from '@/app/admin/components/studio/StudioLayout';

export default function StudioRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StudioLayout>
            {children}
        </StudioLayout>
    );
}
