export const useWhatsApp = () => {
    // FALLBACK: When offline or logic fails, use this base number
    const BASE_NUMBER = '2349126545783';

    // PRG Booking Logic: Pre-fill message based on service context
    const getBookingLink = (serviceName: string) => {
        // Clean and encode the service name
        const service = encodeURIComponent(serviceName || 'Consultation');

        // Context-aware text
        const text = `Hello PRG, I would like to book a session for *${service}*. When are you available?`;
        const encodedText = encodeURIComponent(text);

        return `https://wa.me/${BASE_NUMBER}?text=${encodedText}`;
    };

    return {
        getBookingLink,
        BASE_NUMBER
    };
};
