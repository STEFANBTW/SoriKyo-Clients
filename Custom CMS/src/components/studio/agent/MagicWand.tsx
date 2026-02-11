import React from 'react';
import { Sparkles } from 'lucide-react';

interface MagicWandProps {
    onMagic: () => void;
}

export const MagicWand: React.FC<MagicWandProps> = ({ onMagic }) => {
    return (
        <button
            type="button"
            onClick={onMagic}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30 rounded-md text-sm hover:from-blue-600/30 hover:to-purple-600/30 transition-all group"
        >
            <Sparkles size={14} className="group-hover:text-yellow-300 transition-colors" />
            <span>Magic Fill</span>
        </button>
    );
};
