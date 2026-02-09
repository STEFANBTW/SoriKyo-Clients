// lib/cms.ts
import { supabase } from './supabase';

export interface BrandConfig {
    name: string;
    acronym: string;
    palette: {
        primary: string;
        secondary: string;
        accent: string;
    };
    typography: {
        display: string;
        elegant: string;
    };
}

export const getBrandConfig = async (): Promise<BrandConfig | null> => {
    const { data, error } = await supabase
        .from('content')
        .select('metadata')
        .eq('slug', 'global-config')
        .single();

    if (error || !data) {
        console.error('Error fetching brand config:', error);
        return null;
    }

    return data.metadata.brand as BrandConfig;
};

export const getServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true });

    if (error) {
        console.error('Error fetching services:', error);
        return [];
    }

    return data;
};
