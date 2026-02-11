/**
 * PRG Custom Hooks
 * Barrel export for all hooks
 */

// Feature 3: IndexedDB Storage
export {
    useFavorites,
    useCart,
    dbGet,
    dbGetAll,
    dbPut,
    dbDelete,
    dbClear,
    type FavoriteItem,
    type CartItem,
} from './useIndexedDB';

// Feature 10: LRU Recency Tracking
export {
    useLRURecency,
    useTrackServiceView,
    type RecencyItem,
} from './useLRURecency';

// Feature 5: Network Status
export {
    useNetworkStatus,
    useNetworkAwareValue,
    useShouldReduceData,
    type NetworkStatus,
    type ConnectionQuality,
} from './useNetworkStatus';
