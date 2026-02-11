import React from 'react';

export const GhostCursors = () => {
    return (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
            {/* Mock Cursor 1 */}
            <div className="absolute top-[340px] left-[55%] transition-all duration-1000 ease-in-out">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="#ff0080" stroke="white" />
                </svg>
                <div className="ml-4 -mt-1 px-2 py-0.5 bg-[#ff0080] text-white text-[10px] rounded-full font-bold whitespace-nowrap shadow-sm">
                    Sarah (Product)
                </div>
            </div>
        </div>
    );
};
